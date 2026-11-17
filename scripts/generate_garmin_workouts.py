#!/usr/bin/env python3
"""
Generador Oficial de Entrenamientos de Fuerza para Reloj Garmin Fenix 8 (.FIT binario y .JSON Garmin Connect).
Utiliza EXACTAMENTE el mismo esquema binario de definiciones (GMSG 0 de 7 campos, GMSG 26 de 21 campos,
GMSG 27 de 30 campos y GMSG 264 de 5 campos) extraído de los entrenamientos 'WE ARE BACK!'
del reloj Garmin Fenix 8 del atleta (garmin_product=4536).
"""

from __future__ import annotations

import json
import struct
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
FIT_DIR = REPO_ROOT / "workouts" / "fit"
JSON_DIR = REPO_ROOT / "workouts" / "json"

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
        "title_es": "Press de banca Inclinada con mancuernas",
        "rest_sec": 90,
        "step": 1.0,
        "default_1rm": 38.0,
    },
    "squat": {
        "cat_id": 28,
        "name_id": 6,
        "category_key": "SQUAT",
        "exercise_key": "BARBELL_BACK_SQUAT",
        "title_es": "Sentadilla trasera",
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
        "title_es": "Press militar",
        "rest_sec": 105,
        "step": 2.5,
        "default_1rm": 62.5,
    },
    "row_db": {
        "cat_id": 23,
        "name_id": 2,
        "category_key": "ROW",
        "exercise_key": "DUMBBELL_ROW",
        "title_es": "Remo con mancuernas",
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
        "title_es": "Sentadilla búlgara con mancuerna y pie anterior elevado",
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
        "title_es": "Levantamiento de gemelos sentado",
        "rest_sec": 60,
        "step": 2.5,
        "default_1rm": 50.0,
    },
    "core": {
        "cat_id": 5,
        "name_id": 6,
        "category_key": "CORE",
        "exercise_key": "CABLE_CORE_PRESS",
        "title_es": "Press de tronco con polea",
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


def pack_fenix8_step(
    msg_idx: int,
    dur_type: int,
    dur_val: int,
    tgt_type: int,
    tgt_val: int,
    intensity: int,
    ex_cat: int,
    ex_name: int,
    ex_weight: int,
    wt_unit: int,
    f18: int,
    sec_tgt_type: int,
    sec_tgt_val: int,
) -> bytes:
    """
    Empaqueta los 30 campos exactos de GMSG 27 (workout_step) tal como los espera el Garmin Fenix 8:
    [(2, 4, 134), (4, 4, 134), (5, 4, 134), (6, 4, 134), (8, 200, 7), (20, 4, 134), (21, 4, 134), (22, 4, 134),
     (37, 4, 0), (38, 4, 140), (254, 2, 132), (10, 2, 132), (11, 2, 132), (12, 2, 132), (13, 2, 132),
     (27, 2, 132), (31, 2, 132), (0, 25, 7), (1, 1, 0), (3, 1, 0), (7, 1, 0), (9, 1, 0), (17, 1, 0),
     (18, 1, 0), (19, 1, 0), (26, 1, 2), (28, 37, 7), (30, 1, 0), (35, 1, 2), (36, 1, 0)]
    """
    return struct.pack(
        "<BIIII200sIIIIIHHHHHHH25sBBBBBBBB37sBBB",
        0x02,  # record header local msg 2
        dur_val,  # 2: duration_value (uint32)
        tgt_val,  # 4: target_value (uint32)
        0xFFFFFFFF,  # 5: custom_target_value_low
        0xFFFFFFFF,  # 6: custom_target_value_high
        b"\x00" * 200,  # 8: notes (200 bytes empty, clean like Fenix 8 WE ARE BACK!)
        sec_tgt_val,  # 20: secondary_target_value (uint32)
        0xFFFFFFFF,  # 21: secondary_custom_target_value_low
        0xFFFFFFFF,  # 22: secondary_custom_target_value_high
        0xFFFFFFFF,  # 37
        0,  # 38
        msg_idx,  # 254: message_index (uint16)
        ex_cat,  # 10: exercise_category (uint16)
        ex_name,  # 11: exercise_name (uint16)
        ex_weight,  # 12: exercise_weight (uint16, scale 100)
        wt_unit,  # 13: weight_display_unit (uint16, 1=kg)
        0xFFFF,  # 27
        0xFFFF,  # 31
        b"\x00" * 25,  # 0: wkt_step_name (25 bytes empty, resolved via GMSG 264)
        dur_type,  # 1: duration_type
        tgt_type,  # 3: target_type
        intensity,  # 7: intensity
        0xFF,  # 9: equipment
        0xFF,  # 17
        f18,  # 18: repeat flag (0 on repeat steps, 255 otherwise)
        sec_tgt_type,  # 19: secondary_target_type (2 on rest steps, 255 otherwise)
        0xFF,  # 26
        b"\x00" * 37,  # 28
        0xFF,  # 30
        0xFF,  # 35
        0xFF,  # 36
    )


def build_fit_workout_bytes(workout_name: str, exercises: list[dict[str, Any]], one_rm_map: dict[str, float]) -> bytes:
    """
    Codifica un archivo .FIT de entrenamiento (FileType=5 WORKOUT) con las definiciones
    exactas del reloj Garmin Fenix 8 del usuario (idéntico a 'WE ARE BACK!').
    """
    body = bytearray()

    # 1. Definition Local 0 -> file_id (GMSG 0, 7 campos exactos de Fenix 8)
    # [(3, 4, 140), (4, 4, 134), (7, 4, 134), (1, 2, 132), (2, 2, 132), (5, 2, 132), (0, 1, 0)]
    body.extend(
        bytes([
            0x40, 0x00, 0x00, 0x00, 0x00, 7,
            3, 4, 140,
            4, 4, 134,
            7, 4, 134,
            1, 2, 132,
            2, 2, 132,
            5, 2, 132,
            0, 1, 0,
        ])
    )
    body.extend(struct.pack("<BIIIHHHB", 0x00, 3620636920, 1161433847, 0xFFFFFFFF, 1, 4536, 0xFFFF, 5))

    # Construir pasos de entrenamiento y tabla de títulos de ejercicio
    step_packets: list[bytes] = []
    used_titles: list[tuple[int, int, str]] = []
    seen_title_keys: set[tuple[int, int]] = set()

    # Step 0: Warmup
    step_packets.append(
        pack_fenix8_step(
            msg_idx=0,
            dur_type=5,
            dur_val=0xFFFFFFFF,
            tgt_type=2,
            tgt_val=0,
            intensity=2,
            ex_cat=2,
            ex_name=0xFFFF,
            ex_weight=0xFFFF,
            wt_unit=1,
            f18=0xFF,
            sec_tgt_type=0xFF,
            sec_tgt_val=0,
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

        work_idx = len(step_packets)
        step_packets.append(
            pack_fenix8_step(
                msg_idx=work_idx,
                dur_type=29,  # reps
                dur_val=reps_count,
                tgt_type=2,
                tgt_val=0,
                intensity=0,  # active
                ex_cat=cfg["cat_id"],
                ex_name=cfg["name_id"],
                ex_weight=ex_weight_val,
                wt_unit=1,  # kilogram
                f18=0xFF,
                sec_tgt_type=0xFF,
                sec_tgt_val=0,
            )
        )
        tkey = (cfg["cat_id"], cfg["name_id"])
        if tkey not in seen_title_keys:
            seen_title_keys.add(tkey)
            used_titles.append((cfg["cat_id"], cfg["name_id"], cfg["title_es"]))

        rest_idx = len(step_packets)
        step_packets.append(
            pack_fenix8_step(
                msg_idx=rest_idx,
                dur_type=0,  # time (ms)
                dur_val=rest_ms,
                tgt_type=2,
                tgt_val=0,
                intensity=1,  # rest
                ex_cat=0xFFFF,
                ex_name=0xFFFF,
                ex_weight=0xFFFF,
                wt_unit=1,
                f18=0xFF,
                sec_tgt_type=2,
                sec_tgt_val=0,
            )
        )

        rep_idx = len(step_packets)
        step_packets.append(
            pack_fenix8_step(
                msg_idx=rep_idx,
                dur_type=6,  # repeat_until_steps_cmplt
                dur_val=work_idx,
                tgt_type=0xFF,
                tgt_val=sets_count,
                intensity=0xFF,
                ex_cat=0xFFFF,
                ex_name=0xFFFF,
                ex_weight=0xFFFF,
                wt_unit=0xFFFF,
                f18=0,  # smart_repeat = 0
                sec_tgt_type=0xFF,
                sec_tgt_val=0xFFFFFFFF,
            )
        )

    # Cooldown step
    step_packets.append(
        pack_fenix8_step(
            msg_idx=len(step_packets),
            dur_type=5,
            dur_val=0xFFFFFFFF,
            tgt_type=2,
            tgt_val=0,
            intensity=3,  # cooldown
            ex_cat=2,
            ex_name=0xFFFF,
            ex_weight=0xFFFF,
            wt_unit=1,
            f18=0xFF,
            sec_tgt_type=0xFF,
            sec_tgt_val=0,
        )
    )
    if (2, 0xFFFF) not in seen_title_keys:
        used_titles.append((2, 0xFFFF, "Cardio"))

    # 2. Definition Local 1 -> workout (GMSG 26, 21 campos exactos de Fenix 8)
    # [(5, 4, 140), (8, 32, 7), (10, 4, 134), (16, 16, 13), (17, 160, 7), (21, 4, 134), (22, 4, 134),
    #  (6, 2, 132), (7, 2, 132), (12, 2, 132), (14, 2, 132), (20, 2, 132), (4, 1, 0), (9, 1, 0),
    #  (11, 1, 0), (13, 1, 0), (15, 1, 0), (18, 37, 7), (19, 1, 0), (23, 1, 0), (24, 1, 0)]
    body.extend(
        bytes([
            0x41, 0x00, 0x00, 26, 0x00, 21,
            5, 4, 140,
            8, 32, 7,
            10, 4, 134,
            16, 16, 13,
            17, 160, 7,
            21, 4, 134,
            22, 4, 134,
            6, 2, 132,
            7, 2, 132,
            12, 2, 132,
            14, 2, 132,
            20, 2, 132,
            4, 1, 0,
            9, 1, 0,
            11, 1, 0,
            13, 1, 0,
            15, 1, 0,
            18, 37, 7,
            19, 1, 0,
            23, 1, 0,
            24, 1, 0,
        ])
    )
    body.extend(
        struct.pack(
            "<BI32sI16s160sIIHHHHHBBBBB37sBBB",
            0x01,
            32,  # 5: capabilities
            fixed_str(workout_name, 32),  # 8: wkt_name (ASCII clean)
            0,  # 10
            b"\xff" * 16,  # 16
            b"\x00" * 160,  # 17: wkt_description
            0,  # 21
            0,  # 22
            len(step_packets),  # 6: num_valid_steps
            0xFFFF,  # 7
            0xFFFF,  # 12
            0xFFFF,  # 14
            0xFFFF,  # 20
            10,  # 4: sport = training
            1,  # 9
            20,  # 11: sub_sport = strength_training
            0xFF,  # 13
            0xFF,  # 15
            b"\x00" * 37,  # 18
            0xFF,  # 19
            0,  # 23
            0,  # 24
        )
    )

    # 3. Definition Local 2 -> workout_step (GMSG 27, 30 campos exactos de Fenix 8)
    body.extend(
        bytes([
            0x42, 0x00, 0x00, 27, 0x00, 30,
            2, 4, 134,
            4, 4, 134,
            5, 4, 134,
            6, 4, 134,
            8, 200, 7,
            20, 4, 134,
            21, 4, 134,
            22, 4, 134,
            37, 4, 0,
            38, 4, 140,
            254, 2, 132,
            10, 2, 132,
            11, 2, 132,
            12, 2, 132,
            13, 2, 132,
            27, 2, 132,
            31, 2, 132,
            0, 25, 7,
            1, 1, 0,
            3, 1, 0,
            7, 1, 0,
            9, 1, 0,
            17, 1, 0,
            18, 1, 0,
            19, 1, 0,
            26, 1, 2,
            28, 37, 7,
            30, 1, 0,
            35, 1, 2,
            36, 1, 0,
        ])
    )
    for pkt in step_packets:
        body.extend(pkt)

    # 4. Definition Local 3 -> exercise_title (GMSG 264, 5 campos exactos de Fenix 8)
    # [(2, 200, 7), (254, 2, 132), (0, 2, 132), (1, 2, 132), (3, 2, 132)]
    body.extend(
        bytes([
            0x43, 0x00, 0x00, 0x08, 0x01, 5,
            2, 200, 7,
            254, 2, 132,
            0, 2, 132,
            1, 2, 132,
            3, 2, 132,
        ])
    )
    for idx, (cat_id, name_id, title_es) in enumerate(used_titles):
        body.extend(
            struct.pack(
                "<B200sHHHH",
                0x03,
                fixed_str(title_es, 200),
                idx,
                cat_id,
                name_id,
                0xFFFF,
            )
        )

    data_size = len(body)
    header_12 = struct.pack("<BBHI4s", 14, 0x10, 21301, data_size, b".FIT")
    header_crc = fit_crc16(header_12)
    header_14 = header_12 + struct.pack("<H", header_crc)

    full_no_crc = header_14 + bytes(body)
    file_crc = fit_crc16(full_no_crc)
    return full_no_crc + struct.pack("<H", file_crc)


def build_garmin_connect_workout_json(workout_name: str, description: str, exercises: list[dict[str, Any]], one_rm_map: dict[str, float]) -> dict[str, Any]:
    workout_steps: list[dict[str, Any]] = []
    step_order = 1

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
        "workoutName": "HYBRID Lunes Upper A",
        "description": "Gimnasio Dia 1 (Lunes) - Tren Superior A (Empuje & Traccion Pesada). Generado por Garmin Hybrid Coach.",
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
        "workoutName": "HYBRID Martes Lower",
        "description": "Gimnasio Dia 2 (Martes) - Tren Inferior Hibrido & Proteccion Tendon de Aquiles. 72h antes de las series del viernes.",
        "exercises": [
            {"lift": "squat", "sets": 4, "reps": 5, "pct": 0.80, "rest_sec": 150, "rir": "RIR 2 (concentrica explosiva)"},
            {"lift": "rdl", "sets": 3, "reps": 6, "pct": 0.78, "rest_sec": 105, "rir": "RIR 2 (isquios)"},
            {"lift": "split_squat_db", "sets": 3, "reps": 8, "pct": 0.75, "rest_sec": 75, "rir": "8 reps por pierna"},
            {"lift": "soleus", "sets": 4, "reps": 12, "pct": 0.78, "rest_sec": 60, "rir": "1s pausa arriba (Aquiles)"},
            {"lift": "core", "sets": 3, "reps": 12, "pct": 0.0, "rest_sec": 45, "rir": "Estabilidad pelvica"},
        ],
    },
    {
        "slug": "Jueves_Upper_B",
        "day": "Jueves",
        "workoutName": "HYBRID Jueves Upper B",
        "description": "Gimnasio Dia 3 (Jueves) - Tren Superior B (Hombro, Traccion Horizontal & Hipertrofia Funcional). Piernas frescas para el viernes.",
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
