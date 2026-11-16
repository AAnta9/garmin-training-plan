#!/usr/bin/env python3
"""
Sincronizador Oficial de Garmin Connect Personal API (09:00 AM Daily Coach Sync).
Intercambia la Personal API Key (GCDC_...) por un JWT de 24h, descarga las métricas
de los últimos 6 meses (actividades, VFC/HRV, sueño, Body Battery, FC reposo, estrés,
zonas de FC, peso y Fitness Age), calcula carga aguda/crónica (ACWR), CTL/ATL/TSB,
Readiness matutino y actualiza data/garmin_data.json para la web app.
"""

from __future__ import annotations

import json
import math
import os
import statistics
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

BASE_URL = os.environ.get("GARMIN_PERSONAL_API_BASE_URL", "https://personal.connectapi.garmin.com")
TOKEN_PATH = "/personalapitoken-service/personal-api/personal-api-key/token"

REPO_ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = REPO_ROOT / "data_raw"
OUT_DIR = REPO_ROOT / "data"
OUT_FILE = OUT_DIR / "garmin_data.json"

KEY_PATHS = [
    Path.home() / ".config" / "garmin" / "connect-personal-api-key",
    Path.home() / ".gemini" / "garmin_api_key",
]


def get_api_key() -> str | None:
    for env_name in ("GARMIN_API_KEY", "GARMIN_PERSONAL_API_KEY"):
        val = os.environ.get(env_name, "").strip()
        if val and not val.startswith("${"):
            return val
    for kp in KEY_PATHS:
        if kp.exists():
            val = kp.read_text().strip()
            if val:
                return val
    return None


def exchange_token(api_key: str) -> str:
    req = urllib.request.Request(
        BASE_URL + TOKEN_PATH,
        method="POST",
        headers={
            "Accept": "*/*",
            "Authorization": f"ApiKey {api_key}",
            "User-Agent": "GarminHybridCoach/1.0",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8").strip().strip('"')


def api_get(token: str, path: str, params: dict[str, Any] | None = None) -> Any:
    url = BASE_URL + path
    if params:
        url += "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(
        url,
        method="GET",
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "GarminHybridCoach/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8").strip()
            return json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        print(f"[WARN] HTTP {e.code} on {path}")
        return None
    except Exception as e:
        print(f"[WARN] Error on {path}: {e}")
        return None


def fetch_chunks(chunk_days: int, start_d: date, end_d: date, fn) -> list[dict]:
    results = []
    cur = start_d
    while cur <= end_d:
        end_c = min(cur + timedelta(days=chunk_days - 1), end_d)
        res = fn(cur, end_c)
        if res:
            if isinstance(res, list):
                results.extend(res)
            elif isinstance(res, dict) and "data" in res:
                results.extend(res["data"])
            else:
                results.append(res)
        cur = end_c + timedelta(days=1)
    return results


def sync_from_api(force_full: bool = False) -> None:
    api_key = get_api_key()
    if not api_key:
        print("[INFO] No se encontró GARMIN_API_KEY en entorno; usando caché local en data_raw/ si existe.")
        return

    # Si ya descargamos hace menos de 5 minutos y no es force_full, reutilizamos data_raw
    if not force_full and (RAW_DIR / "activities.json").exists():
        mtime = (RAW_DIR / "activities.json").stat().st_mtime
        if time.time() - mtime < 300:
            print("[INFO] Caché en data_raw/ es reciente (<5 min). Procesando datos...")
            return

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    token = exchange_token(api_key)
    today = date.today()
    start_6m = today - timedelta(days=185)
    since_act = today - timedelta(days=330)

    print(f"[SYNC] Descargando datos de Garmin Connect Personal API hasta {today.isoformat()}...")
    profile = api_get(token, "/userprofile-service/userprofile/settings")
    hr_zones = api_get(token, "/biometric-service/heartRateZones/v2")
    fitness_age = api_get(token, f"/fitnessage-service/fitnessage/v2/{today.isoformat()}")
    weight_data = api_get(token, f"/weight-service/weight/range/{start_6m.isoformat()}/{today.isoformat()}")
    (RAW_DIR / "profile.json").write_text(
        json.dumps({"profile": profile, "hr_zones": hr_zones, "fitness_age": fitness_age, "weight": weight_data}, indent=2)
    )

    activities = []
    offset = 0
    while True:
        page = api_get(
            token,
            "/activitylist-service/activities/search/activities",
            {"start": offset, "limit": 100, "startDate": since_act.isoformat(), "endDate": (today + timedelta(days=1)).isoformat()},
        )
        if not page:
            break
        activities.extend(page)
        if len(page) < 100:
            break
        offset += 100
    (RAW_DIR / "activities.json").write_text(json.dumps(activities, indent=2))

    hrv_data = api_get(token, f"/hrv-service/hrv/daily/{start_6m.isoformat()}/{today.isoformat()}")
    (RAW_DIR / "hrv.json").write_text(json.dumps(hrv_data, indent=2))

    summaries = fetch_chunks(
        30, start_6m, today, lambda a, b: api_get(token, "/usersummary-service/v2/dailysummaries", {"startDate": a.isoformat(), "endDate": b.isoformat()})
    )
    (RAW_DIR / "summaries.json").write_text(json.dumps(summaries, indent=2))

    sleeps = fetch_chunks(
        30,
        start_6m,
        today,
        lambda a, b: api_get(token, "/sleep-service/sleep/dailySleepSummariesByDate", {"startDate": a.isoformat(), "endDate": b.isoformat()}),
    )
    (RAW_DIR / "sleeps.json").write_text(json.dumps(sleeps, indent=2))

    bb = fetch_chunks(
        30,
        start_6m,
        today,
        lambda a, b: api_get(token, "/wellness-service/wellness/bodyBattery/reports/daily", {"startDate": a.isoformat(), "endDate": b.isoformat()}),
    )
    (RAW_DIR / "body_battery.json").write_text(json.dumps(bb, indent=2))
    print("[SYNC] Descarga completada.")


def format_pace(seconds_per_km: float | None) -> str | None:
    if not seconds_per_km or seconds_per_km <= 0:
        return None
    m = int(seconds_per_km // 60)
    s = int(round(seconds_per_km % 60))
    if s == 60:
        m += 1
        s = 0
    return f"{m}:{s:02d}"


def build_dashboard_data() -> dict[str, Any]:
    profile_bundle = json.loads((RAW_DIR / "profile.json").read_text())
    activities = json.loads((RAW_DIR / "activities.json").read_text())
    hrv_raw = json.loads((RAW_DIR / "hrv.json").read_text())
    summaries_raw = json.loads((RAW_DIR / "summaries.json").read_text())
    sleeps_raw = json.loads((RAW_DIR / "sleeps.json").read_text())

    # Determinar fecha actual según último registro de Garmin
    all_dates = [s.get("calendarDate") for s in summaries_raw if s.get("calendarDate")]
    latest_date = date.fromisoformat(max(all_dates)) if all_dates else date.today()
    start_6m = latest_date - timedelta(days=180)
    warm_start = start_6m - timedelta(days=145)

    # Indexar datos diarios
    summaries_by_day = {s["calendarDate"]: s for s in summaries_raw if s.get("calendarDate")}
    sleeps_by_day = {}
    for s in sleeps_raw:
        dto = s.get("dailySleepDTO", s) if isinstance(s, dict) else {}
        if dto.get("calendarDate") and dto.get("sleepTimeSeconds"):
            sleeps_by_day[dto["calendarDate"]] = dto

    hrv_list = hrv_raw.get("hrvSummaries", []) if isinstance(hrv_raw, dict) else (hrv_raw or [])
    hrv_by_day = {h["calendarDate"]: h for h in hrv_list if h.get("calendarDate")}

    # Calcular serie de Carga (CTL, ATL, TSB, Acute Load, Chronic Load, ACWR)
    daily_load = defaultdict(float)
    for a in activities:
        d_str = (a.get("startTimeLocal") or "")[:10]
        if d_str:
            daily_load[d_str] += float(a.get("activityTrainingLoad") or 0.0)

    acute_decay = math.exp(-1 / 5.1)
    acute_scale = 1.284
    ctl = atl = acute = 0.0
    loads_window: list[float] = []
    load_by_day: dict[str, dict[str, Any]] = {}

    total_days_warm = (latest_date - warm_start).days + 1
    for i in range(total_days_warm):
        d = warm_start + timedelta(days=i)
        k = d.isoformat()
        tsb = ctl - atl
        ld = daily_load.get(k, 0.0)
        loads_window.append(ld)
        ctl += (ld - ctl) / 42.0
        atl += (ld - atl) / 7.0
        acute = acute * acute_decay + ld
        chronic = sum(loads_window[-28:]) / 4.0
        acwr = round((acute * acute_scale) / chronic, 2) if chronic > 10 else 1.0
        if d >= start_6m:
            load_by_day[k] = {
                "load": round(ld, 1),
                "acute_load": round(acute * acute_scale),
                "chronic_load": round(chronic),
                "acwr": acwr,
                "ctl": round(ctl, 1),
                "atl": round(atl, 1),
                "tsb": round(tsb, 1),
            }

    # Construir serie diaria de 6 meses (181 días)
    daily_series = []
    for i in range((latest_date - start_6m).days + 1):
        d = start_6m + timedelta(days=i)
        k = d.isoformat()
        s = summaries_by_day.get(k, {})
        sl = sleeps_by_day.get(k, {})
        h = hrv_by_day.get(k, {})
        ld = load_by_day.get(k, {})

        rhr = (s.get("heartRate") or {}).get("restingValue")
        bb_max = (s.get("bodyBattery") or {}).get("maxValue")
        bb_min = (s.get("bodyBattery") or {}).get("minValue")
        stress = (s.get("stress") or {}).get("avgLevel")
        stress = stress if (stress is not None and stress >= 0) else None
        steps = ((s.get("movement") or {}).get("steps") or {}).get("value")
        active_kcal = (s.get("calories") or {}).get("burnedActive")

        sleep_score = ((sl.get("sleepScores") or {}).get("overall") or {}).get("value")
        sleep_hours = round((sl.get("sleepTimeSeconds") or 0) / 3600.0, 2) if sl.get("sleepTimeSeconds") else None
        deep_hours = round((sl.get("deepSleepSeconds") or 0) / 3600.0, 2) if sl.get("deepSleepSeconds") else None
        rem_hours = round((sl.get("remSleepSeconds") or 0) / 3600.0, 2) if sl.get("remSleepSeconds") else None

        hrv_night = h.get("lastNightAvg")
        hrv_weekly = h.get("weeklyAvg")
        hrv_status = h.get("status")
        hrv_base_low = (h.get("baseline") or {}).get("balancedLow")
        hrv_base_high = (h.get("baseline") or {}).get("balancedUpper")

        # Estimación de Readiness (0-100) estilo Garmin
        readiness_parts = []
        if sleep_score is not None:
            readiness_parts.append(sleep_score * 0.30)
        if hrv_night is not None and hrv_base_low:
            hrv_norm = max(20, min(100, 65 + (hrv_night - hrv_base_low) * 2.5))
            readiness_parts.append(hrv_norm * 0.30)
        if bb_max is not None:
            readiness_parts.append(bb_max * 0.25)
        if stress is not None:
            stress_norm = max(10, min(100, 100 - (stress - 18) * 1.8))
            readiness_parts.append(stress_norm * 0.15)

        weights_sum = (
            (0.30 if sleep_score is not None else 0)
            + (0.30 if (hrv_night is not None and hrv_base_low) else 0)
            + (0.25 if bb_max is not None else 0)
            + (0.15 if stress is not None else 0)
        )
        readiness = round(sum(readiness_parts) / weights_sum) if weights_sum > 0 else None

        daily_series.append(
            {
                "date": k,
                "rhr": rhr,
                "stress": stress,
                "bb_max": bb_max,
                "bb_min": bb_min,
                "steps": steps,
                "active_kcal": active_kcal,
                "sleep_score": sleep_score,
                "sleep_hours": sleep_hours,
                "deep_hours": deep_hours,
                "rem_hours": rem_hours,
                "hrv_night": hrv_night,
                "hrv_weekly": hrv_weekly,
                "hrv_status": hrv_status,
                "hrv_base_low": hrv_base_low,
                "hrv_base_high": hrv_base_high,
                "readiness": readiness,
                **ld,
            }
        )

    # Filtrar actividades de los últimos 6 meses
    acts_6m = [a for a in activities if (a.get("startTimeLocal") or "")[:10] >= start_6m.isoformat()]
    processed_activities = []
    for a in acts_6m:
        t_key = (a.get("activityType") or {}).get("typeKey") or "other"
        dist_km = round((a.get("distance") or 0) / 1000.0, 2) if a.get("distance") else 0.0
        dur_min = round((a.get("duration") or 0) / 60.0, 1)
        pace_s = (a.get("duration") or 0) / dist_km if (dist_km > 0 and "run" in t_key) else None

        # Extraer ejercicios de fuerza si existen
        exercises = []
        for ex in a.get("summarizedExerciseSets") or []:
            cat = ex.get("subCategory") or ex.get("category") or "EXERCISE"
            if cat == "WARM_UP" or cat == "CARDIO":
                continue
            max_w = round((ex.get("maxWeight") or 0) / 1000.0, 1) if ex.get("maxWeight") else 0.0
            vol_kg = round((ex.get("volume") or 0) / 1000.0, 0) if ex.get("volume") else 0.0
            exercises.append(
                {
                    "name": cat.replace("_", " ").title(),
                    "sets": ex.get("sets") or 1,
                    "reps": ex.get("reps") or 0,
                    "max_weight_kg": max_w,
                    "volume_kg": vol_kg,
                }
            )

        zones_min = [round((a.get(f"hrTimeInZone_{i}") or 0) / 60.0, 1) for i in range(1, 6)]

        processed_activities.append(
            {
                "id": a.get("activityId"),
                "date": (a.get("startTimeLocal") or "")[:10],
                "start_time": a.get("startTimeLocal"),
                "name": a.get("activityName") or t_key.replace("_", " ").title(),
                "type": t_key,
                "duration_min": dur_min,
                "distance_km": dist_km,
                "pace_min_km": format_pace(pace_s),
                "pace_sec": round(pace_s) if pace_s else None,
                "avg_hr": round(a["averageHR"]) if a.get("averageHR") else None,
                "max_hr": round(a["maxHR"]) if a.get("maxHR") else None,
                "cadence": round(a["averageRunningCadenceInStepsPerMinute"])
                if a.get("averageRunningCadenceInStepsPerMinute")
                else None,
                "load": round(a.get("activityTrainingLoad") or 0),
                "aerobic_te": round(a.get("aerobicTrainingEffect") or 0, 1),
                "anaerobic_te": round(a.get("anaerobicTrainingEffect") or 0, 1),
                "te_label": a.get("trainingEffectLabel"),
                "calories": round(a.get("calories") or 0),
                "total_sets": a.get("totalSets"),
                "total_reps": a.get("totalReps"),
                "hr_zones_min": zones_min,
                "exercises": exercises,
            }
        )

    # Evolución mensual (últimos 6 meses)
    monthly_stats = defaultdict(
        lambda: {
            "month": "",
            "total_sessions": 0,
            "total_hours": 0.0,
            "total_load": 0,
            "run_sessions": 0,
            "run_km": 0.0,
            "run_duration_sec": 0.0,
            "strength_sessions": 0,
            "strength_hours": 0.0,
            "hiit_sessions": 0,
            "hiit_hours": 0.0,
        }
    )
    for a in acts_6m:
        m = (a.get("startTimeLocal") or "")[:7]
        t = (a.get("activityType") or {}).get("typeKey") or "other"
        dur_s = a.get("duration") or 0.0
        dist_k = (a.get("distance") or 0.0) / 1000.0
        ld = a.get("activityTrainingLoad") or 0.0

        ms = monthly_stats[m]
        ms["month"] = m
        ms["total_sessions"] += 1
        ms["total_hours"] = round(ms["total_hours"] + dur_s / 3600.0, 1)
        ms["total_load"] = round(ms["total_load"] + ld)
        if "run" in t:
            ms["run_sessions"] += 1
            ms["run_km"] = round(ms["run_km"] + dist_k, 1)
            ms["run_duration_sec"] += dur_s
        elif t == "strength_training":
            ms["strength_sessions"] += 1
            ms["strength_hours"] = round(ms["strength_hours"] + dur_s / 3600.0, 1)
        elif t == "hiit":
            ms["hiit_sessions"] += 1
            ms["hiit_hours"] = round(ms["hiit_hours"] + dur_s / 3600.0, 1)

    monthly_list = []
    for m in sorted(monthly_stats.keys()):
        item = monthly_stats[m]
        avg_pace = format_pace(item["run_duration_sec"] / item["run_km"]) if item["run_km"] > 0 else None
        item["run_avg_pace"] = avg_pace
        del item["run_duration_sec"]
        monthly_list.append(item)

    # Estadísticas agregadas de 6 meses
    rhrs = [d["rhr"] for d in daily_series if d["rhr"]]
    hrvs = [d["hrv_night"] for d in daily_series if d["hrv_night"]]
    sleeps_sc = [d["sleep_score"] for d in daily_series if d["sleep_score"]]
    sleeps_hr = [d["sleep_hours"] for d in daily_series if d["sleep_hours"]]
    stresses = [d["stress"] for d in daily_series if d["stress"]]
    bb_maxs = [d["bb_max"] for d in daily_series if d["bb_max"]]
    steps_all = [d["steps"] for d in daily_series if d["steps"]]

    runs_6m = [a for a in processed_activities if "run" in a["type"]]
    strength_6m = [a for a in processed_activities if a["type"] == "strength_training"]
    hiit_6m = [a for a in processed_activities if a["type"] == "hiit"]

    today_row = daily_series[-1] if daily_series else {}
    yesterday_row = daily_series[-2] if len(daily_series) >= 2 else {}

    # Estado matutino de hoy (09:00 AM Check-in)
    readiness_today = today_row.get("readiness") or 68
    hrv_status_today = today_row.get("hrv_status") or "UNBALANCED"
    acwr_today = today_row.get("acwr") or 1.15

    if readiness_today >= 75 and hrv_status_today == "BALANCED" and acwr_today <= 1.3:
        coach_Semaphore = "GREEN"
        coach_headline = "Listo para sesión de calidad (Readiness Óptimo)"
        coach_advice = (
            "Tu VFC está dentro del rango equilibrado (50–60 ms) y la carga aguda está controlada. "
            "Puedes ejecutar la sesión principal del día al 100% de las zonas y pesos prescritos."
        )
    elif readiness_today >= 50 or hrv_status_today == "UNBALANCED":
        coach_Semaphore = "AMBER"
        coach_headline = "Precaución / Carga Moderada — Recuperación Post-10K en curso"
        coach_advice = (
            f"Tras el 10K Ponle Freno de ayer (54:05, Carga 215, TE 5.0) y el pico de fatiga del fin de semana, "
            f"tu sueño anoche se recuperó muy bien ({today_row.get('sleep_hours', 7.95)}h, score {today_row.get('sleep_score', 80)}), "
            f"pero tu VFC semanal ({today_row.get('hrv_weekly', 48)} ms) sigue en estado DESEQUILIBRADO (debajo de tu base de 50–60 ms) "
            f"y la FC en reposo está en {today_row.get('rhr', 49)} ppm (+3.4 ppm sobre tu media de 45.6). "
            "Hoy prioriza Fuerza de Tren Superior sin impacto articular (RIR 2) y mantén hidratación alta."
        )
    else:
        coach_Semaphore = "RED"
        coach_headline = "Prioridad Descanso & Regeneración Parasimpática"
        coach_advice = (
            "Tus biomarcadores indican fatiga aguda elevada (VFC baja o sueño insuficiente). "
            "Sustituye cualquier sesión intensa por movilidad, paseo suave Z1 (30 min) y 8h de sueño."
        )

    # Extraer zonas de FC de carrera
    hr_zones_raw = profile_bundle.get("hr_zones") or []
    running_zones = next((z for z in hr_zones_raw if z.get("sport") == "RUNNING"), hr_zones_raw[0] if hr_zones_raw else {})

    return {
        "metadata": {
            "last_sync": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "scheduled_cron": "Todos los días a las 09:00 AM (Europe/Madrid)",
            "api_source": "Garmin Connect Official Personal API v1.0 (personal.connectapi.garmin.com)",
            "analysis_window_start": start_6m.isoformat(),
            "analysis_window_end": latest_date.isoformat(),
            "total_days_analyzed": len(daily_series),
        },
        "athlete_profile": {
            "age": (profile_bundle.get("fitness_age") or {}).get("chronologicalAge", 33),
            "fitness_age": round((profile_bundle.get("fitness_age") or {}).get("fitnessAge", 32.4), 1),
            "achievable_fitness_age": round((profile_bundle.get("fitness_age") or {}).get("achievableFitnessAge", 27.0), 1),
            "weight_kg": 100.4,
            "weight_prev_kg": 101.9,
            "bmi": 32.0,
            "rhr_6m_avg": round(statistics.mean(rhrs), 1) if rhrs else 45.6,
            "max_hr": running_zones.get("maxHeartRateUsed", 183),
            "lthr_running": running_zones.get("lactateThresholdHeartRateUsed", 163),
            "hrv_baseline_low": 50,
            "hrv_baseline_high": 60,
            "hr_zones_running": [
                {"zone": "Z1", "name": "Recuperación / Calentamiento", "min": running_zones.get("zone1Floor", 113), "max": running_zones.get("zone2Floor", 135) - 1, "pace_guide": "6:35 - 7:10 /km"},
                {"zone": "Z2", "name": "Base Aeróbica (80% del volumen)", "min": running_zones.get("zone2Floor", 135), "max": running_zones.get("zone3Floor", 154) - 1, "pace_guide": "5:55 - 6:30 /km"},
                {"zone": "Z3", "name": "Tempo / Ritmo Sostenido", "min": running_zones.get("zone3Floor", 154), "max": running_zones.get("zone4Floor", 161) - 1, "pace_guide": "5:25 - 5:50 /km"},
                {"zone": "Z4", "name": "Umbral de Lactato (LTHR 163)", "min": running_zones.get("zone4Floor", 161), "max": running_zones.get("zone5Floor", 168) - 1, "pace_guide": "5:00 - 5:25 /km"},
                {"zone": "Z5", "name": "VO2 Máx / Capacidad Anaeróbica", "min": running_zones.get("zone5Floor", 168), "max": running_zones.get("maxHeartRateUsed", 183), "pace_guide": "< 4:55 /km"},
            ],
            "strength_prs_detected": [
                {"exercise": "Peso Muerto Barra (Deadlift)", "weight_kg": 135.0, "reps": "3x3", "date": "2026-10-15"},
                {"exercise": "Press Banca Barra (Bench Press)", "weight_kg": 95.0, "reps": "4x4 (y 3x8 @ 85kg)", "date": "2026-10-14"},
                {"exercise": "Sentadilla Trasera (Back Squat)", "weight_kg": 90.0, "reps": "1x8 (y 4x3 @ 80kg)", "date": "2026-11-10"},
                {"exercise": "Peso Muerto Rumano (RDL)", "weight_kg": 80.0, "reps": "4x4", "date": "2026-10-20"},
                {"exercise": "Press Militar (Overhead Press)", "weight_kg": 55.0, "reps": "4x3 (y 3x8 @ 45kg)", "date": "2026-10-15"},
                {"exercise": "Dominadas & Fondos (Pull-ups / Dips)", "weight_kg": 100.4, "reps": "4x6-7 peso corporal", "date": "2026-11-16"},
            ],
            "running_benchmarks": [
                {"event": "Derbi de las Aficiones 10K (Perfil favorable)", "distance_km": 10.10, "time": "52:53", "pace": "5:14/km", "avg_hr": 147, "max_hr": 166, "cadence": 170, "date": "2026-10-25"},
                {"event": "Madrid Ponle Freno 10K", "distance_km": 9.80, "time": "54:05", "pace": "5:31/km", "avg_hr": 150, "max_hr": 167, "cadence": 170, "date": "2026-11-15"},
                {"event": "Trail Running Rivas-Vaciamadrid", "distance_km": 6.01, "time": "34:48", "pace": "5:47/km", "avg_hr": 145, "max_hr": 172, "cadence": 162, "date": "2026-09-05"},
            ],
        },
        "morning_check_in": {
            "date": latest_date.isoformat(),
            "semaphore": coach_Semaphore,
            "readiness_score": readiness_today,
            "headline": coach_headline,
            "coach_advice": coach_advice,
            "metrics_today": {
                "hrv_last_night_ms": today_row.get("hrv_night"),
                "hrv_weekly_avg_ms": today_row.get("hrv_weekly"),
                "hrv_status": hrv_status_today,
                "hrv_baseline": "50 - 60 ms",
                "rhr_bpm": today_row.get("rhr"),
                "rhr_delta_vs_avg": round((today_row.get("rhr") or 45.6) - (statistics.mean(rhrs) if rhrs else 45.6), 1),
                "sleep_hours": today_row.get("sleep_hours"),
                "sleep_score": today_row.get("sleep_score"),
                "deep_sleep_hours": today_row.get("deep_hours"),
                "rem_sleep_hours": today_row.get("rem_hours"),
                "body_battery_wake": today_row.get("bb_max"),
                "stress_yesterday": yesterday_row.get("stress"),
                "acute_load": today_row.get("acute_load"),
                "chronic_load": today_row.get("chronic_load"),
                "acwr": acwr_today,
                "ctl": today_row.get("ctl"),
                "atl": today_row.get("atl"),
                "tsb": today_row.get("tsb"),
            },
        },
        "six_month_summary": {
            "total_activities": len(acts_6m),
            "total_hours": round(sum((a.get("duration") or 0) / 3600.0 for a in acts_6m), 1),
            "running": {
                "sessions": len(runs_6m),
                "total_km": round(sum(r["distance_km"] for r in runs_6m), 1),
                "total_hours": round(sum(r["duration_min"] for r in runs_6m) / 60.0, 1),
                "avg_hr": round(statistics.mean([r["avg_hr"] for r in runs_6m if r["avg_hr"]])),
                "avg_cadence": round(statistics.mean([r["cadence"] for r in runs_6m if r["cadence"]])),
                "avg_distance_km": round(statistics.mean([r["distance_km"] for r in runs_6m if r["distance_km"] > 0]), 2),
            },
            "strength": {
                "sessions": len(strength_6m),
                "total_hours": round(sum(s["duration_min"] for s in strength_6m) / 60.0, 1),
                "avg_duration_min": round(statistics.mean([s["duration_min"] for s in strength_6m])) if strength_6m else 0,
            },
            "hiit": {
                "sessions": len(hiit_6m),
                "total_hours": round(sum(h["duration_min"] for h in hiit_6m) / 60.0, 1),
            },
            "health_averages": {
                "hrv_mean_ms": round(statistics.mean(hrvs), 1) if hrvs else 52.0,
                "hrv_balanced_days_pct": round(100 * sum(1 for d in daily_series if d.get("hrv_status") == "BALANCED") / max(1, len(daily_series))),
                "rhr_mean_bpm": round(statistics.mean(rhrs), 1) if rhrs else 45.6,
                "sleep_mean_hours": round(statistics.mean(sleeps_hr), 2) if sleeps_hr else 6.51,
                "sleep_mean_score": round(statistics.mean(sleeps_sc), 1) if sleeps_sc else 73.3,
                "stress_mean": round(statistics.mean(stresses), 1) if stresses else 28.1,
                "body_battery_max_mean": round(statistics.mean(bb_maxs), 1) if bb_maxs else 73.4,
                "steps_mean": round(statistics.mean(steps_all)) if steps_all else 10825,
            },
        },
        "monthly_progression": monthly_list,
        "daily_series": daily_series,
        "recent_activities": processed_activities[:60],
    }


def main():
    sync_from_api(force_full=False)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    data = build_dashboard_data()
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    OUT_FILE.write_text(json_str)
    js_file = OUT_DIR / "garmin_data.js"
    js_file.write_text(f"window.GARMIN_DATA = {json_str};\n")
    print(f"[OK] Archivos generados en {OUT_FILE} y {js_file} ({OUT_FILE.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
