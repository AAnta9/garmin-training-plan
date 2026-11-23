/**
 * Configuración de 1RM (Repetición Máxima) y Plan de Entrenamiento Híbrido Dinámico (12 Semanas).
 * Distribución optimizada para protección articular de rodilla y corrección de asimetría Pierna Derecha (Protocolo 4:2):
 * - Lunes (13:30): Gimnasio 1 · Pierna Unilateral Correctiva 4:2 (Lower) -> 53.5h antes de correr el Miércoles y >100h antes del Viernes/Sábado.
 * - Martes (13:30): Gimnasio 2 · Torso A (Upper A)
 * - Miércoles (19:00): Carrera 1 · Rodaje Z2
 * - Jueves (13:30): Gimnasio 3 · Torso B (Upper B)
 * - Viernes (19:00): Carrera 2 · Calidad / Ritmo
 * - Sábado (09:00): Carrera 3 · Tirada Larga Z2
 * - Domingo: Descanso Total
 */

window.DEFAULT_1RM_CONFIG = [
  {
    "key": "bench",
    "name": "Press Banca Barra (Bench Press)",
    "category": "Tren Superior A (Martes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 120,
    "cat_id": 0,
    "name_id": 1,
    "category_key": "BENCH_PRESS",
    "exercise_key": "BARBELL_BENCH_PRESS",
    "title_es": "Press de banca con barra",
    "rest_sec": 120,
    "note": "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    "key": "squat",
    "name": "Sentadilla Trasera Barra (Back Squat)",
    "category": "Tren Inferior (Lunes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 130,
    "cat_id": 28,
    "name_id": 6,
    "category_key": "SQUAT",
    "exercise_key": "BARBELL_BACK_SQUAT",
    "title_es": "Sentadilla trasera con barra",
    "rest_sec": 150,
    "note": "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    "key": "deadlift",
    "name": "Peso Muerto Convencional (Deadlift)",
    "category": "Tren Inferior (Lunes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 160,
    "cat_id": 8,
    "name_id": 0,
    "category_key": "DEADLIFT",
    "exercise_key": "BARBELL_DEADLIFT",
    "title_es": "Peso muerto con barra",
    "rest_sec": 150,
    "note": "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    "key": "rdl",
    "name": "Peso Muerto Rumano (RDL)",
    "category": "Tren Inferior (Lunes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 140,
    "cat_id": 8,
    "name_id": 23,
    "category_key": "DEADLIFT",
    "exercise_key": "ROMANIAN_DEADLIFT",
    "title_es": "Peso muerto rumano",
    "rest_sec": 105,
    "note": "Cadena posterior / isquios (redondeo a 2.5 kg)"
  },
  {
    "key": "ohp",
    "name": "Press Militar Barra de Pie (OHP)",
    "category": "Tren Superior A/B (Martes y Jueves)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 65,
    "cat_id": 24,
    "name_id": 25,
    "category_key": "SHOULDER_PRESS",
    "exercise_key": "MILITARY_PRESS",
    "title_es": "Press militar con barra",
    "rest_sec": 105,
    "note": "Empuje vertical estricto (redondeo a 2.5 kg)"
  },
  {
    "key": "incline_db",
    "name": "Press Inclinado Mancuernas (por mano)",
    "category": "Tren Superior B (Jueves)",
    "unit": "kg/manc",
    "step": 1,
    "default_1rm": 40,
    "cat_id": 0,
    "name_id": 9,
    "category_key": "BENCH_PRESS",
    "exercise_key": "INCLINE_DUMBBELL_BENCH_PRESS",
    "title_es": "Press inclinado con mancuernas",
    "rest_sec": 90,
    "note": "Peso de cada mancuerna individual"
  },
  {
    "key": "row_db",
    "name": "Remo con Mancuerna Unilateral",
    "category": "Tren Superior A/B (Martes y Jueves)",
    "unit": "kg/manc",
    "step": 1,
    "default_1rm": 40,
    "cat_id": 23,
    "name_id": 2,
    "category_key": "ROW",
    "exercise_key": "DUMBBELL_ROW",
    "title_es": "Remo con mancuerna",
    "rest_sec": 75,
    "note": "Peso de la mancuerna en remo a una mano"
  },
  {
    "key": "row_bar",
    "name": "Remo con Barra / Polea Baja",
    "category": "Tren Superior A/B (Martes y Jueves)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 90,
    "cat_id": 23,
    "name_id": 45,
    "category_key": "ROW",
    "exercise_key": "BARBELL_ROW",
    "title_es": "Remo con barra",
    "rest_sec": 90,
    "note": "Tracción horizontal con barra o polea"
  },
  {
    "key": "pullup_load",
    "name": "Dominadas (Lastre Máximo 1RM)",
    "category": "Tren Superior A/B (Martes y Jueves)",
    "unit": "kg lastre",
    "step": 1.25,
    "default_1rm": 20,
    "cat_id": 21,
    "name_id": 38,
    "category_key": "PULL_UP",
    "exercise_key": "PULL_UP",
    "title_es": "Dominadas",
    "rest_sec": 105,
    "note": "Kg extra en cinturón para 1 repetición máxima (0 = solo peso corporal)"
  },
  {
    "key": "split_squat_db",
    "name": "Split Squat Búlgaro (por mancuerna)",
    "category": "Tren Inferior (Lunes)",
    "unit": "kg/manc",
    "step": 1,
    "default_1rm": 35,
    "cat_id": 17,
    "name_id": 27,
    "category_key": "LUNGE",
    "exercise_key": "FRONT_FOOT_ELEVATED_DUMBBELL_SPLIT_SQUAT",
    "title_es": "Sentadilla búlgara con mancuerna",
    "rest_sec": 75,
    "note": "Peso de cada mancuerna en zancada búlgara"
  },
  {
    "key": "hip_thrust",
    "name": "Puente de Glúteo / Hip Thrust Barra",
    "category": "Tren Inferior (Lunes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 90,
    "cat_id": 10,
    "name_id": 0,
    "category_key": "HIP_RAISE",
    "exercise_key": "BARBELL_HIP_THRUST_ON_FLOOR",
    "title_es": "Hip Thrust con barra",
    "rest_sec": 90,
    "note": "Extensión de cadera pesada"
  },
  {
    "key": "soleus",
    "name": "Elevación de Sóleo Sentado (Máquina)",
    "category": "Protección Aquiles (Lunes)",
    "unit": "kg",
    "step": 2.5,
    "default_1rm": 60,
    "cat_id": 1,
    "name_id": 6,
    "category_key": "CALF_RAISE",
    "exercise_key": "WEIGHTED_SEATED_CALF_RAISE",
    "title_es": "Elevación de gemelos sentado",
    "rest_sec": 60,
    "note": "Carga en máquina de gemelo/sóleo sentado"
  }
];

window.AUX_EXERCISES_CONFIG = {
  "dips": {
    "key": "dips",
    "cat_id": 30,
    "name_id": 2,
    "category_key": "TRICEPS_EXTENSION",
    "exercise_key": "BODY_WEIGHT_DIP",
    "title_es": "Fondos en paralelas",
    "rest_sec": 75,
    "default_weight_kg": 0
  },
  "db_snatch": {
    "key": "db_snatch",
    "cat_id": 18,
    "name_id": 16,
    "category_key": "OLYMPIC_LIFT",
    "exercise_key": "SINGLE_ARM_DUMBBELL_SNATCH",
    "title_es": "Arrancada mancuerna 1 mano",
    "rest_sec": 75,
    "default_weight_kg": 25
  },
  "kb_swing": {
    "key": "kb_swing",
    "cat_id": 10,
    "name_id": 23,
    "category_key": "HIP_RAISE",
    "exercise_key": "KETTLEBELL_SWING",
    "title_es": "Swing con pesa rusa (Kettlebell)",
    "rest_sec": 75,
    "default_weight_kg": 24
  },
  "plank": {
    "key": "plank",
    "cat_id": 19,
    "name_id": 43,
    "category_key": "PLANK",
    "exercise_key": "PLANK",
    "title_es": "Plancha abdominal",
    "rest_sec": 45,
    "default_weight_kg": 0
  },
  "core": {
    "key": "core",
    "cat_id": 5,
    "name_id": 6,
    "category_key": "CORE",
    "exercise_key": "CABLE_CORE_PRESS",
    "title_es": "Press Pallof / Core",
    "rest_sec": 45,
    "default_weight_kg": 0
  },
  "leg_curl": {
    "key": "leg_curl",
    "cat_id": 15,
    "name_id": 1,
    "category_key": "LEG_CURL",
    "exercise_key": "WEIGHTED_LEG_CURL",
    "title_es": "Curl femoral",
    "rest_sec": 75,
    "default_weight_kg": 0
  },
  "knee_raise": {
    "key": "knee_raise",
    "cat_id": 16,
    "name_id": 0,
    "category_key": "LEG_RAISE",
    "exercise_key": "HANGING_KNEE_RAISE",
    "title_es": "Elevación de rodillas colgado",
    "rest_sec": 60,
    "default_weight_kg": 0
  },
  "arm_superset": {
    "key": "arm_superset",
    "cat_id": 7,
    "name_id": 46,
    "category_key": "CURL",
    "exercise_key": "DUMBBELL_BICEPS_CURL",
    "title_es": "Curl de bíceps con mancuernas",
    "rest_sec": 60,
    "default_weight_kg": 0
  },
  "single_leg_press": {
    "key": "single_leg_press",
    "cat_id": 28,
    "name_id": 0,
    "category_key": "SQUAT",
    "exercise_key": "LEG_PRESS",
    "title_es": "Prensa a 1 pierna / Step-Up",
    "rest_sec": 75,
    "default_weight_kg": 50
  },
  "step_up_db": {
    "key": "step_up_db",
    "cat_id": 28,
    "name_id": 32,
    "category_key": "SQUAT",
    "exercise_key": "DUMBBELL_STEP_UP",
    "title_es": "Step-Up / Subida a cajón 1 pierna",
    "rest_sec": 75,
    "default_weight_kg": 16
  },
  "single_leg_extension": {
    "key": "single_leg_extension",
    "cat_id": 28,
    "name_id": 45,
    "category_key": "SQUAT",
    "exercise_key": "PARTIAL_SINGLE_LEG_SQUAT",
    "title_es": "Extensión cuádriceps a 1 pierna",
    "rest_sec": 60,
    "default_weight_kg": 25
  },
  "single_leg_curl": {
    "key": "single_leg_curl",
    "cat_id": 15,
    "name_id": 1,
    "category_key": "LEG_CURL",
    "exercise_key": "WEIGHTED_LEG_CURL",
    "title_es": "Curl femoral a 1 pierna",
    "rest_sec": 60,
    "default_weight_kg": 25
  },
  "single_leg_hip_thrust": {
    "key": "single_leg_hip_thrust",
    "cat_id": 10,
    "name_id": 33,
    "category_key": "HIP_RAISE",
    "exercise_key": "WEIGHTED_SINGLE_LEG_HIP_RAISE_WITH_FOOT_ON_BENCH",
    "title_es": "Hip Thrust / Puente glúteo a 1 pierna",
    "rest_sec": 60,
    "default_weight_kg": 0
  },
  "single_leg_calf": {
    "key": "single_leg_calf",
    "cat_id": 1,
    "name_id": 10,
    "category_key": "CALF_RAISE",
    "exercise_key": "WEIGHTED_SINGLE_LEG_BENT_KNEE_CALF_RAISE",
    "title_es": "Elevación sóleo/gemelo a 1 pierna",
    "rest_sec": 60,
    "default_weight_kg": 25
  },
  "glute_med_band": {
    "key": "glute_med_band",
    "cat_id": 11,
    "name_id": 1,
    "category_key": "HIP_STABILITY",
    "exercise_key": "CLAMSHELL",
    "title_es": "Activacion gluteo medio (Banda)",
    "rest_sec": 45,
    "default_weight_kg": 0
  }
};

window.HYBRID_TRAINING_PLAN = {
  "methodology": {
    "title": "Periodización Híbrida Concurrente — Gimnasio (L-M-J) · Carrera (X-V-S) · Domingo Descanso Total",
    "principles": [
      {
        "name": "Cálculo Dinámico por % de tu 1RM Real",
        "detail": "Todas las sesiones de Lunes (Pierna), Martes (Torso A) y Jueves (Torso B) calculan automáticamente los kilos exactos (redondeados a discos de 2.5 kg en barra y 1 kg en mancuerna) según los 1RM que introduzcas en la pestaña '1RM & Pesos'."
      },
      {
        "name": "Protocolo Correctivo 4:2 Pierna Derecha (Diagnóstico 23 Nov: Déficit Global Derecho ~25–35%)",
        "detail": "El test del Lunes 23 Nov confirmó que la pierna DERECHA presenta un déficit de fuerza y estabilidad del 25–35% frente a la izquierda (Ext. Cuádriceps RIR 0 vs 4, Curl Femoral RIR 1 vs 4, Gemelo 10 vs 15 reps, leve valgo en Búlgara). Eliminamos la Prensa a 1 pierna (dolor rotuliano) y aplicamos volumen 4:2 (4 series Derecha / 2 series Izquierda) empezando siempre por la Derecha."
      },
      {
        "name": "Retorno Progresivo Sin Dolor Rotuliano & Polarización 80/20",
        "detail": "Tras descansar de impacto el Viernes 20 y Sábado 21 Nov por molestia de rodilla, reescalamos la progresión de carrera desde 3.5 km (Sem 1) -> 10.5 km (Sem 2) -> 13.5 km (Sem 3) con cadencia >168 spm (menor estrés femoropatelar) e isométricos analgésicos."
      }
    ]
  },
  "blocks": [
    {
      "id": "block-1",
      "number": 1,
      "name": "Bloque 1: Consolidación Aeróbica & Base Híbrida (75%–85% 1RM)",
      "dates": "16 Nov 2026 – 13 Dic 2026 (Semanas 1 a 4)",
      "focus": "Asimilar el 10K Ponle Freno, resolver la molestia de rodilla de la Semana 1 (0 impacto Vie/Sáb) y reconstruir la base aeróbica en Zona 2 con Pierna los Lunes (53.5h antes de correr el Miércoles y >100h antes del Viernes/Sábado).",
      "target_run_km_range": "3.5 → 13.5 km/sem (Progresión Protegida Rodilla)",
      "target_strength_sessions": "3 sesiones/sem (Lun: Lower · Mar: Upper A · Jue: Upper B)",
      "weeks": [
        {
          "week_number": 1,
          "label": "Semana 1 (Adaptación + Descarga Rodilla Vie/Sáb)",
          "dates": "16 Nov – 22 Nov 2026",
          "phase_type": "Fuerza Base (75–78% 1RM) & Descarga Articular Rodilla",
          "run_km_target": 3.5,
          "strength_sessions_target": 3,
          "coach_note": "Completadas las 3 sesiones de gimnasio y los 3.5 km del miércoles (6:14/km, 143 ppm). Por molestia en la rodilla, anulamos el impacto de carrera del Viernes 20 y Sábado 21 Nov para desinflamar el tendón rotuliano al 100% antes de estrenar el esquema Lunes Pierna / Martes Torso.",
          "days": [
            {
              "id": "b1-w1-d1",
              "day_short": "LUN 16 NOV",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower",
              "title": "Tren Inferior Híbrido — Fuerza Estructural ({squat:0.76} Sentadilla)",
              "duration_min": 50,
              "target_zone": "74–76% 1RM | RIR 2-3",
              "summary": "Día 1 de gimnasio (Lunes): fuerza estructural de pierna, isquios y sóleo al 75% 1RM sin generar agujetas para el rodaje de mañana miércoles.",
              "steps": [
                {
                  "name": "Sentadilla Trasera Barra (Back Squat)",
                  "lift": "squat",
                  "sets": 3,
                  "reps": "4-5",
                  "pct": 0.76,
                  "rir": "RIR 2-3 (subida explosiva)"
                },
                {
                  "name": "Peso Muerto Rumano (RDL)",
                  "lift": "rdl",
                  "sets": 3,
                  "reps": "6",
                  "pct": 0.75,
                  "rir": "RIR 2 (bajada 2s)"
                },
                {
                  "name": "Split Squat Búlgaro",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.7,
                  "rir": "RIR 2"
                },
                {
                  "name": "Elevación de Talones Sentado (Sóleo)",
                  "lift": "soleus",
                  "sets": 4,
                  "reps": "12-15",
                  "pct": 0.72,
                  "rir": "1s pausa arriba"
                },
                {
                  "name": "Plancha Abdominal RKC + Deadbug",
                  "aux_type": "plank",
                  "sets": 3,
                  "reps": 12,
                  "rest_sec": 45,
                  "rir": "40s isométrico / 12 reps",
                  "target": "3 series × 40s (12 reps controladas)"
                }
              ]
            },
            {
              "id": "b1-w1-d2",
              "day_short": "MAR 17 NOV",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Base Empuje & Tirón ({bench:0.78} Banca)",
              "duration_min": 55,
              "target_zone": "75–78% 1RM | RIR 2",
              "completed_in_garmin": true,
              "summary": "Día 2 de gimnasio (Martes): estímulo neural en torso al 78% 1RM dejando descansar las piernas.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "6-8",
                  "pct": 0.78,
                  "rir": "RIR 2"
                },
                {
                  "name": "Dominadas Estrictras (Pull-ups)",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "6-7",
                  "pct": 0,
                  "rir": "Peso Corporal (RIR 2)"
                },
                {
                  "name": "Press Militar Barra de Pie",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.74,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna Unilateral",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "10",
                  "pct": 0.75,
                  "rir": "RIR 2"
                },
                {
                  "name": "Movilidad Torácica & Tobillo",
                  "target": "8 min vuelta a la calma"
                }
              ]
            },
            {
              "id": "b1-w1-d3",
              "day_short": "MIÉ 18 NOV",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Z1/Z2",
              "title": "Rodaje Regenerativo Aeróbico Z2",
              "duration_min": 23,
              "distance_km": 3.5,
              "target_zone": "Z1-Z2 Baja (130 - 144 ppm) | 6:15 - 6:30 /km",
              "summary": "Primera carrera de la semana (Miércoles): rodaje suave de oxigenación tras el día de pierna.",
              "steps": [
                {
                  "name": "Calentamiento dinámico",
                  "target": "5 min caminata rápida + movilidad cadera"
                },
                {
                  "name": "Rodaje Suave Controlado",
                  "target": "3.5 km @ 6:15-6:30/km (FC 132-144 ppm, Cadencia >164 spm)"
                },
                {
                  "name": "Estiramientos suaves sóleo/isquios",
                  "target": "5 min al terminar"
                }
              ]
            },
            {
              "id": "b1-w1-d4",
              "day_short": "JUE 19 NOV",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B — Hombro, Espalda, Fondos & DB Snatch ({ohp:0.82} Militar)",
              "duration_min": 50,
              "target_zone": "76–82% 1RM | RIR 2",
              "summary": "Día 3 de gimnasio (Jueves): cerramos el trabajo de fuerza semanal incluyendo Fondos en Paralelas y Arrancada con Mancuerna a 1 Mano (25 kg) dejando las piernas frescas para viernes y sábado.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "4-5",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "10",
                  "pct": 0.76,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo en Polea / Barra",
                  "lift": "row_bar",
                  "sets": 4,
                  "reps": "8-10",
                  "pct": 0.75,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "7-8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 7-8 reps @ Peso Corporal (RIR 2)"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 25 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 25 kg (explosivas)"
                }
              ]
            },
            {
              "id": "b1-w1-d5",
              "day_short": "VIE 20 NOV",
              "day_name": "Viernes",
              "modality": "rest",
              "modality_label": "Descarga Rodilla · Sin Impacto",
              "title": "Descanso de Carrera — Protocolo Analgésico Tendón Rotuliano",
              "duration_min": 15,
              "distance_km": 0,
              "target_zone": "Cero Impacto · Isometría Analgésica",
              "summary": "Cancelamos los 4.0 km de carrera de hoy viernes por dolor de rodilla. Aplicamos isometría suave de cuádriceps (efecto analgésico tendinoso) y movilidad sin impacto.",
              "steps": [
                {
                  "name": "Carrera Cancelada (Protección Rodilla)",
                  "target": "0 km — Eliminamos impacto para cortar la inflamación a tiempo"
                },
                {
                  "name": "Wall Sit Isométrico (Analgésico Rotuliano)",
                  "target": "4 × 30-40 seg a 60° de flexión (sin llegar a dolor >2/10) rec 90s"
                },
                {
                  "name": "Movilidad Cadera, Tobillo & Foam Roller Cuádriceps/TFL",
                  "target": "10 min liberación miofascial suave (nunca sobre la rótula)"
                }
              ]
            },
            {
              "id": "b1-w1-d6",
              "day_short": "SÁB 21 NOV",
              "day_name": "Sábado",
              "modality": "rest",
              "modality_label": "Descarga Rodilla · Sin Impacto",
              "title": "Descanso de Carrera Sabatino — Recuperación Articular Completa",
              "duration_min": 15,
              "distance_km": 0,
              "target_zone": "Cero Impacto · Activación Glúteo Medio",
              "summary": "Cancelamos los 5.0 km del sábado para encadenar 4 días completos sin impacto de carrera (Jueves a Domingo) y llegar al Lunes 23 Nov con la rodilla limpia.",
              "steps": [
                {
                  "name": "Tirada Cancelada (Protección Rodilla)",
                  "target": "0 km de carrera (si tienes bici estática sin resistencia, 20 min opcionales con dolor 0/10)"
                },
                {
                  "name": "Puente Glúteo + Clamshells / Monster Walk",
                  "target": "3 × 15 reps suaves para activar glúteo medio y estabilizar valgo de rodilla"
                },
                {
                  "name": "Hidratación + Colágeno Hidrolizado (15g) + Vitamina C",
                  "target": "Síntesis de colágeno tendinoso durante el fin de semana"
                }
              ]
            },
            {
              "id": "b1-w1-d7",
              "day_short": "DOM 22 NOV",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso (Recarga Body Battery >80)",
              "summary": "Día fijo de descanso personal y familiar. Tus piernas acumulan 72h sin impacto hasta el martes al mediodía.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento programado · Hidratación y sueño >7.5h"
                }
              ]
            }
          ]
        },
        {
          "week_number": 2,
          "label": "Semana 2 (Test Asimetría Unilateral Izq/Der + Retorno Z2 10.5 km)",
          "dates": "23 Nov – 29 Nov 2026",
          "phase_type": "Evaluación Descompensación Pierna Izq vs Der & Retorno Z2 Sin Series",
          "run_km_target": 10.5,
          "strength_sessions_target": 3,
          "coach_note": "OBJETIVO CLAVE DEL LUNES 23 NOV: Si la rodilla no duele, realizamos la Sesión de Evaluación Unilateral (Izquierda vs Derecha) en los 5 bloques (Búlgara, Prensa 1 Pierna / Step-Up, Extensión Cuádriceps 1 Pierna, Curl Femoral 1 Pierna y Hip Thrust + Sóleo 1 Pierna). Anota en la tarjeta cuántas reps/kilos sientes en la Izquierda vs la Derecha (RIR 2) para ajustar el resto del plan.",
          "days": [
            {
              "id": "b1-w2-d1",
              "day_short": "LUN 23 NOV",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower Unilateral (Test Izq/Der)",
              "title": "Evaluación de Asimetría Unilateral (Izquierda vs Derecha) & Blindaje Rotuliano",
              "duration_min": 55,
              "target_zone": "Test Izq vs Der (RIR 2) · 0 Dolor Rotuliano",
              "summary": "Sesión clave de diagnóstico unilateral (Lunes 13:30, con 53.5h antes de correr el miércoles): evalúa con el mismo peso en cada pierna la diferencia de fuerza, estabilidad de cadera/rodilla y RIR entre tu pierna derecha y tu pierna izquierda. Empieza siempre por el lado de la rodilla sensible y anota los datos abajo.",
              "steps": [
                {
                  "name": "1. Sentadilla Búlgara Unilateral Mancuernas (Test Estabilidad & Glúteo/Cuádriceps)",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.72,
                  "rir": "Test Izq vs Der (RIR 2 · tibia vertical)"
                },
                {
                  "name": "2. Prensa a 1 Pierna / Step-Up Alto en Cajón (Test Empuje Unilateral)",
                  "aux_type": "single_leg_press",
                  "sets": 3,
                  "reps": "10/pierna",
                  "weight_kg": 50,
                  "rest_sec": 75,
                  "rir": "Test Izq vs Der @ 50 kg en Prensa (o 16 kg/manc en Step-Up)",
                  "target": "3 series × 10 reps/pierna (comparar control de valgo Izq vs Der)"
                },
                {
                  "name": "3. Extensión de Cuádriceps a 1 Pierna en Máquina (Test Analítico Cuádriceps/Rótula)",
                  "aux_type": "single_leg_extension",
                  "sets": 3,
                  "reps": "12/pierna",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "Test Izq vs Der · Rango 90°->30° sin dolor + 2s isométrico arriba",
                  "target": "3 series × 12 reps/pierna (pausa 2s arriba · medir % diferencia Izq vs Der)"
                },
                {
                  "name": "4. Curl Femoral a 1 Pierna Sentado/Tumbado (Test Analítico Isquios)",
                  "aux_type": "single_leg_curl",
                  "sets": 3,
                  "reps": "10-12/pierna",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "Test Izq vs Der · Excéntrica 3s (ratio Isquio:Cuádriceps)",
                  "target": "3 series × 10-12 reps/pierna (excéntrica 3s controlada)"
                },
                {
                  "name": "5. Hip Thrust / Puente Glúteo a 1 Pierna (Test Extensión Cadera Unilateral)",
                  "aux_type": "single_leg_hip_thrust",
                  "sets": 3,
                  "reps": "10/pierna",
                  "weight_kg": 15,
                  "rest_sec": 60,
                  "rir": "Test Izq vs Der · 1s pausa arriba con pelvis nivelada",
                  "target": "3 series × 10 reps/pierna"
                },
                {
                  "name": "6. Elevación de Sóleo/Gemelo a 1 Pierna (Test Aquiles & Propulsión)",
                  "aux_type": "single_leg_calf",
                  "sets": 3,
                  "reps": "12-15/pierna",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "Test Izq vs Der · 1s pausa arriba y 2s bajada",
                  "target": "3 series × 12-15 reps/pierna"
                }
              ],
              "completed_in_garmin": true
            },
            {
              "id": "b1-w2-d2",
              "day_short": "MAR 24 NOV",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Progresión 4×5 ({bench:0.82} Banca)",
              "duration_min": 55,
              "target_zone": "80–82% 1RM | RIR 2",
              "summary": "Progresión lineal al 82% 1RM en Press Banca y tracción vertical.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "5",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Dominadas Lastradas / Estrictras",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "6",
                  "pct": 0.5,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "6-8",
                  "pct": 0.78,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.78,
                  "rir": "RIR 2"
                },
                {
                  "name": "Curl Bíceps + Extensión Tríceps",
                  "aux_type": "arm_superset",
                  "sets": 2,
                  "reps": "12",
                  "rest_sec": 60,
                  "rir": "Superserie brazos",
                  "target": "2 superseries × 12 reps"
                }
              ]
            },
            {
              "id": "b1-w2-d3",
              "day_short": "MIÉ 25 NOV",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Test Rodilla Z2",
              "title": "Rodaje Suave de Retorno 3.0 km en Z2 (Llano)",
              "duration_min": 19,
              "distance_km": 3,
              "target_zone": "Z1-Z2 (132 - 146 ppm) | 6:15 - 6:25 /km",
              "summary": "53.5 horas después de la sesión de pierna del lunes: test suave de 3.0 km en terreno 100% llano, sin rectas finales y con cadencia alta (>=168 spm) para reducir un 15% la carga femoropatelar.",
              "steps": [
                {
                  "name": "Activación Pre-Carrera",
                  "target": "4 min movilidad + 2×20s Wall Sit isométrico para activar tendón rotuliano"
                },
                {
                  "name": "Rodaje Continuo Z2 (Sin Strides)",
                  "target": "3.0 km @ 6:15-6:25/km en llano (FC < 146 ppm, pasos cortos y cadencia >=168 spm)"
                },
                {
                  "name": "Regla del Semáforo Rotuliano",
                  "target": "Molestia 0-2/10 que no sube: OK · Si pasa de 3/10: caminar"
                }
              ]
            },
            {
              "id": "b1-w2-d4",
              "day_short": "JUE 26 NOV",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.84} Militar) + Fondos & DB Snatch",
              "duration_min": 50,
              "target_zone": "80–84% 1RM | RIR 1-2",
              "summary": "Tercer y último día de gimnasio de la semana: empuje vertical, press inclinado, fondos en paralelas y arrancada con mancuerna a una mano.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "4",
                  "pct": 0.84,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Banca Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.8,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna Unilateral",
                  "lift": "row_db",
                  "sets": 4,
                  "reps": "8-10",
                  "pct": 0.8,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 4,
                  "reps": "7-8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "4 series × 7-8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 25 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 25 kg (descanso 75s)"
                }
              ]
            },
            {
              "id": "b1-w2-d5",
              "day_short": "VIE 27 NOV",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Base Z2 Protegida",
              "title": "Rodaje Aeróbico Estable 3.5 km en Z2 (Sustituye al Fartlek)",
              "duration_min": 22,
              "distance_km": 3.5,
              "target_zone": "Z2 (135 - 149 ppm) | 6:10 - 6:20 /km",
              "summary": "Más de 100 horas después de hacer pierna el lunes: sustituimos el Fartlek original por 3.5 km aeróbicos estables en Zona 2 para consolidar la tolerancia de la rodilla sin picos de velocidad.",
              "steps": [
                {
                  "name": "Calentamiento articular",
                  "target": "4 min caminata rápida + activación glúteo"
                },
                {
                  "name": "Rodaje Z2 Continuo",
                  "target": "3.5 km @ 6:10-6:20/km (FC 136-149 ppm, cadencia >=168 spm, cero cuestas abajo)"
                }
              ]
            },
            {
              "id": "b1-w2-d6",
              "day_short": "SÁB 28 NOV",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Z2 Controlada",
              "title": "Tirada Sabatina Progresiva 4.0 km en Z2",
              "duration_min": 25,
              "distance_km": 4,
              "target_zone": "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              "summary": "Cerramos la semana del retorno con 4.0 km cómodos a las 09:00 AM (10.5 km semanales en total) antes de tu comida de restaurante y el descanso dominical.",
              "steps": [
                {
                  "name": "Km 1 (Entrada suave)",
                  "target": "1.0 km @ 6:20/km (FC < 140 ppm)"
                },
                {
                  "name": "Km 2 a 4 (Crucero Z2)",
                  "target": "3.0 km @ 6:05-6:15/km (FC 140-150 ppm, zancada corta y reactiva)"
                }
              ]
            },
            {
              "id": "b1-w2-d7",
              "day_short": "DOM 29 NOV",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Día completo de descanso personal. Asimilación de las 6 sesiones de lunes a sábado.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento · Sueño reparador y tiempo libre"
                }
              ]
            }
          ]
        },
        {
          "week_number": 3,
          "label": "Semana 3 (Corrección Pierna Derecha 4:2 + 13.5 km)",
          "dates": "30 Nov – 06 Dic 2026",
          "phase_type": "Protocolo Asimetría Derecha 4:2 (Sin Prensa) & Carrera 13.5 km",
          "run_km_target": 13.5,
          "strength_sessions_target": 3,
          "coach_note": "PROTOCOLO CORRECTIVO (Tras Test 23 Nov): Eliminamos la Prensa a 1 pierna (dolor rotuliano). El Lunes 30 Nov aplicamos volumen 4:2 (4 series Derecha / 2 series Izquierda) en Extensión Cuádriceps, Curl Femoral y Gemelo, Búlgara asistida con mano en rack (0 valgo) e Hip Thrust 1P sin peso buscando extensión completa.",
          "days": [
            {
              "id": "b1-w3-d1",
              "day_short": "LUN 30 NOV",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower Correctivo (4:2 Derecha)",
              "title": "Corrección Asimetría Pierna Derecha (4s DER / 2s IZQ) — Cero Dolor Rotuliano",
              "duration_min": 55,
              "target_zone": "Protocolo 4:2 (Derecha Primero) · RIR 1-2",
              "summary": "Basado en tu test del 23 Nov: eliminamos Prensa a 1 pierna (causó molestia rotuliana) y priorizamos la pierna DERECHA con 4 series vs 2 de mantenimiento en la IZQUIERDA (mismas reps que saque la derecha). En Búlgara, sujeta ligeramente el rack con la mano contraria para anular el valgo.",
              "steps": [
                {
                  "name": "1. Activación Glúteo Medio (Clamshell / Monster Walk con Banda)",
                  "aux_type": "glute_med_band",
                  "sets": 2,
                  "reps": "15/lado",
                  "weight_kg": 0,
                  "rest_sec": 45,
                  "rir": "Foco glúteo medio derecho (anti-valgo)",
                  "target": "2 series × 15 reps/lado antes de cargar"
                },
                {
                  "name": "2. Sentadilla Búlgara Asistida (Mano en Rack · 0 Valgo)",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.72,
                  "rir": "3s DER / 2s IZQ · 1 mancuerna + mano libre en rack para estabilidad total"
                },
                {
                  "name": "3. Extensión de Cuádriceps a 1 Pierna (Prioridad #1 · Sin Dolor)",
                  "aux_type": "single_leg_extension",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "4 series DER (RIR 1-2) / 2 series IZQ · Pausa 2s arriba",
                  "target": "4 series DER × 10-12 reps / 2 series IZQ × 10-12 reps (pausa 2s arriba)"
                },
                {
                  "name": "4. Curl Femoral Sentado a 1 Pierna (Prioridad #2)",
                  "aux_type": "single_leg_curl",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "4 series DER (RIR 1-2) / 2 series IZQ · Excéntrica 3s",
                  "target": "4 series DER × 10-12 reps / 2 series IZQ × 10-12 reps (excéntrica 3s)"
                },
                {
                  "name": "5. Hip Thrust a 1 Pierna Sin Peso (Bloqueo Extensión Cadera)",
                  "aux_type": "single_leg_hip_thrust",
                  "sets": 3,
                  "reps": "10-12",
                  "weight_kg": 0,
                  "rest_sec": 60,
                  "rir": "Peso Corporal · 3s DER / 2s IZQ · Pausa 2s en extensión TOTAL arriba",
                  "target": "3 series DER / 2 series IZQ × 10-12 reps @ Peso Corporal (extensión completa arriba)"
                },
                {
                  "name": "6. Elevación de Gemelo / Sóleo a 1 Pierna (Prioridad #3)",
                  "aux_type": "single_leg_calf",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "4 series DER (objetivo subir de 10 -> 13+ reps) / 2 series IZQ",
                  "target": "4 series DER × 10-12 reps / 2 series IZQ × 10-12 reps (1s pausa arriba)"
                }
              ]
            },
            {
              "id": "b1-w3-d2",
              "day_short": "MAR 01 DIC",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Intensidad 4×4 ({bench:0.85} Banca)",
              "duration_min": 55,
              "target_zone": "85% 1RM | RIR 1-2",
              "summary": "Trabajo pesado al 85% de tu 1RM en Press Banca y tracción.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "4",
                  "pct": 0.85,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Dominadas Lastradas / Estrictras",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "5-6",
                  "pct": 0.65,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "6",
                  "pct": 0.8,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna Unilateral",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.82,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b1-w3-d3",
              "day_short": "MIÉ 02 DIC",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 3.5 km en Z2",
              "duration_min": 22,
              "distance_km": 3.5,
              "target_zone": "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              "summary": "Rodaje aeróbico fluido tras la sesión de pierna del martes.",
              "steps": [
                {
                  "name": "Rodaje Z2",
                  "target": "3.5 km @ 6:05-6:15/km (FC < 150 ppm, cadencia >=168 spm)"
                }
              ]
            },
            {
              "id": "b1-w3-d4",
              "day_short": "JUE 03 DIC",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B — Pico Bloque 1 ({ohp:0.86} Militar) + Fondos & DB Snatch",
              "duration_min": 52,
              "target_zone": "82–86% 1RM | RIR 1-2",
              "summary": "Sesión fuerte de torso cerrando los 3 días de gimnasio de la semana con Fondos y Arrancada con Mancuerna a 1 Mano.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "3-4",
                  "pct": 0.86,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 4,
                  "reps": "8",
                  "pct": 0.84,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 4,
                  "reps": "8",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 4,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 1-2)",
                  "target": "4 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 25 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 25 kg (explosivas)"
                }
              ]
            },
            {
              "id": "b1-w3-d5",
              "day_short": "VIE 04 DIC",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Fartlek Suave",
              "title": "Fartlek Controlado 4 × (2 min Z3 + 2 min Z1)",
              "duration_min": 28,
              "distance_km": 4.5,
              "target_zone": "Z3-Z4 (155 - 163 ppm) | 5:10 - 5:20 /km",
              "summary": "Con más de 100 horas de recuperación desde la pierna del lunes, introducimos 4 cambios suaves a ritmo Z3 (5:20-5:25/km) sin forzar la articulación.",
              "steps": [
                {
                  "name": "Calentamiento Z1/Z2",
                  "target": "1.2 km suaves @ 6:15/km"
                },
                {
                  "name": "4 Cambios Controlados Z3",
                  "target": "4 × [2 min @ 5:20-5:25/km (FC 154-160 ppm) + 2 min trote @ 6:30/km]"
                },
                {
                  "name": "Enfriamiento Z1",
                  "target": "0.7 km suaves"
                }
              ]
            },
            {
              "id": "b1-w3-d6",
              "day_short": "SÁB 05 DIC",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga Z2",
              "title": "Tirada Sabatina 5.5 km en Z2",
              "duration_min": 34,
              "distance_km": 5.5,
              "target_zone": "Z2 (138 - 153 ppm) | 5:55 - 6:15 /km",
              "summary": "Tu tirada aeróbica más larga del Bloque 1 sabiendo que mañana domingo tienes descanso total.",
              "steps": [
                {
                  "name": "Km 1 a 4 (Z2 Pura)",
                  "target": "4.0 km @ 6:10/km (FC 138-149 ppm)"
                },
                {
                  "name": "Km 4 a 5.5 (Z2 Estable)",
                  "target": "1.5 km @ 5:58-6:05/km (FC < 152 ppm)"
                }
              ]
            },
            {
              "id": "b1-w3-d7",
              "day_short": "DOM 06 DIC",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Supercompensación",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Descanso completo tras completar las 6 sesiones de la semana pico del Bloque 1.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Cero entrenamiento · Recuperación muscular y articular"
                }
              ]
            }
          ]
        },
        {
          "week_number": 4,
          "label": "Semana 4 (Descarga 3:1 · 70–75% 1RM)",
          "dates": "07 Dic – 13 Dic 2026",
          "phase_type": "Supercompensación & Descarga (70–75% 1RM · -25% Volumen)",
          "run_km_target": 12,
          "strength_sessions_target": 3,
          "coach_note": "Semana de descarga del Bloque 1: mantienes Lunes, Martes y Jueves de gimnasio al 70–75% 1RM con mitad de series (RIR 3-4) para supercompensar.",
          "days": [
            {
              "id": "b1-w4-d1",
              "day_short": "LUN 07 DIC",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Descarga Lower Correctivo",
              "title": "Tren Inferior — Descarga Unilateral & Control Progreso Pierna Derecha",
              "duration_min": 42,
              "target_zone": "Descarga 3:1 · Control Asimetría",
              "summary": "Bajamos volumen total manteniendo el foco en la pierna derecha (3s DER / 2s IZQ) y comprobando si la extensión de cuádriceps y gemelo derecho ya se acercan a la izquierda.",
              "steps": [
                {
                  "name": "Activación Glúteo Medio (Banda)",
                  "aux_type": "glute_med_band",
                  "sets": 2,
                  "reps": "15/lado",
                  "weight_kg": 0,
                  "rest_sec": 45,
                  "rir": "Estabilidad cadera derecha",
                  "target": "2 series × 15 reps/lado"
                },
                {
                  "name": "Sentadilla Búlgara Asistida (Mano en Rack)",
                  "lift": "split_squat_db",
                  "sets": 2,
                  "reps": "8/pierna",
                  "pct": 0.68,
                  "rir": "RIR 3 · Control alineación rodilla"
                },
                {
                  "name": "Extensión de Cuádriceps a 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "3s DER / 2s IZQ · Pausa 2s arriba",
                  "target": "3 series DER / 2 series IZQ × 12 reps"
                },
                {
                  "name": "Curl Femoral Sentado a 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "3s DER / 2s IZQ · Excéntrica 3s",
                  "target": "3 series DER / 2 series IZQ × 12 reps"
                },
                {
                  "name": "Hip Thrust a 1 Pierna Sin Peso",
                  "aux_type": "single_leg_hip_thrust",
                  "sets": 2,
                  "reps": "12",
                  "weight_kg": 0,
                  "rest_sec": 60,
                  "rir": "Peso Corporal · Extensión completa 2s",
                  "target": "2 series × 12 reps/pierna @ Peso Corporal"
                },
                {
                  "name": "Elevación de Gemelo / Sóleo a 1 Pierna",
                  "aux_type": "single_leg_calf",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "3s DER / 2s IZQ",
                  "target": "3 series DER / 2 series IZQ × 12 reps"
                }
              ]
            },
            {
              "id": "b1-w4-d2",
              "day_short": "MAR 08 DIC",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Descarga Upper A",
              "title": "Tren Superior A — Descarga Neural ({bench:0.75} Banca)",
              "duration_min": 40,
              "target_zone": "72–75% 1RM | RIR 3",
              "summary": "Mantenemos velocidad de barra al 75% 1RM reduciendo las series a la mitad.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.75,
                  "rir": "RIR 3 (rápidas)"
                },
                {
                  "name": "Dominadas Estrictras",
                  "lift": "pullup_load",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0,
                  "rir": "Peso Corporal (RIR 3)"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 2,
                  "reps": "6",
                  "pct": 0.72,
                  "rir": "RIR 3"
                },
                {
                  "name": "Remo con Mancuerna",
                  "lift": "row_db",
                  "sets": 2,
                  "reps": "10",
                  "pct": 0.7,
                  "rir": "RIR 3"
                }
              ]
            },
            {
              "id": "b1-w4-d3",
              "day_short": "MIÉ 09 DIC",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Fácil 3.5 km",
              "duration_min": 22,
              "distance_km": 3.5,
              "target_zone": "Z2 Baja (135 - 146 ppm)",
              "summary": "Comprueba cómo ha bajado tu FC a 6:05/km respecto a la Semana 1.",
              "steps": [
                {
                  "name": "Rodaje Z2",
                  "target": "3.5 km @ 6:05/km observando eficiencia cardíaca"
                }
              ]
            },
            {
              "id": "b1-w4-d4",
              "day_short": "JUE 10 DIC",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Descarga Upper B",
              "title": "Tren Superior B — Bombeo, Fondos & DB Snatch ({incline_db:0.72})",
              "duration_min": 38,
              "target_zone": "70–72% 1RM | RIR 3",
              "summary": "Sesión ligera y técnica cerrando el gimnasio de la semana.",
              "steps": [
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.72,
                  "rir": "RIR 3"
                },
                {
                  "name": "Remo en Polea / Barra",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "10",
                  "pct": 0.7,
                  "rir": "RIR 3"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 2,
                  "reps": "6",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 3)",
                  "target": "2 series × 6 reps @ Peso Corporal (RIR 3)"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (Activación)",
                  "aux_type": "db_snatch",
                  "sets": 2,
                  "reps": "10",
                  "weight_kg": 22.5,
                  "rest_sec": 75,
                  "rir": "5/brazo explosivas @ 22.5 kg",
                  "target": "2 series × 10 reps (5/brazo) @ 22.5 kg"
                }
              ]
            },
            {
              "id": "b1-w4-d5",
              "day_short": "VIE 11 DIC",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Chispa",
              "title": "Activación de Ritmo 4 × 400m Fluidos",
              "duration_min": 25,
              "distance_km": 4,
              "target_zone": "Z2 + Toques Z4 (5:00/km)",
              "summary": "Sesión corta y fresca para sentir ligereza de piernas sin fatigar para mañana.",
              "steps": [
                {
                  "name": "Calentamiento Z2",
                  "target": "1.5 km @ 6:15/km"
                },
                {
                  "name": "4 × 400m",
                  "target": "4 × 400m @ 5:00/km (1:12 por 400m) rec 200m trote"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.9 km suaves"
                }
              ]
            },
            {
              "id": "b1-w4-d6",
              "day_short": "SÁB 12 DIC",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Z2",
              "title": "Tirada Sabatina Cómoda 4.5 km en Z2",
              "duration_min": 27,
              "distance_km": 4.5,
              "target_zone": "Z2 (138 - 150 ppm) | 6:00 /km",
              "summary": "Cierre del Bloque 1 con sensación de reserva total de energía.",
              "steps": [
                {
                  "name": "Rodaje Continuo Z2",
                  "target": "4.5 km @ 6:00/km (FC < 150 ppm)"
                }
              ]
            },
            {
              "id": "b1-w4-d7",
              "day_short": "DOM 13 DIC",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Fin del Bloque 1",
              "duration_min": 0,
              "target_zone": "Recuperación",
              "summary": "Objetivo: llevar la VFC semanal por encima de 54 ms antes de iniciar el Bloque 2.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento · Sueño >7.5h"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "block-2",
      "number": 2,
      "name": "Bloque 2: Desarrollo de Umbral (LTHR) & Fuerza Máxima (85%–92% 1RM)",
      "dates": "14 Dic 2026 – 10 Ene 2027 (Semanas 5 a 8)",
      "focus": "Desplazar tu ritmo de Umbral de Lactato (163 ppm) hacia 5:05-5:10/km los viernes + tiradas sabatinas Z2, trabajando del 85% al 92% 1RM los Lunes-Martes-Jueves.",
      "target_run_km_range": "15.0 → 19.5 km/sem",
      "target_strength_sessions": "3 sesiones/sem (Lun: Lower · Mar: Upper A · Jue: Upper B)",
      "weeks": [
        {
          "week_number": 5,
          "label": "Semana 5 (Inicio Umbral · 85% 1RM)",
          "dates": "14 Dic – 20 Dic 2026",
          "phase_type": "Construcción de Umbral & Fuerza (84–86% 1RM)",
          "run_km_target": 15,
          "strength_sessions_target": 3,
          "coach_note": "Lunes Sentadilla al 85% ({squat:0.85}) + RDL ({rdl:0.84}), Martes Banca al 86% 1RM ({bench:0.86}), Miércoles 4.0 km Z2, Jueves Upper B, Viernes 3×1.000m Umbral (4.5 km) y Sábado 6.5 km Z2.",
          "days": [
            {
              "id": "b2-w5-d1",
              "day_short": "LUN 14 DIC",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower Correctivo (4:2) + RDL",
              "title": "Tren Inferior — Corrección Derecha (4:2) + RDL ({rdl:0.82})",
              "duration_min": 50,
              "target_zone": "84–85% 1RM | RIR 2",
              "summary": "Seguimos cerrando la brecha de la pierna derecha (4s DER / 2s IZQ) e introducimos Peso Muerto Rumano (cero estrés rotuliano) para cadena posterior.",
              "steps": [
                {
                  "name": "Peso Muerto Rumano (RDL · Cadena Posterior sin dolor rotuliano)",
                  "lift": "rdl",
                  "sets": 3,
                  "reps": "6",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Sentadilla Búlgara Asistida (Mano en Rack)",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.78,
                  "rir": "3s DER / 2s IZQ (0 valgo)"
                },
                {
                  "name": "Extensión de Cuádriceps a 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ · Pausa 2s arriba",
                  "target": "4 series DER / 2 series IZQ × 10-12 reps"
                },
                {
                  "name": "Curl Femoral Sentado a 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ · Excéntrica 3s",
                  "target": "4 series DER / 2 series IZQ × 10-12 reps"
                },
                {
                  "name": "Hip Thrust a 1 Pierna (Sin Peso o +5 kg si ya bloqueas 12 reps)",
                  "aux_type": "single_leg_hip_thrust",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 0,
                  "rest_sec": 60,
                  "rir": "Extensión completa 2s arriba",
                  "target": "3 series × 12 reps/pierna"
                },
                {
                  "name": "Elevación de Gemelo / Sóleo a 1 Pierna",
                  "aux_type": "single_leg_calf",
                  "sets": 4,
                  "reps": "12-15",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ (igualar 15 reps)",
                  "target": "4 series DER / 2 series IZQ × 12-15 reps"
                }
              ]
            },
            {
              "id": "b2-w5-d2",
              "day_short": "MAR 15 DIC",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Bloque Fuerza ({bench:0.86} Banca)",
              "duration_min": 55,
              "target_zone": "84–86% 1RM | RIR 1-2",
              "summary": "Subimos al 86% de tu 1RM en Press Banca en series de 4 repeticiones.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "4",
                  "pct": 0.86,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "5-6",
                  "pct": 0.7,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5-6",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna Unilateral",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.84,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b2-w5-d3",
              "day_short": "MIÉ 16 DIC",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 4.0 km",
              "duration_min": 24,
              "distance_km": 4,
              "target_zone": "Z2 (135 - 150 ppm) | 5:55 - 6:10 /km",
              "summary": "Rodaje fluido de recuperación activa post-pierna.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.0 km @ 6:00/km (FC < 150 ppm)"
                }
              ]
            },
            {
              "id": "b2-w5-d4",
              "day_short": "JUE 17 DIC",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.86} Militar) + Fondos & DB Snatch",
              "duration_min": 50,
              "target_zone": "84–86% 1RM | RIR 2",
              "summary": "Fuerza de torso, fondos en paralelas y potencia explosiva unilateral con Arrancada de Mancuerna.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "4",
                  "pct": 0.86,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 4,
                  "reps": "8",
                  "pct": 0.84,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 8 Fondos @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "14",
                  "weight_kg": 25,
                  "rest_sec": 75,
                  "rir": "7/brazo explosivas @ 25 kg",
                  "target": "3 series × 14 reps (7/brazo) @ 25 kg"
                }
              ]
            },
            {
              "id": "b2-w5-d5",
              "day_short": "VIE 18 DIC",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Calidad Umbral",
              "title": "Bloques de Umbral 3 × 1.000m (Z3/Z4)",
              "duration_min": 28,
              "distance_km": 4.5,
              "target_zone": "Z4 (160 - 165 ppm) | 5:08 - 5:15 /km",
              "summary": "Con 72h de recuperación desde el martes, acumulamos 4.5 km a ritmo de umbral con 90s de descanso.",
              "steps": [
                {
                  "name": "Calentamiento Z1/Z2",
                  "target": "1.0 km @ 6:15/km"
                },
                {
                  "name": "3 × 1.000m Umbral",
                  "target": "3 × 1.0 km @ 5:12-5:15/km (FC 158-163 ppm) rec 90s trote"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km trote suave"
                }
              ]
            },
            {
              "id": "b2-w5-d6",
              "day_short": "SÁB 19 DIC",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga Z2",
              "title": "Tirada Larga Sabatina 6.5 km en Z2",
              "duration_min": 39,
              "distance_km": 6.5,
              "target_zone": "Z2 (138 - 151 ppm) | 5:55 - 6:05 /km",
              "summary": "Más de 50 minutos continuos en Zona 2 aeróbica estricta antes del domingo libre.",
              "steps": [
                {
                  "name": "Tirada Continua Z2",
                  "target": "6.5 km @ 6:00/km (FC media ~145 ppm, sin pasar de 151 ppm)"
                }
              ]
            },
            {
              "id": "b2-w5-d7",
              "day_short": "DOM 20 DIC",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Día de descanso personal fijo.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento · Recuperación muscular y sueño"
                }
              ]
            }
          ]
        },
        {
          "week_number": 6,
          "label": "Semana 6 (Consolidación · 88% 1RM)",
          "dates": "21 Dic – 27 Dic 2026",
          "phase_type": "Carga Específica Híbrida (88% 1RM · 17.5 km Carrera)",
          "run_km_target": 17.5,
          "strength_sessions_target": 3,
          "coach_note": "Progresión limpia a 17.5 km semanales: Lunes Peso Muerto al 88% ({deadlift:0.88}), Martes Banca al 88% ({bench:0.88}), Viernes 3×1.500m Umbral (5.5 km) y Sábado 8.0 km Z2.",
          "days": [
            {
              "id": "b2-w6-d1",
              "day_short": "LUN 21 DIC",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower Correctivo (4:2) + PM",
              "title": "Tren Inferior — Peso Muerto ({deadlift:0.86}) & Corrección Derecha (4:2)",
              "duration_min": 50,
              "target_zone": "82–88% 1RM | RIR 2",
              "summary": "3×3 al 88% 1RM en Peso Muerto con velocidad de barra alta.",
              "steps": [
                {
                  "name": "Peso Muerto Barra (Deadlift)",
                  "lift": "deadlift",
                  "sets": 3,
                  "reps": "3-4",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.8,
                  "rir": "3s DER / 2s IZQ (tibia vertical)"
                },
                {
                  "name": "Extensión de Cuádriceps a 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 30,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ · Pausa 2s arriba",
                  "target": "4 series DER / 2 series IZQ × 10-12 reps"
                },
                {
                  "name": "Curl Femoral Sentado a 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 4,
                  "reps": "10-12",
                  "weight_kg": 30,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ · Excéntrica 3s",
                  "target": "4 series DER / 2 series IZQ × 10-12 reps"
                },
                {
                  "name": "Elevación de Gemelo / Sóleo a 1 Pierna",
                  "aux_type": "single_leg_calf",
                  "sets": 4,
                  "reps": "12-15",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "4s DER / 2s IZQ",
                  "target": "4 series DER / 2 series IZQ × 12-15 reps"
                }
              ]
            },
            {
              "id": "b2-w6-d2",
              "day_short": "MAR 22 DIC",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Serie Top 88% 1RM ({bench:0.88} Banca)",
              "duration_min": 55,
              "target_zone": "88% 1RM | RIR 1-2",
              "summary": "Bloques de 3 repeticiones al 88% de tu 1RM en Press Banca.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "3",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "5",
                  "pct": 0.75,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.84,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.85,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b2-w6-d3",
              "day_short": "MIÉ 23 DIC",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico Z2 4.0 km",
              "duration_min": 24,
              "distance_km": 4,
              "target_zone": "Z2 (135 - 150 ppm) | 5:55 - 6:05 /km",
              "summary": "Rodaje cómodo de oxigenación a mitad de semana.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.0 km @ 6:00/km"
                }
              ]
            },
            {
              "id": "b2-w6-d4",
              "day_short": "JUE 24 DIC",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.88} Militar) + Fondos & DB Snatch — Nochebuena",
              "duration_min": 48,
              "target_zone": "85–88% 1RM | RIR 2",
              "summary": "Completamos los 3 días de gimnasio (L-M-J) al mediodía incluyendo Fondos y Arrancada con Mancuerna a 1 Mano.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "3-4",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "14",
                  "weight_kg": 27.5,
                  "rest_sec": 75,
                  "rir": "7/brazo explosivas @ 27.5 kg",
                  "target": "3 series × 14 reps (7/brazo) @ 27.5 kg"
                }
              ]
            },
            {
              "id": "b2-w6-d5",
              "day_short": "VIE 25 DIC",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Calidad 2×2km+1km",
              "title": "Cruise Intervals: 3 × 1.500m en Umbral (Z4)",
              "duration_min": 34,
              "distance_km": 5.5,
              "target_zone": "Z4 (161 - 166 ppm) | 5:05 - 5:12 /km",
              "summary": "Sostener 10 minutos seguidos a ritmo de umbral con pulso estable al aire libre.",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "0.5 km @ 6:15/km"
                },
                {
                  "name": "3 × 1.500m Umbral",
                  "target": "3×1.5km @ 5:10/km (rec 90s trote)"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km trote"
                }
              ]
            },
            {
              "id": "b2-w6-d6",
              "day_short": "SÁB 26 DIC",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga Z2",
              "title": "Tirada Larga Sabatina 8.0 km en Z2",
              "duration_min": 48,
              "distance_km": 8,
              "target_zone": "Z2 (138 - 152 ppm) | 5:50 - 6:05 /km",
              "summary": "Rozando la distancia de 10K íntegramente en Zona 2 aeróbica antes de tu domingo de descanso.",
              "steps": [
                {
                  "name": "Km 1 a 6 (Z2 Estable)",
                  "target": "6.0 km @ 6:00/km (FC < 149 ppm)"
                },
                {
                  "name": "Km 6 a 8.0 (Z2 Techo)",
                  "target": "2.0 km @ 5:48/km (FC 149-152 ppm)"
                }
              ]
            },
            {
              "id": "b2-w6-d7",
              "day_short": "DOM 27 DIC",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Descanso completo fijo del domingo.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento"
                }
              ]
            }
          ]
        },
        {
          "week_number": 7,
          "label": "Semana 7 (Pico Bloque 2 · 90–92% 1RM)",
          "dates": "28 Dic 2026 – 03 Ene 2027",
          "phase_type": "Pico de Umbral & Fuerza (90–92% 1RM · 19.5 km Carrera)",
          "run_km_target": 19.5,
          "strength_sessions_target": 3,
          "coach_note": "Semana cumbre del Bloque 2: Lunes Sentadilla al 90% ({squat:0.90}), Martes Banca al 92% 1RM ({bench:0.92}), Viernes 2×2.000m Umbral (6.0 km) y Sábado 9.0 km Z2.",
          "days": [
            {
              "id": "b2-w7-d1",
              "day_short": "LUN 28 DIC",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower",
              "title": "Tren Inferior — Sentadilla 90% 1RM ({squat:0.90}) & RDL ({rdl:0.86})",
              "duration_min": 52,
              "target_zone": "86–90% 1RM | RIR 1-2",
              "summary": "Fuerza máxima controlada en tren inferior con 53.5h hasta el miércoles y >100h de margen hasta el Tempo Run del viernes.",
              "steps": [
                {
                  "name": "Sentadilla Trasera Barra",
                  "lift": "squat",
                  "sets": 3,
                  "reps": "3",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Peso Muerto Rumano (RDL)",
                  "lift": "rdl",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.82,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Curl Femoral 1 Pierna + Extensión Cuádriceps 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 3,
                  "reps": "10/pierna",
                  "weight_kg": 30,
                  "rest_sec": 60,
                  "rir": "Simetría Izq/Der",
                  "target": "3 series × 10 reps/pierna"
                },
                {
                  "name": "Elevación de Sóleo Sentado / 1 Pierna",
                  "lift": "soleus",
                  "sets": 4,
                  "reps": "10-12",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                }
              ]
            },
            {
              "id": "b2-w7-d2",
              "day_short": "MAR 29 DIC",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Pico 92% 1RM ({bench:0.92} Press Banca)",
              "duration_min": 55,
              "target_zone": "90–92% 1RM | RIR 1",
              "summary": "Series pesadas de 2-3 repeticiones al 92% de tu 1RM manteniendo 22 km de carrera semanal.",
              "steps": [
                {
                  "name": "Press Banca Barra (Pico)",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "2-3",
                  "pct": 0.92,
                  "rir": "RIR 1"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "4-5",
                  "pct": 0.85,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.86,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Remo con Mancuerna",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.86,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b2-w7-d3",
              "day_short": "MIÉ 30 DIC",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 4.5 km en Z2",
              "duration_min": 27,
              "distance_km": 4.5,
              "target_zone": "Z2 (138 - 151 ppm) | 5:50 - 6:00 /km",
              "summary": "Rodaje aeróbico fluido a mitad de semana.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.5 km @ 5:55/km"
                }
              ]
            },
            {
              "id": "b2-w7-d4",
              "day_short": "JUE 31 DIC",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.90} Militar) + Fondos & DB Snatch — Fin de Año",
              "duration_min": 50,
              "target_zone": "86–90% 1RM | RIR 1-2",
              "summary": "Última sesión de gimnasio del año el jueves al mediodía con Fondos y Arrancada con Mancuerna a 1 Mano.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "3",
                  "pct": 0.9,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 4,
                  "reps": "8",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 1-2)",
                  "target": "3 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "14",
                  "weight_kg": 27.5,
                  "rest_sec": 75,
                  "rir": "7/brazo explosivas @ 27.5 kg",
                  "target": "3 series × 14 reps (7/brazo) @ 27.5 kg"
                }
              ]
            },
            {
              "id": "b2-w7-d5",
              "day_short": "VIE 01 ENE",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Tempo 4K",
              "title": "Tempo Run Continuo 4.0 km en Z3/Z4",
              "duration_min": 36,
              "distance_km": 6,
              "target_zone": "Z3-Z4 (158 - 165 ppm) | 5:05 - 5:10 /km",
              "summary": "20 minutos continuos a ritmo de umbral con piernas totalmente recuperadas del martes.",
              "steps": [
                {
                  "name": "Calentamiento Z1/Z2",
                  "target": "1.5 km @ 6:10/km"
                },
                {
                  "name": "Bloque Tempo Continuo",
                  "target": "4.0 km @ 5:05-5:10/km (FC 158-165 ppm)"
                },
                {
                  "name": "Enfriamiento Z1",
                  "target": "1.0 km @ 6:25/km"
                }
              ]
            },
            {
              "id": "b2-w7-d6",
              "day_short": "SÁB 02 ENE",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga Z2",
              "title": "Tirada Larga Sabatina 9.0 km en Z2",
              "duration_min": 53,
              "distance_km": 9,
              "target_zone": "Z2 (138 - 152 ppm) | 5:50 - 6:00 /km",
              "summary": "Superamos la distancia de 10 km en entrenamiento aeróbico cómodo antes del descanso dominical.",
              "steps": [
                {
                  "name": "Rodaje 9.0 km Z2",
                  "target": "9.0 km @ 5:55/km (FC < 152 ppm)"
                }
              ]
            },
            {
              "id": "b2-w7-d7",
              "day_short": "DOM 03 ENE",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Día completo de descanso tras superar los 22 km semanales.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento · Sueño >7.5h"
                }
              ]
            }
          ]
        },
        {
          "week_number": 8,
          "label": "Semana 8 (Descarga 3:1 · 75% 1RM)",
          "dates": "04 Ene – 10 Ene 2027",
          "phase_type": "Descarga & Asimilación Bloque 2 (72–75% 1RM)",
          "run_km_target": 14.5,
          "strength_sessions_target": 3,
          "coach_note": "Semana de descarga del Bloque 2: bajamos cargas al 72–75% 1RM (RIR 3-4) manteniendo Lunes-Martes-Jueves en gimnasio y Miércoles-Viernes-Sábado de carrera.",
          "days": [
            {
              "id": "b2-w8-d1",
              "day_short": "LUN 04 ENE",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Descarga Lower",
              "title": "Tren Inferior Ligero ({squat:0.74} Sentadilla) & Movilidad",
              "duration_min": 38,
              "target_zone": "72–74% 1RM | RIR 3-4",
              "summary": "Mantenimiento neuromuscular sin daño muscular.",
              "steps": [
                {
                  "name": "Re-Test Simetría: Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.78,
                  "rir": "Evaluar estabilidad y 0 valgo DER vs IZQ"
                },
                {
                  "name": "Re-Test Simetría: Extensión Cuádriceps a 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "Objetivo: diferencia <=1 RIR entre DER e IZQ",
                  "target": "3 series × 12 reps/pierna (comparar RIR DER vs IZQ)"
                },
                {
                  "name": "Re-Test Simetría: Curl Femoral Sentado a 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "Objetivo: diferencia <=1 RIR entre DER e IZQ",
                  "target": "3 series × 12 reps/pierna"
                },
                {
                  "name": "Re-Test Simetría: Gemelo / Sóleo a 1 Pierna",
                  "aux_type": "single_leg_calf",
                  "sets": 3,
                  "reps": "15",
                  "weight_kg": 25,
                  "rest_sec": 60,
                  "rir": "Objetivo: 15 reps en ambas piernas",
                  "target": "3 series × 15 reps/pierna"
                }
              ]
            },
            {
              "id": "b2-w8-d2",
              "day_short": "MAR 05 ENE",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Descarga Upper A",
              "title": "Tren Superior A — Descarga Activa ({bench:0.75} Banca)",
              "duration_min": 40,
              "target_zone": "75% 1RM | RIR 3",
              "summary": "3 series fluidas sin fatiga acumulada.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.75,
                  "rir": "RIR 3"
                },
                {
                  "name": "Dominadas Estrictras",
                  "lift": "pullup_load",
                  "sets": 3,
                  "reps": "6",
                  "pct": 0,
                  "rir": "Peso Corporal"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 2,
                  "reps": "6",
                  "pct": 0.74,
                  "rir": "RIR 3"
                }
              ]
            },
            {
              "id": "b2-w8-d3",
              "day_short": "MIÉ 06 ENE",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Suave 4.0 km",
              "duration_min": 24,
              "distance_km": 4,
              "target_zone": "Z2 (135 - 148 ppm)",
              "summary": "Piernas sueltas y cadencia ágil.",
              "steps": [
                {
                  "name": "Rodaje Z2",
                  "target": "4.0 km @ 5:55/km"
                }
              ]
            },
            {
              "id": "b2-w8-d4",
              "day_short": "JUE 07 ENE",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Descarga Upper B",
              "title": "Tren Superior B Ligero ({incline_db:0.74}) + Fondos & DB Snatch",
              "duration_min": 38,
              "target_zone": "72–74% 1RM | RIR 3",
              "summary": "Bombeo articular sin estrés sistémico.",
              "steps": [
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.74,
                  "rir": "RIR 3"
                },
                {
                  "name": "Remo en Polea / Barra",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8-10",
                  "pct": 0.72,
                  "rir": "RIR 3"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 2,
                  "reps": "7",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 3)",
                  "target": "2 series × 7 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (Activación)",
                  "aux_type": "db_snatch",
                  "sets": 2,
                  "reps": "10",
                  "weight_kg": 22.5,
                  "rest_sec": 75,
                  "rir": "5/brazo fluido @ 22.5 kg",
                  "target": "2 series × 10 reps (5/brazo) @ 22.5 kg"
                }
              ]
            },
            {
              "id": "b2-w8-d5",
              "day_short": "VIE 08 ENE",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Ritmo 10K",
              "title": "3 × 1.000m a Ritmo 10K Objetivo (4:58/km)",
              "duration_min": 28,
              "distance_km": 4.5,
              "target_zone": "Z4 (160 - 165 ppm) | 4:55 - 5:00 /km",
              "summary": "Toma de contacto con el ritmo Sub-50' con volumen bajo.",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "1.0 km @ 6:10/km"
                },
                {
                  "name": "3 × 1.000m",
                  "target": "3 × 1km @ 4:58/km rec 2 min"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km suaves"
                }
              ]
            },
            {
              "id": "b2-w8-d6",
              "day_short": "SÁB 09 ENE",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Z2",
              "title": "Tirada Sabatina 6.0 km en Z2",
              "duration_min": 35,
              "distance_km": 6,
              "target_zone": "Z2 (138 - 150 ppm) | 5:50 /km",
              "summary": "Notarás que a 5:50/km el pulso va 5-7 ppm más bajo que en noviembre.",
              "steps": [
                {
                  "name": "Rodaje Z2",
                  "target": "6.0 km @ 5:50/km"
                }
              ]
            },
            {
              "id": "b2-w8-d7",
              "day_short": "DOM 10 ENE",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Fin del Bloque 2",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Recarga completa antes de entrar en el Bloque 3 específico Sub-50'.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Dormir >7.5h y recargar Body Battery"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "block-3",
      "number": 3,
      "name": "Bloque 3: Pico Específico VO2máx & Mantenimiento Neural (85%–92% 1RM)",
      "dates": "11 Ene 2027 – 07 Feb 2027 (Semanas 9 a 12)",
      "focus": "Series específicas de VO2máx y ritmo 10K (<5:00/km) los viernes, tiradas largas de hasta 12 km los sábados y mantenimiento neural de fuerza L-M-J con bajo volumen.",
      "target_run_km_range": "19.5 → 22.5 km/sem (Tapering Sem 12)",
      "target_strength_sessions": "3 sesiones/sem (Lun: Lower · Mar: Upper A Neural · Jue: Upper B)",
      "weeks": [
        {
          "week_number": 9,
          "label": "Semana 9 (VO2máx 800m)",
          "dates": "11 Ene – 17 Ene 2027",
          "phase_type": "Potencia Aeróbica VO2máx & Fuerza Neural (86–90% 1RM)",
          "run_km_target": 19.5,
          "strength_sessions_target": 3,
          "coach_note": "Lunes pierna neural (3×3 al 86% 1RM en Sentadilla {squat:0.86} con bajo volumen) para llegar pletórico al 6×800m del viernes.",
          "days": [
            {
              "id": "b3-w9-d1",
              "day_short": "LUN 11 ENE",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower Neural",
              "title": "Tren Inferior — Mantenimiento Neural ({squat:0.86} Sentadilla)",
              "duration_min": 45,
              "target_zone": "84–86% 1RM | RIR 2-3",
              "summary": "Pocas repeticiones, alta carga y cero fatiga metabólica para llegar fresco al viernes.",
              "steps": [
                {
                  "name": "Sentadilla Trasera Barra",
                  "lift": "squat",
                  "sets": 3,
                  "reps": "3",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "6-8/pierna",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Curl Femoral 1 Pierna + Extensión Cuádriceps 1 Pierna",
                  "aux_type": "single_leg_curl",
                  "sets": 3,
                  "reps": "10/pierna",
                  "weight_kg": 30,
                  "rest_sec": 60,
                  "rir": "Mantenimiento unilateral",
                  "target": "3 series × 10 reps/pierna"
                },
                {
                  "name": "Elevación de Sóleo Sentado Pesado",
                  "lift": "soleus",
                  "sets": 4,
                  "reps": "10",
                  "pct": 0.88,
                  "rir": "RIR 1-2"
                }
              ]
            },
            {
              "id": "b3-w9-d2",
              "day_short": "MAR 12 ENE",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Fuerza Pura 4×3 ({bench:0.90} Banca)",
              "duration_min": 50,
              "target_zone": "88–90% 1RM | RIR 2",
              "summary": "Mantenimiento de alta intensidad en torso.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "3",
                  "pct": 0.9,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "5",
                  "pct": 0.8,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.85,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b3-w9-d3",
              "day_short": "MIÉ 13 ENE",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 4.5 km + 4 Strides",
              "duration_min": 27,
              "distance_km": 4.5,
              "target_zone": "Z2 (136 - 150 ppm) | 5:50 /km",
              "summary": "Rodaje fácil de asimilación tras el martes de gimnasio.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.5 km @ 5:50/km"
                }
              ]
            },
            {
              "id": "b3-w9-d4",
              "day_short": "JUE 14 ENE",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.88} Militar) + Fondos, DB Snatch & Core",
              "duration_min": 50,
              "target_zone": "85–88% 1RM | RIR 2",
              "summary": "Empuje, tracción, fondos en paralelas, arrancada con mancuerna a 1 mano y estabilidad de tronco.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "4",
                  "pct": 0.88,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 27.5,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 27.5 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 27.5 kg"
                },
                {
                  "name": "Press Pallof + Plancha Lateral",
                  "aux_type": "core",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 0,
                  "rest_sec": 45,
                  "rir": "Core antirotación",
                  "target": "3 series × 12 reps/lado"
                }
              ]
            },
            {
              "id": "b3-w9-d5",
              "day_short": "VIE 15 ENE",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Calidad 6×800m",
              "title": "Series VO2máx / Ritmo 10K: 6 × 800m",
              "duration_min": 38,
              "distance_km": 5.5,
              "target_zone": "Z4-Z5 (163 - 172 ppm) | 4:48 - 4:54 /km",
              "summary": "4.8 km acumulados por debajo de 5:00/km con piernas descansadas (72h post-pierna).",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "1.2 km @ 6:05/km + 3 rectas"
                },
                {
                  "name": "6 × 800m",
                  "target": "6 × 800m @ 4:50/km (3:52 por 800m) rec 90s trote"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km suaves"
                }
              ]
            },
            {
              "id": "b3-w9-d6",
              "day_short": "SÁB 16 ENE",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada 10.5K Z2",
              "title": "Tirada Larga Sabatina 9.5 km en Z2",
              "duration_min": 56,
              "distance_km": 9.5,
              "target_zone": "Z2 Estricta (136 - 150 ppm) | 5:50 - 6:00 /km",
              "summary": "Resistencia aeróbica en Zona 2 antes de tu domingo completo de descanso.",
              "steps": [
                {
                  "name": "Km 1 a 9.5 (Z2 Pura)",
                  "target": "9.5 km @ 5:55/km (FC < 150 ppm)"
                }
              ]
            },
            {
              "id": "b3-w9-d7",
              "day_short": "DOM 17 ENE",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Día de descanso personal fijo.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento"
                }
              ]
            }
          ]
        },
        {
          "week_number": 10,
          "label": "Semana 10 (Específico 5×1000m · 90–92% 1RM)",
          "dates": "18 Ene – 24 Ene 2027",
          "phase_type": "Especificidad 10K & Pico Neural (90–92% 1RM)",
          "run_km_target": 21.5,
          "strength_sessions_target": 3,
          "coach_note": "Lunes Peso Muerto al 92% 1RM ({deadlift:0.92}, bajo volumen), Viernes sesión reina 5 × 1.000m @ 4:50-4:55/km y Sábado tirada de 11.5 km Z2.",
          "days": [
            {
              "id": "b3-w10-d1",
              "day_short": "LUN 18 ENE",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower",
              "title": "Tren Inferior — Peso Muerto 92% 1RM ({deadlift:0.92}) & Sentadilla ({squat:0.84})",
              "duration_min": 45,
              "target_zone": "84–92% 1RM | RIR 2",
              "summary": "Series cortas de 2-3 repeticiones al 92% 1RM en Peso Muerto a 53.5h hasta el miércoles y >100h del 5×1000m del viernes.",
              "steps": [
                {
                  "name": "Peso Muerto Barra (Deadlift)",
                  "lift": "deadlift",
                  "sets": 3,
                  "reps": "2-3",
                  "pct": 0.9,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 3,
                  "reps": "8/pierna",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Extensión Cuádriceps 1 Pierna + Curl Femoral 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 3,
                  "reps": "10/pierna",
                  "weight_kg": 30,
                  "rest_sec": 60,
                  "rir": "Mantenimiento simetría Izq/Der",
                  "target": "3 series × 10 reps/pierna"
                },
                {
                  "name": "Hip Thrust a 1 Pierna + Sóleo a 1 Pierna",
                  "aux_type": "single_leg_calf",
                  "sets": 3,
                  "reps": "12/pierna",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "Potencia glúteo/Aquiles",
                  "target": "3 series × 12 reps/pierna"
                }
              ]
            },
            {
              "id": "b3-w10-d2",
              "day_short": "MAR 19 ENE",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — Pesado Controlado ({bench:0.92} Banca)",
              "duration_min": 50,
              "target_zone": "90–92% 1RM | RIR 1-2",
              "summary": "Mantenimiento de fuerza máxima en banca y dominadas.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "2-3",
                  "pct": 0.92,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "4-5",
                  "pct": 0.85,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.86,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b3-w10-d3",
              "day_short": "MIÉ 20 ENE",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 4.5 km",
              "duration_min": 29,
              "distance_km": 4.5,
              "target_zone": "Z2 (136 - 150 ppm) | 5:50 /km",
              "summary": "Rodaje cómodo de 5 km a mitad de semana.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.5 km @ 5:50/km"
                }
              ]
            },
            {
              "id": "b3-w10-d4",
              "day_short": "JUE 21 ENE",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B ({ohp:0.90} Militar) + Fondos & DB Snatch",
              "duration_min": 48,
              "target_zone": "86–90% 1RM | RIR 2",
              "summary": "Tercer día de gimnasio (Jueves): torso fuerte, fondos en paralelas y arrancada con mancuerna a 1 mano sin fatiga de piernas.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 4,
                  "reps": "3",
                  "pct": 0.9,
                  "rir": "RIR 1-2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.88,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Mancuerna",
                  "lift": "row_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.86,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 27.5,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 27.5 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 27.5 kg"
                }
              ]
            },
            {
              "id": "b3-w10-d5",
              "day_short": "VIE 22 ENE",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Calidad 5×1.000m",
              "title": "Específico 10K: 5 × 1.000m (Rec 90s)",
              "duration_min": 40,
              "distance_km": 6.5,
              "target_zone": "Z4-Z5 (162 - 170 ppm) | 4:50 - 4:55 /km",
              "summary": "5 kilómetros fraccionados más rápido que el ritmo objetivo de Sub-50'.",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "1.5 km @ 6:05/km"
                },
                {
                  "name": "5 × 1.000m",
                  "target": "5 × 1km @ 4:50-4:55/km rec 90s trote suave"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km trote"
                }
              ]
            },
            {
              "id": "b3-w10-d6",
              "day_short": "SÁB 23 ENE",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga 11.5K",
              "title": "Tirada Larga Sabatina 10.5 km en Z2",
              "duration_min": 61,
              "distance_km": 10.5,
              "target_zone": "Z2 (138 - 151 ppm) | 5:50 - 5:55 /km",
              "summary": "Resistencia aeróbica sobrada para que los kilómetros 8 a 10 del 10K no pesen.",
              "steps": [
                {
                  "name": "Tirada 10.5 km Z2",
                  "target": "10.5 km @ 5:52/km (FC < 151 ppm)"
                }
              ]
            },
            {
              "id": "b3-w10-d7",
              "day_short": "DOM 24 ENE",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Recuperación Completa",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Descanso completo fijo del domingo.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento"
                }
              ]
            }
          ]
        },
        {
          "week_number": 11,
          "label": "Semana 11 (Simulacro Específico · 85–88% 1RM)",
          "dates": "25 Ene – 31 Ene 2027",
          "phase_type": "Pico Específico 10K (85–88% 1RM · 22.5 km Carrera)",
          "run_km_target": 22.5,
          "strength_sessions_target": 3,
          "coach_note": "Última semana fuerte antes del Tapering: Gimnasio L-M-J al 85–88% 1RM, Viernes simulacro 3×2.000m @ 4:56/km y Sábado tirada pico de 12 km Z2.",
          "days": [
            {
              "id": "b3-w11-d1",
              "day_short": "LUN 25 ENE",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · Lower",
              "title": "Tren Inferior — Activación 3×3 ({squat:0.84} Sentadilla)",
              "duration_min": 42,
              "target_zone": "82–84% 1RM | RIR 2-3",
              "summary": "Última sesión pesada de pierna a 53.5h hasta el miércoles y >100h del 3×2.000m del viernes.",
              "steps": [
                {
                  "name": "Sentadilla Trasera Barra",
                  "lift": "squat",
                  "sets": 3,
                  "reps": "3",
                  "pct": 0.84,
                  "rir": "RIR 2-3"
                },
                {
                  "name": "Sentadilla Búlgara Unilateral",
                  "lift": "split_squat_db",
                  "sets": 2,
                  "reps": "8/pierna",
                  "pct": 0.78,
                  "rir": "RIR 2-3"
                },
                {
                  "name": "Extensión Cuádriceps 1 Pierna + Curl Femoral 1 Pierna",
                  "aux_type": "single_leg_extension",
                  "sets": 2,
                  "reps": "10/pierna",
                  "weight_kg": 27.5,
                  "rest_sec": 60,
                  "rir": "RIR 2-3",
                  "target": "2 series × 10 reps/pierna"
                },
                {
                  "name": "Elevación de Sóleo Sentado",
                  "lift": "soleus",
                  "sets": 3,
                  "reps": "12",
                  "pct": 0.82,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b3-w11-d2",
              "day_short": "MAR 26 ENE",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Upper A",
              "title": "Tren Superior A — 4×3 ({bench:0.88} Banca)",
              "duration_min": 48,
              "target_zone": "88% 1RM | RIR 2",
              "summary": "Fuerza sólida sin llegar al fallo.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 4,
                  "reps": "3",
                  "pct": 0.88,
                  "rir": "RIR 2"
                },
                {
                  "name": "Dominadas Lastradas",
                  "lift": "pullup_load",
                  "sets": 4,
                  "reps": "5",
                  "pct": 0.75,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "5",
                  "pct": 0.84,
                  "rir": "RIR 2"
                }
              ]
            },
            {
              "id": "b3-w11-d3",
              "day_short": "MIÉ 27 ENE",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Base Z2",
              "title": "Rodaje Aeróbico 4.5 km",
              "duration_min": 26,
              "distance_km": 4.5,
              "target_zone": "Z2 (135 - 149 ppm) | 5:48 /km",
              "summary": "Rodaje fluido y económico.",
              "steps": [
                {
                  "name": "Rodaje Z2 + 4 Strides",
                  "target": "4.5 km @ 5:48/km"
                }
              ]
            },
            {
              "id": "b3-w11-d4",
              "day_short": "JUE 28 ENE",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Upper B",
              "title": "Tren Superior B — Mantenimiento ({ohp:0.85} Militar) + Fondos & DB Snatch",
              "duration_min": 48,
              "target_zone": "84–85% 1RM | RIR 2",
              "summary": "Sesión limpia de torso con Fondos y Arrancada con Mancuerna a 1 Mano cerrando el gimnasio semanal.",
              "steps": [
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 3,
                  "reps": "4-5",
                  "pct": 0.85,
                  "rir": "RIR 2"
                },
                {
                  "name": "Press Inclinado Mancuernas",
                  "lift": "incline_db",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.84,
                  "rir": "RIR 2"
                },
                {
                  "name": "Remo con Barra / Polea",
                  "lift": "row_bar",
                  "sets": 3,
                  "reps": "8",
                  "pct": 0.82,
                  "rir": "RIR 2"
                },
                {
                  "name": "Fondos en Paralelas (Dips)",
                  "aux_type": "dips",
                  "sets": 3,
                  "reps": "8",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 2)",
                  "target": "3 series × 8 reps @ Peso Corporal"
                },
                {
                  "name": "Arrancada con Mancuerna a 1 Mano (DB Snatch)",
                  "aux_type": "db_snatch",
                  "sets": 3,
                  "reps": "12",
                  "weight_kg": 25,
                  "rest_sec": 75,
                  "rir": "6/brazo explosivas @ 25 kg",
                  "target": "3 series × 12 reps (6/brazo) @ 25 kg"
                }
              ]
            },
            {
              "id": "b3-w11-d5",
              "day_short": "VIE 29 ENE",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Calidad 3×2.000m",
              "title": "Simulacro Ritmo 10K: 3 × 2.000m @ 4:56/km",
              "duration_min": 42,
              "distance_km": 7,
              "target_zone": "Z4 (161 - 167 ppm) | 4:55 - 4:58 /km",
              "summary": "6 km totales a ritmo Sub-50' divididos en 3 bloques de 2 km. Te dará confianza total.",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "1.0 km @ 6:05/km"
                },
                {
                  "name": "3 × 2.000m",
                  "target": "3 × 2km @ 4:56/km (9:52 cada 2km) rec 2 min trote"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.5 km suaves"
                }
              ]
            },
            {
              "id": "b3-w11-d6",
              "day_short": "SÁB 30 ENE",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · Tirada Larga 12K",
              "title": "Tirada Larga Sabatina Pico 11.0 km en Z2",
              "duration_min": 64,
              "distance_km": 11,
              "target_zone": "Z2 (138 - 151 ppm) | 5:50 /km",
              "summary": "Tu mayor volumen aeróbico en 6 meses: 12 km cómodos en Z2 antes de descansar el domingo.",
              "steps": [
                {
                  "name": "Tirada 11.0 km Z2",
                  "target": "11.0 km @ 5:50/km"
                }
              ]
            },
            {
              "id": "b3-w11-d7",
              "day_short": "DOM 31 ENE",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Inicio del Tapering",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Descanso completo antes de la semana del Test 10K.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Sin entrenamiento"
                }
              ]
            }
          ]
        },
        {
          "week_number": 12,
          "label": "Semana 12 (Tapering + Test 10K Sábado)",
          "dates": "01 Feb – 07 Feb 2027",
          "phase_type": "Tapering (70–80% 1RM) & Objetivo 10K Sub-50' el Sábado",
          "run_km_target": 16.5,
          "strength_sessions_target": 3,
          "coach_note": "Semana de Tapering respetando tus días L-M-J de gimnasio (activación neural 70–80% 1RM, RIR 3-4) y X-V-S de carrera: el Sábado 06 Feb atacas el 10K Sub-50' y el Domingo 07 Feb disfrutas de tu descanso total.",
          "days": [
            {
              "id": "b3-w12-d1",
              "day_short": "LUN 01 FEB",
              "day_name": "Lunes",
              "modality": "strength",
              "modality_label": "Gimnasio 1 · PAP Lower",
              "title": "Potenciación Tren Inferior ({squat:0.72} Sentadilla, 96h antes del 10K)",
              "duration_min": 30,
              "target_zone": "70–72% 1RM | RIR 4",
              "summary": "Último toque de pierna el lunes (a 4 días completos del 10K del sábado): cargas moderadas a máxima velocidad.",
              "steps": [
                {
                  "name": "Sentadilla Trasera (Velocidad)",
                  "lift": "squat",
                  "sets": 3,
                  "reps": "2",
                  "pct": 0.72,
                  "rir": "RIR 4 (explosivas)"
                },
                {
                  "name": "Sóleo Sentado Ligero",
                  "lift": "soleus",
                  "sets": 2,
                  "reps": "10",
                  "pct": 0.65,
                  "rir": "RIR 4"
                },
                {
                  "name": "Movilidad Completa Cadera/Tobillo",
                  "target": "10 min"
                }
              ]
            },
            {
              "id": "b3-w12-d2",
              "day_short": "MAR 02 FEB",
              "day_name": "Martes",
              "modality": "strength",
              "modality_label": "Gimnasio 2 · Tapering Upper",
              "title": "Tren Superior — Activación Neural 3×3 ({bench:0.80} Banca)",
              "duration_min": 38,
              "target_zone": "78–80% 1RM | RIR 3",
              "summary": "Mantener tono neuromuscular sin desgaste.",
              "steps": [
                {
                  "name": "Press Banca Barra",
                  "lift": "bench",
                  "sets": 3,
                  "reps": "3",
                  "pct": 0.8,
                  "rir": "RIR 3 (rápidas)"
                },
                {
                  "name": "Dominadas Estrictras",
                  "lift": "pullup_load",
                  "sets": 3,
                  "reps": "6",
                  "pct": 0,
                  "rir": "Peso Corporal"
                },
                {
                  "name": "Press Militar Barra",
                  "lift": "ohp",
                  "sets": 2,
                  "reps": "5",
                  "pct": 0.78,
                  "rir": "RIR 3"
                }
              ]
            },
            {
              "id": "b3-w12-d3",
              "day_short": "MIÉ 03 FEB",
              "day_name": "Miércoles",
              "modality": "run",
              "modality_label": "Carrera 1 · Activación Ritmo",
              "title": "3 × 800m a Ritmo 10K (4:55/km)",
              "duration_min": 25,
              "distance_km": 4,
              "target_zone": "Z3-Z4 (156 - 163 ppm)",
              "summary": "Recordatorio neuromuscular del ritmo objetivo a 72h de la prueba.",
              "steps": [
                {
                  "name": "Calentamiento",
                  "target": "1.0 km @ 6:05/km"
                },
                {
                  "name": "3 × 800m",
                  "target": "3 × 800m @ 4:55/km rec 90s"
                },
                {
                  "name": "Enfriamiento",
                  "target": "0.6 km trote"
                }
              ]
            },
            {
              "id": "b3-w12-d4",
              "day_short": "JUE 04 FEB",
              "day_name": "Jueves",
              "modality": "strength",
              "modality_label": "Gimnasio 3 · Movilidad & Core",
              "title": "Sesión Ligera de Torso ({incline_db:0.68}), Fondos & Movilidad",
              "duration_min": 30,
              "target_zone": "65–68% 1RM | RIR 4",
              "summary": "Aprovechamos el jueves de gimnasio para bombeo suave de torso y liberación miofascial.",
              "steps": [
                {
                  "name": "Press Inclinado Mancuernas Ligero",
                  "lift": "incline_db",
                  "sets": 2,
                  "reps": "8",
                  "pct": 0.68,
                  "rir": "RIR 4"
                },
                {
                  "name": "Remo Polea Ligero",
                  "lift": "row_bar",
                  "sets": 2,
                  "reps": "8",
                  "pct": 0.65,
                  "rir": "RIR 4"
                },
                {
                  "name": "Fondos en Paralelas (Activación)",
                  "aux_type": "dips",
                  "sets": 2,
                  "reps": "6",
                  "weight_kg": 0,
                  "rest_sec": 75,
                  "rir": "Peso Corporal (RIR 4)",
                  "target": "2 series × 6 reps @ Peso Corporal (RIR 4)"
                },
                {
                  "name": "Estiramientos Dinámicos & Foam Roller",
                  "target": "12 min"
                }
              ]
            },
            {
              "id": "b3-w12-d5",
              "day_short": "VIE 05 FEB",
              "day_name": "Viernes",
              "modality": "run",
              "modality_label": "Carrera 2 · Activación Pre-10K",
              "title": "Suelta de Piernas 2.5 km + 3 Strides",
              "duration_min": 16,
              "distance_km": 2.5,
              "target_zone": "Z1-Z2 (130 - 145 ppm)",
              "summary": "Apenas 15 minutos suaves el viernes + carga de hidratos para despertar el sábado con Body Battery >85.",
              "steps": [
                {
                  "name": "Rodaje 2.5 km + 3 Strides",
                  "target": "2.5 km @ 6:00/km + 3 rectas de 12s"
                }
              ]
            },
            {
              "id": "b3-w12-d6",
              "day_short": "SÁB 06 FEB",
              "day_name": "Sábado",
              "modality": "run",
              "modality_label": "Carrera 3 · OBJETIVO 10K",
              "title": "Test / Carrera 10K Oficial — Objetivo Sub 50:00 (4:58/km)",
              "duration_min": 50,
              "distance_km": 10,
              "target_zone": "Z4 -> Z5 (160 -> 175 ppm) | 4:58 /km",
              "summary": "Estrategia Negative Split el sábado por la mañana: primeros 3 km a 5:02/km, km 4-8 a 4:57/km y últimos 2 km a <4:50/km.",
              "steps": [
                {
                  "name": "Km 1 a 3 (Control)",
                  "target": "3.0 km @ 5:00-5:02/km (FC < 161 ppm)"
                },
                {
                  "name": "Km 4 a 8 (Crucero Umbral)",
                  "target": "5.0 km @ 4:56-4:58/km (FC 162-166 ppm)"
                },
                {
                  "name": "Km 9 a 10 (Kick Final)",
                  "target": "2.0 km @ 4:45-4:50/km (Z5 hasta meta)"
                }
              ]
            },
            {
              "id": "b3-w12-d7",
              "day_short": "DOM 07 FEB",
              "day_name": "Domingo",
              "modality": "rest",
              "modality_label": "Descanso Total",
              "title": "Descanso Total Dominical — Celebración & Recuperación Post-10K",
              "duration_min": 0,
              "target_zone": "Descanso",
              "summary": "Domingo libre completo tras lograr el objetivo Sub-50'.",
              "steps": [
                {
                  "name": "Descanso Completo",
                  "target": "Descanso total personal y familiar"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

window.NUTRITION_PLAN_DATA = {
  "biometrics": {
    "start_weight_kg": 100.4,
    "target_weight_kg": 90,
    "total_loss_kg": 10.4,
    "estimated_height_cm": 177,
    "start_bmi": 32.1,
    "target_bmi": 28.7,
    "age": 33,
    "garmin_bmr_kcal": 2361,
    "garmin_avg_active_kcal": 318,
    "garmin_avg_tdee_kcal": 2689,
    "hydration_goal_ml": 3400,
    "weekly_loss_target_kg": "0.65 – 0.75 kg/sem",
    "estimated_duration_weeks": "14 – 16 semanas",
    "pace_gain_10k_estimate": "~3:30 a 4:00 min más rápido en 10K (~2.2 s/km por cada kg de grasa perdido)"
  },
  "day_types": [
    {
      "id": "gym",
      "badge": "LUNES · MARTES · JUEVES (GYM 13:30)",
      "title": "🏋️ Día de Gimnasio a las 13:30 (5 Comidas en Casa)",
      "garmin_tdee_kcal": 2880,
      "target_kcal": 2250,
      "deficit_kcal": 630,
      "protein_g": 205,
      "carbs_g": 205,
      "fat_g": 67,
      "water_l": 3.5,
      "focus": "Desayuno fuerte para arrancar el día, snack energético ligero a las 12:15 para tirar pesado a las 13:30 (Lunes Pierna: 130 kg Sentadilla / 160 kg PM · Martes/Jueves Torso: 120 kg Banca / 65 kg Militar) y comida principal grande en casa a las 14:45.",
      "meals": [
        {
          "time": "08:00 – 08:30 · Comida 1: Desayuno Fuerte en Casa",
          "name": "Tostadas de Masa Madre con Ibérico/Revuelto + Bol Proteico",
          "kcal": 550,
          "macros": "46g P · 56g C · 16g G",
          "items": [
            "80 g de pan 100% integral de masa madre tostado con tomate natural rallado y 5 g de AOVE",
            "80 g de jamón ibérico/serrano magro o lomo embuchado (o huevos revueltos/tortilla en sartén — nunca cocidos)",
            "200 g de yogur proteico / Skyr 0% con 30 g de copos de avena, 1 kiwi o frutos rojos y café"
          ]
        },
        {
          "time": "12:15 – 12:30 · Comida 2: Pre-Gimnasio (60–75 min antes de las 13:30)",
          "name": "Carga Rápida Pre-Fuerza + Creatina",
          "kcal": 310,
          "macros": "30g P · 43g C · 2g G",
          "items": [
            "1 cazo (35 g) de Proteína Whey Isolate en agua o 200 g de Queso Fresco Batido / Skyr 0%",
            "1 plátano maduro mediano (120 g) + 2 tortitas de arroz (fácil digestión para entrenar a las 13:30 sin pesadez)",
            "5 g de Creatina Monohidrato + 1 café solo (El Lunes en día de Pierna añade aquí 15 g de Colágeno + Vit C para proteger rodilla y Aquiles)"
          ]
        },
        {
          "time": "14:45 – 15:15 · Comida 3: Comida Principal Post-Gym en Casa",
          "name": "Pollo / Solomillo de Ternera + Arroz Basmati o Patata Asada",
          "kcal": 690,
          "macros": "63g P · 72g C · 16g G",
          "items": [
            "230 g de pechuga de pollo/pavo a la plancha o solomillo/lomo de ternera magra (peso en crudo)",
            "190 g de arroz basmati cocido (75 g en crudo) o 340 g de patata/boniato en Airfryer o al horno",
            "250 g de verdura salteada o ensalada (brócoli, calabacín, pimientos, espárragos) con 10 g de AOVE"
          ]
        },
        {
          "time": "18:00 – 18:30 · Comida 4: Merienda Saciante en Casa",
          "name": "Skyr / Yogur Griego Ligero con Nueces y Fruta",
          "kcal": 240,
          "macros": "24g P · 16g C · 9g G",
          "items": [
            "200 g de Skyr natural o yogur proteico 0% con canela",
            "15 g de nueces o almendras naturales tostadas sin sal + 1 manzana o mandarina"
          ]
        },
        {
          "time": "21:00 – 21:30 · Comida 5: Cena de Recuperación & VFC Nocturna",
          "name": "Salmón / Lubina / Sepia a la Plancha + Patata Vapor + Ensalada",
          "kcal": 460,
          "macros": "42g P · 18g C · 24g G",
          "items": [
            "200 g de salmón al horno, lubina, dorada, merluza o sepia a la plancha (0% atún)",
            "100 g de patata cocida/asada + parrillada de verduras o ensalada de tomate y aguacate (50 g) con 8 g AOVE",
            "300 mg de Magnesio Bisglicinato 30 min antes de dormir para mejorar el sueño profundo y la VFC"
          ]
        }
      ]
    },
    {
      "id": "run_weekday",
      "badge": "MIÉRCOLES · VIERNES (CARRERA 19:00)",
      "title": "🏃 Día de Carrera a las 19:00 (Rodaje Z2 / Series · 5 Comidas)",
      "garmin_tdee_kcal": 3050,
      "target_kcal": 2400,
      "deficit_kcal": 650,
      "protein_g": 200,
      "carbs_g": 255,
      "fat_g": 62,
      "water_l": 3.8,
      "focus": "Repartir los carbohidratos en el desayuno (08:30), la comida (14:30, sin fibra pesada) y el pre-entreno de las 17:45 para volar a las 19:00, cenando a las 20:45 con carbohidrato limpio para no hundir tu VFC nocturna.",
      "meals": [
        {
          "time": "08:00 – 08:30 · Comida 1: Desayuno Energético en Casa",
          "name": "Tostadas con Jamón Ibérico & Queso Fresco + Porridge de Avena",
          "kcal": 580,
          "macros": "45g P · 68g C · 14g G",
          "items": [
            "90 g de pan de masa madre tostado con tomate natural, 80 g de jamón serrano/ibérico magro y 60 g de queso fresco/cottage",
            "(O si prefieres dulce): 70 g de copos de avena cocidos con leche semidesnatada/bebida vegetal + 1 cazo de Whey + canela",
            "1 pieza de fruta (plátano o frutos rojos) + Café"
          ]
        },
        {
          "time": "11:30 · Comida 2: Media Mañana Ligera",
          "name": "Yogur Proteico + Fruta",
          "kcal": 185,
          "macros": "22g P · 20g C · 1g G",
          "items": [
            "200 g de yogur proteico 0% o Skyr",
            "1 pieza de fruta de temporada (kiwi, pera o mandarina)"
          ]
        },
        {
          "time": "14:15 – 14:45 · Comida 3: Comida en Casa (Digestión Limpia para las 19:00)",
          "name": "Arroz Basmati / Pasta con Pechuga de Pollo o Solomillo",
          "kcal": 695,
          "macros": "58g P · 80g C · 15g G",
          "items": [
            "85 g de arroz basmati o pasta en seco (220 g cocido) o 360 g de patata asada",
            "220 g de pechuga de pollo/pavo o solomillo de ternera a la plancha",
            "180 g de calabacín, zanahoria o espárragos a la plancha (evita coliflor o legumbres pesadas hoy antes de correr) + 10 g AOVE"
          ]
        },
        {
          "time": "17:45 · Comida 4: Pre-Carrera (75 min antes de correr a las 19:00)",
          "name": "Protocolo Tendón de Aquiles + Energía Rápida",
          "kcal": 300,
          "macros": "23g P · 48g C · 1g G",
          "items": [
            "15 g de Colágeno Hidrolizado + 50 mg Vitamina C en agua (protege tendón de Aquiles y fascia plantar)",
            "1 plátano maduro + 2 tortitas de arroz con 1 cucharadita de miel + ½ cazo de Whey (o 150 g yogur 0%)"
          ]
        },
        {
          "time": "20:45 – 21:15 · Comida 5: Cena Post-Carrera en Casa (Tras correr a las 19:00)",
          "name": "Pescado Blanco / Salmón o Pollo + Boniato Asado + Verdura",
          "kcal": 640,
          "macros": "52g P · 39g C · 31g G",
          "items": [
            "5 g de Creatina Monohidrato + 500 ml de agua con 1 pizca de sal marina al llegar de correr",
            "220 g de salmón, merluza, lubina o contramuslo de pollo deshuesado al horno/Airfryer (sin atún)",
            "180 g de boniato o patata asada (repone glucógeno y baja el cortisol post-series) + ensalada con 1/3 aguacate y 10 g AOVE"
          ]
        }
      ]
    },
    {
      "id": "run_weekend",
      "badge": "SÁBADO (CARRERA 09:00 AM + RESTAURANTE)",
      "title": "🌅 Sábado: Tirada Larga 09:00 AM + Comida en Restaurante (4 Comidas)",
      "garmin_tdee_kcal": 3180,
      "target_kcal": 2450,
      "deficit_kcal": 730,
      "protein_g": 200,
      "carbs_g": 260,
      "fat_g": 65,
      "water_l": 3.9,
      "focus": "Desayuno rápido y digestivo a las 07:45 para correr a las 09:00 AM con energía, segundo desayuno recuperador a las 10:30 y tu comida semanal en Restaurante al mediodía (aprovechando la supercompensación muscular post-tirada larga).",
      "meals": [
        {
          "time": "07:45 – 08:00 · Comida 1: Desayuno Pre-Tirada Larga (70 min antes de las 09:00 AM)",
          "name": "Tostadas con Miel/Mermelada + Plátano + Batido Whey & Colágeno",
          "kcal": 450,
          "macros": "40g P · 66g C · 3g G",
          "items": [
            "2 rebanadas (70 g) de pan tostado (blanco o masa madre sin semillas pesadas) con 15 g de miel o mermelada",
            "1 plátano maduro + 1 batido con 30 g de Whey Isolate + 15 g de Colágeno Hidrolizado + café solo",
            "Se digiere en 45 min para que a las 09:00 AM tengas el depósito lleno y el estómago totalmente ligero"
          ]
        },
        {
          "time": "10:30 – 10:45 · Comida 2: Almuerzo Post-Tirada Larga en Casa",
          "name": "Revuelto / Tortilla en Sartén con Jamón Ibérico + Creatina",
          "kcal": 430,
          "macros": "38g P · 36g C · 14g G",
          "items": [
            "2 huevos en sartén (revueltos o en tortilla francesa, nunca cocidos) + 100 ml de claras + 50 g de jamón ibérico",
            "60 g de pan integral con tomate natural + 1 pieza de fruta",
            "5 g de Creatina Monohidrato + 500 ml de agua con electrolitos"
          ]
        },
        {
          "time": "14:30 – 15:30 · Comida 3: 🍽️ COMIDA SEMANAL EN RESTAURANTE",
          "name": "Estrategia Inteligente en Restaurante (Post-Tirada Larga)",
          "kcal": 980,
          "macros": "70g P · 98g C · 34g G",
          "items": [
            "Entrante para compartir: Sepia/calamares a la plancha, pulpo a la brasa, jamón ibérico/cecina, gambas o parrillada de verduras",
            "Plato principal: Solomillo o entrecot de ternera a la brasa con patata asada, lubina/dorada/rodaballo al horno, o 1 ración de arroz/paella de marisco o carne",
            "Truco del entrenador: Bebe agua con gas/limón antes de empezar, evita repetir de la cesta de pan y pide fruta o café/infusión de postre"
          ]
        },
        {
          "time": "21:00 – 21:30 · Comida 4: Cena Ligera de Compensación en Casa",
          "name": "Pescado Blanco / Pavo a la Plancha + Crema de Verduras",
          "kcal": 590,
          "macros": "52g P · 60g C · 14g G",
          "items": [
            "240 g de merluza, bacalao, lenguado o pechuga de pavo a la plancha (sin atún)",
            "Crema casera de calabacín/calabaza (sin nata) + 180 g de patata cocida/vapor con 8 g de AOVE",
            "1 yogur proteico 0% + 300 mg de Magnesio Bisglicinato antes de dormir"
          ]
        }
      ]
    },
    {
      "id": "rest",
      "badge": "DOMINGO (DESCANSO TOTAL EN CASA)",
      "title": "🧘 Domingo de Descanso Total (4 Comidas Saciantes en Casa)",
      "garmin_tdee_kcal": 2520,
      "target_kcal": 1950,
      "deficit_kcal": 570,
      "protein_g": 200,
      "carbs_g": 130,
      "fat_g": 70,
      "water_l": 3.2,
      "focus": "El domingo descansas al 100%: mantenemos un desayuno potente que disfrutes, reducimos los carbohidratos almidonados a 130 g y priorizamos proteínas magras, verduras y grasas saludables para oxidar grasa en reposo.",
      "meals": [
        {
          "time": "09:00 – 09:30 · Comida 1: Desayuno Dominical Completo en Casa",
          "name": "Huevos a la Plancha / Revueltos con Aguacate, Jamón Ibérico y Fruta",
          "kcal": 530,
          "macros": "45g P · 30g C · 25g G",
          "items": [
            "2 huevos a la plancha o revueltos en sartén + 120 ml de claras + 60 g de jamón ibérico magro o salmón ahumado",
            "60 g de pan integral de masa madre con 1/3 de aguacate laminado y tomate",
            "100 g de frutos rojos o 1 kiwi + Café largo"
          ]
        },
        {
          "time": "14:30 – 15:00 · Comida 2: Comida Dominical en Casa",
          "name": "Asado de Carne Magra / Lubina al Horno + Patata Panadera",
          "kcal": 690,
          "macros": "63g P · 50g C · 25g G",
          "items": [
            "240 g de solomillo/lomo de ternera, pollo de corral asado o lubina/dorada al horno",
            "200 g de patata al horno con romero + ensalada grande de brotes verdes, tomate y espárragos con 10 g de AOVE",
            "5 g de Creatina Monohidrato"
          ]
        },
        {
          "time": "18:00 · Comida 3: Merienda en Casa",
          "name": "Bol de Skyr / Queso Fresco Batido con Nueces y Manzana",
          "kcal": 250,
          "macros": "27g P · 18g C · 8g G",
          "items": [
            "250 g de Skyr 0% o Queso Fresco Batido 0% con canela",
            "12 g de nueces naturales + 1 manzana troceada"
          ]
        },
        {
          "time": "20:45 – 21:15 · Comida 4: Cena Temprana Pre-Lunes en Casa",
          "name": "Sepia / Calamar / Gambas a la Plancha + Salteado de Verduras",
          "kcal": 480,
          "macros": "65g P · 32g C · 12g G",
          "items": [
            "250 g de sepia, calamar a la plancha, gambas al ajillo o pechuga de pollo (0% atún)",
            "300 g de verduras salteadas (champiñones, espárragos trigueros, calabacín) + 120 g de boniato o patata",
            "10 g de AOVE + 300 mg de Magnesio Bisglicinato para arrancar el Lunes con VFC alta y Body Battery >85"
          ]
        }
      ]
    }
  ],
  "phases_100_to_90": [
    {
      "phase": "Fase 1 · Semanas 1 a 4 (Bloque 1 Base)",
      "weight_range": "100.4 kg → 97.4 kg (-3.0 kg)",
      "kcal_avg": "2,240 kcal/día media semanal",
      "running_impact": "Reducción inmediata de retención hídrica e inflamación sistémica. Tu FC en Zona 2 bajará 3–4 ppm al mismo ritmo (6:05/km) y las rodillas/Aquiles reciben 3 kg menos por impacto."
    },
    {
      "phase": "Fase 2 · Semanas 5 a 8 (Bloque 2 Específico)",
      "weight_range": "97.4 kg → 94.6 kg (-2.8 kg)",
      "kcal_avg": "2,200 kcal/día media semanal",
      "running_impact": "Con ~5.8 kg menos que en el 10K Ponle Freno, tu ritmo Umbral (160 ppm) pasará de 5:18/km a ~5:03/km manteniendo intactos los 120 kg en Banca y 130 kg en Sentadilla."
    },
    {
      "phase": "Fase 3 · Semanas 9 a 12 (Bloque 3 Pico 10K)",
      "weight_range": "94.6 kg → 92.0 kg (-2.6 kg)",
      "kcal_avg": "2,250 kcal/día (Refeed semana 12 previo al 10K)",
      "running_impact": "En la Semana 12 llegas al Test 10K Sub-50' con ~8.4 kg menos de lastre graso (+12% de VO2max relativo en ml/kg/min). En las últimas 48h de la Semana 12 subimos a mantenimiento (2,750 kcal altas en carbohidratos) para correr con el depósito lleno."
    },
    {
      "phase": "Fase 4 · Semanas 13 a 15 (Consolidación Final)",
      "weight_range": "92.0 kg → 90.0 kg (-2.0 kg · META)",
      "kcal_avg": "2,180 kcal/día → Transición a 2,650 kcal (Mantenimiento)",
      "running_impact": "Objetivo de 90.0 kg alcanzado (-10.4 kg totales) con cintura reducida ~9–11 cm, ratio fuerza/peso corporal en máximos personales (Dominadas con +20 kg mucho más fáciles y Sentadilla 1.45× peso corporal)."
    }
  ],
  "supplements_and_rules": [
    {
      "title": "1. Timing Clave para tu Gimnasio a las 13:30 (Lunes, Martes y Jueves)",
      "detail": "Desayunas fuerte a las 08:00–08:30, tomas un pre-entreno rápido y muy digestivo a las 12:15 (plátano + tortitas de arroz + Whey + café) para levantar pesado a las 13:30 sin pesadez estomacal, y haces tu comida principal en casa a las 14:45."
    },
    {
      "title": "2. Timing Clave para tu Carrera a las 19:00 (Miércoles y Viernes) y Sábado 09:00 AM",
      "detail": "Los Miércoles y Viernes comes a las 14:30 arroz/pasta con pollo y verdura suave, tomas el pre-run a las 17:45 (con 15 g de Colágeno + Vitamina C) y cenas con boniato/patata a las 20:45 tras correr. El Sábado desayunas pan tostado con miel, plátano y Whey a las 07:45 para correr ligero a las 09:00 AM."
    },
    {
      "title": "3. Tu Comida en Restaurante: El Sábado al Mediodía es tu Mejor Aliado",
      "detail": "Hacer la comida de restaurante el sábado a las 14:30 (después de la tirada larga de las 09:00 AM) permite que ese extra de calorías y carbohidratos vaya directo a rellenar el glucógeno muscular sin acumular grasa."
    },
    {
      "title": "4. Cero Huevos Cocidos y Cero Atún (100% Adaptado a tus Gustos)",
      "detail": "Eliminados por completo del plan. Tus fuentes de proteína principal son: pechuga de pollo/pavo, solomillo/lomo de ternera, jamón ibérico/serrano magro, salmón, lubina, dorada, merluza, bacalao, sepia/calamar, gambas, Skyr/yogur proteico, Whey Isolate y huevos solo en sartén (revueltos, tortilla o plancha)."
    },
    {
      "title": "5. Creatina (5 g/día) + Magnesio Bisglicinato Nocturno (300 mg)",
      "detail": "5 g de Creatina todos los días para blindar tus 1RM durante la pérdida de 10 kg, y 300 mg de Magnesio Bisglicinato 30 min antes de dormir para subir tu sueño profundo y tu VFC en Garmin."
    }
  ]
};
