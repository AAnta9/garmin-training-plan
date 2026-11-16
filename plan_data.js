/**
 * Configuración de 1RM (Repetición Máxima) y Plan de Entrenamiento Híbrido Dinámico (12 Semanas).
 * Todos los pesos de los entrenamientos de gimnasio (Lunes, Martes y Jueves) se calculan
 * automáticamente a partir de los 1RM introducidos por el usuario en la pestaña "1RM & Pesos".
 */

window.DEFAULT_1RM_CONFIG = [
  {
    key: "bench",
    name: "Press Banca Barra (Bench Press)",
    category: "Tren Superior A (Lunes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 107.5,
    cat_id: 0,
    name_id: 1,
    category_key: "BENCH_PRESS",
    exercise_key: "BARBELL_BENCH_PRESS",
    title_es: "Press de banca con barra",
    rest_sec: 120,
    note: "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    key: "squat",
    name: "Sentadilla Trasera Barra (Back Squat)",
    category: "Tren Inferior (Martes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 105.0,
    cat_id: 28,
    name_id: 6,
    category_key: "SQUAT",
    exercise_key: "BARBELL_BACK_SQUAT",
    title_es: "Sentadilla trasera con barra",
    rest_sec: 150,
    note: "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    key: "deadlift",
    name: "Peso Muerto Convencional (Deadlift)",
    category: "Tren Inferior (Martes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 150.0,
    cat_id: 8,
    name_id: 0,
    category_key: "DEADLIFT",
    exercise_key: "BARBELL_DEADLIFT",
    title_es: "Peso muerto con barra",
    rest_sec: 150,
    note: "Barra olímpica + discos (redondeo a 2.5 kg)"
  },
  {
    key: "rdl",
    name: "Peso Muerto Rumano (RDL)",
    category: "Tren Inferior (Martes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 100.0,
    cat_id: 8,
    name_id: 23,
    category_key: "DEADLIFT",
    exercise_key: "ROMANIAN_DEADLIFT",
    title_es: "Peso muerto rumano",
    rest_sec: 105,
    note: "Cadena posterior / isquios (redondeo a 2.5 kg)"
  },
  {
    key: "ohp",
    name: "Press Militar Barra de Pie (OHP)",
    category: "Tren Superior A/B (Lunes y Jueves)",
    unit: "kg",
    step: 2.5,
    default_1rm: 62.5,
    cat_id: 24,
    name_id: 25,
    category_key: "SHOULDER_PRESS",
    exercise_key: "MILITARY_PRESS",
    title_es: "Press militar con barra",
    rest_sec: 105,
    note: "Empuje vertical estricto (redondeo a 2.5 kg)"
  },
  {
    key: "incline_db",
    name: "Press Inclinado Mancuernas (por mano)",
    category: "Tren Superior B (Jueves)",
    unit: "kg/manc",
    step: 1.0,
    default_1rm: 38.0,
    cat_id: 0,
    name_id: 9,
    category_key: "BENCH_PRESS",
    exercise_key: "INCLINE_DUMBBELL_BENCH_PRESS",
    title_es: "Press inclinado con mancuernas",
    rest_sec: 90,
    note: "Peso de cada mancuerna individual"
  },
  {
    key: "row_db",
    name: "Remo con Mancuerna Unilateral",
    category: "Tren Superior A/B (Lunes y Jueves)",
    unit: "kg/manc",
    step: 1.0,
    default_1rm: 36.0,
    cat_id: 23,
    name_id: 2,
    category_key: "ROW",
    exercise_key: "DUMBBELL_ROW",
    title_es: "Remo con mancuerna",
    rest_sec: 75,
    note: "Peso de la mancuerna en remo a una mano"
  },
  {
    key: "row_bar",
    name: "Remo con Barra / Polea Baja",
    category: "Tren Superior A/B (Lunes y Jueves)",
    unit: "kg",
    step: 2.5,
    default_1rm: 85.0,
    cat_id: 23,
    name_id: 45,
    category_key: "ROW",
    exercise_key: "BARBELL_ROW",
    title_es: "Remo con barra",
    rest_sec: 90,
    note: "Tracción horizontal con barra o polea"
  },
  {
    key: "pullup_load",
    name: "Dominadas (Lastre Máximo 1RM)",
    category: "Tren Superior A/B (Lunes y Jueves)",
    unit: "kg lastre",
    step: 1.25,
    default_1rm: 15.0,
    cat_id: 21,
    name_id: 38,
    category_key: "PULL_UP",
    exercise_key: "PULL_UP",
    title_es: "Dominadas",
    rest_sec: 105,
    note: "Kg extra en cinturón para 1 repetición máxima (0 = solo peso corporal)"
  },
  {
    key: "split_squat_db",
    name: "Split Squat Búlgaro (por mancuerna)",
    category: "Tren Inferior (Martes)",
    unit: "kg/manc",
    step: 1.0,
    default_1rm: 24.0,
    cat_id: 17,
    name_id: 27,
    category_key: "LUNGE",
    exercise_key: "FRONT_FOOT_ELEVATED_DUMBBELL_SPLIT_SQUAT",
    title_es: "Sentadilla búlgara con mancuerna",
    rest_sec: 75,
    note: "Peso de cada mancuerna en zancada búlgara"
  },
  {
    key: "hip_thrust",
    name: "Puente de Glúteo / Hip Thrust Barra",
    category: "Tren Inferior (Martes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 90.0,
    cat_id: 12,
    name_id: 1,
    category_key: "HIP_RAISE",
    exercise_key: "BARBELL_HIP_THRUST_ON_FLOOR",
    title_es: "Hip Thrust con barra",
    rest_sec: 90,
    note: "Extensión de cadera pesada"
  },
  {
    key: "soleus",
    name: "Elevación de Sóleo Sentado (Máquina)",
    category: "Protección Aquiles (Martes)",
    unit: "kg",
    step: 2.5,
    default_1rm: 50.0,
    cat_id: 1,
    name_id: 6,
    category_key: "CALF_RAISE",
    exercise_key: "WEIGHTED_SEATED_CALF_RAISE",
    title_es: "Elevación de gemelos sentado",
    rest_sec: 60,
    note: "Carga en máquina de gemelo/sóleo sentado"
  }
];

window.HYBRID_TRAINING_PLAN = {
  methodology: {
    title: "Periodización Híbrida Concurrente — Gimnasio (L-M-J) · Carrera (X-V-S) · Domingo Descanso Total",
    principles: [
      {
        name: "Cálculo Dinámico por % de tu 1RM Real",
        detail: "Todas las sesiones de Lunes, Martes y Jueves calculan automáticamente los kilos exactos (redondeados a discos de 2.5 kg en barra y 1 kg en mancuerna) según los 1RM que introduzcas en la pestaña '1RM & Pesos'."
      },
      {
        name: "Doble Ventana de 72 Horas para tus Piernas",
        detail: "1) Tras la Tirada Larga del Sábado, descansas el Domingo y haces Torso el Lunes: tus piernas llegan al Martes de gimnasio con 72h de recuperación. 2) Tras hacer Pierna el Martes, ruedas suave en Z2 el Miércoles y haces Torso el Jueves: llegas a las Series del Viernes con otras 72h de recuperación muscular."
      },
      {
        name: "Polarización 80/20 & Protección Tendinosa (>100 kg)",
        detail: "Pasamos de 1.1 salidas/semana en 'zona gris' a 3 salidas fijas (Miércoles, Viernes y Sábado) con progresión <=10% semanal, cadencia objetivo >166 spm y fortalecimiento pesado de sóleo e isquios los martes."
      }
    ]
  },
  blocks: [
    {
      id: "block-1",
      number: 1,
      name: "Bloque 1: Consolidación Aeróbica & Base Híbrida (75%–85% 1RM)",
      dates: "16 Nov 2026 – 13 Dic 2026 (Semanas 1 a 4)",
      focus: "Asimilar el 10K Ponle Freno, consolidar el esquema L-M-J (Gimnasio al 75-85% 1RM) + X-V-S (Carrera) y construir base aeróbica en Zona 2 con Domingo de descanso total.",
      target_run_km_range: "12.5 → 18.0 km/sem",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower · Jue: Upper B)",
      weeks: [
        {
          week_number: 1,
          label: "Semana 1 (Adaptación Post-10K)",
          dates: "16 Nov – 22 Nov 2026",
          phase_type: "Recuperación Activa & Base Fuerza (75–78% 1RM)",
          run_km_target: 12.5,
          strength_sessions_target: 3,
          coach_note: "Vienes de correr el domingo 15 Nov el 10K Ponle Freno (54:05, Carga 215, TE 5.0). Esta semana trabajamos entre el 74% y 78% de tu 1RM (RIR 2-3), rodamos suave en Z2 el miércoles, viernes y sábado, y el domingo descansas por completo.",
          days: [
            {
              id: "b1-w1-d1",
              day_short: "LUN 16 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Base Empuje & Tirón ({bench:0.78} Banca)",
              duration_min: 55,
              target_zone: "75–78% 1RM | RIR 2",
              completed_in_garmin: true,
              summary: "Día 1 de gimnasio (Lunes): estímulo neural en torso al 78% 1RM dejando descansar las piernas.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "6-8", pct: 0.78, rir: "RIR 2" },
                { name: "Dominadas Estrictras (Pull-ups)", lift: "pullup_load", sets: 4, reps: "6-7", pct: 0.0, rir: "Peso Corporal (RIR 2)" },
                { name: "Press Militar Barra de Pie", lift: "ohp", sets: 3, reps: "8", pct: 0.74, rir: "RIR 2" },
                { name: "Remo con Mancuerna Unilateral", lift: "row_db", sets: 3, reps: "10", pct: 0.75, rir: "RIR 2" },
                { name: "Movilidad Torácica & Tobillo", target: "8 min vuelta a la calma" }
              ]
            },
            {
              id: "b1-w1-d2",
              day_short: "MAR 17 NOV",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior Híbrido — Fuerza Estructural ({squat:0.76} Sentadilla)",
              duration_min: 50,
              target_zone: "74–76% 1RM | RIR 2-3",
              summary: "Día 2 de gimnasio (Martes): fuerza estructural de pierna, isquios y sóleo al 75% 1RM sin generar agujetas para el rodaje de mañana miércoles.",
              steps: [
                { name: "Sentadilla Trasera Barra (Back Squat)", lift: "squat", sets: 3, reps: "4-5", pct: 0.76, rir: "RIR 2-3 (subida explosiva)" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 3, reps: "6", pct: 0.75, rir: "RIR 2 (bajada 2s)" },
                { name: "Split Squat Búlgaro", lift: "split_squat_db", sets: 3, reps: "8/pierna", pct: 0.70, rir: "RIR 2" },
                { name: "Elevación de Talones Sentado (Sóleo)", lift: "soleus", sets: 4, reps: "12-15", pct: 0.72, rir: "1s pausa arriba" },
                { name: "Plancha Abdominal RKC + Deadbug", target: "3 series × 40s" }
              ]
            },
            {
              id: "b1-w1-d3",
              day_short: "MIÉ 18 NOV",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Z1/Z2",
              title: "Rodaje Regenerativo Aeróbico Z2",
              duration_min: 23,
              distance_km: 3.5,
              target_zone: "Z1-Z2 Baja (130 - 144 ppm) | 6:15 - 6:30 /km",
              summary: "Primera carrera de la semana (Miércoles): rodaje suave de oxigenación tras el día de pierna.",
              steps: [
                { name: "Calentamiento dinámico", target: "5 min caminata rápida + movilidad cadera" },
                { name: "Rodaje Suave Controlado", target: "3.5 km @ 6:15-6:30/km (FC 132-144 ppm, Cadencia >164 spm)" },
                { name: "Estiramientos suaves sóleo/isquios", target: "5 min al terminar" }
              ]
            },
            {
              id: "b1-w1-d4",
              day_short: "JUE 19 NOV",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B — Hombro, Espalda & Fondos ({ohp:0.82} Militar)",
              duration_min: 50,
              target_zone: "76–82% 1RM | RIR 2",
              summary: "Día 3 de gimnasio (Jueves): cerramos el trabajo de fuerza semanal dejando las piernas descansadas para viernes y sábado.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "4-5", pct: 0.82, rir: "RIR 2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "10", pct: 0.76, rir: "RIR 2" },
                { name: "Remo en Polea / Barra", lift: "row_bar", sets: 4, reps: "8-10", pct: 0.75, rir: "RIR 2" },
                { name: "Fondos en Paralelas (Dips)", target: "3 series × 7-8 reps @ Peso Corporal (RIR 2)" },
                { name: "Kettlebell Swings (Potencia Cadera)", target: "3 series × 12 reps @ 24 kg (explosivos)" }
              ]
            },
            {
              id: "b1-w1-d5",
              day_short: "VIE 20 NOV",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Z2 + Strides",
              title: "Base Aeróbica Z2 + 4 Rectas de Cadencia (Strides)",
              duration_min: 26,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:20 /km",
              summary: "Segunda carrera (Viernes, 72h después de pierna): rodaje fluido con 4 aceleraciones técnicas de 15 segundos sin fatigar para mañana sábado.",
              steps: [
                { name: "Bloque Principal Z2", target: "3.6 km @ 6:10/km (FC 138-150 ppm)" },
                { name: "Strides Técnicos", target: "4 × 15 seg progresivos (@ ~4:45/km, cadencia 175+ spm) rec 45s andando" }
              ]
            },
            {
              id: "b1-w1-d6",
              day_short: "SÁB 21 NOV",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Z2",
              title: "Tirada Sabatina Aeróbica Estricta 5.0 km",
              duration_min: 31,
              distance_km: 5.0,
              target_zone: "Z2 Estricta (135 - 151 ppm) | 6:05 - 6:20 /km",
              summary: "Tercera carrera (Sábado): tirada aeróbica controlada manteniendo el pulso debajo de 151 ppm antes de tu descanso dominical.",
              steps: [
                { name: "Km 1 (Entrada en calor)", target: "1.0 km @ 6:20-6:30/km (FC < 140 ppm)" },
                { name: "Km 2 a 5 (Crucero Z2)", target: "4.0 km @ 6:05-6:15/km (FC 142-151 ppm, respiración conversacional)" }
              ]
            },
            {
              id: "b1-w1-d7",
              day_short: "DOM 22 NOV",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso (Recarga Body Battery >80)",
              summary: "Día fijo de descanso personal y familiar. Tus piernas acumulan 72h sin impacto hasta el martes al mediodía.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento programado · Hidratación y sueño >7.5h" }
              ]
            }
          ]
        },
        {
          week_number: 2,
          label: "Semana 2 (Carga Base 80–82% 1RM)",
          dates: "23 Nov – 29 Nov 2026",
          phase_type: "Acumulación Base (80–82% 1RM · Fartlek Viernes)",
          run_km_target: 15.0,
          strength_sessions_target: 3,
          coach_note: "Subimos intensidad en gimnasio al 80–82% 1RM (Lunes Banca {bench:0.82}, Martes Peso Muerto {deadlift:0.82} y Sentadilla {squat:0.78}). El viernes estrenamos Fartlek controlado.",
          days: [
            {
              id: "b1-w2-d1",
              day_short: "LUN 23 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Progresión 4×5 ({bench:0.82} Banca)",
              duration_min: 55,
              target_zone: "80–82% 1RM | RIR 2",
              summary: "Progresión lineal al 82% 1RM en Press Banca y tracción vertical.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "5", pct: 0.82, rir: "RIR 2" },
                { name: "Dominadas Lastradas / Estrictras", lift: "pullup_load", sets: 4, reps: "6", pct: 0.50, rir: "RIR 2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "6-8", pct: 0.78, rir: "RIR 2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 3, reps: "8-10", pct: 0.78, rir: "RIR 2" },
                { name: "Curl Bíceps + Extensión Tríceps", target: "2 superseries × 12 reps" }
              ]
            },
            {
              id: "b1-w2-d2",
              day_short: "MAR 24 NOV",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Peso Muerto ({deadlift:0.82}) & Sentadilla ({squat:0.78})",
              duration_min: 52,
              target_zone: "78–82% 1RM | RIR 2",
              summary: "Sesión principal de pierna el martes: tienes 72 horas hasta el Fartlek del viernes y 96 horas hasta la tirada del sábado.",
              steps: [
                { name: "Peso Muerto Barra (Deadlift)", lift: "deadlift", sets: 3, reps: "3-4", pct: 0.82, rir: "RIR 2" },
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "5", pct: 0.78, rir: "RIR 2" },
                { name: "Curl Femoral Sentado/Tumbado", target: "3 series × 10 reps (excéntrica 3s para proteger isquios)" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 4, reps: "12", pct: 0.76, rir: "RIR 2" },
                { name: "Hanging Knee Raises (Core)", target: "3 series × 10 reps" }
              ]
            },
            {
              id: "b1-w2-d3",
              day_short: "MIÉ 25 NOV",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico Z2 + 4 Strides",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              summary: "Rodaje aeróbico cómodo para oxigenar las piernas tras el gimnasio de ayer.",
              steps: [
                { name: "Rodaje Z2", target: "3.6 km @ 6:10/km (FC < 150 ppm)" },
                { name: "Rectas (Strides)", target: "4 × 15s fluidos @ 4:40/km con 45s rec" }
              ]
            },
            {
              id: "b1-w2-d4",
              day_short: "JUE 26 NOV",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.84} Militar) + Potencia Aláctica",
              duration_min: 50,
              target_zone: "80–84% 1RM | RIR 1-2",
              summary: "Tercer y último día de gimnasio de la semana: empuje vertical, press inclinado y potencia de cadera.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "4", pct: 0.84, rir: "RIR 1-2" },
                { name: "Press Banca Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8-10", pct: 0.80, rir: "RIR 2" },
                { name: "Remo con Mancuerna Unilateral", lift: "row_db", sets: 4, reps: "8-10", pct: 0.80, rir: "RIR 2" },
                { name: "Fondos en Paralelas", target: "4 series × 7-8 reps @ Peso Corporal" },
                { name: "Salto a la Comba + KB Swings", target: "3 rondas: 45s comba + 12 Swings @ 24 kg (descanso 60s)" }
              ]
            },
            {
              id: "b1-w2-d5",
              day_short: "VIE 27 NOV",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad Fartlek",
              title: "Fartlek Controlado 5 × (2 min Z3/Z4 + 2 min Z1)",
              duration_min: 28,
              distance_km: 4.5,
              target_zone: "Z2 Base + Cambios Z3/Z4 (154 - 163 ppm)",
              summary: "Piernas frescas (72h después del martes): reactivamos ritmos de 5:10-5:20/km en bloques cortos de 2 minutos.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "8 min suaves @ 6:20/km" },
                { name: "Bloque Principal (5 cambios)", target: "5 × [2 min @ 5:10-5:20/km (FC 155-162) + 2 min trote suave @ 6:35/km]" },
                { name: "Enfriamiento Z1", target: "4 min trote muy suave" }
              ]
            },
            {
              id: "b1-w2-d6",
              day_short: "SÁB 28 NOV",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga Z2",
              title: "Tirada Larga Sabatina 6.5 km en Z2",
              duration_min: 40,
              distance_km: 6.5,
              target_zone: "Z2 (136 - 152 ppm) | 6:00 - 6:15 /km",
              summary: "40 minutos continuos en Zona 2 cerrando la semana de entrenamiento antes de tu descanso del domingo.",
              steps: [
                { name: "Km 1 a 5 (Z2 Estable)", target: "5.0 km @ 6:10/km (FC 138-149 ppm)" },
                { name: "Km 5 a 6.5 (Z2 Alta)", target: "1.5 km @ 5:55/km (FC 149-153 ppm)" }
              ]
            },
            {
              id: "b1-w2-d7",
              day_short: "DOM 29 NOV",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Día completo de descanso personal. Asimilación de las 6 sesiones de lunes a sábado.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento · Sueño reparador y tiempo libre" }
              ]
            }
          ]
        },
        {
          week_number: 3,
          label: "Semana 3 (Pico Bloque 1 · 85% 1RM)",
          dates: "30 Nov – 06 Dic 2026",
          phase_type: "Sobrecarga Progresiva (85% 1RM · 18 km Carrera)",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Semana pico del Bloque 1 al 85% 1RM: Lunes Banca ({bench:0.85}), Martes Sentadilla ({squat:0.84}) + RDL ({rdl:0.82}), Jueves Militar ({ohp:0.86}), Viernes 3×1000m Tempo y Sábado 8 km Z2.",
          days: [
            {
              id: "b1-w3-d1",
              day_short: "LUN 30 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Intensidad 4×4 ({bench:0.85} Banca)",
              duration_min: 55,
              target_zone: "85% 1RM | RIR 1-2",
              summary: "Trabajo pesado al 85% de tu 1RM en Press Banca y tracción.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "4", pct: 0.85, rir: "RIR 1-2" },
                { name: "Dominadas Lastradas / Estrictras", lift: "pullup_load", sets: 4, reps: "5-6", pct: 0.65, rir: "RIR 1-2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "6", pct: 0.80, rir: "RIR 2" },
                { name: "Remo con Mancuerna Unilateral", lift: "row_db", sets: 3, reps: "8-10", pct: 0.82, rir: "RIR 2" }
              ]
            },
            {
              id: "b1-w3-d2",
              day_short: "MAR 01 DIC",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Fuerza 84% 1RM ({squat:0.84} Sentadilla)",
              duration_min: 52,
              target_zone: "82–84% 1RM | RIR 2",
              summary: "Consolidamos el 84% 1RM en Sentadilla 4×3 y 82% en Peso Muerto Rumano tras 72h sin impacto en piernas.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 4, reps: "3-4", pct: 0.84, rir: "RIR 2" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 4, reps: "5", pct: 0.82, rir: "RIR 2" },
                { name: "Puente de Glúteo / Hip Thrust", lift: "hip_thrust", sets: 3, reps: "8-10", pct: 0.80, rir: "RIR 2" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 4, reps: "10-12", pct: 0.80, rir: "RIR 1-2" }
              ]
            },
            {
              id: "b1-w3-d3",
              day_short: "MIÉ 02 DIC",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 4.5 km + 4 Strides",
              duration_min: 28,
              distance_km: 4.5,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              summary: "Rodaje aeróbico fluido tras la sesión de pierna del martes.",
              steps: [
                { name: "Rodaje Z2", target: "4.1 km @ 6:10/km (FC < 150 ppm)" },
                { name: "Strides", target: "4 × 15s @ 4:40/km" }
              ]
            },
            {
              id: "b1-w3-d4",
              day_short: "JUE 03 DIC",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B — Pico Bloque 1 ({ohp:0.86} Militar)",
              duration_min: 52,
              target_zone: "82–86% 1RM | RIR 1-2",
              summary: "Sesión fuerte de torso cerrando los 3 días de gimnasio de la semana.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "3-4", pct: 0.86, rir: "RIR 1-2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 4, reps: "8", pct: 0.84, rir: "RIR 1-2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 4, reps: "8", pct: 0.82, rir: "RIR 2" },
                { name: "Fondos en Paralelas", target: "4 series × 8 reps @ Peso Corporal" }
              ]
            },
            {
              id: "b1-w3-d5",
              day_short: "VIE 04 DIC",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad Tempo",
              title: "Bloques de Tempo 3 × 1.000m en Z3/Z4",
              duration_min: 32,
              distance_km: 5.5,
              target_zone: "Z3-Z4 (155 - 163 ppm) | 5:10 - 5:20 /km",
              summary: "Con 72h de recuperación tras la pierna del martes, ejecutamos 3×1km a ritmo Tempo/Umbral controlado.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.5 km @ 6:20/km" },
                { name: "Series Tempo", target: "3 × 1.000m @ 5:12-5:18/km (FC 156-163 ppm) con 90s rec trote" },
                { name: "Enfriamiento Z1", target: "1.0 km @ 6:30/km" }
              ]
            },
            {
              id: "b1-w3-d6",
              day_short: "SÁB 05 DIC",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga Z2",
              title: "Tirada Larga Sabatina 8.0 km en Z2",
              duration_min: 48,
              distance_km: 8.0,
              target_zone: "Z2 (138 - 153 ppm) | 5:55 - 6:15 /km",
              summary: "Tu tirada aeróbica más larga del Bloque 1 sabiendo que mañana domingo tienes descanso total.",
              steps: [
                { name: "Km 1 a 6 (Z2 Pura)", target: "6.0 km @ 6:10/km (FC 138-149 ppm)" },
                { name: "Km 6 a 8 (Z2 Techo)", target: "2.0 km @ 5:50-5:55/km (FC 150-153 ppm)" }
              ]
            },
            {
              id: "b1-w3-d7",
              day_short: "DOM 06 DIC",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Supercompensación",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Descanso completo tras completar las 6 sesiones de la semana pico del Bloque 1.",
              steps: [
                { name: "Descanso Completo", target: "Cero entrenamiento · Recuperación muscular y articular" }
              ]
            }
          ]
        },
        {
          week_number: 4,
          label: "Semana 4 (Descarga 3:1 · 70–75% 1RM)",
          dates: "07 Dic – 13 Dic 2026",
          phase_type: "Supercompensación & Descarga (70–75% 1RM · -25% Volumen)",
          run_km_target: 13.5,
          strength_sessions_target: 3,
          coach_note: "Semana de descarga del Bloque 1: mantienes Lunes, Martes y Jueves de gimnasio al 70–75% 1RM con mitad de series (RIR 3-4) para supercompensar.",
          days: [
            {
              id: "b1-w4-d1",
              day_short: "LUN 07 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Descarga Upper A",
              title: "Tren Superior A — Descarga Neural ({bench:0.75} Banca)",
              duration_min: 40,
              target_zone: "72–75% 1RM | RIR 3",
              summary: "Mantenemos velocidad de barra al 75% 1RM reduciendo las series a la mitad.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 3, reps: "5", pct: 0.75, rir: "RIR 3 (rápidas)" },
                { name: "Dominadas Estrictras", lift: "pullup_load", sets: 3, reps: "5", pct: 0.0, rir: "Peso Corporal (RIR 3)" },
                { name: "Press Militar Barra", lift: "ohp", sets: 2, reps: "6", pct: 0.72, rir: "RIR 3" },
                { name: "Remo con Mancuerna", lift: "row_db", sets: 2, reps: "10", pct: 0.70, rir: "RIR 3" }
              ]
            },
            {
              id: "b1-w4-d2",
              day_short: "MAR 08 DIC",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Descarga Lower",
              title: "Tren Inferior — Descarga & Salud Tendinosa ({squat:0.72})",
              duration_min: 38,
              target_zone: "70–72% 1RM | RIR 3-4",
              summary: "Piernas frescas y articulaciones recuperadas.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "3", pct: 0.72, rir: "RIR 3-4 (velocidad alta)" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 2, reps: "5", pct: 0.70, rir: "RIR 3" },
                { name: "Sóleo Sentado Isométrico + Dinámico", lift: "soleus", sets: 3, reps: "12", pct: 0.68, rir: "RIR 3" }
              ]
            },
            {
              id: "b1-w4-d3",
              day_short: "MIÉ 09 DIC",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Fácil 3.5 km",
              duration_min: 22,
              distance_km: 3.5,
              target_zone: "Z2 Baja (135 - 146 ppm)",
              summary: "Comprueba cómo ha bajado tu FC a 6:05/km respecto a la Semana 1.",
              steps: [
                { name: "Rodaje Z2", target: "3.5 km @ 6:05/km observando eficiencia cardíaca" }
              ]
            },
            {
              id: "b1-w4-d4",
              day_short: "JUE 10 DIC",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Descarga Upper B",
              title: "Tren Superior B — Bombeo & Movilidad ({incline_db:0.72})",
              duration_min: 38,
              target_zone: "70–72% 1RM | RIR 3",
              summary: "Sesión ligera y técnica cerrando el gimnasio de la semana.",
              steps: [
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.72, rir: "RIR 3" },
                { name: "Remo en Polea / Barra", lift: "row_bar", sets: 3, reps: "10", pct: 0.70, rir: "RIR 3" },
                { name: "Fondos + Core", target: "2 series × 6 reps + Planchas" }
              ]
            },
            {
              id: "b1-w4-d5",
              day_short: "VIE 11 DIC",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Chispa",
              title: "Activación de Ritmo 4 × 400m Fluidos",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z2 + Toques Z4 (5:00/km)",
              summary: "Sesión corta y fresca para sentir ligereza de piernas sin fatigar para mañana.",
              steps: [
                { name: "Calentamiento Z2", target: "1.5 km @ 6:15/km" },
                { name: "4 × 400m", target: "4 × 400m @ 5:00/km (1:12 por 400m) rec 200m trote" },
                { name: "Enfriamiento", target: "0.9 km suaves" }
              ]
            },
            {
              id: "b1-w4-d6",
              day_short: "SÁB 12 DIC",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Z2",
              title: "Tirada Sabatina Cómoda 6.0 km en Z2",
              duration_min: 36,
              distance_km: 6.0,
              target_zone: "Z2 (138 - 150 ppm) | 6:00 /km",
              summary: "Cierre del Bloque 1 con sensación de reserva total de energía.",
              steps: [
                { name: "Rodaje Continuo Z2", target: "6.0 km @ 6:00/km (FC < 150 ppm)" }
              ]
            },
            {
              id: "b1-w4-d7",
              day_short: "DOM 13 DIC",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Fin del Bloque 1",
              duration_min: 0,
              target_zone: "Recuperación",
              summary: "Objetivo: llevar la VFC semanal por encima de 54 ms antes de iniciar el Bloque 2.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento · Sueño >7.5h" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "block-2",
      number: 2,
      name: "Bloque 2: Desarrollo de Umbral (LTHR) & Fuerza Máxima (85%–92% 1RM)",
      dates: "14 Dic 2026 – 10 Ene 2027 (Semanas 5 a 8)",
      focus: "Desplazar tu ritmo de Umbral de Lactato (163 ppm) hacia 5:05-5:10/km los viernes + tiradas sabatinas Z2, trabajando del 85% al 92% 1RM los Lunes-Martes-Jueves.",
      target_run_km_range: "18.0 → 22.0 km/sem",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower · Jue: Upper B)",
      weeks: [
        {
          week_number: 5,
          label: "Semana 5 (Inicio Umbral · 85% 1RM)",
          dates: "14 Dic – 20 Dic 2026",
          phase_type: "Construcción de Umbral & Fuerza (84–86% 1RM)",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Lunes Banca al 86% 1RM ({bench:0.86}), Martes Sentadilla al 85% ({squat:0.85}) + RDL ({rdl:0.84}), Miércoles 4 km Z2, Jueves Upper B, Viernes 3×1.500m Umbral y Sábado 8.5 km Z2.",
          days: [
            {
              id: "b2-w5-d1",
              day_short: "LUN 14 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Bloque Fuerza ({bench:0.86} Banca)",
              duration_min: 55,
              target_zone: "84–86% 1RM | RIR 1-2",
              summary: "Subimos al 86% de tu 1RM en Press Banca en series de 4 repeticiones.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "4", pct: 0.86, rir: "RIR 1-2" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "5-6", pct: 0.70, rir: "RIR 2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5-6", pct: 0.82, rir: "RIR 2" },
                { name: "Remo con Mancuerna Unilateral", lift: "row_db", sets: 3, reps: "8", pct: 0.84, rir: "RIR 2" }
              ]
            },
            {
              id: "b2-w5-d2",
              day_short: "MAR 15 DIC",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Fuerza ({squat:0.85} Sentadilla) + Stiffness",
              duration_min: 50,
              target_zone: "84–85% 1RM | RIR 2",
              summary: "Mejoramos la reactividad elástica del tobillo y cadera con 72h de margen hasta las series del viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 4, reps: "3", pct: 0.85, rir: "RIR 2" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 3, reps: "5", pct: 0.84, rir: "RIR 2" },
                { name: "Split Squat Búlgaro", lift: "split_squat_db", sets: 3, reps: "8/pierna", pct: 0.78, rir: "RIR 2" },
                { name: "Sóleo Sentado Pesado + Rebotes Pogo", lift: "soleus", sets: 4, reps: "10 (+15 rebotes)", pct: 0.82, rir: "RIR 1-2" }
              ]
            },
            {
              id: "b2-w5-d3",
              day_short: "MIÉ 16 DIC",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 4.0 km",
              duration_min: 24,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 5:55 - 6:10 /km",
              summary: "Rodaje fluido de recuperación activa post-pierna.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.0 km @ 6:00/km (FC < 150 ppm)" }
              ]
            },
            {
              id: "b2-w5-d4",
              day_short: "JUE 17 DIC",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.86} Militar) + Potencia Híbrida",
              duration_min: 50,
              target_zone: "84–86% 1RM | RIR 2",
              summary: "Fuerza de torso y cadena posterior explosiva.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "4", pct: 0.86, rir: "RIR 1-2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.85, rir: "RIR 2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 4, reps: "8", pct: 0.84, rir: "RIR 2" },
                { name: "Fondos + Kettlebell Swings", target: "3 superseries: 8 Fondos + 15 Swings @ 24 kg" }
              ]
            },
            {
              id: "b2-w5-d5",
              day_short: "VIE 18 DIC",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad Umbral",
              title: "Cruise Intervals 3 × 1.500m en Umbral (Z4)",
              duration_min: 35,
              distance_km: 5.5,
              target_zone: "Z4 (160 - 165 ppm) | 5:08 - 5:15 /km",
              summary: "Con 72h de recuperación desde el martes, acumulamos 4.5 km a ritmo de umbral con 90s de descanso.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.0 km @ 6:15/km + 2 rectas" },
                { name: "3 × 1.500m Umbral", target: "3 × 1.5 km @ 5:10/km (FC 160-165 ppm) rec 90s trote" },
                { name: "Enfriamiento", target: "0.5 km trote suave" }
              ]
            },
            {
              id: "b2-w5-d6",
              day_short: "SÁB 19 DIC",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga Z2",
              title: "Tirada Larga Sabatina 8.5 km en Z2",
              duration_min: 51,
              distance_km: 8.5,
              target_zone: "Z2 (138 - 151 ppm) | 5:55 - 6:05 /km",
              summary: "Más de 50 minutos continuos en Zona 2 aeróbica estricta antes del domingo libre.",
              steps: [
                { name: "Tirada Continua Z2", target: "8.5 km @ 6:00/km (FC media ~145 ppm, sin pasar de 151 ppm)" }
              ]
            },
            {
              id: "b2-w5-d7",
              day_short: "DOM 20 DIC",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Día de descanso personal fijo.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento · Recuperación muscular y sueño" }
              ]
            }
          ]
        },
        {
          week_number: 6,
          label: "Semana 6 (Consolidación · 88% 1RM)",
          dates: "21 Dic – 27 Dic 2026",
          phase_type: "Carga Específica Híbrida (88% 1RM · 20 km Carrera)",
          run_km_target: 20.0,
          strength_sessions_target: 3,
          coach_note: "Rompemos la barrera de los 20 km semanales: Lunes Banca al 88% ({bench:0.88}), Martes Peso Muerto al 88% ({deadlift:0.88}), Viernes 2×2km+1km Umbral y Sábado 9.5 km Z2.",
          days: [
            {
              id: "b2-w6-d1",
              day_short: "LUN 21 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Serie Top 88% 1RM ({bench:0.88} Banca)",
              duration_min: 55,
              target_zone: "88% 1RM | RIR 1-2",
              summary: "Bloques de 3 repeticiones al 88% de tu 1RM en Press Banca.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "3", pct: 0.88, rir: "RIR 1-2" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "5", pct: 0.75, rir: "RIR 1-2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5", pct: 0.84, rir: "RIR 2" },
                { name: "Remo con Barra", lift: "row_bar", sets: 3, reps: "8", pct: 0.85, rir: "RIR 2" }
              ]
            },
            {
              id: "b2-w6-d2",
              day_short: "MAR 22 DIC",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Peso Muerto ({deadlift:0.88}) & Sentadilla ({squat:0.82})",
              duration_min: 50,
              target_zone: "82–88% 1RM | RIR 2",
              summary: "3×3 al 88% 1RM en Peso Muerto con velocidad de barra alta.",
              steps: [
                { name: "Peso Muerto Barra (Deadlift)", lift: "deadlift", sets: 3, reps: "3", pct: 0.88, rir: "RIR 1-2" },
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "5", pct: 0.82, rir: "RIR 2" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 4, reps: "10-12", pct: 0.85, rir: "RIR 1-2" }
              ]
            },
            {
              id: "b2-w6-d3",
              day_short: "MIÉ 23 DIC",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico Z2 4.5 km",
              duration_min: 27,
              distance_km: 4.5,
              target_zone: "Z2 (135 - 150 ppm) | 5:55 - 6:05 /km",
              summary: "Rodaje cómodo de oxigenación a mitad de semana.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.5 km @ 6:00/km" }
              ]
            },
            {
              id: "b2-w6-d4",
              day_short: "JUE 24 DIC",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.88} Militar) — Nochebuena",
              duration_min: 45,
              target_zone: "85–88% 1RM | RIR 2",
              summary: "Completamos los 3 días de gimnasio (L-M-J) al mediodía.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "3-4", pct: 0.88, rir: "RIR 1-2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.86, rir: "RIR 2" },
                { name: "Remo con Mancuerna", lift: "row_db", sets: 3, reps: "8-10", pct: 0.85, rir: "RIR 2" },
                { name: "Fondos + Core", target: "3 series × 8 reps" }
              ]
            },
            {
              id: "b2-w6-d5",
              day_short: "VIE 25 DIC",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad 2×2km+1km",
              title: "Umbral de Lactato: 2 × 2.000m + 1 × 1.000m",
              duration_min: 38,
              distance_km: 6.0,
              target_zone: "Z4 (161 - 166 ppm) | 5:05 - 5:12 /km",
              summary: "Sostener 10 minutos seguidos a ritmo de umbral con pulso estable al aire libre.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:15/km" },
                { name: "2 × 2.000m + 1 × 1.000m", target: "2×2km @ 5:10/km (rec 2 min) + 1×1km @ 5:02/km" },
                { name: "Enfriamiento", target: "0.5 km trote" }
              ]
            },
            {
              id: "b2-w6-d6",
              day_short: "SÁB 26 DIC",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga Z2",
              title: "Tirada Larga Sabatina 9.5 km en Z2",
              duration_min: 56,
              distance_km: 9.5,
              target_zone: "Z2 (138 - 152 ppm) | 5:50 - 6:05 /km",
              summary: "Rozando la distancia de 10K íntegramente en Zona 2 aeróbica antes de tu domingo de descanso.",
              steps: [
                { name: "Km 1 a 7 (Z2 Estable)", target: "7.0 km @ 6:00/km (FC < 149 ppm)" },
                { name: "Km 7 a 9.5 (Z2 Techo)", target: "2.5 km @ 5:45/km (FC 149-152 ppm)" }
              ]
            },
            {
              id: "b2-w6-d7",
              day_short: "DOM 27 DIC",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Descanso completo fijo del domingo.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento" }
              ]
            }
          ]
        },
        {
          week_number: 7,
          label: "Semana 7 (Pico Bloque 2 · 90–92% 1RM)",
          dates: "28 Dic 2026 – 03 Ene 2027",
          phase_type: "Pico de Umbral & Fuerza (90–92% 1RM · 22 km Carrera)",
          run_km_target: 22.0,
          strength_sessions_target: 3,
          coach_note: "Semana cumbre del Bloque 2: Lunes Banca al 92% 1RM ({bench:0.92}), Martes Sentadilla al 90% ({squat:0.90}), Viernes Tempo continuo 4 km @ 5:05/km y Sábado 10.5 km Z2.",
          days: [
            {
              id: "b2-w7-d1",
              day_short: "LUN 28 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Pico 92% 1RM ({bench:0.92} Press Banca)",
              duration_min: 55,
              target_zone: "90–92% 1RM | RIR 1",
              summary: "Series pesadas de 2-3 repeticiones al 92% de tu 1RM manteniendo 22 km de carrera semanal.",
              steps: [
                { name: "Press Banca Barra (Pico)", lift: "bench", sets: 4, reps: "2-3", pct: 0.92, rir: "RIR 1" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "4-5", pct: 0.85, rir: "RIR 1-2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5", pct: 0.86, rir: "RIR 1-2" },
                { name: "Remo con Mancuerna", lift: "row_db", sets: 3, reps: "8-10", pct: 0.86, rir: "RIR 2" }
              ]
            },
            {
              id: "b2-w7-d2",
              day_short: "MAR 29 DIC",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Sentadilla 90% 1RM ({squat:0.90}) & RDL ({rdl:0.86})",
              duration_min: 52,
              target_zone: "86–90% 1RM | RIR 1-2",
              summary: "Fuerza máxima controlada en tren inferior con 72h de margen hasta el Tempo Run del viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 4, reps: "2-3", pct: 0.90, rir: "RIR 1-2" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 3, reps: "5", pct: 0.86, rir: "RIR 2" },
                { name: "Split Squat Búlgaro", lift: "split_squat_db", sets: 3, reps: "8/pierna", pct: 0.82, rir: "RIR 2" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 4, reps: "10-12", pct: 0.88, rir: "RIR 1-2" }
              ]
            },
            {
              id: "b2-w7-d3",
              day_short: "MIÉ 30 DIC",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 5.0 km en Z2",
              duration_min: 30,
              distance_km: 5.0,
              target_zone: "Z2 (138 - 151 ppm) | 5:50 - 6:00 /km",
              summary: "Rodaje aeróbico fluido a mitad de semana.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "5.0 km @ 5:55/km" }
              ]
            },
            {
              id: "b2-w7-d4",
              day_short: "JUE 31 DIC",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.90} Militar) — Fin de Año",
              duration_min: 50,
              target_zone: "86–90% 1RM | RIR 1-2",
              summary: "Última sesión de gimnasio del año el jueves al mediodía.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "3", pct: 0.90, rir: "RIR 1-2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.88, rir: "RIR 1-2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 4, reps: "8", pct: 0.86, rir: "RIR 2" },
                { name: "Fondos en Paralelas", target: "3 series × 8 reps" }
              ]
            },
            {
              id: "b2-w7-d5",
              day_short: "VIE 01 ENE",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Tempo 4K",
              title: "Tempo Run Continuo 4.0 km en Z3/Z4",
              duration_min: 38,
              distance_km: 6.5,
              target_zone: "Z3-Z4 (158 - 165 ppm) | 5:05 - 5:10 /km",
              summary: "20 minutos continuos a ritmo de umbral con piernas totalmente recuperadas del martes.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.5 km @ 6:10/km" },
                { name: "Bloque Tempo Continuo", target: "4.0 km @ 5:05-5:10/km (FC 158-165 ppm)" },
                { name: "Enfriamiento Z1", target: "1.0 km @ 6:25/km" }
              ]
            },
            {
              id: "b2-w7-d6",
              day_short: "SÁB 02 ENE",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga Z2",
              title: "Tirada Larga Sabatina 10.5 km en Z2",
              duration_min: 62,
              distance_km: 10.5,
              target_zone: "Z2 (138 - 152 ppm) | 5:50 - 6:00 /km",
              summary: "Superamos la distancia de 10 km en entrenamiento aeróbico cómodo antes del descanso dominical.",
              steps: [
                { name: "Rodaje 10.5 km Z2", target: "10.5 km @ 5:55/km (FC < 152 ppm)" }
              ]
            },
            {
              id: "b2-w7-d7",
              day_short: "DOM 03 ENE",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Día completo de descanso tras superar los 22 km semanales.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento · Sueño >7.5h" }
              ]
            }
          ]
        },
        {
          week_number: 8,
          label: "Semana 8 (Descarga 3:1 · 75% 1RM)",
          dates: "04 Ene – 10 Ene 2027",
          phase_type: "Descarga & Asimilación Bloque 2 (72–75% 1RM)",
          run_km_target: 15.5,
          strength_sessions_target: 3,
          coach_note: "Semana de descarga del Bloque 2: bajamos cargas al 72–75% 1RM (RIR 3-4) manteniendo Lunes-Martes-Jueves en gimnasio y Miércoles-Viernes-Sábado de carrera.",
          days: [
            {
              id: "b2-w8-d1",
              day_short: "LUN 04 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Descarga Upper A",
              title: "Tren Superior A — Descarga Activa ({bench:0.75} Banca)",
              duration_min: 40,
              target_zone: "75% 1RM | RIR 3",
              summary: "3 series fluidas sin fatiga acumulada.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 3, reps: "5", pct: 0.75, rir: "RIR 3" },
                { name: "Dominadas Estrictras", lift: "pullup_load", sets: 3, reps: "6", pct: 0.0, rir: "Peso Corporal" },
                { name: "Press Militar Barra", lift: "ohp", sets: 2, reps: "6", pct: 0.74, rir: "RIR 3" }
              ]
            },
            {
              id: "b2-w8-d2",
              day_short: "MAR 05 ENE",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Descarga Lower",
              title: "Tren Inferior Ligero ({squat:0.74} Sentadilla) & Movilidad",
              duration_min: 38,
              target_zone: "72–74% 1RM | RIR 3-4",
              summary: "Mantenimiento neuromuscular sin daño muscular.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "3", pct: 0.74, rir: "RIR 3-4" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 2, reps: "5", pct: 0.72, rir: "RIR 3" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 3, reps: "12", pct: 0.72, rir: "RIR 3" }
              ]
            },
            {
              id: "b2-w8-d3",
              day_short: "MIÉ 06 ENE",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Suave 4.0 km",
              duration_min: 24,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 148 ppm)",
              summary: "Piernas sueltas y cadencia ágil.",
              steps: [
                { name: "Rodaje Z2", target: "4.0 km @ 5:55/km" }
              ]
            },
            {
              id: "b2-w8-d4",
              day_short: "JUE 07 ENE",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Descarga Upper B",
              title: "Tren Superior B Ligero ({incline_db:0.74})",
              duration_min: 38,
              target_zone: "72–74% 1RM | RIR 3",
              summary: "Bombeo articular sin estrés sistémico.",
              steps: [
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.74, rir: "RIR 3" },
                { name: "Remo en Polea / Barra", lift: "row_bar", sets: 3, reps: "8-10", pct: 0.72, rir: "RIR 3" },
                { name: "Fondos + Core", target: "2 series × 7 reps" }
              ]
            },
            {
              id: "b2-w8-d5",
              day_short: "VIE 08 ENE",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Ritmo 10K",
              title: "3 × 1.000m a Ritmo 10K Objetivo (4:58/km)",
              duration_min: 28,
              distance_km: 4.5,
              target_zone: "Z4 (160 - 165 ppm) | 4:55 - 5:00 /km",
              summary: "Toma de contacto con el ritmo Sub-50' con volumen bajo.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:10/km" },
                { name: "3 × 1.000m", target: "3 × 1km @ 4:58/km rec 2 min" },
                { name: "Enfriamiento", target: "0.5 km suaves" }
              ]
            },
            {
              id: "b2-w8-d6",
              day_short: "SÁB 09 ENE",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Z2",
              title: "Tirada Sabatina 7.0 km en Z2",
              duration_min: 41,
              distance_km: 7.0,
              target_zone: "Z2 (138 - 150 ppm) | 5:50 /km",
              summary: "Notarás que a 5:50/km el pulso va 5-7 ppm más bajo que en noviembre.",
              steps: [
                { name: "Rodaje Z2", target: "7.0 km @ 5:50/km" }
              ]
            },
            {
              id: "b2-w8-d7",
              day_short: "DOM 10 ENE",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Fin del Bloque 2",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Recarga completa antes de entrar en el Bloque 3 específico Sub-50'.",
              steps: [
                { name: "Descanso Completo", target: "Dormir >7.5h y recargar Body Battery" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "block-3",
      number: 3,
      name: "Bloque 3: Pico Específico VO2máx & Mantenimiento Neural (85%–92% 1RM)",
      dates: "11 Ene 2027 – 07 Feb 2027 (Semanas 9 a 12)",
      focus: "Series específicas de VO2máx y ritmo 10K (<5:00/km) los viernes, tiradas largas de hasta 12 km los sábados y mantenimiento neural de fuerza L-M-J con bajo volumen.",
      target_run_km_range: "21.5 → 24.0 km/sem (Tapering Sem 12)",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower Neural · Jue: Upper B)",
      weeks: [
        {
          week_number: 9,
          label: "Semana 9 (VO2máx 800m)",
          dates: "11 Ene – 17 Ene 2027",
          phase_type: "Potencia Aeróbica VO2máx & Fuerza Neural (86–90% 1RM)",
          run_km_target: 21.5,
          strength_sessions_target: 3,
          coach_note: "Martes pierna neural (3×3 al 86% 1RM en Sentadilla {squat:0.86} con bajo volumen) para llegar pletórico al 6×800m del viernes.",
          days: [
            {
              id: "b3-w9-d1",
              day_short: "LUN 11 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Fuerza Pura 4×3 ({bench:0.90} Banca)",
              duration_min: 50,
              target_zone: "88–90% 1RM | RIR 2",
              summary: "Mantenimiento de alta intensidad en torso.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "3", pct: 0.90, rir: "RIR 1-2" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "5", pct: 0.80, rir: "RIR 2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5", pct: 0.85, rir: "RIR 2" },
                { name: "Remo con Mancuerna", lift: "row_db", sets: 3, reps: "8", pct: 0.85, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w9-d2",
              day_short: "MAR 12 ENE",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower Neural",
              title: "Tren Inferior — Mantenimiento Neural ({squat:0.86} Sentadilla)",
              duration_min: 45,
              target_zone: "84–86% 1RM | RIR 2-3",
              summary: "Pocas repeticiones, alta carga y cero fatiga metabólica para llegar fresco al viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "3", pct: 0.86, rir: "RIR 2" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 3, reps: "4", pct: 0.84, rir: "RIR 2" },
                { name: "Elevación de Sóleo Sentado Pesado", lift: "soleus", sets: 4, reps: "10", pct: 0.88, rir: "RIR 1-2" }
              ]
            },
            {
              id: "b3-w9-d3",
              day_short: "MIÉ 13 ENE",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 4.5 km + 4 Strides",
              duration_min: 27,
              distance_km: 4.5,
              target_zone: "Z2 (136 - 150 ppm) | 5:50 /km",
              summary: "Rodaje fácil de asimilación tras el martes de gimnasio.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.5 km @ 5:50/km" }
              ]
            },
            {
              id: "b3-w9-d4",
              day_short: "JUE 14 ENE",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.88} Militar) + Core Antirotación",
              duration_min: 48,
              target_zone: "85–88% 1RM | RIR 2",
              summary: "Estabilidad de tronco para mantener la postura en los kilómetros finales del 10K.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "4", pct: 0.88, rir: "RIR 2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.86, rir: "RIR 2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 3, reps: "8", pct: 0.85, rir: "RIR 2" },
                { name: "Press Pallof + Plancha Lateral", target: "3 series × 12 reps/lado" }
              ]
            },
            {
              id: "b3-w9-d5",
              day_short: "VIE 15 ENE",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad 6×800m",
              title: "Series VO2máx / Ritmo 10K: 6 × 800m",
              duration_min: 38,
              distance_km: 6.5,
              target_zone: "Z4-Z5 (163 - 172 ppm) | 4:48 - 4:54 /km",
              summary: "4.8 km acumulados por debajo de 5:00/km con piernas descansadas (72h post-pierna).",
              steps: [
                { name: "Calentamiento", target: "1.2 km @ 6:05/km + 3 rectas" },
                { name: "6 × 800m", target: "6 × 800m @ 4:50/km (3:52 por 800m) rec 90s trote" },
                { name: "Enfriamiento", target: "0.5 km suaves" }
              ]
            },
            {
              id: "b3-w9-d6",
              day_short: "SÁB 16 ENE",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada 10.5K Z2",
              title: "Tirada Larga Sabatina 10.5 km en Z2",
              duration_min: 61,
              distance_km: 10.5,
              target_zone: "Z2 Estricta (136 - 150 ppm) | 5:50 - 6:00 /km",
              summary: "Resistencia aeróbica en Zona 2 antes de tu domingo completo de descanso.",
              steps: [
                { name: "Km 1 a 10.5 (Z2 Pura)", target: "10.5 km @ 5:55/km (FC < 150 ppm)" }
              ]
            },
            {
              id: "b3-w9-d7",
              day_short: "DOM 17 ENE",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Día de descanso personal fijo.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento" }
              ]
            }
          ]
        },
        {
          week_number: 10,
          label: "Semana 10 (Específico 5×1000m · 90–92% 1RM)",
          dates: "18 Ene – 24 Ene 2027",
          phase_type: "Especificidad 10K & Pico Neural (90–92% 1RM)",
          run_km_target: 23.5,
          strength_sessions_target: 3,
          coach_note: "Martes Peso Muerto al 92% 1RM ({deadlift:0.92}, bajo volumen), Viernes sesión reina 5 × 1.000m @ 4:50-4:55/km y Sábado tirada de 11.5 km Z2.",
          days: [
            {
              id: "b3-w10-d1",
              day_short: "LUN 18 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Pesado Controlado ({bench:0.92} Banca)",
              duration_min: 50,
              target_zone: "90–92% 1RM | RIR 1-2",
              summary: "Mantenimiento de fuerza máxima en banca y dominadas.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "2-3", pct: 0.92, rir: "RIR 1-2" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "4-5", pct: 0.85, rir: "RIR 1-2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5", pct: 0.86, rir: "RIR 2" },
                { name: "Remo con Barra", lift: "row_bar", sets: 3, reps: "8", pct: 0.86, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w10-d2",
              day_short: "MAR 19 ENE",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Peso Muerto 92% 1RM ({deadlift:0.92}) & Sentadilla ({squat:0.84})",
              duration_min: 45,
              target_zone: "84–92% 1RM | RIR 2",
              summary: "Series cortas de 2-3 repeticiones al 92% 1RM en Peso Muerto a 72h del 5×1000m del viernes.",
              steps: [
                { name: "Peso Muerto Barra (Deadlift)", lift: "deadlift", sets: 3, reps: "2-3", pct: 0.92, rir: "RIR 1-2" },
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "3", pct: 0.84, rir: "RIR 2" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 3, reps: "10", pct: 0.88, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w10-d3",
              day_short: "MIÉ 20 ENE",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 5.0 km",
              duration_min: 29,
              distance_km: 5.0,
              target_zone: "Z2 (136 - 150 ppm) | 5:50 /km",
              summary: "Rodaje cómodo de 5 km a mitad de semana.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "5.0 km @ 5:50/km" }
              ]
            },
            {
              id: "b3-w10-d4",
              day_short: "JUE 21 ENE",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B ({ohp:0.90} Militar) + Potencia",
              duration_min: 48,
              target_zone: "86–90% 1RM | RIR 2",
              summary: "Tercer día de gimnasio (Jueves): torso fuerte sin fatiga de piernas.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 4, reps: "3", pct: 0.90, rir: "RIR 1-2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.88, rir: "RIR 2" },
                { name: "Remo con Mancuerna", lift: "row_db", sets: 3, reps: "8", pct: 0.86, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w10-d5",
              day_short: "VIE 22 ENE",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad 5×1.000m",
              title: "Específico 10K: 5 × 1.000m (Rec 90s)",
              duration_min: 40,
              distance_km: 7.0,
              target_zone: "Z4-Z5 (162 - 170 ppm) | 4:50 - 4:55 /km",
              summary: "5 kilómetros fraccionados más rápido que el ritmo objetivo de Sub-50'.",
              steps: [
                { name: "Calentamiento", target: "1.5 km @ 6:05/km" },
                { name: "5 × 1.000m", target: "5 × 1km @ 4:50-4:55/km rec 90s trote suave" },
                { name: "Enfriamiento", target: "0.5 km trote" }
              ]
            },
            {
              id: "b3-w10-d6",
              day_short: "SÁB 23 ENE",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga 11.5K",
              title: "Tirada Larga Sabatina 11.5 km en Z2",
              duration_min: 67,
              distance_km: 11.5,
              target_zone: "Z2 (138 - 151 ppm) | 5:50 - 5:55 /km",
              summary: "Resistencia aeróbica sobrada para que los kilómetros 8 a 10 del 10K no pesen.",
              steps: [
                { name: "Tirada 11.5 km Z2", target: "11.5 km @ 5:52/km (FC < 151 ppm)" }
              ]
            },
            {
              id: "b3-w10-d7",
              day_short: "DOM 24 ENE",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Recuperación Completa",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Descanso completo fijo del domingo.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento" }
              ]
            }
          ]
        },
        {
          week_number: 11,
          label: "Semana 11 (Simulacro Específico · 85–88% 1RM)",
          dates: "25 Ene – 31 Ene 2027",
          phase_type: "Pico Específico 10K (85–88% 1RM · 24 km Carrera)",
          run_km_target: 24.0,
          strength_sessions_target: 3,
          coach_note: "Última semana fuerte antes del Tapering: Gimnasio L-M-J al 85–88% 1RM, Viernes simulacro 3×2.000m @ 4:56/km y Sábado tirada pico de 12 km Z2.",
          days: [
            {
              id: "b3-w11-d1",
              day_short: "LUN 25 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — 4×3 ({bench:0.88} Banca)",
              duration_min: 48,
              target_zone: "88% 1RM | RIR 2",
              summary: "Fuerza sólida sin llegar al fallo.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 4, reps: "3", pct: 0.88, rir: "RIR 2" },
                { name: "Dominadas Lastradas", lift: "pullup_load", sets: 4, reps: "5", pct: 0.75, rir: "RIR 2" },
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "5", pct: 0.84, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w11-d2",
              day_short: "MAR 26 ENE",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Activación 3×3 ({squat:0.84} Sentadilla)",
              duration_min: 42,
              target_zone: "82–84% 1RM | RIR 2-3",
              summary: "Última sesión pesada de pierna a 72h del 3×2.000m del viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", lift: "squat", sets: 3, reps: "3", pct: 0.84, rir: "RIR 2-3" },
                { name: "Peso Muerto Rumano (RDL)", lift: "rdl", sets: 3, reps: "4", pct: 0.82, rir: "RIR 2-3" },
                { name: "Elevación de Sóleo Sentado", lift: "soleus", sets: 3, reps: "12", pct: 0.82, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w11-d3",
              day_short: "MIÉ 27 ENE",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Base Z2",
              title: "Rodaje Aeróbico 4.5 km",
              duration_min: 26,
              distance_km: 4.5,
              target_zone: "Z2 (135 - 149 ppm) | 5:48 /km",
              summary: "Rodaje fluido y económico.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.5 km @ 5:48/km" }
              ]
            },
            {
              id: "b3-w11-d4",
              day_short: "JUE 28 ENE",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Upper B",
              title: "Tren Superior B — Mantenimiento ({ohp:0.85} Militar)",
              duration_min: 45,
              target_zone: "84–85% 1RM | RIR 2",
              summary: "Sesión limpia de torso cerrando el gimnasio semanal.",
              steps: [
                { name: "Press Militar Barra", lift: "ohp", sets: 3, reps: "4-5", pct: 0.85, rir: "RIR 2" },
                { name: "Press Inclinado Mancuernas", lift: "incline_db", sets: 3, reps: "8", pct: 0.84, rir: "RIR 2" },
                { name: "Remo con Barra / Polea", lift: "row_bar", sets: 3, reps: "8", pct: 0.82, rir: "RIR 2" }
              ]
            },
            {
              id: "b3-w11-d5",
              day_short: "VIE 29 ENE",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Calidad 3×2.000m",
              title: "Simulacro Ritmo 10K: 3 × 2.000m @ 4:56/km",
              duration_min: 42,
              distance_km: 7.5,
              target_zone: "Z4 (161 - 167 ppm) | 4:55 - 4:58 /km",
              summary: "6 km totales a ritmo Sub-50' divididos en 3 bloques de 2 km. Te dará confianza total.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:05/km" },
                { name: "3 × 2.000m", target: "3 × 2km @ 4:56/km (9:52 cada 2km) rec 2 min trote" },
                { name: "Enfriamiento", target: "0.5 km suaves" }
              ]
            },
            {
              id: "b3-w11-d6",
              day_short: "SÁB 30 ENE",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · Tirada Larga 12K",
              title: "Tirada Larga Sabatina Pico 12.0 km en Z2",
              duration_min: 70,
              distance_km: 12.0,
              target_zone: "Z2 (138 - 151 ppm) | 5:50 /km",
              summary: "Tu mayor volumen aeróbico en 6 meses: 12 km cómodos en Z2 antes de descansar el domingo.",
              steps: [
                { name: "Tirada 12.0 km Z2", target: "12.0 km @ 5:50/km" }
              ]
            },
            {
              id: "b3-w11-d7",
              day_short: "DOM 31 ENE",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Inicio del Tapering",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Descanso completo antes de la semana del Test 10K.",
              steps: [
                { name: "Descanso Completo", target: "Sin entrenamiento" }
              ]
            }
          ]
        },
        {
          week_number: 12,
          label: "Semana 12 (Tapering + Test 10K Sábado)",
          dates: "01 Feb – 07 Feb 2027",
          phase_type: "Tapering (70–80% 1RM) & Objetivo 10K Sub-50' el Sábado",
          run_km_target: 16.5,
          strength_sessions_target: 3,
          coach_note: "Semana de Tapering respetando tus días L-M-J de gimnasio (activación neural 70–80% 1RM, RIR 3-4) y X-V-S de carrera: el Sábado 06 Feb atacas el 10K Sub-50' y el Domingo 07 Feb disfrutas de tu descanso total.",
          days: [
            {
              id: "b3-w12-d1",
              day_short: "LUN 01 FEB",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Tapering Upper",
              title: "Tren Superior — Activación Neural 3×3 ({bench:0.80} Banca)",
              duration_min: 38,
              target_zone: "78–80% 1RM | RIR 3",
              summary: "Mantener tono neuromuscular sin desgaste.",
              steps: [
                { name: "Press Banca Barra", lift: "bench", sets: 3, reps: "3", pct: 0.80, rir: "RIR 3 (rápidas)" },
                { name: "Dominadas Estrictras", lift: "pullup_load", sets: 3, reps: "6", pct: 0.0, rir: "Peso Corporal" },
                { name: "Press Militar Barra", lift: "ohp", sets: 2, reps: "5", pct: 0.78, rir: "RIR 3" }
              ]
            },
            {
              id: "b3-w12-d2",
              day_short: "MAR 02 FEB",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · PAP Lower",
              title: "Potenciación Tren Inferior ({squat:0.72} Sentadilla, 96h antes del 10K)",
              duration_min: 30,
              target_zone: "70–72% 1RM | RIR 4",
              summary: "Último toque de pierna el martes (a 4 días completos del 10K del sábado): cargas moderadas a máxima velocidad.",
              steps: [
                { name: "Sentadilla Trasera (Velocidad)", lift: "squat", sets: 3, reps: "2", pct: 0.72, rir: "RIR 4 (explosivas)" },
                { name: "Sóleo Sentado Ligero", lift: "soleus", sets: 2, reps: "10", pct: 0.65, rir: "RIR 4" },
                { name: "Movilidad Completa Cadera/Tobillo", target: "10 min" }
              ]
            },
            {
              id: "b3-w12-d3",
              day_short: "MIÉ 03 FEB",
              day_name: "Miércoles",
              modality: "run",
              modality_label: "Carrera 1 · Activación Ritmo",
              title: "3 × 800m a Ritmo 10K (4:55/km)",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z3-Z4 (156 - 163 ppm)",
              summary: "Recordatorio neuromuscular del ritmo objetivo a 72h de la prueba.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:05/km" },
                { name: "3 × 800m", target: "3 × 800m @ 4:55/km rec 90s" },
                { name: "Enfriamiento", target: "0.6 km trote" }
              ]
            },
            {
              id: "b3-w12-d4",
              day_short: "JUE 04 FEB",
              day_name: "Jueves",
              modality: "strength",
              modality_label: "Gimnasio 3 · Movilidad & Core",
              title: "Sesión Ligera de Torso ({incline_db:0.68}), Core & Movilidad",
              duration_min: 30,
              target_zone: "65–68% 1RM | RIR 4",
              summary: "Aprovechamos el jueves de gimnasio para bombeo suave de torso y liberación miofascial.",
              steps: [
                { name: "Press Inclinado Mancuernas Ligero", lift: "incline_db", sets: 2, reps: "8", pct: 0.68, rir: "RIR 4" },
                { name: "Remo Polea Ligero", lift: "row_bar", sets: 2, reps: "8", pct: 0.65, rir: "RIR 4" },
                { name: "Estiramientos Dinámicos & Foam Roller", target: "12 min" }
              ]
            },
            {
              id: "b3-w12-d5",
              day_short: "VIE 05 FEB",
              day_name: "Viernes",
              modality: "run",
              modality_label: "Carrera 2 · Activación Pre-10K",
              title: "Suelta de Piernas 2.5 km + 3 Strides",
              duration_min: 16,
              distance_km: 2.5,
              target_zone: "Z1-Z2 (130 - 145 ppm)",
              summary: "Apenas 15 minutos suaves el viernes + carga de hidratos para despertar el sábado con Body Battery >85.",
              steps: [
                { name: "Rodaje 2.5 km + 3 Strides", target: "2.5 km @ 6:00/km + 3 rectas de 12s" }
              ]
            },
            {
              id: "b3-w12-d6",
              day_short: "SÁB 06 FEB",
              day_name: "Sábado",
              modality: "run",
              modality_label: "Carrera 3 · OBJETIVO 10K",
              title: "Test / Carrera 10K Oficial — Objetivo Sub 50:00 (4:58/km)",
              duration_min: 50,
              distance_km: 10.0,
              target_zone: "Z4 -> Z5 (160 -> 175 ppm) | 4:58 /km",
              summary: "Estrategia Negative Split el sábado por la mañana: primeros 3 km a 5:02/km, km 4-8 a 4:57/km y últimos 2 km a <4:50/km.",
              steps: [
                { name: "Km 1 a 3 (Control)", target: "3.0 km @ 5:00-5:02/km (FC < 161 ppm)" },
                { name: "Km 4 a 8 (Crucero Umbral)", target: "5.0 km @ 4:56-4:58/km (FC 162-166 ppm)" },
                { name: "Km 9 a 10 (Kick Final)", target: "2.0 km @ 4:45-4:50/km (Z5 hasta meta)" }
              ]
            },
            {
              id: "b3-w12-d7",
              day_short: "DOM 07 FEB",
              day_name: "Domingo",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total Dominical — Celebración & Recuperación Post-10K",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Domingo libre completo tras lograr el objetivo Sub-50'.",
              steps: [
                { name: "Descanso Completo", target: "Descanso total personal y familiar" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
