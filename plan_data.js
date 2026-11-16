/**
 * Plan de Entrenamiento Híbrido (Carrera + Fuerza) en Bloques de 4 Semanas (Mesociclos 3:1).
 * Calibrado con los datos reales de Garmin Connect del atleta:
 * - Edad: 33 años | Peso: 100.4 kg | FC Reposo media (6m): 45.6 ppm | FC Máx: 183 ppm | LTHR Carrera: 163 ppm
 * - Zonas FC Carrera (LTHR): Z1 (113-134), Z2 (135-153), Z3 (154-160), Z4 (161-167), Z5 (168-183)
 * - Marcas recientes 10K: 52:53 (5:14/km, Derbi Aficiones 25 Oct) y 54:05 (5:31/km, Ponle Freno 15 Nov)
 * - Marcas Fuerza (WE ARE BACK!): Peso Muerto 135kg (3x3), Press Banca 95kg (4x4) / 85kg (3x8),
 *   Sentadilla 80kg (4x3) / 90kg (1x8), RDL 80kg (4x4), Press Militar 55kg (4x3), Dominadas 4x6-7.
 */

window.HYBRID_TRAINING_PLAN = {
  methodology: {
    title: "Periodización Híbrida Concurrente (3 Bloques × 4 Semanas)",
    principles: [
      {
        name: "Polarización 80/20 en Carrera",
        detail: "En los últimos 6 meses casi todas tus salidas (27 carreras) se acumularon en zona Tempo/Umbral (145-153 ppm, 5:30-5:50/km) con baja frecuencia (1.1 sesiones/semana). Pasamos a 3 sesiones/semana: 2 en Zona 2 estricta (135-150 ppm) + 1 sesión de calidad."
      },
      {
        name: "Mínima Interferencia Neuromuscular (Separación >24h)",
        detail: "Fuerza de Tren Inferior se ubica los Miércoles, lejos de las series del Martes y a 96 horas de la Tirada Larga del Domingo. Se controla el daño excéntrico (RIR 2, sin fallo muscular en piernas)."
      },
      {
        name: "Protección Articular & Cadencia (Atleta >100 kg)",
        detail: "Con 100.4 kg de peso corporal y gran masa muscular, el tendón rotuliano y el de Aquiles requieren progresión de volumen <=10% semanal, trabajo pesado de sóleo/gemelo sentado y cadencia objetivo >=166-170 spm."
      },
      {
        name: "Autorregulación Matutina 09:00 AM por VFC (HRV)",
        detail: "Si a las 09:00 AM tu VFC cae debajo de 50 ms (tu límite inferior equilibrado) o el sueño <6.0h, la sesión de calidad pasa automáticamente a Z2 regenerativo o RIR +1 en fuerza."
      }
    ]
  },
  blocks: [
    {
      id: "block-1",
      number: 1,
      name: "Bloque 1: Consolidación Aeróbica & Base Híbrida",
      dates: "16 Nov 2026 – 13 Dic 2026 (Semanas 1 a 4)",
      focus: "Asimilar el 10K Ponle Freno, estabilizar 3 carreras/semana sin sobrecarga articular y consolidar fuerza básica con RIR 2.",
      target_run_km_range: "12.5 → 19.0 km/sem",
      target_strength_sessions: "3 sesiones/sem (Upper A, Lower Híbrido, Upper B + Potencia)",
      weeks: [
        {
          week_number: 1,
          label: "Semana 1 (Adaptación Post-10K)",
          dates: "16 Nov – 22 Nov 2026",
          phase_type: "Recuperación Activa & Transición",
          run_km_target: 12.5,
          strength_sessions_target: 3,
          coach_note: "Vienes de correr ayer el 10K Ponle Freno (Carga 215, TE 5.0) y de una noche previa de 4.8h (HRV 33 ms). Esta semana eliminamos series intensas de carrera: todo el volumen a pie es regenerativo en Z2 baja.",
          days: [
            {
              id: "b1-w1-d1",
              day_short: "LUN 16 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Empuje & Tirón Pesado (Sin impacto en piernas)",
              duration_min: 55,
              target_zone: "FC media < 110 ppm | RIR 2",
              completed_in_garmin: true,
              garmin_match: "Completado hoy en Garmin: Fuerza 56.4 min (Press Banca 3x8 @ 85kg, Dominadas 4x6, Press Militar 3x8 @ 45kg, Carga 18)",
              summary: "Sesión ideal post-carrera: mantienes estímulo neural en torso dejando descansar piernas y sistema nervioso central.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 6-8 reps @ 85 kg (RIR 2)" },
                { name: "Dominadas Estrictras (Pull-ups)", target: "4 series × 6 reps @ Peso Corporal" },
                { name: "Press Militar Barra de Pie", target: "3 series × 8 reps @ 45 kg" },
                { name: "Remo con Mancuerna Unilateral", target: "3 series × 10 reps @ 25 kg" },
                { name: " Movilidad Torácica & Tobillo", target: "8 min vuelta a la calma" }
              ]
            },
            {
              id: "b1-w1-d2",
              day_short: "MAR 17 NOV",
              day_name: "Martes",
              modality: "run",
              modality_label: "Carrera Z1/Z2",
              title: "Rodaje Regenerativo Post-10K + Suelta de Piernas",
              duration_min: 25,
              distance_km: 3.5,
              target_zone: "Z1-Z2 Baja (130 - 144 ppm) | 6:15 - 6:30 /km",
              summary: "Oxigenación pura para limpiar fatiga muscular del domingo. Prohibido pasar de 145 ppm.",
              steps: [
                { name: "Calentamiento dinámico", target: "5 min caminata rápida + movilidad cadera" },
                { name: "Rodaje Suave Controlado", target: "3.5 km @ 6:15-6:30/km (FC 132-144 ppm, Cadencia >164 spm)" },
                { name: "Estiramientos suaves sóleo/isquios", target: "5 min al terminar" }
              ]
            },
            {
              id: "b1-w1-d3",
              day_short: "MIÉ 18 NOV",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior Híbrido — Fuerza Estructural & Tendón",
              duration_min: 50,
              target_zone: "RIR 2-3 (Cero agujetas para el jueves)",
              summary: "Volumen controlado (3 series efectivas por ejercicio) priorizando cadena posterior y sóleo para proteger rodillas y Aquiles.",
              steps: [
                { name: "Sentadilla Trasera Barra (Back Squat)", target: "3 series × 4 reps @ 77.5 - 80 kg (RIR 2-3, explosivo al subir)" },
                { name: "Peso Muerto Rumano (RDL)", target: "3 series × 5 reps @ 75 - 80 kg (controlando 2s bajada)" },
                { name: "Split Squat Búlgaro / Pie Elevado", target: "3 series × 8 reps/pierna @ 15 kg mancuernas" },
                { name: "Elevación de Talones Sentado (Sóleo)", target: "4 series × 12-15 reps @ 30-35 kg (1s pausa arriba)" },
                { name: "Plancha Abdominal RKC + Deadbug", target: "3 series × 40s" }
              ]
            },
            {
              id: "b1-w1-d4",
              day_short: "JUE 19 NOV",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Base Aeróbica Z2 + 4 Rectas de Cadencia (Strides)",
              duration_min: 28,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:20 /km",
              summary: "Construcción mitocondrial sin lactato, cerrando con 4 aceleraciones cortas aláticas para mejorar economía de carrera.",
              steps: [
                { name: "Bloque Principal Z2", target: "3.6 km @ 6:10/km (FC 138-150 ppm)" },
                { name: "Strides Técnicos", target: "4 × 15 seg progresivos (@ ~4:45/km, alta cadencia 175+ spm) rec 45s andando" }
              ]
            },
            {
              id: "b1-w1-d5",
              day_short: "VIE 20 NOV",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B — Hipertrofia Funcional & Core",
              duration_min: 50,
              target_zone: "RIR 2 | FC media < 115 ppm",
              summary: "Segundo estímulo semanal de torso con énfasis en hombro, espalda alta, tríceps y cadena posterior con Kettlebell.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 52.5 - 55 kg (RIR 2)" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 10 reps @ 30 kg c/u" },
                { name: "Jalón al Pecho / Dominadas Neutras", target: "4 series × 8-10 reps" },
                { name: "Fondos en Paralelas (Dips)", target: "3 series × 7-8 reps @ Peso Corporal" },
                { name: "Kettlebell Swings (Potencia Cadera)", target: "3 series × 12 reps @ 22.5 - 24 kg" }
              ]
            },
            {
              id: "b1-w1-d6",
              day_short: "SÁB 21 NOV",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Movilidad Articular & Paseo NEAT (10.000 pasos)",
              duration_min: 30,
              target_zone: "Z1 (< 110 ppm)",
              summary: "Recarga de glucógeno y Body Battery (>75) antes de la tirada dominical.",
              steps: [
                { name: "Caminata al aire libre", target: "45-60 min suaves (acumular ~10k pasos)" },
                { name: "Movilidad Cadera, Psoas y Tobillo", target: "12 min rutina guiada" }
              ]
            },
            {
              id: "b1-w1-d7",
              day_short: "DOM 22 NOV",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Dominical Aeróbica Estricta",
              duration_min: 32,
              distance_km: 5.0,
              target_zone: "Z2 Estricta (135 - 151 ppm) | 6:05 - 6:20 /km",
              summary: "Tu reto principal: no convertir la tirada del domingo en un test a 5:35/km. Mantén el pulso debajo de 151 ppm todo el rato.",
              steps: [
                { name: "Km 1 (Entrada en calor)", target: "1.0 km @ 6:20-6:30/km (FC < 140 ppm)" },
                { name: "Km 2 a 5 (Crucero Z2)", target: "4.0 km @ 6:05-6:15/km (FC 142-151 ppm, respiración nasal/conversacional)" }
              ]
            }
          ]
        },
        {
          week_number: 2,
          label: "Semana 2 (Carga Base 1)",
          dates: "23 Nov – 29 Nov 2026",
          phase_type: "Acumulación Base Aeróbica",
          run_km_target: 15.0,
          strength_sessions_target: 3,
          coach_note: "Introducimos el primer Fartlek controlado los martes (cambios de ritmo en Z3/Z4) y subimos la tirada dominical a 6.5 km.",
          days: [
            {
              id: "b1-w2-d1",
              day_short: "LUN 23 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Fuerza Máxima",
              duration_min: 55,
              target_zone: "RIR 2",
              summary: "Progresión lineal en Press Banca y tracción vertical.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 5 reps @ 87.5 - 90 kg (RIR 2)" },
                { name: "Dominadas Estrictras", target: "4 series × 6-7 reps @ Peso Corporal" },
                { name: "Press Militar Mancuernas Sentado", target: "3 series × 8-10 reps @ 22.5 kg c/u" },
                { name: "Remo en Polea / Barra", target: "3 series × 10 reps @ 65 kg" },
                { name: "Curl Bíceps + Extensión Tríceps", target: "2 superseries × 12 reps" }
              ]
            },
            {
              id: "b1-w2-d2",
              day_short: "MAR 24 NOV",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: Fartlek",
              title: "Fartlek Controlado 5×(2 min Z3/Z4 + 2 min Z1)",
              duration_min: 28,
              distance_km: 4.5,
              target_zone: "Z2 Base + Cambios Z3/Z4 (154 - 163 ppm)",
              summary: "Reactivamos ritmos de 5:10-5:20/km en bloques cortos de 2 minutos sin acumular fatiga excesiva.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "8 min suaves @ 6:20/km" },
                { name: "Bloque Principal (5 repeticiones)", target: "5 × [2 min @ 5:10-5:20/km (FC 155-162) + 2 min trote suave @ 6:35/km]" },
                { name: "Enfriamiento Z1", target: "4 min trote muy suave" }
              ]
            },
            {
              id: "b1-w2-d3",
              day_short: "MIÉ 25 NOV",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Fuerza & Cadena Posterior",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Alternamos el patrón dominante: hoy Peso Muerto convencional pesado (lejos del domingo) + Sentadilla controlada.",
              steps: [
                { name: "Peso Muerto Barra (Deadlift)", target: "3 series × 3 reps @ 125 - 130 kg (RIR 2, agarre firme)" },
                { name: "Sentadilla Trasera Barra", target: "3 series × 5 reps @ 80 kg" },
                { name: "Curl Femoral Tumbado/Sentado", target: "3 series × 10 reps (excéntrica 3s para proteger isquios al correr)" },
                { name: "Elevación de Sóleo Sentado", target: "4 series × 12 reps @ 35 kg" },
                { name: "Hanging Knee Raises (Core)", target: "3 series × 10 reps" }
              ]
            },
            {
              id: "b1-w2-d4",
              day_short: "JUE 26 NOV",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Aeróbico Z2 + 4 Strides",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              summary: "Mantenimiento aeróbico fácil.",
              steps: [
                { name: "Rodaje Z2", target: "3.6 km @ 6:10/km (FC < 150 ppm)" },
                { name: "Rectas (Strides)", target: "4 × 15s fluidos @ 4:40/km con 45s rec" }
              ]
            },
            {
              id: "b1-w2-d5",
              day_short: "VIE 27 NOV",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B + Acondicionamiento Aláctico",
              duration_min: 50,
              target_zone: "RIR 1-2",
              summary: "Énfasis en empuje vertical, fondos y potencia de cadera.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 55 kg" },
                { name: "Press Banca Inclinado Mancuernas", target: "3 series × 10 reps @ 30-32.5 kg" },
                { name: "Dominadas / Pullover Polea", target: "4 series × 10-12 reps" },
                { name: "Fondos en Paralelas", target: "4 series × 7 reps" },
                { name: "Salto a la Comba + KB Swings", target: "3 rondas: 45s comba + 12 Swings @ 24 kg (descanso 60s)" }
              ]
            },
            {
              id: "b1-w2-d6",
              day_short: "SÁB 28 NOV",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Descanso Activo & Hidratación",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Caminata ligera y liberación miofascial en gemelos y cuádriceps.",
              steps: [
                { name: "Paseo Z1", target: "8.000 - 10.000 pasos diarios" },
                { name: "Foam Roller + Movilidad", target: "10 min en gemelos, cintilla iliotibial y dorsal" }
              ]
            },
            {
              id: "b1-w2-d7",
              day_short: "DOM 29 NOV",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Larga Aeróbica 6.5 km",
              duration_min: 40,
              distance_km: 6.5,
              target_zone: "Z2 (136 - 152 ppm) | 6:00 - 6:15 /km",
              summary: "Aumentamos a 40 minutos continuos en Zona 2 manteniendo deriva cardíaca baja.",
              steps: [
                { name: "Km 1-5 (Z2 Estable)", target: "5.0 km @ 6:10/km (FC 138-149 ppm)" },
                { name: "Km 5-6.5 (Z2 Alta)", target: "1.5 km @ 5:55/km (FC 149-153 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 3,
          label: "Semana 3 (Pico Bloque 1)",
          dates: "30 Nov – 06 Dic 2026",
          phase_type: "Sobrecarga Progresiva Controlada",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Semana de mayor carga del Bloque 1: alcanzamos 18 km semanales (tirada de 8 km el domingo) y tocamos pesos altos en banca (92.5 kg) y sentadilla (82.5 kg).",
          days: [
            {
              id: "b1-w3-d1",
              day_short: "LUN 30 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Intensidad 4×4",
              duration_min: 55,
              target_zone: "RIR 1-2",
              summary: "Acercándonos a tu récord de octubre (95 kg en Press Banca).",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 4 reps @ 92.5 kg (RIR 1-2)" },
                { name: "Dominadas Estrictras", target: "4 series × 7 reps @ Peso Corporal" },
                { name: "Press Militar Barra", target: "3 series × 6 reps @ 50 kg" },
                { name: "Remo con Mancuerna", target: "3 series × 10 reps @ 27.5 kg" }
              ]
            },
            {
              id: "b1-w3-d2",
              day_short: "MAR 01 DIC",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: Tempo Z3",
              title: "Bloques de Tempo 3 × 1.000m en Z3/Z4",
              duration_min: 32,
              distance_km: 5.5,
              target_zone: "Z3-Z4 (155 - 163 ppm) | 5:10 - 5:20 /km",
              summary: "Trabajo de eficiencia en el umbral aeróbico/anaeróbico con recuperación amplia.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.5 km @ 6:20/km" },
                { name: "Series Tempo", target: "3 × 1.000m @ 5:12-5:18/km (FC 156-163 ppm) con 90s rec trote" },
                { name: "Enfriamiento Z1", target: "1.0 km @ 6:30/km" }
              ]
            },
            {
              id: "b1-w3-d3",
              day_short: "MIÉ 02 DIC",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Fuerza & Estabilidad Unilateral",
              duration_min: 52,
              target_zone: "RIR 2",
              summary: "Consolidamos 82.5 kg en Sentadilla 4×3 y 82.5 kg en Peso Muerto Rumano.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 82.5 kg (RIR 2)" },
                { name: "Peso Muerto Rumano (RDL)", target: "4 series × 4 reps @ 82.5 kg" },
                { name: "Puente de Glúteo / Hip Thrust", target: "3 series × 10 reps @ 40-50 kg" },
                { name: "Elevación de Sóleo Sentado", target: "4 series × 12 reps @ 35-40 kg" }
              ]
            },
            {
              id: "b1-w3-d4",
              day_short: "JUE 03 DIC",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Aeróbico 4.5 km + 4 Strides",
              duration_min: 28,
              distance_km: 4.5,
              target_zone: "Z2 (135 - 150 ppm) | 6:05 - 6:15 /km",
              summary: "Asimilación aeróbica a ritmo cómodo.",
              steps: [
                { name: "Rodaje Z2", target: "4.1 km @ 6:10/km (FC < 150 ppm)" },
                { name: "Strides", target: "4 × 15s @ 4:40/km" }
              ]
            },
            {
              id: "b1-w3-d5",
              day_short: "VIE 04 DIC",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B — Pico de Volumen Bloque 1",
              duration_min: 52,
              target_zone: "RIR 1-2",
              summary: "Sesión sólida de torso antes del fin de semana.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 3-4 reps @ 55 - 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "4 series × 8-10 reps @ 32.5 kg" },
                { name: "Dominadas + Jalón", target: "4 series × 8 reps" },
                { name: "Fondos en Paralelas", target: "4 series × 8 reps" }
              ]
            },
            {
              id: "b1-w3-d6",
              day_short: "SÁB 05 DIC",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Descanso Activo & Movilidad",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Descanso muscular para afrontar los 8 km del domingo.",
              steps: [
                { name: "Caminata Suave", target: "45 min paseo al sol" },
                { name: "Movilidad", target: "10 min cadera y tobillo" }
              ]
            },
            {
              id: "b1-w3-d7",
              day_short: "DOM 06 DIC",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Larga Progresiva 8.0 km",
              duration_min: 48,
              distance_km: 8.0,
              target_zone: "Z2 (138 - 153 ppm) | 5:55 - 6:15 /km",
              summary: "Tu tirada aeróbica más larga del Bloque 1 sin entrar en Zona 3/4.",
              steps: [
                { name: "Km 1 a 6 (Z2 Pura)", target: "6.0 km @ 6:10/km (FC 138-149 ppm)" },
                { name: "Km 6 a 8 (Z2 Techo)", target: "2.0 km @ 5:50-5:55/km (FC 150-153 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 4,
          label: "Semana 4 (Descarga 3:1)",
          dates: "07 Dic – 13 Dic 2026",
          phase_type: "Supercompensación & Descarga (-25% Volumen)",
          run_km_target: 13.5,
          strength_sessions_target: 3,
          coach_note: "Semana clave del bloque 3:1. Reducimos las series de gimnasio a 2-3 por ejercicio (RIR 3) y bajamos el kilometraje a 13.5 km para que tendones, VFC y sistema nervioso supercompensen antes del Bloque 2.",
          days: [
            {
              id: "b1-w4-d1",
              day_short: "LUN 07 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Descarga Upper A",
              title: "Tren Superior A — Descarga Neural (3×5 RIR 3)",
              duration_min: 40,
              target_zone: "RIR 3",
              summary: "Mantenemos tensión mecánica con 85 kg pero cortamos volumen a la mitad.",
              steps: [
                { name: "Press Banca Barra", target: "3 series × 5 reps @ 85 kg (fáciles, RIR 3)" },
                { name: "Dominadas", target: "3 series × 5 reps" },
                { name: "Press Militar", target: "2 series × 6 reps @ 45 kg" },
                { name: "Remo Mancuerna", target: "2 series × 10 reps @ 25 kg" }
              ]
            },
            {
              id: "b1-w4-d2",
              day_short: "MAR 08 DIC",
              day_name: "Martes",
              modality: "run",
              modality_label: "Carrera Chispa",
              title: "Activación de Ritmo 4 × 400m Fluidos",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z2 + Toques Z4 (5:00/km)",
              summary: "Sesión corta y fresca para sentir ligereza de piernas.",
              steps: [
                { name: "Calentamiento Z2", target: "1.5 km @ 6:15/km" },
                { name: "4 × 400m", target: "4 × 400m @ 5:00/km (1:12 por 400m) rec 200m trote" },
                { name: "Enfriamiento", target: "0.9 km suaves" }
              ]
            },
            {
              id: "b1-w4-d3",
              day_short: "MIÉ 09 DIC",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Descarga Lower",
              title: "Tren Inferior — Descarga & Salud Tendinosa",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Piernas frescas y articulaciones recuperadas.",
              steps: [
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 75 kg (velocidad alta)" },
                { name: "Peso Muerto Rumano", target: "2 series × 5 reps @ 70 kg" },
                { name: "Sóleo Sentado Isométrico + Dinámico", target: "3 series × 12 reps @ 30 kg" }
              ]
            },
            {
              id: "b1-w4-d4",
              day_short: "JUE 10 DIC",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Fácil 3.5 km",
              duration_min: 22,
              distance_km: 3.5,
              target_zone: "Z2 Baja (135 - 146 ppm)",
              summary: "Evaluamos cuánto ha bajado tu FC a 6:05/km respecto a la Semana 1.",
              steps: [
                { name: "Rodaje Z2", target: "3.5 km @ 6:05/km observando eficiencia cardíaca" }
              ]
            },
            {
              id: "b1-w4-d5",
              day_short: "VIE 11 DIC",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Descarga Upper B",
              title: "Tren Superior B — Bombeo & Movilidad",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Sesión ligera y técnica.",
              steps: [
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 27.5 kg" },
                { name: "Jalón al Pecho", target: "3 series × 10 reps" },
                { name: "Fondos + Core", target: "2 series × 6 reps + Planchas" }
              ]
            },
            {
              id: "b1-w4-d6",
              day_short: "SÁB 12 DIC",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Completo & Sueño >7.5h",
              duration_min: 0,
              target_zone: "Recuperación",
              summary: "Objetivo: llevar la VFC semanal por encima de 54 ms.",
              steps: [
                { name: "Descanso", target: "Paseo libre sin exigencia" }
              ]
            },
            {
              id: "b1-w4-d7",
              day_short: "DOM 13 DIC",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Z2",
              title: "Tirada Dominical Cómoda 6.0 km",
              duration_min: 36,
              distance_km: 6.0,
              target_zone: "Z2 (138 - 150 ppm) | 6:00 /km",
              summary: "Cierre del Bloque 1 con sensación de reserva total de energía.",
              steps: [
                { name: "Rodaje Continuo Z2", target: "6.0 km @ 6:00/km (FC < 150 ppm)" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "block-2",
      number: 2,
      name: "Bloque 2: Desarrollo de Umbral (LTHR) & Fuerza-Potencia",
      dates: "14 Dic 2026 – 10 Ene 2027 (Semanas 5 a 8)",
      focus: "Desplazar tu ritmo de Umbral de Lactato (163 ppm) de 5:30/km hacia 5:05-5:10/km, alcanzando 22 km/sem y récord de fuerza en básicos.",
      target_run_km_range: "18.0 → 22.5 km/sem",
      target_strength_sessions: "3 sesiones/sem (Fuerza Máxima + Contraste Explosivo)",
      weeks: [
        {
          week_number: 5,
          label: "Semana 5 (Inicio Umbral)",
          dates: "14 Dic – 20 Dic 2026",
          phase_type: "Construcción de Umbral",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Comenzamos los Cruise Intervals en Zona 4 (161-166 ppm) los martes y subimos la tirada larga a 8.5 km.",
          days: [
            {
              id: "b2-w5-d1",
              day_short: "LUN 14 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Bloque Fuerza (95 kg Banca)",
              duration_min: 55,
              target_zone: "RIR 1-2",
              summary: "Igualamos tu mejor marca de octubre con mayor control técnico.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 4 reps @ 95 kg" },
                { name: "Dominadas Lastradas / Estrictras", target: "4 series × 6 reps (+2.5 a 5 kg si es fluido)" },
                { name: "Press Militar Barra", target: "3 series × 6 reps @ 52.5 kg" },
                { name: "Remo con Barra / Mancuerna", target: "3 series × 8 reps @ 30 kg" }
              ]
            },
            {
              id: "b2-w5-d2",
              day_short: "MAR 15 DIC",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: Umbral",
              title: "Cruise Intervals 3 × 1.500m en Umbral (Z4)",
              duration_min: 35,
              distance_km: 5.5,
              target_zone: "Z4 (160 - 165 ppm) | 5:08 - 5:15 /km",
              summary: "Acumulamos 4.5 km a ritmo de umbral fraccionado con 90s de descanso.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.0 km @ 6:15/km + 2 rectas" },
                { name: "3 × 1.500m Umbral", target: "3 × 1.5 km @ 5:10/km (FC 160-165 ppm) rec 90s trote" },
                { name: "Enfriamiento", target: "0.5 km trote suave" }
              ]
            },
            {
              id: "b2-w5-d3",
              day_short: "MIÉ 16 DIC",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Fuerza + Rigidez Reactiva (Stiffness)",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Mejoramos la reactividad elástica del tobillo y cadera para gastar menos oxígeno al correr.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 85 kg" },
                { name: "Peso Muerto Rumano (RDL)", target: "3 series × 5 reps @ 85 kg" },
                { name: "Split Squat Búlgaro", target: "3 series × 8 reps/pierna @ 17.5 kg" },
                { name: "Sóleo Sentado Pesado + Saltos Pogo Suaves", target: "4 × (10 reps @ 40 kg + 15 pequeños rebotes de tobillo)" }
              ]
            },
            {
              id: "b2-w5-d4",
              day_short: "JUE 17 DIC",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Aeróbico 4.0 km",
              duration_min: 24,
              distance_km: 4.0,
              target_zone: "Z2 (135 - 150 ppm) | 5:55 - 6:10 /km",
              summary: "Rodaje fluido de recuperación activa.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.0 km @ 6:00/km (FC < 150 ppm)" }
              ]
            },
            {
              id: "b2-w5-d5",
              day_short: "VIE 18 DIC",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B + Potencia Híbrida",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Fuerza de torso y cadena posterior explosiva.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 55 - 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 32.5 kg" },
                { name: "Dominadas / Jalón", target: "4 series × 8 reps" },
                { name: "Fondos + Kettlebell Swings", target: "3 superseries: 8 Fondos + 15 Swings @ 24 kg" }
              ]
            },
            {
              id: "b2-w5-d6",
              day_short: "SÁB 19 DIC",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Movilidad & Paseo 10k Pasos",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Recuperación previa a los 8.5 km del domingo.",
              steps: [
                { name: "Caminata + Movilidad", target: "45 min paseo + 10 min estiramientos dinámicos" }
              ]
            },
            {
              id: "b2-w5-d7",
              day_short: "DOM 20 DIC",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Larga 8.5 km en Z2",
              duration_min: 51,
              distance_km: 8.5,
              target_zone: "Z2 (138 - 152 ppm) | 5:55 - 6:05 /km",
              summary: "Más de 50 minutos continuos construyendo capilarización aeróbica.",
              steps: [
                { name: "Tirada Continua Z2", target: "8.5 km @ 6:00/km (FC media ~145 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 6,
          label: "Semana 6 (Consolidación Umbral)",
          dates: "21 Dic – 27 Dic 2026",
          phase_type: "Carga Específica Híbrida",
          run_km_target: 20.0,
          strength_sessions_target: 3,
          coach_note: "Rompemos la barrera de los 20 km semanales con 2×2.000m en umbral el martes y tirada de 9.5 km el domingo.",
          days: [
            {
              id: "b2-w6-d1",
              day_short: "LUN 21 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Serie Top @ 97.5 kg",
              duration_min: 55,
              target_zone: "RIR 1-2",
              summary: "Nuevo récord personal en Press Banca en bloques de 3 repeticiones.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 3 reps @ 97.5 kg (RIR 1-2)" },
                { name: "Dominadas", target: "4 series × 7 reps" },
                { name: "Press Militar", target: "3 series × 6 reps @ 52.5 kg" },
                { name: "Remo con Barra", target: "3 series × 8 reps @ 70 kg" }
              ]
            },
            {
              id: "b2-w6-d2",
              day_short: "MAR 22 DIC",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: 2×2km + 1km",
              title: "Umbral de Lactato: 2 × 2.000m + 1 × 1.000m",
              duration_min: 38,
              distance_km: 6.0,
              target_zone: "Z4 (161 - 166 ppm) | 5:05 - 5:12 /km",
              summary: "Sostener 10 minutos seguidos a ritmo de umbral con pulso estable.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:15/km" },
                { name: "2 × 2.000m + 1 × 1.000m", target: "2×2km @ 5:10/km (rec 2 min) + 1×1km @ 5:02/km" },
                { name: "Enfriamiento", target: "0.5 km trote" }
              ]
            },
            {
              id: "b2-w6-d3",
              day_short: "MIÉ 23 DIC",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Peso Muerto 135 kg & Sentadilla",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Consolidamos los 135 kg en Peso Muerto (3×3) con velocidad de barra alta.",
              steps: [
                { name: "Peso Muerto Barra", target: "3 series × 3 reps @ 135 kg" },
                { name: "Sentadilla Trasera", target: "3 series × 5 reps @ 82.5 kg" },
                { name: "Curl Femoral + Sóleo Sentado", target: "4 superseries × 10-12 reps" }
              ]
            },
            {
              id: "b2-w6-d4",
              day_short: "JUE 24 DIC",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Nochebuena Z2 4.5 km",
              duration_min: 27,
              distance_km: 4.5,
              target_zone: "Z2 (135 - 150 ppm) | 5:55 - 6:05 /km",
              summary: "Rodaje matutino cómodo y rápido.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.5 km @ 6:00/km" }
              ]
            },
            {
              id: "b2-w6-d5",
              day_short: "VIE 25 DIC",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B / Full Body Express",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Sesión adaptable en horario festivo.",
              steps: [
                { name: "Press Militar + Dominadas", target: "4 superseries × 5-7 reps" },
                { name: "Press Inclinado + Remo", target: "3 superseries × 10 reps" },
                { name: "Fondos + Core", target: "3 series × 8 reps" }
              ]
            },
            {
              id: "b2-w6-d6",
              day_short: "SÁB 26 DIC",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Paseo Regenerativo & Movilidad",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Recuperación activa.",
              steps: [
                { name: "Caminata Z1", target: "8.000 - 10.000 pasos" }
              ]
            },
            {
              id: "b2-w6-d7",
              day_short: "DOM 27 DIC",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Larga Progresiva 9.5 km",
              duration_min: 56,
              distance_km: 9.5,
              target_zone: "Z2 (138 - 153 ppm) | 5:50 - 6:05 /km",
              summary: "Rozando la distancia de 10K pero íntegramente en Zona 2 aeróbica.",
              steps: [
                { name: "Km 1 a 7 (Z2 Estable)", target: "7.0 km @ 6:00/km (FC < 149 ppm)" },
                { name: "Km 7 a 9.5 (Z2 Techo)", target: "2.5 km @ 5:40-5:45/km (FC 150-154 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 7,
          label: "Semana 7 (Pico Bloque 2)",
          dates: "28 Dic 2026 – 03 Ene 2027",
          phase_type: "Pico de Umbral & Fuerza",
          run_km_target: 22.0,
          strength_sessions_target: 3,
          coach_note: "Semana cumbre del Bloque 2: Tempo continuo de 4 km a ~5:05/km, intento de 100 kg en Press Banca y tirada dominical de 10.5 km en Z2.",
          days: [
            {
              id: "b2-w7-d1",
              day_short: "LUN 28 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Objetivo 100 kg Press Banca",
              duration_min: 55,
              target_zone: "RIR 1",
              summary: "Hito de fuerza híbrida: 100 kg en Press Banca manteniendo 22 km de carrera semanal.",
              steps: [
                { name: "Press Banca Barra", target: "2×3 @ 95 kg + 2×2 @ 100 kg (RIR 1)" },
                { name: "Dominadas", target: "4 series × 7-8 reps" },
                { name: "Press Militar", target: "3 series × 5 reps @ 55 kg" },
                { name: "Remo con Mancuerna", target: "3 series × 10 reps @ 30 kg" }
              ]
            },
            {
              id: "b2-w7-d2",
              day_short: "MAR 29 DIC",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: Tempo 4K",
              title: "Tempo Run Continuo 4.0 km en Z3/Z4",
              duration_min: 38,
              distance_km: 6.5,
              target_zone: "Z3-Z4 (158 - 165 ppm) | 5:05 - 5:10 /km",
              summary: "20 minutos continuos a ritmo fuerte controlado.",
              steps: [
                { name: "Calentamiento Z1/Z2", target: "1.5 km @ 6:10/km" },
                { name: "Bloque Tempo Continuo", target: "4.0 km @ 5:05-5:10/km (FC 158-165 ppm)" },
                { name: "Enfriamiento Z1", target: "1.0 km @ 6:25/km" }
              ]
            },
            {
              id: "b2-w7-d3",
              day_short: "MIÉ 30 DIC",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Sentadilla 90 kg & RDL 87.5 kg",
              duration_min: 52,
              target_zone: "RIR 1-2",
              summary: "Fuerza máxima controlada en tren inferior.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 87.5 - 90 kg" },
                { name: "Peso Muerto Rumano", target: "3 series × 5 reps @ 85 - 87.5 kg" },
                { name: "Zancadas / Split Squat", target: "3 series × 8 reps @ 17.5 kg" },
                { name: "Sóleo Sentado", target: "4 series × 12 reps @ 40 kg" }
              ]
            },
            {
              id: "b2-w7-d4",
              day_short: "JUE 31 DIC",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje San Silvestre Z2 (Sin competir a tope)",
              duration_min: 30,
              distance_km: 5.0,
              target_zone: "Z2 (138 - 151 ppm) | 5:50 - 6:00 /km",
              summary: "Disfruta del último día del año rodando fluido en Zona 2.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "5.0 km @ 5:55/km" }
              ]
            },
            {
              id: "b2-w7-d5",
              day_short: "VIE 01 ENE",
              day_name: "Viernes",
              modality: "rest",
              modality_label: "Descanso Año Nuevo",
              title: "Descanso & Paseo de Año Nuevo",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Intercambiamos viernes y sábado por festivo de Año Nuevo.",
              steps: [
                { name: "Paseo regenerativo", target: "40 min al aire libre" }
              ]
            },
            {
              id: "b2-w7-d6",
              day_short: "SÁB 02 ENE",
              day_name: "Sábado",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B — Hombro, Espalda & Brazos",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Cero fatiga en piernas para la tirada de 10.5 km de mañana.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8-10 reps @ 32.5 kg" },
                { name: "Dominadas + Remo", target: "4 series × 8 reps" },
                { name: "Fondos en Paralelas", target: "3 series × 8 reps" }
              ]
            },
            {
              id: "b2-w7-d7",
              day_short: "DOM 03 ENE",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga Z2",
              title: "Tirada Larga 10.5 km en Z2",
              duration_min: 62,
              distance_km: 10.5,
              target_zone: "Z2 (138 - 153 ppm) | 5:50 - 6:00 /km",
              summary: "Superamos la distancia de 10 km en entrenamiento aeróbico cómodo.",
              steps: [
                { name: "Rodaje 10.5 km Z2", target: "10.5 km @ 5:55/km (FC < 153 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 8,
          label: "Semana 8 (Descarga 3:1)",
          dates: "04 Ene – 10 Ene 2027",
          phase_type: "Descarga & Asimilación Bloque 2",
          run_km_target: 15.5,
          strength_sessions_target: 3,
          coach_note: "Semana de descarga del Bloque 2: reducimos volumen un 30% para asimilar las ganancias de umbral antes de entrar al bloque final específico Sub-50'.",
          days: [
            {
              id: "b2-w8-d1",
              day_short: "LUN 04 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Descarga Upper A",
              title: "Tren Superior A — Descarga Activa (RIR 3)",
              duration_min: 40,
              target_zone: "RIR 3",
              summary: "3 series fluidas sin fatiga acumulada.",
              steps: [
                { name: "Press Banca Barra", target: "3 series × 5 reps @ 85 kg" },
                { name: "Dominadas", target: "3 series × 6 reps" },
                { name: "Press Militar", target: "2 series × 6 reps @ 47.5 kg" }
              ]
            },
            {
              id: "b2-w8-d2",
              day_short: "MAR 05 ENE",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad Ligera",
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
              id: "b2-w8-d3",
              day_short: "MIÉ 06 ENE",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Descarga Lower",
              title: "Tren Inferior Ligero & Movilidad",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Mantenimiento neuromuscular.",
              steps: [
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 77.5 kg" },
                { name: "Peso Muerto Rumano", target: "2 series × 5 reps @ 75 kg" },
                { name: "Sóleo Sentado", target: "3 series × 12 reps @ 35 kg" }
              ]
            },
            {
              id: "b2-w8-d4",
              day_short: "JUE 07 ENE",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
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
              id: "b2-w8-d5",
              day_short: "VIE 08 ENE",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Descarga Upper B",
              title: "Tren Superior B Ligero",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Bombeo articular sin estrés sistémico.",
              steps: [
                { name: "Press Inclinado + Remo", target: "3 superseries × 8 reps" },
                { name: "Fondos + Core", target: "2 series × 7 reps" }
              ]
            },
            {
              id: "b2-w8-d6",
              day_short: "SÁB 09 ENE",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso & Recarga Body Battery",
              duration_min: 0,
              target_zone: "Descanso",
              summary: "Preparación para el Bloque 3.",
              steps: [
                { name: "Descanso", target: "Dormir >7.5h" }
              ]
            },
            {
              id: "b2-w8-d7",
              day_short: "DOM 10 ENE",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Z2",
              title: "Tirada Dominical 7.0 km en Z2",
              duration_min: 41,
              distance_km: 7.0,
              target_zone: "Z2 (138 - 150 ppm) | 5:50 /km",
              summary: "Notarás que a 5:50/km el pulso va 5-7 ppm más bajo que en noviembre.",
              steps: [
                { name: "Rodaje Z2", target: "7.0 km @ 5:50/km" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "block-3",
      number: 3,
      name: "Bloque 3: Pico Específico VO2máx & Objetivo 10K Sub-50'",
      dates: "11 Ene 2027 – 07 Feb 2027 (Semanas 9 a 12)",
      focus: "Series específicas de VO2máx y ritmo 10K (<5:00/km), tiradas largas de hasta 12 km y mantenimiento neural de fuerza máxima con bajo volumen.",
      target_run_km_range: "21.5 → 25.0 km/sem (Tapering Sem 12)",
      target_strength_sessions: "3 sesiones/sem (Mantenimiento Neural 3×3-5)",
      weeks: [
        {
          week_number: 9,
          label: "Semana 9 (VO2máx 800m)",
          dates: "11 Ene – 17 Ene 2027",
          phase_type: "Potencia Aeróbica VO2máx",
          run_km_target: 21.5,
          strength_sessions_target: 3,
          coach_note: "Introducimos intervalos en Zona 4 alta / Zona 5 baja (6×800m a 4:48-4:52/km) manteniendo bajo el volumen de pierna en gimnasio (3 series pesadas).",
          days: [
            {
              id: "b3-w9-d1",
              day_short: "LUN 11 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Fuerza Pura 4×3",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Mantenimiento de alta intensidad en torso.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 3 reps @ 97.5 kg" },
                { name: "Dominadas Lastradas", target: "4 series × 5 reps (+5 kg)" },
                { name: "Press Militar", target: "3 series × 5 reps @ 55 kg" },
                { name: "Remo Mancuerna", target: "3 series × 8 reps @ 30 kg" }
              ]
            },
            {
              id: "b3-w9-d2",
              day_short: "MAR 12 ENE",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: 6×800m",
              title: "Series VO2máx / Ritmo 10K: 6 × 800m",
              duration_min: 38,
              distance_km: 6.5,
              target_zone: "Z4-Z5 (163 - 172 ppm) | 4:48 - 4:54 /km",
              summary: "4.8 km acumulados por debajo de 5:00/km para elevar el techo aeróbico.",
              steps: [
                { name: "Calentamiento", target: "1.2 km @ 6:05/km + 3 rectas" },
                { name: "6 × 800m", target: "6 × 800m @ 4:50/km (3:52 por 800m) rec 90s trote" },
                { name: "Enfriamiento", target: "0.5 km suaves" }
              ]
            },
            {
              id: "b3-w9-d3",
              day_short: "MIÉ 13 ENE",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower Neural",
              title: "Tren Inferior — Mantenimiento Neural (Bajo Volumen)",
              duration_min: 45,
              target_zone: "RIR 2-3",
              summary: "Pocas repeticiones, alta carga y cero fatiga metabólica para priorizar la carrera.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "3 series × 3 reps @ 87.5 kg (RIR 2)" },
                { name: "Peso Muerto Rumano", target: "3 series × 4 reps @ 85 kg" },
                { name: "Sóleo Sentado Pesado", target: "4 series × 10 reps @ 42.5 kg" }
              ]
            },
            {
              id: "b3-w9-d4",
              day_short: "JUE 14 ENE",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Aeróbico 4.5 km + 4 Strides",
              duration_min: 27,
              distance_km: 4.5,
              target_zone: "Z2 (136 - 150 ppm) | 5:50 /km",
              summary: "Rodaje fácil de asimilación.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "4.5 km @ 5:50/km" }
              ]
            },
            {
              id: "b3-w9-d5",
              day_short: "VIE 15 ENE",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B + Core Antirotación",
              duration_min: 48,
              target_zone: "RIR 2",
              summary: "Estabilidad de tronco para mantener la postura en los kilómetros finales del 10K.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 32.5 kg" },
                { name: "Dominadas + Fondos", target: "3 superseries × 7 reps" },
                { name: "Press Pallof + Plancha Lateral", target: "3 series × 12 reps/lado" }
              ]
            },
            {
              id: "b3-w9-d6",
              day_short: "SÁB 16 ENE",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Movilidad & Paseo Z1",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Piernas frescas para los 10.5 km con final fuerte.",
              steps: [
                { name: "Paseo + Movilidad", target: "8.000 - 10.000 pasos" }
              ]
            },
            {
              id: "b3-w9-d7",
              day_short: "DOM 17 ENE",
              day_name: "Domingo",
              modality_label: "Tirada Progresiva",
              modality: "run",
              title: "Tirada Larga 10.5 km (Últimos 2 km a 5:10/km)",
              duration_min: 60,
              distance_km: 10.5,
              target_zone: "Z2 (8.5 km) + Z3/Z4 (2.0 km)",
              summary: "Enseñamos al cuerpo a cambiar de ritmo a 5:10/km con pre-fatiga aeróbica.",
              steps: [
                { name: "Km 1 a 8.5 (Z2)", target: "8.5 km @ 5:55/km (FC < 150 ppm)" },
                { name: "Km 8.5 a 10.5 (Final Fuerte)", target: "2.0 km @ 5:08-5:12/km (FC 158-163 ppm)" }
              ]
            }
          ]
        },
        {
          week_number: 10,
          label: "Semana 10 (Específico 5×1000m)",
          dates: "18 Ene – 24 Ene 2027",
          phase_type: "Especificidad 10K",
          run_km_target: 23.5,
          strength_sessions_target: 3,
          coach_note: "Sesión reina clásica de 10K el martes: 5 × 1.000m a 4:50-4:55/km y tirada larga de 11.5 km el domingo.",
          days: [
            {
              id: "b3-w10-d1",
              day_short: "LUN 18 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — Pesado Controlado",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Mantenimiento de fuerza máxima en banca y dominadas.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 3 reps @ 97.5 - 100 kg" },
                { name: "Dominadas", target: "4 series × 7-8 reps" },
                { name: "Press Militar + Remo", target: "3 superseries × 6-8 reps" }
              ]
            },
            {
              id: "b3-w10-d2",
              day_short: "MAR 19 ENE",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: 5×1.000m",
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
              id: "b3-w10-d3",
              day_short: "MIÉ 20 ENE",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Peso Muerto 140 kg & Sentadilla",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Nuevo hito en Peso Muerto (140 kg) con bajo volumen total.",
              steps: [
                { name: "Peso Muerto Barra", target: "3 series × 2-3 reps @ 137.5 - 140 kg" },
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 85 kg" },
                { name: "Sóleo Sentado + Isquios", target: "3 series × 10 reps" }
              ]
            },
            {
              id: "b3-w10-d4",
              day_short: "JUE 21 ENE",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
              title: "Rodaje Aeróbico 5.0 km",
              duration_min: 29,
              distance_km: 5.0,
              target_zone: "Z2 (136 - 150 ppm) | 5:50 /km",
              summary: "Rodaje cómodo de 5 km.",
              steps: [
                { name: "Rodaje Z2 + 4 Strides", target: "5.0 km @ 5:50/km" }
              ]
            },
            {
              id: "b3-w10-d5",
              day_short: "VIE 22 ENE",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B + Potencia",
              duration_min: 48,
              target_zone: "RIR 2",
              summary: "Sesión completa de torso.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 3 reps @ 57.5 - 60 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 32.5 kg" },
                { name: "Dominadas + Fondos", target: "3 superseries × 8 reps" }
              ]
            },
            {
              id: "b3-w10-d6",
              day_short: "SÁB 23 ENE",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Descanso & Movilidad",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Recarga previa a la tirada más larga del plan (11.5 km).",
              steps: [
                { name: "Caminata + Movilidad", target: "8.000 - 10.000 pasos" }
              ]
            },
            {
              id: "b3-w10-d7",
              day_short: "DOM 24 ENE",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga 11.5K",
              title: "Tirada Larga 11.5 km en Z2",
              duration_min: 67,
              distance_km: 11.5,
              target_zone: "Z2 (138 - 153 ppm) | 5:50 /km",
              summary: "Resistencia aeróbica sobrada para que los kilómetros 8 a 10 del 10K no pesen.",
              steps: [
                { name: "Tirada 11.5 km Z2", target: "11.5 km @ 5:50/km" }
              ]
            }
          ]
        },
        {
          week_number: 11,
          label: "Semana 11 (Simulacro Específico)",
          dates: "25 Ene – 31 Ene 2027",
          phase_type: "Pico Específico (Última semana fuerte)",
          run_km_target: 24.0,
          strength_sessions_target: 3,
          coach_note: "Última semana de carga alta antes del Tapering: 3 × 2.000m a ritmo exacto de competición (4:56/km) y tirada de 12 km.",
          days: [
            {
              id: "b3-w11-d1",
              day_short: "LUN 25 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Fuerza Upper A",
              title: "Tren Superior A — 4×3 @ 97.5 kg",
              duration_min: 48,
              target_zone: "RIR 2",
              summary: "Fuerza sólida sin llegar al fallo.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 3 reps @ 97.5 kg" },
                { name: "Dominadas", target: "4 series × 7 reps" },
                { name: "Press Militar + Remo", target: "3 series × 6-8 reps" }
              ]
            },
            {
              id: "b3-w11-d2",
              day_short: "MAR 26 ENE",
              day_name: "Martes",
              modality: "run",
              modality_label: "Calidad: 3×2.000m",
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
              id: "b3-w11-d3",
              day_short: "MIÉ 27 ENE",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Fuerza Lower",
              title: "Tren Inferior — Activación 3×3 (Sin fatiga residual)",
              duration_min: 42,
              target_zone: "RIR 2-3",
              summary: "Última sesión pesada de pierna antes de la semana del test 10K.",
              steps: [
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 85 kg" },
                { name: "Peso Muerto Rumano", target: "3 series × 4 reps @ 82.5 kg" },
                { name: "Sóleo Sentado", target: "3 series × 12 reps @ 40 kg" }
              ]
            },
            {
              id: "b3-w11-d4",
              day_short: "JUE 28 ENE",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Carrera Base Z2",
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
              id: "b3-w11-d5",
              day_short: "VIE 29 ENE",
              day_name: "Viernes",
              modality: "strength",
              modality_label: "Fuerza Upper B",
              title: "Tren Superior B — Mantenimiento",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Sesión limpia de torso.",
              steps: [
                { name: "Press Militar + Dominadas", target: "3 superseries × 5-7 reps" },
                { name: "Press Inclinado + Remo", target: "3 superseries × 8 reps" }
              ]
            },
            {
              id: "b3-w11-d6",
              day_short: "SÁB 30 ENE",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Descanso Activo",
              title: "Descanso & Hidratación",
              duration_min: 30,
              target_zone: "Z1",
              summary: "Preparación para los 12 km.",
              steps: [
                { name: "Paseo suave", target: "8.000 pasos" }
              ]
            },
            {
              id: "b3-w11-d7",
              day_short: "DOM 31 ENE",
              day_name: "Domingo",
              modality: "run",
              modality_label: "Tirada Larga 12K",
              title: "Tirada Larga Pico 12.0 km en Z2",
              duration_min: 70,
              distance_km: 12.0,
              target_zone: "Z2 (138 - 152 ppm) | 5:50 /km",
              summary: "Tu mayor volumen aeróbico en 6 meses: 12 km cómodos en Z2.",
              steps: [
                { name: "Tirada 12.0 km Z2", target: "12.0 km @ 5:50/km" }
              ]
            }
          ]
        },
        {
          week_number: 12,
          label: "Semana 12 (Tapering + Test 10K)",
          dates: "01 Feb – 07 Feb 2027",
          phase_type: "Puesta a Punto (Tapering) & Día de Competición / Test 10K",
          run_km_target: 16.5,
          strength_sessions_target: 2,
          coach_note: "Semana de Tapering: eliminamos la sesión de pierna del miércoles, bajamos fatiga (ATL) para que el TSB (Forma) suba a +10/+15 y el domingo atacamos el 10K Sub-50' (4:58/km).",
          days: [
            {
              id: "b3-w12-d1",
              day_short: "LUN 01 FEB",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Tapering Upper",
              title: "Tren Superior — Activación Neural 3×3",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Mantener tono neuromuscular sin desgaste.",
              steps: [
                { name: "Press Banca Barra", target: "3 series × 3 reps @ 90 kg (rápidas)" },
                { name: "Dominadas", target: "3 series × 6 reps" },
                { name: "Press Militar", target: "2 series × 5 reps @ 50 kg" }
              ]
            },
            {
              id: "b3-w12-d2",
              day_short: "MAR 02 FEB",
              day_name: "Martes",
              modality: "run",
              modality_label: "Activación Ritmo",
              title: "3 × 800m a Ritmo 10K (4:55/km)",
              duration_min: 25,
              distance_km: 4.0,
              target_zone: "Z3-Z4 (156 - 163 ppm)",
              summary: "Recordatorio neuromuscular del ritmo objetivo sin fatigar.",
              steps: [
                { name: "Calentamiento", target: "1.0 km @ 6:05/km" },
                { name: "3 × 800m", target: "3 × 800m @ 4:55/km rec 90s" },
                { name: "Enfriamiento", target: "0.6 km trote" }
              ]
            },
            {
              id: "b3-w12-d3",
              day_short: "MIÉ 03 FEB",
              day_name: "Miércoles",
              modality: "strength",
              modality_label: "Potenciación (PAP)",
              title: "Activación Neural Full Body (Cero Agujetas)",
              duration_min: 30,
              target_zone: "RIR 4",
              summary: "Último toque de pesas a 96 horas del 10K: cargas medias movidas a máxima velocidad.",
              steps: [
                { name: "Sentadilla Trasera (Velocidad)", target: "3 series × 2 reps @ 75 kg (explosivas)" },
                { name: "Press Banca / Fondos", target: "2 series × 5 reps" },
                { name: "Movilidad Completa", target: "10 min" }
              ]
            },
            {
              id: "b3-w12-d4",
              day_short: "JUE 04 FEB",
              day_name: "Jueves",
              modality: "run",
              modality_label: "Rodaje Corto",
              title: "Suelta de Piernas 2.5 km + 3 Strides",
              duration_min: 16,
              distance_km: 2.5,
              target_zone: "Z1-Z2 (130 - 145 ppm)",
              summary: "Apenas 15 minutos para activar circulación.",
              steps: [
                { name: "Rodaje 2.5 km + 3 Strides", target: "2.5 km @ 6:00/km + 3 rectas de 12s" }
              ]
            },
            {
              id: "b3-w12-d5",
              day_short: "VIE 05 FEB",
              day_name: "Viernes",
              modality: "rest",
              modality_label: "Descanso Total",
              title: "Descanso Total & Carga de Hidratos",
              duration_min: 0,
              target_zone: "Recuperación",
              summary: "Sueño >8h y llenado de depósitos de glucógeno.",
              steps: [
                { name: "Descanso", target: "Hidratación + carbohidratos complejos" }
              ]
            },
            {
              id: "b3-w12-d6",
              day_short: "SÁB 06 FEB",
              day_name: "Sábado",
              modality: "rest",
              modality_label: "Pre-Carrera",
              title: "Paseo 20 min & Movilidad Dinámica",
              duration_min: 20,
              target_zone: "Z1",
              summary: "Body Battery objetivo al despertar el domingo: >85.",
              steps: [
                { name: "Activación suave", target: "Paseo 20 min + preparar equipamiento" }
              ]
            },
            {
              id: "b3-w12-d7",
              day_short: "DOM 07 FEB",
              day_name: "Domingo",
              modality: "run",
              modality_label: "OBJETIVO 10K",
              title: "Carrera / Test 10K Oficial — Objetivo Sub 50:00 (4:58/km)",
              duration_min: 50,
              distance_km: 10.0,
              target_zone: "Z4 -> Z5 (160 -> 175 ppm) | 4:58 /km",
              summary: "Estrategia Negative Split: salir los primeros 3 km a 5:02/km (158-161 ppm), estabilizar km 4-8 a 4:57/km (163-166 ppm) y vaciarse en los últimos 2 km a <4:50/km.",
              steps: [
                { name: "Km 1 a 3 (Control)", target: "3.0 km @ 5:00-5:02/km (FC < 161 ppm)" },
                { name: "Km 4 a 8 (Crucero Umbral)", target: "5.0 km @ 4:56-4:58/km (FC 162-166 ppm)" },
                { name: "Km 9 a 10 (Kick Final)", target: "2.0 km @ 4:45-4:50/km (Z5 hasta meta)" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
