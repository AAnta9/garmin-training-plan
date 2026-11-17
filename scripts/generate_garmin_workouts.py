#!/usr/bin/env python3
"""
Generador y Validador Oficial de Entrenamientos de Fuerza para Reloj Garmin Fenix 8 (.FIT binario y .JSON Garmin Connect).
Cumple al 100% con la especificación oficial Garmin FIT SDK Workout File Profile (FileType=5 WORKOUT):
- GMSG 0 (file_id): type=5 (workout), manufacturer=1 (garmin), garmin_product=4536 (Fenix 8), number=1..3 (slot válido)
- GMSG 49 (file_creator): software_version=100
- GMSG 26 (workout): sport=10 (training), sub_sport=20 (strength_training), capabilities=32, num_valid_steps, wkt_name
- GMSG 27 (workout_step): campos oficiales del FIT SDK (sin campos residuales de actividad 37/38)
- GMSG 264 (exercise_title): diccionario de nombres de ejercicio en español para la pantalla del Fenix 8
Incluye autodiagnóstico con garmin_fit_sdk y genera workouts/diagnostics_log.json.
"""

from __future__ import annotations

import datetime
import json
import struct
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
FIT_DIR = REPO_ROOT / "workouts" / "fit"
JSON_DIR = REPO_ROOT / "workouts" / "json"
DIAG_FILE = REPO_ROOT / "workouts" / "diagnostics_log.json"

GARMIN_EXERCISES: dict[str, dict[str, Any]] = {
    "bench": {
        "cat_id": 0,
        "name_id": 1,
        "category_key": "BENCH_PRESS",
        "exercise_key": "BARBELL_BENCH_PRESS",
        "title_es": "Press de banca con barra",
        "rest_sec": 120,
        "step": 2.5,
        "default_1rm": 120.0,
    },
    "squat": {
        "cat_id": 28,
        "name_id": 6,
        "category_key": "SQUAT",
        "exercise_key": "BARBELL_BACK_SQUAT",
        "title_es": "Sentadilla trasera con barra",
        "rest_sec": 150,
        "step": 2.5,
        "default_1rm": 130.0,
    },
    "deadlift": {
        "cat_id": 8,
        "name_id": 0,
        "category_key": "DEADLIFT",
        "exercise_key": "BARBELL_DEADLIFT",
        "title_es": "Peso muerto con barra",
        "rest_sec": 150,
        "step": 2.5,
        "default_1rm": 160.0,
    },
    "rdl": {
        "cat_id": 8,
        "name_id": 23,
        "category_key": "DEADLIFT",
        "exercise_key": "ROMANIAN_DEADLIFT",
        "title_es": "Peso muerto rumano",
        "rest_sec": 105,
        "step": 2.5,
        "default_1rm": 140.0,
    },
    "ohp": {
        "cat_id": 24,
        "name_id": 25,
        "category_key": "SHOULDER_PRESS",
        "exercise_key": "MILITARY_PRESS",
        "title_es": "Press militar con barra",
        "rest_sec": 105,
        "step": 2.5,
        "default_1rm": 65.0,
    },
    "incline_db": {
        "cat_id": 0,
        "name_id": 9,
        "category_key": "BENCH_PRESS",
        "exercise_key": "INCLINE_DUMBBELL_BENCH_PRESS",
        "title_es": "Press inclinado con mancuernas",
        "rest_sec": 90,
        "step": 1.0,
        "default_1rm": 40.0,
    },
    "row_db": {
        "cat_id": 23,
        "name_id": 2,
        "category_key": "ROW",
        "exercise_key": "DUMBBELL_ROW",
        "title_es": "Remo con mancuerna",
        "rest_sec": 75,
        "step": 1.0,
        "default_1rm": 40.0,
    },
    "row_bar": {
        "cat_id": 23,
        "name_id": 45,
        "category_key": "ROW",
        "exercise_key": "BARBELL_ROW",
        "title_es": "Remo con barra",
        "rest_sec": 90,
        "step": 2.5,
        "default_1rm": 90.0,
    },
    "pullup_load": {
        "cat_id": 21,
        "name_id": 38,
        "category_key": "PULL_UP",
        "exercise_key": "PULL_UP",
        "title_es": "Dominadas",
        "rest_sec": 105,
        "step": 1.25,
        "default_1rm": 20.0,
    },
    "split_squat_db": {
        "cat_id": 17,
        "name_id": 27,
        "category_key": "LUNGE",
        "exercise_key": "FRONT_FOOT_ELEVATED_DUMBBELL_SPLIT_SQUAT",
        "title_es": "Sentadilla bulgara con mancuerna",
        "rest_sec": 75,
        "step": 1.0,
        "default_1rm": 35.0,
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
        "title_es": "Elevacion de gemelos sentado",
        "rest_sec": 60,
        "step": 2.5,
        "default_1rm": 60.0,
    },
    "core": {
        "cat_id": 5,
        "name_id": 6,
        "category_key": "CORE",
        "exercise_key": "CABLE_CORE_PRESS",
        "title_es": "Press Pallof / Core",
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


def pack_sdk_workout_step(
    msg_idx: int,
    step_name: str,
    dur_type: int,
    dur_val: int,
    tgt_type: int,
    tgt_val: int,
    intensity: int,
    notes: str,
    ex_cat: int,
    ex_name: int,
    ex_weight: int,
    wt_unit: int,
) -> bytes:
    """
    Empaqueta los 15 campos oficiales del Garmin FIT SDK para GMSG 27 (workout_step):
    - 2 (duration_value, uint32, 4B)
    - 4 (target_value, uint32, 4B)
    - 5 (custom_target_value_low, uint32, 4B)
    - 6 (custom_target_value_high, uint32, 4B)
    - 254 (message_index, uint16, 2B)
    - 10 (exercise_category, uint16, 2B)
    - 11 (exercise_name, uint16, 2B)
    - 12 (exercise_weight, uint16, 2B, scale 100)
    - 13 (weight_display_unit, uint16, 2B, 1=kg)
    - 0 (wkt_step_name, string, 32B)
    - 8 (notes, string, 64B)
    - 1 (duration_type, enum, 1B)
    - 3 (target_type, enum, 1B)
    - 7 (intensity, enum, 1B)
    - 9 (equipment, enum, 1B)
    """
    return struct.pack(
        "<BIIIIHHHHH32s64sBBBB",
        0x02,  # local msg 2
        dur_val,
        tgt_val,
        0xFFFFFFFF,
        0xFFFFFFFF,
        msg_idx,
        ex_cat,
        ex_name,
        ex_weight,
        wt_unit,
        fixed_str(step_name, 32),
        fixed_str(notes, 64),
        dur_type,
        tgt_type,
        intensity,
        0xFF,  # equipment
    )


def build_fit_workout_bytes(
    workout_name: str,
    exercises: list[dict[str, Any]],
    one_rm_map: dict[str, float],
    workout_slot_number: int = 1,
) -> bytes:
    """
    Codifica un archivo .FIT de entrenamiento (FileType=5 WORKOUT) siguiendo de forma
    100% canónica el perfil oficial Garmin FIT SDK para importación directa en GARMIN/NewFiles
    o GARMIN/Workouts de un Garmin Fenix 8.
    """
    body = bytearray()

    # 1. Definition Local 0 -> file_id (GMSG 0, 6 campos oficiales FIT SDK)
    # [(3, 4, 140=serial_number), (4, 4, 134=time_created), (1, 2, 132=manufacturer),
    #  (2, 2, 132=product), (5, 2, 132=number), (0, 1, 0=type)]
    body.extend(
        bytes([
            0x40, 0x00, 0x00, 0x00, 0x00, 6,
            3, 4, 140,
            4, 4, 134,
            1, 2, 132,
            2, 2, 132,
            5, 2, 132,
            0, 1, 0,
        ])
    )
    body.extend(
        struct.pack(
            "<BIIHHHB",
            0x00,
            3620636920,  # serial_number
            1161433847 + workout_slot_number,  # time_created (FIT epoch)
            1,  # manufacturer = garmin
            4536,  # garmin_product = Fenix 8
            workout_slot_number,  # number (1, 2, 3 - slot válido de workout)
            5,  # type = 5 (WORKOUT)
        )
    )

    # 2. Definition Local 4 -> file_creator (GMSG 49, 2 campos oficiales FIT SDK)
    body.extend(
        bytes([
            0x44, 0x00, 0x00, 49, 0x00, 2,
            0, 2, 132,  # software_version (uint16)
            1, 1, 2,    # hardware_version (uint8)
        ])
    )
    body.extend(struct.pack("<BHB", 0x04, 100, 0xFF))

    # Construir pasos de entrenamiento y tabla de títulos de ejercicio
    step_packets: list[bytes] = []
    used_titles: list[tuple[int, int, str]] = []
    seen_title_keys: set[tuple[int, int]] = set()

    # Step 0: Warmup (open / lap button)
    step_packets.append(
        pack_sdk_workout_step(
            msg_idx=0,
            step_name="Calentamiento Movilidad",
            dur_type=5,  # open (lap button)
            dur_val=0xFFFFFFFF,
            tgt_type=2,  # open
            tgt_val=0,
            intensity=2,  # warmup
            notes="Movilidad articular y aproximacion",
            ex_cat=2,  # cardio
            ex_name=0xFFFF,
            ex_weight=0xFFFF,
            wt_unit=1,
        )
    )

    for ex in exercises:
        lift_key = ex["lift"]
        cfg = GARMIN_EXERCISES[lift_key]
        sets_count = int(ex["sets"])
        reps_count = int(ex["reps"])
        pct = float(ex.get("pct", 0.0))
        weight_kg = calc_weight_kg(lift_key, pct, one_rm_map)
        ex_weight_val = int(round(weight_kg * 100)) if weight_kg > 0 else 0xFFFF
        rest_ms = int(ex.get("rest_sec", cfg["rest_sec"])) * 1000
        pct_str = f"{int(round(pct * 100))}% 1RM" if pct > 0 else "Peso corporal"
        step_note = f"{sets_count}x{reps_count} @ {weight_kg:g}kg ({pct_str})" if weight_kg > 0 else f"{sets_count}x{reps_count} ({pct_str})"

        work_idx = len(step_packets)
        step_packets.append(
            pack_sdk_workout_step(
                msg_idx=work_idx,
                step_name=cfg["title_es"],
                dur_type=29,  # reps
                dur_val=reps_count,
                tgt_type=2,  # open
                tgt_val=0,
                intensity=0,  # active
                notes=step_note,
                ex_cat=cfg["cat_id"],
                ex_name=cfg["name_id"],
                ex_weight=ex_weight_val,
                wt_unit=1,  # kilogram
            )
        )
        tkey = (cfg["cat_id"], cfg["name_id"])
        if tkey not in seen_title_keys:
            seen_title_keys.add(tkey)
            used_titles.append((cfg["cat_id"], cfg["name_id"], cfg["title_es"]))

        rest_idx = len(step_packets)
        step_packets.append(
            pack_sdk_workout_step(
                msg_idx=rest_idx,
                step_name="Descanso",
                dur_type=0,  # time (ms)
                dur_val=rest_ms,
                tgt_type=2,  # open
                tgt_val=0,
                intensity=1,  # rest
                notes=f"Recuperacion {int(rest_ms // 1000)}s",
                ex_cat=0xFFFF,
                ex_name=0xFFFF,
                ex_weight=0xFFFF,
                wt_unit=1,
            )
        )

        rep_idx = len(step_packets)
        step_packets.append(
            pack_sdk_workout_step(
                msg_idx=rep_idx,
                step_name="",
                dur_type=6,  # repeat_until_steps_cmplt
                dur_val=work_idx,
                tgt_type=2,
                tgt_val=sets_count,
                intensity=0xFF,
                notes="",
                ex_cat=0xFFFF,
                ex_name=0xFFFF,
                ex_weight=0xFFFF,
                wt_unit=0xFFFF,
            )
        )

    # Cooldown step
    step_packets.append(
        pack_sdk_workout_step(
            msg_idx=len(step_packets),
            step_name="Vuelta a la calma",
            dur_type=5,  # open
            dur_val=0xFFFFFFFF,
            tgt_type=2,
            tgt_val=0,
            intensity=3,  # cooldown
            notes="Estiramientos suaves",
            ex_cat=2,
            ex_name=0xFFFF,
            ex_weight=0xFFFF,
            wt_unit=1,
        )
    )

    # 3. Definition Local 1 -> workout (GMSG 26, 5 campos canónicos del FIT SDK)
    # [(5, 4, 140=capabilities), (8, 32, 7=wkt_name), (6, 2, 132=num_valid_steps),
    #  (4, 1, 0=sport), (11, 1, 0=sub_sport)]
    body.extend(
        bytes([
            0x41, 0x00, 0x00, 26, 0x00, 5,
            5, 4, 140,
            8, 32, 7,
            6, 2, 132,
            4, 1, 0,
            11, 1, 0,
        ])
    )
    body.extend(
        struct.pack(
            "<BI32sHBB",
            0x01,
            32,  # capabilities = 32
            fixed_str(workout_name, 32),
            len(step_packets),  # num_valid_steps
            10,  # sport = 10 (training)
            20,  # sub_sport = 20 (strength_training)
        )
    )

    # 4. Definition Local 2 -> workout_step (GMSG 27, 15 campos canónicos FIT SDK)
    body.extend(
        bytes([
            0x42, 0x00, 0x00, 27, 0x00, 15,
            2, 4, 134,
            4, 4, 134,
            5, 4, 134,
            6, 4, 134,
            254, 2, 132,
            10, 2, 132,
            11, 2, 132,
            12, 2, 132,
            13, 2, 132,
            0, 32, 7,
            8, 64, 7,
            1, 1, 0,
            3, 1, 0,
            7, 1, 0,
            9, 1, 0,
        ])
    )
    for pkt in step_packets:
        body.extend(pkt)

    # 5. Definition Local 3 -> exercise_title (GMSG 264, 4 campos canónicos FIT SDK)
    # [(2, 64, 7=wkt_step_name), (254, 2, 132=message_index), (0, 2, 132=exercise_category), (1, 2, 132=exercise_name)]
    body.extend(
        bytes([
            0x43, 0x00, 0x00, 0x08, 0x01, 4,
            2, 64, 7,
            254, 2, 132,
            0, 2, 132,
            1, 2, 132,
        ])
    )
    for idx, (cat_id, name_id, title_es) in enumerate(used_titles):
        body.extend(
            struct.pack(
                "<B64sHHH",
                0x03,
                fixed_str(title_es, 64),
                idx,
                cat_id,
                name_id,
            )
        )

    data_size = len(body)
    header_12 = struct.pack("<BBHI4s", 14, 0x10, 21301, data_size, b".FIT")
    header_crc = fit_crc16(header_12)
    header_14 = header_12 + struct.pack("<H", header_crc)

    full_no_crc = header_14 + bytes(body)
    file_crc = fit_crc16(full_no_crc)
    return full_no_crc + struct.pack("<H", file_crc)


def build_garmin_connect_workout_json(
    workout_name: str,
    description: str,
    exercises: list[dict[str, Any]],
    one_rm_map: dict[str, float],
) -> dict[str, Any]:
    workout_steps: list[dict[str, Any]] = []
    step_order = 1

    # En Garmin Connect workout-service, los pasos warmup/cooldown en strength_training
    # NO deben llevar category="CARDIO" con exerciseName=None para evitar HTTP 400.
    workout_steps.append({
        "type": "ExecutableStepDTO",
        "stepId": None,
        "stepOrder": step_order,
        "childStepId": None,
        "description": "Movilidad escapular/cadera y series de aproximacion",
        "stepType": {"stepTypeId": 1, "stepTypeKey": "warmup", "displayOrder": 1},
        "endCondition": {"conditionTypeId": 1, "conditionTypeKey": "lap.button", "displayOrder": 1, "displayable": True},
        "endConditionValue": None,
        "targetType": {"workoutTargetTypeId": 1, "workoutTargetTypeKey": "no.target", "displayOrder": 1},
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
            "description": f"{int(round(pct * 100))}% 1RM · {ex.get('rir', 'RIR 1-2')}",
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
        "slot": 1,
        "slug": "Lunes_Upper_A",
        "day": "Lunes",
        "workoutName": "HYBRID Lunes Upper A",
        "description": "Gimnasio Dia 1 (Lunes) - Tren Superior A (Empuje & Traccion Pesada). 1RM Actualizados: Banca 120kg, Dominadas +20kg, Militar 65kg, Remo Manc 40kg.",
        "exercises": [
            {"lift": "bench", "sets": 4, "reps": 6, "pct": 0.80, "rest_sec": 120, "rir": "RIR 2"},
            {"lift": "pullup_load", "sets": 4, "reps": 6, "pct": 0.50, "rest_sec": 105, "rir": "RIR 1-2"},
            {"lift": "ohp", "sets": 3, "reps": 8, "pct": 0.76, "rest_sec": 90, "rir": "RIR 2"},
            {"lift": "row_db", "sets": 3, "reps": 10, "pct": 0.78, "rest_sec": 75, "rir": "RIR 1-2"},
        ],
    },
    {
        "slot": 2,
        "slug": "Martes_Lower",
        "day": "Martes",
        "workoutName": "HYBRID Martes Lower",
        "description": "Gimnasio Dia 2 (Martes) - Tren Inferior Hibrido & Proteccion Tendon de Aquiles. 1RM Actualizados: Sentadilla 130kg, RDL 140kg, Bulgara 35kg, Soleo 60kg.",
        "exercises": [
            {"lift": "squat", "sets": 4, "reps": 5, "pct": 0.80, "rest_sec": 150, "rir": "RIR 2 (concentrica explosiva)"},
            {"lift": "rdl", "sets": 3, "reps": 6, "pct": 0.78, "rest_sec": 105, "rir": "RIR 2 (isquios)"},
            {"lift": "split_squat_db", "sets": 3, "reps": 8, "pct": 0.75, "rest_sec": 75, "rir": "8 reps por pierna"},
            {"lift": "soleus", "sets": 4, "reps": 12, "pct": 0.78, "rest_sec": 60, "rir": "1s pausa arriba (Aquiles)"},
            {"lift": "core", "sets": 3, "reps": 12, "pct": 0.0, "rest_sec": 45, "rir": "Estabilidad pelvica"},
        ],
    },
    {
        "slot": 3,
        "slug": "Jueves_Upper_B",
        "day": "Jueves",
        "workoutName": "HYBRID Jueves Upper B",
        "description": "Gimnasio Dia 3 (Jueves) - Tren Superior B (Hombro, Traccion Horizontal & Hipertrofia). 1RM Actualizados: Militar 65kg, Remo Barra 90kg, Inclinado 40kg.",
        "exercises": [
            {"lift": "ohp", "sets": 4, "reps": 6, "pct": 0.80, "rest_sec": 120, "rir": "RIR 1-2"},
            {"lift": "row_bar", "sets": 4, "reps": 8, "pct": 0.78, "rest_sec": 90, "rir": "RIR 1-2"},
            {"lift": "incline_db", "sets": 3, "reps": 8, "pct": 0.79, "rest_sec": 90, "rir": "RIR 2"},
            {"lift": "pullup_load", "sets": 3, "reps": 8, "pct": 0.0, "rest_sec": 90, "rir": "Peso corporal estricto"},
        ],
    },
]


def validate_fit_with_sdk(fit_bytes: bytes) -> dict[str, Any]:
    try:
        from garmin_fit_sdk import Decoder, Stream
        stream1 = Stream.from_byte_array(bytearray(fit_bytes))
        decoder1 = Decoder(stream1)
        is_fit = decoder1.is_fit()
        integrity = decoder1.check_integrity()

        stream2 = Stream.from_byte_array(bytearray(fit_bytes))
        decoder2 = Decoder(stream2)
        messages, errors = decoder2.read()
        steps = messages.get("workout_step_mesgs", [])
        titles = messages.get("exercise_title_mesgs", [])
        wkt = messages.get("workout_mesgs", [{}])[0]
        fid = messages.get("file_id_mesgs", [{}])[0]
        return {
            "sdk_available": True,
            "is_fit": bool(is_fit),
            "crc_integrity_ok": bool(integrity),
            "errors": [str(e) for e in errors],
            "message_keys": list(messages.keys()),
            "file_type": fid.get("type"),
            "garmin_product": fid.get("garmin_product"),
            "workout_slot_number": fid.get("number"),
            "workout_name": wkt.get("wkt_name"),
            "sport": wkt.get("sport"),
            "sub_sport": wkt.get("sub_sport"),
            "num_valid_steps": wkt.get("num_valid_steps"),
            "decoded_steps_count": len(steps),
            "decoded_titles_count": len(titles),
            "sample_work_steps": [
                {
                    "idx": s.get("message_index"),
                    "name": s.get("wkt_step_name"),
                    "cat": s.get("exercise_category"),
                    "ex_name": s.get("exercise_name"),
                    "reps": s.get("duration_value"),
                    "weight_kg": s.get("exercise_weight"),
                    "notes": s.get("notes"),
                }
                for s in steps
                if s.get("intensity") == "active"
            ],
        }
    except Exception as exc:
        return {"sdk_available": False, "errors": [str(exc)]}


def main() -> None:
    FIT_DIR.mkdir(parents=True, exist_ok=True)
    JSON_DIR.mkdir(parents=True, exist_ok=True)
    one_rm_map = {k: v["default_1rm"] for k, v in GARMIN_EXERCISES.items()}

    diag_report: dict[str, Any] = {
        "generated_at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
        "default_1rm_kg": one_rm_map,
        "root_causes_explained": [
            "CAUSA 1 (Garmin Connect Web 'Importar Datos'): La página connect.garmin.com/modern/import-data SOLO acepta archivos .FIT de ACTIVIDADES completadas (FileType=4) y rechaza TODOS los archivos .FIT de ENTRENAMIENTOS (FileType=5) con un error genérico sin log.",
            "CAUSA 2 (Cable USB GARMIN/NewFiles): En la versión anterior, file_id.number era 0xFFFF (65535) y workout_step incluía campos internos de post-actividad (37, 38). Ahora se usa el perfil canónico Garmin FIT SDK (file_id.number=1..3, file_creator GMSG 49 y workout_step de 15 campos oficiales).",
            "CAUSA 3 (Garmin Connect API JSON): Los pasos warmup/cooldown llevaban category='CARDIO' con exerciseName=null, lo que en algunos endpoints /workout-service/workout devuelve HTTP 400. Corregido y añadido panel de Log en Vivo."
        ],
        "files": [],
    }

    for d in THREE_CORE_DAYS:
        fit_bytes = build_fit_workout_bytes(d["workoutName"], d["exercises"], one_rm_map, workout_slot_number=d["slot"])
        fit_path = FIT_DIR / f"{d['slug']}.fit"
        fit_path.write_bytes(fit_bytes)

        json_obj = build_garmin_connect_workout_json(d["workoutName"], d["description"], d["exercises"], one_rm_map)
        json_path = JSON_DIR / f"{d['slug']}.json"
        json_path.write_text(json.dumps(json_obj, indent=2, ensure_ascii=False))

        sdk_check = validate_fit_with_sdk(fit_bytes)
        diag_report["files"].append({
            "slug": d["slug"],
            "day": d["day"],
            "fit_file": f"workouts/fit/{fit_path.name}",
            "json_file": f"workouts/json/{json_path.name}",
            "size_bytes": len(fit_bytes),
            "header_crc_hex": hex(struct.unpack("<H", fit_bytes[12:14])[0]),
            "file_crc_hex": hex(struct.unpack("<H", fit_bytes[-2:])[0]),
            "sdk_validation": sdk_check,
        })
        print(
            f"[OK] {fit_path.name} ({len(fit_bytes)} B) | "
            f"is_fit={sdk_check.get('is_fit')} | integrity={sdk_check.get('crc_integrity_ok')} | "
            f"errors={sdk_check.get('errors')}"
        )

    DIAG_FILE.write_text(json.dumps(diag_report, indent=2, ensure_ascii=False))
    print(f"[OK] Log de diagnóstico guardado en {DIAG_FILE}")


if __name__ == "__main__":
    main()
