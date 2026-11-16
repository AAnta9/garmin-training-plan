#!/usr/bin/env python3
"""
Generador Oficial de Entrenamientos de Fuerza para Reloj Garmin (.FIT binario y .JSON Garmin Connect).
Utiliza la misma estructura de mensajes FIT (file_id=0, workout=26, workout_step=27, exercise_title=264)
y los mismos códigos de categoría/subcategoría detectados en los entrenamientos 'WE ARE BACK!'
del reloj Garmin del atleta (garmin_product=4536).
"""

from __future__ import annotations

import json
import struct
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
FIT_DIR = REPO_ROOT / "workouts" / "fit"
JSON_DIR = REPO_ROOT / "workouts" / "json"

# Mapa oficial de ejercicios Garmin extraído de los archivos .FIT reales del reloj del usuario
GARMIN_EXERCISES: dict[str, dict[str, Any]] = {
    "bench": {
        "cat_id": 0,
        "name_id": 1,
        "category_key": "BENCH_PRESS",
        "exercise_key": "BARBELL_BENCH_PRESS",
        "title_es": "Press de banca con barra",
        "rest_sec": 120,
        "step": 2.5,
        "default_1rm": 107.5,
    },
    "incline_db": {
        "cat_id": 0,
        "name_id": 9,
        "category_key": "BENCH_PRESS",
        "exercise_key": "INCLINE_DUMBBELL_BENCH_PRESS",
        "title_es": "Press inclinado con mancuernas",
        "rest_sec": 90,
        "step": 1.0,
        "default_1rm": 38.0,
    },
    "squat": {
        "cat_id": 28,
        "name_id": 6,
        "category_key": "SQUAT",
        "exercise_key": "BARBELL_BACK_SQUAT",
        "title_es": "Sentadilla trasera con barra",
        "rest_sec": 150,
        "step": 2.5,
        "default_1rm": 105.0,
    },
    "deadlift": {
        "cat_id": 8,
        "name_id": 0,
        "category_key": "DEADLIFT",
        "exercise_key": "BARBELL_DEADLIFT",
        "title_es": "Peso muerto con barra",
        "rest_sec": 150,
        "step": 2.5,
        "default_1rm": 150.0,
    },
    "rdl": {
        "cat_id": 8,
        "name_id": 23,
        "category_key": "DEADLIFT",
        "exercise_key": "ROMANIAN_DEADLIFT",
        "title_es": "Peso muerto rumano",
        "rest_sec": 105,
        "step": 2.5,
        "default_1rm": 100.0,
    },
    "ohp": {
        "cat_id": 24,
        "name_id": 25,
        "category_key": "SHOULDER_PRESS",
        "exercise_key": "MILITARY_PRESS",
        "title_es": "Press militar con barra",
        "rest_sec": 105,
        "step": 2.5,
        "default_1rm": 62.5,
    },
    "row_db": {
        "cat_id": 23,
        "name_id": 2,
        "category_key": "ROW",
        "exercise_key": "DUMBBELL_ROW",
        "title_es": "Remo con mancuerna",
        "rest_sec": 75,
        "step": 1.0,
        "default_1rm": 36.0,
    },
    "row_bar": {
        "cat_id": 23,
        "name_id": 45,
        "category_key": "ROW",
        "exercise_key": "BARBELL_ROW",
        "title_es": "Remo con barra",
        "rest_sec": 90,
        "step": 2.5,
        "default_1rm": 85.0,
    },
    "pullup_load": {
        "cat_id": 21,
        "name_id": 38,
        "category_key": "PULL_UP",
        "exercise_key": "PULL_UP",
        "title_es": "Dominadas",
        "rest_sec": 105,
        "step": 1.25,
        "default_1rm": 15.0,
    },
    "split_squat_db": {
        "cat_id": 17,
        "name_id": 27,
        "category_key": "LUNGE",
        "exercise_key": "FRONT_FOOT_ELEVATED_DUMBBELL_SPLIT_SQUAT",
        "title_es": "Sentadilla búlgara con mancuerna",
        "rest_sec": 75,
        "step": 1.0,
        "default_1rm": 24.0,
    },
    "hip_thrust": {
        "cat_id": 12,
        "name_id": 1,
        "category_key": "HIP_RAISE",
        "exercise_key": "BARBELL_HIP_THRUST_ON_FLOOR",
        "title_es": "Hip Thrust con barra",
        "rest_sec": 90,
        "step": 2.5,
        "default_1rm": 90.0,
    },
    "soleus": {
        "cat_id": 1,
        "name_id": 6,
        "category_key": "CALF_RAISE",
        "exercise_key": "WEIGHTED_SEATED_CALF_RAISE",
        "title_es": "Elevación de gemelos sentado (Sóleo)",
        "rest_sec": 60,
        "step": 2.5,
        "default_1rm": 50.0,
    },
    "core": {
        "cat_id": 5,
        "name_id": 6,
        "category_key": "CORE",
        "exercise_key": "CABLE_CORE_PRESS",
        "title_es": "Core anti-rotación / Plancha RKC",
        "rest_sec": 45,
        "step": 1.0,
        "default_1rm": 0.0,
    },
}


def fit_crc16(data: bytes) -> int:
    crc_table = [
        0x0000, 0xCC01, 0xD801, 0x1400, 0xF001, 0x3C00, 0x2800, 0xE401,
        0xA001, 0x6C00, 0x7800, 0xB401, 0x5000, 0x9C01, 0x8801, 0x4400,
    ]
    crc = 0
    for b in data:
        tmp = crc_table[crc & 0x0F]
        crc = (crc >> 4) & 0x0FFF
        crc = crc ^ tmp ^ crc_table[b & 0x0F]
        tmp = crc_table[crc & 0x0F]
        crc = (crc >> 4) & 0x0FFF
        crc = crc ^ tmp ^ crc_table[(b >> 4) & 0x0F]
    return crc


def fixed_str(text: str, size: int) -> bytes:
    raw = text.encode("utf-8")[: size - 1]
    return raw + b"\x00" * (size - len(raw))


def round_step(val: float, step: float) -> float:
    return round(val / step) * step


def calc_weight_kg(lift_key: str, pct: float, one_rm_map: dict[str, float]) -> float:
    cfg = GARMIN_EXERCISES[lift_key]
    rm = one_rm_map.get(lift_key, cfg["default_1rm"])
    if lift_key == "pullup_load":
        if not pct or pct <= 0 or rm <= 0:
            return 0.0
        return round_step(rm * pct, cfg["step"])
    if lift_key == "core":
        return 0.0
    return max(cfg["step"], round_step(rm * pct, cfg["step"]))


def build_fit_workout_bytes(workout_name: str, exercises: list[dict[str, Any]], one_rm_map: dict[str, float]) -> bytes:
    """
    Codifica un archivo .FIT de entrenamiento (FileType=5 WORKOUT, Sport=10 TRAINING, SubSport=20 STRENGTH_TRAINING)
    idéntico al formato nativo de los relojes Garmin.
    """
    body = bytearray()

    # 1. Definition Message Local 0 -> file_id (GMSG 0)
    # Fields: serial_number(3, uint32z), time_created(4, uint32), manufacturer(1, uint16), product(2, uint16), number(5, uint16), type(0, enum)
    body.extend(
        bytes([
            0x40, 0x00, 0x00, 0x00, 0x00, 6,
            3, 4, 0x8C,
            4, 4, 0x86,
            1, 2, 0x84,
            2, 2, 0x84,
            5, 2, 0x84,
            0, 1, 0x00,
        ])
    )
    # Data Message Local 0 -> file_id (type=5 WORKOUT, manufacturer=1 GARMIN, product=4536)
    body.extend(struct.pack("<BIIHHHB", 0x00, 3620636920, 1161433847, 1, 4536, 1, 5))

    # Construir lista de pasos (Warmup + bloques [Ejercicio + Descanso + Repeat] + Cooldown)
    steps: list[dict[str, Any]] = []
    # Step 0: Calentamiento (Open duration hasta pulsar botón Lap)
    steps.append({
        "msg_idx": 0,
        "dur_type": 5,  # open
        "dur_val": 0xFFFFFFFF,
        "tgt_type": 2,
        "tgt_val": 0,
        "intensity": 2,  # warmup
        "ex_cat": 2,  # CARDIO
        "ex_name": 0xFFFF,
        "ex_weight": 0xFFFF,
        "wt_unit": 1,
        "notes": "Calentamiento articular 5 min",
    })

    used_titles: dict[tuple[int, int], str] = {(2, 0xFFFF): "Calentamiento / Movilidad"}

    for ex in exercises:
        lift_key = ex["lift"]
        cfg = GARMIN_EXERCISES[lift_key]
        sets_count = int(ex["sets"])
        reps_count = int(ex["reps"])
        pct = float(ex.get("pct", 0.0))
        weight_kg = calc_weight_kg(lift_key, pct, one_rm_map)
        ex_weight_val = int(round(weight_kg * 100)) if weight_kg > 0 else 0xFFFF
        rest_ms = int(ex.get("rest_sec", cfg["rest_sec"])) * 1000

        work_idx = len(steps)
        note_str = f"{weight_kg:g} kg ({int(round(pct*100))}% 1RM)" if weight_kg > 0 else "Peso corporal"
        steps.append({
            "msg_idx": work_idx,
            "dur_type": 29,  # reps
            "dur_val": reps_count,
            "tgt_type": 2,
            "tgt_val": 0,
            "intensity": 0,  # active
            "ex_cat": cfg["cat_id"],
            "ex_name": cfg["name_id"],
            "ex_weight": ex_weight_val,
            "wt_unit": 1,  # kilogram
            "notes": note_str,
        })
        used_titles[(cfg["cat_id"], cfg["name_id"])] = cfg["title_es"]

        rest_idx = len(steps)
        steps.append({
            "msg_idx": rest_idx,
            "dur_type": 0,  # time (ms)
            "dur_val": rest_ms,
            "tgt_type": 2,
            "tgt_val": 0,
            "intensity": 1,  # rest
            "ex_cat": 0xFFFF,
            "ex_name": 0xFFFF,
            "ex_weight": 0xFFFF,
            "wt_unit": 1,
            "notes": "Descanso entre series",
        })

        rep_idx = len(steps)
        steps.append({
            "msg_idx": rep_idx,
            "dur_type": 6,  # repeat_until_steps_cmplt
            "dur_val": work_idx,
            "tgt_type": 0xFF,
            "tgt_val": sets_count,
            "intensity": 0xFF,
            "ex_cat": 0xFFFF,
            "ex_name": 0xFFFF,
            "ex_weight": 0xFFFF,
            "wt_unit": 0xFFFF,
            "notes": "",
        })

    # Cooldown step
    steps.append({
        "msg_idx": len(steps),
        "dur_type": 5,  # open
        "dur_val": 0xFFFFFFFF,
        "tgt_type": 2,
        "tgt_val": 0,
        "intensity": 3,  # cooldown
        "ex_cat": 2,
        "ex_name": 0xFFFF,
        "ex_weight": 0xFFFF,
        "wt_unit": 1,
        "notes": "Vuelta a la calma",
    })

    # 2. Definition Message Local 1 -> workout (GMSG 26)
    # Fields: capabilities(5, uint32z), wkt_name(8, string 32), num_valid_steps(6, uint16), sport(4, enum), sub_sport(11, enum)
    body.extend(
        bytes([
            0x41, 0x00, 0x00, 26, 0x00, 5,
            5, 4, 0x8C,
            8, 32, 0x07,
            6, 2, 0x84,
            4, 1, 0x00,
            11, 1, 0x00,
        ])
    )
    body.extend(
        struct.pack(
            "<BI32sHBB",
            0x01,
            32,
            fixed_str(workout_name, 32),
            len(steps),
            10,  # sport = training
            20,  # sub_sport = strength_training
        )
    )

    # 3. Definition Message Local 2 -> workout_step (GMSG 27)
    # Fields: duration_value(2, uint32), target_value(4, uint32), notes(8, string 32), message_index(254, uint16),
    #         exercise_category(10, uint16), exercise_name(11, uint16), exercise_weight(12, uint16), weight_display_unit(13, uint16),
    #         wkt_step_name(0, string 32), duration_type(1, enum), target_type(3, enum), intensity(7, enum)
    body.extend(
        bytes([
            0x42, 0x00, 0x00, 27, 0x00, 12,
            2, 4, 0x86,
            4, 4, 0x86,
            8, 32, 0x07,
            254, 2, 0x84,
            10, 2, 0x84,
            11, 2, 0x84,
            12, 2, 0x84,
            13, 2, 0x84,
            0, 32, 0x07,
            1, 1, 0x00,
            3, 1, 0x00,
            7, 1, 0x00,
        ])
    )
    for st in steps:
        step_title = used_titles.get((st["ex_cat"], st["ex_name"]), "")
        body.extend(
            struct.pack(
                "<BII32sHHHHH32sBBB",
                0x02,
                st["dur_val"],
                st["tgt_val"],
                fixed_str(st["notes"], 32),
                st["msg_idx"],
                st["ex_cat"],
                st["ex_name"],
                st["ex_weight"],
                st["wt_unit"],
                fixed_str(step_title, 32),
                st["dur_type"],
                st["tgt_type"],
                st["intensity"],
            )
        )

    # 4. Definition Message Local 3 -> exercise_title (GMSG 264)
    # Fields: wkt_step_name(2, string 48), message_index(254, uint16), exercise_category(0, uint16), exercise_name(1, uint16)
    body.extend(
        bytes([
            0x43, 0x00, 0x00, 0x08, 0x01, 4,
            2, 48, 0x07,
            254, 2, 0x84,
            0, 2, 0x84,
            1, 2, 0x84,
        ])
    )
    for idx, ((cat_id, name_id), title_es) in enumerate(used_titles.items()):
        body.extend(
            struct.pack(
                "<B48sHHH",
                0x03,
                fixed_str(title_es, 48),
                idx,
                cat_id,
                name_id,
            )
        )

    # Cabecera FIT de 14 bytes + CRC16 de cabecera + cuerpo + CRC16 de archivo
    data_size = len(body)
    header_12 = struct.pack("<BBHI4s", 14, 0x10, 2113, data_size, b".FIT")
    header_crc = fit_crc16(header_12)
    header_14 = header_12 + struct.pack("<H", header_crc)

    full_no_crc = header_14 + bytes(body)
    file_crc = fit_crc16(full_no_crc)
    return full_no_crc + struct.pack("<H", file_crc)


def build_garmin_connect_workout_json(workout_name: str, description: str, exercises: list[dict[str, Any]], one_rm_map: dict[str, float]) -> dict[str, Any]:
    """
    Genera el JSON oficial compatible con POST /workout-service/workout de Garmin Connect Web
    y con la extensión 'Share Your Garmin Connect Workout'.
    """
    workout_steps: list[dict[str, Any]] = []
    step_order = 1

    # Paso 1: Calentamiento
    workout_steps.append({
        "type": "ExecutableStepDTO",
        "stepId": None,
        "stepOrder": step_order,
        "childStepId": None,
        "description": "Movilidad escapular/cadera y series de aproximación",
        "stepType": {"stepTypeId": 1, "stepTypeKey": "warmup", "displayOrder": 1},
        "endCondition": {"conditionTypeId": 1, "conditionTypeKey": "lap.button", "displayOrder": 1, "displayable": True},
        "endConditionValue": None,
        "targetType": {"workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target", "displayOrder": 1},
        "category": "CARDIO",
        "exerciseName": None,
    })
    step_order += 1

    for child_id, ex in enumerate(exercises, start=1):
        lift_key = ex["lift"]
        cfg = GARMIN_EXERCISES[lift_key]
        sets_count = int(ex["sets"])
        reps_count = int(ex["reps"])
        pct = float(ex.get("pct", 0.0))
        weight_kg = calc_weight_kg(lift_key, pct, one_rm_map)
        rest_sec = int(ex.get("rest_sec", cfg["rest_sec"]))

        work_step_order = step_order + 1
        rest_step_order = step_order + 2

        work_step: dict[str, Any] = {
            "type": "ExecutableStepDTO",
            "stepId": None,
            "stepOrder": work_step_order,
            "childStepId": child_id,
            "description": ex.get("rir", "RIR 1-2"),
            "stepType": {"stepTypeId": 3, "stepTypeKey": "interval", "displayOrder": 3},
            "endCondition": {"conditionTypeId": 10, "conditionTypeKey": "reps", "displayOrder": 10, "displayable": True},
            "endConditionValue": float(reps_count),
            "targetType": {"workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target", "displayOrder": 1},
            "category": cfg["category_key"],
            "exerciseName": cfg["exercise_key"],
        }
        if weight_kg > 0:
            work_step["weightValue"] = weight_kg
            work_step["weightUnit"] = {"unitId": 8, "unitKey": "kilogram", "factor": 1000.0}

        rest_step: dict[str, Any] = {
            "type": "ExecutableStepDTO",
            "stepId": None,
            "stepOrder": rest_step_order,
            "childStepId": child_id,
            "description": "Descanso entre series",
            "stepType": {"stepTypeId": 4, "stepTypeKey": "rest", "displayOrder": 4},
            "endCondition": {"conditionTypeId": 2, "conditionTypeKey": "time", "displayOrder": 2, "displayable": True},
            "endConditionValue": float(rest_sec),
            "targetType": {"workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target", "displayOrder": 1},
        }

        workout_steps.append({
            "type": "RepeatGroupDTO",
            "stepId": None,
            "stepOrder": step_order,
            "stepType": {"stepTypeId": 6, "stepTypeKey": "repeat", "displayOrder": 6},
            "childStepId": child_id,
            "numberOfIterations": sets_count,
            "smartRepeat": False,
            "endCondition": {"conditionTypeId": 7, "conditionTypeKey": "iterations", "displayOrder": 7, "displayable": False},
            "endConditionValue": float(sets_count),
            "workoutSteps": [work_step, rest_step],
        })
        step_order += 3

    # Cooldown
    workout_steps.append({
        "type": "ExecutableStepDTO",
        "stepId": None,
        "stepOrder": step_order,
        "childStepId": None,
        "description": "Vuelta a la calma y movilidad",
        "stepType": {"stepTypeId": 2, "stepTypeKey": "cooldown", "displayOrder": 2},
        "endCondition": {"conditionTypeId": 1, "conditionTypeKey": "lap.button", "displayOrder": 1, "displayable": True},
        "endConditionValue": None,
        "targetType": {"workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target", "displayOrder": 1},
        "category": "CARDIO",
        "exerciseName": None,
    })

    return {
        "workoutName": workout_name,
        "description": description,
        "sportType": {"sportTypeId": 5, "sportTypeKey": "strength_training", "displayOrder": 5},
        "subSportType": None,
        "workoutSegments": [
            {
                "segmentOrder": 1,
                "sportType": {"sportTypeId": 5, "sportTypeKey": "strength_training", "displayOrder": 5},
                "workoutSteps": workout_steps,
            }
        ],
    }


THREE_CORE_DAYS = [
    {
        "slug": "Lunes_Upper_A",
        "day": "Lunes",
        "workoutName": "HYBRID · Lunes Upper A",
        "description": "Gimnasio Día 1 (Lunes) — Tren Superior A (Empuje & Tracción Pesada). Generado por Garmin Hybrid Coach.",
        "exercises": [
            {"lift": "bench", "sets": 4, "reps": 6, "pct": 0.80, "rest_sec": 120, "rir": "RIR 2"},
            {"lift": "pullup_load", "sets": 4, "reps": 6, "pct": 0.50, "rest_sec": 105, "rir": "RIR 1-2"},
            {"lift": "ohp", "sets": 3, "reps": 8, "pct": 0.76, "rest_sec": 90, "rir": "RIR 2"},
            {"lift": "row_db", "sets": 3, "reps": 10, "pct": 0.78, "rest_sec": 75, "rir": "RIR 1-2"},
        ],
    },
    {
        "slug": "Martes_Lower",
        "day": "Martes",
        "workoutName": "HYBRID · Martes Lower",
        "description": "Gimnasio Día 2 (Martes) — Tren Inferior Híbrido & Protección Tendón de Aquiles. 72h antes de las series del viernes.",
        "exercises": [
            {"lift": "squat", "sets": 4, "reps": 5, "pct": 0.80, "rest_sec": 150, "rir": "RIR 2 (concéntrica explosiva)"},
            {"lift": "rdl", "sets": 3, "reps": 6, "pct": 0.78, "rest_sec": 105, "rir": "RIR 2 (isquios)"},
            {"lift": "split_squat_db", "sets": 3, "reps": 8, "pct": 0.75, "rest_sec": 75, "rir": "8 reps por pierna"},
            {"lift": "soleus", "sets": 4, "reps": 12, "pct": 0.78, "rest_sec": 60, "rir": "1s pausa arriba (Aquiles)"},
            {"lift": "core", "sets": 3, "reps": 12, "pct": 0.0, "rest_sec": 45, "rir": "Estabilidad pélvica"},
        ],
    },
    {
        "slug": "Jueves_Upper_B",
        "day": "Jueves",
        "workoutName": "HYBRID · Jueves Upper B",
        "description": "Gimnasio Día 3 (Jueves) — Tren Superior B (Hombro, Tracción Horizontal & Hipertrofia Funcional). Piernas frescas para el viernes.",
        "exercises": [
            {"lift": "ohp", "sets": 4, "reps": 6, "pct": 0.80, "rest_sec": 120, "rir": "RIR 1-2"},
            {"lift": "row_bar", "sets": 4, "reps": 8, "pct": 0.78, "rest_sec": 90, "rir": "RIR 1-2"},
            {"lift": "incline_db", "sets": 3, "reps": 8, "pct": 0.79, "rest_sec": 90, "rir": "RIR 2"},
            {"lift": "pullup_load", "sets": 3, "reps": 8, "pct": 0.0, "rest_sec": 90, "rir": "Peso corporal estricto"},
        ],
    },
]


def main() -> None:
    FIT_DIR.mkdir(parents=True, exist_ok=True)
    JSON_DIR.mkdir(parents=True, exist_ok=True)
    one_rm_map = {k: v["default_1rm"] for k, v in GARMIN_EXERCISES.items()}

    for d in THREE_CORE_DAYS:
        fit_bytes = build_fit_workout_bytes(d["workoutName"], d["exercises"], one_rm_map)
        fit_path = FIT_DIR / f"{d['slug']}.fit"
        fit_path.write_bytes(fit_bytes)

        json_obj = build_garmin_connect_workout_json(d["workoutName"], d["description"], d["exercises"], one_rm_map)
        json_path = JSON_DIR / f"{d['slug']}.json"
        json_path.write_text(json.dumps(json_obj, indent=2, ensure_ascii=False))
        print(f"[OK] Generado {fit_path.name} ({len(fit_bytes)} bytes) y {json_path.name}")


if __name__ == "__main__":
    main()
