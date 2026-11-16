/**
 * Plan de Entrenamiento Híbrido (Carrera + Fuerza) en Bloques de 4 Semanas (Mesociclos 3:1).
 * Adaptado al horario real del atleta:
 * - Entrenamiento de Lunes a Sábado | DOMINGO SIEMPRE DESCANSO TOTAL.
 * - Días exclusivos de Gimnasio: LUNES, MARTES y JUEVES.
 * - Días de Carrera: MIÉRCOLES, VIERNES y SÁBADO.
 *
 * Arquitectura Semanal de Mínima Interferencia (Ciclo de 72h de recuperación para piernas):
 * - LUNES (Gimnasio 1 · Upper A): Empuje & Tirón Pesado de Torso -> Suma 48h extra al descanso del domingo (72h totales para las piernas tras la tirada del sábado).
 * - MARTES (Gimnasio 2 · Lower): Fuerza Estructural de Pierna, Isquios y Sóleo -> Piernas 100% frescas tras 3 días sin impacto.
 * - MIÉRCOLES (Carrera 1 · Base Z2): Rodaje Aeróbico Suave Z2 -> Oxigenación activa sin impacto articular de series tras el día de pierna.
 * - JUEVES (Gimnasio 3 · Upper B): Torso B, Hombro, Fondos & Bisagra Explosiva -> Las piernas descansan de cara al bloque específico de viernes-sábado.
 * - VIERNES (Carrera 2 · Calidad): Series / Fartlek / Umbral LTHR / VO2máx -> Con 72 horas completas de recuperación desde la sesión de pierna del martes.
 * - SÁBADO (Carrera 3 · Tirada Larga Z2): Fondo Aeróbico Progresivo en Zona 2 (5 km -> 12 km) -> Entrena la resistencia aeróbica sabiendo que el domingo descansas al 100%.
 * - DOMINGO (Descanso Total): Descanso completo fijo por motivos personales (recuperación del SNC, tendones y sueño).
 */

window.HYBRID_TRAINING_PLAN = {
  methodology: {
    title: "Periodización Híbrida Concurrente — Gimnasio (L-M-J) · Carrera (X-V-S) · Domingo Descanso Total",
    principles: [
      {
        name: "Doble Ventana de 72 Horas para tus Piernas",
        detail: "1) Tras la Tirada Larga del Sábado, descansas el Domingo y haces Torso el Lunes: tus piernas llegan al Martes de gimnasio con 72h de recuperación. 2) Tras hacer Pierna el Martes, ruedas suave en Z2 el Miércoles y haces Torso el Jueves: llegas a las Series del Viernes con otras 72h de recuperación muscular."
      },
      {
        name: "Bloque Viernes (Calidad) + Sábado (Tirada Z2) con Domingo Libre",
        detail: "Al tener el Domingo siempre libre, aprovechamos Viernes para ritmos rápidos (Umbral/VO2máx) y Sábado por la mañana para la Tirada Larga en Zona 2 estricta (135-151 ppm), enseñando al cuerpo a oxidar grasas sin comprometer la recuperación dominical."
      },
      {
        name: "Polarización 80/20 & Protección Tendinosa (>100 kg)",
        detail: "Pasamos de 1.1 salidas/semana en 'zona gris' a 3 salidas fijas (Miércoles, Viernes y Sábado) con progresión <=10% semanal, cadencia objetivo >166 spm y fortalecimiento pesado de sóleo e isquios los martes."
      },
      {
        name: "Autorregulación Matutina 09:00 AM por VFC (HRV)",
        detail: "Cada mañana a las 09:00 AM se evalúa tu VFC respecto a tu banda base (50-60 ms). Si el viernes o sábado estás en ámbar/rojo, se ajusta el margen de pulso para evitar sobreentrenamiento."
      }
    ]
  },
  blocks: [
    {
      id: "block-1",
      number: 1,
      name: "Bloque 1: Consolidación Aeróbica & Base Híbrida",
      dates: "16 Nov 2026 – 13 Dic 2026 (Semanas 1 a 4)",
      focus: "Asimilar el 10K Ponle Freno, consolidar el esquema L-M-J (Gimnasio) + X-V-S (Carrera) y construir base aeróbica en Zona 2 con Domingo de descanso total.",
      target_run_km_range: "12.5 → 18.0 km/sem",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower · Jue: Upper B)",
      weeks: [
        {
          week_number: 1,
          label: "Semana 1 (Adaptación Post-10K)",
          dates: "16 Nov – 22 Nov 2026",
          phase_type: "Recuperación Activa & Fijación de Rutina L-M-J / X-V-S",
          run_km_target: 12.5,
          strength_sessions_target: 3,
          coach_note: "Vienes de correr el domingo 15 Nov el 10K Ponle Freno (54:05, Carga 215, TE 5.0). Esta semana cuidamos piernas el martes (RIR 2-3), rodamos suave en Z2 el miércoles, viernes y sábado, y el domingo descansas por completo.",
          days: [
            {
              id: "b1-w1-d1",
              day_short: "LUN 16 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Empuje & Tirón Pesado (Sin impacto en piernas)",
              duration_min: 55,
              target_zone: "FC media < 110 ppm | RIR 2",
              completed_in_garmin: true,
              garmin_match: "Completado hoy en Garmin: Fuerza 56.4 min (Press Banca 3x8 @ 85kg, Dominadas 4x6, Press Militar 3x8 @ 45kg, Carga 18)",
              summary: "Día 1 de gimnasio (Lunes): estímulo neural en torso dejando descansar las piernas.",
              steps: [
                { name: "Press Banca Barra", target: "4 series × 6-8 reps @ 85 kg (RIR 2)" },
                { name: "Dominadas Estrictras (Pull-ups)", target: "4 series × 6 reps @ Peso Corporal" },
                { name: "Press Militar Barra de Pie", target: "3 series × 8 reps @ 45 kg" },
                { name: "Remo con Mancuerna Unilateral", target: "3 series × 10 reps @ 25 kg" },
                { name: "Movilidad Torácica & Tobillo", target: "8 min vuelta a la calma" }
              ]
            },
            {
              id: "b1-w1-d2",
              day_short: "MAR 17 NOV",
              day_name: "Martes",
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior Híbrido — Fuerza Estructural & Tendón (Post-10K)",
              duration_min: 50,
              target_zone: "RIR 2-3 (Volumen moderado sin llegar al fallo)",
              summary: "Día 2 de gimnasio (Martes): trabajamos fuerza estructural de pierna, isquios y sóleo sin generar agujetas para el rodaje de mañana miércoles.",
              steps: [
                { name: "Sentadilla Trasera Barra (Back Squat)", target: "3 series × 4 reps @ 77.5 - 80 kg (RIR 2-3, subida explosiva)" },
                { name: "Peso Muerto Rumano (RDL)", target: "3 series × 5 reps @ 75 - 80 kg (controlando 2s bajada)" },
                { name: "Split Squat Búlgaro / Pie Elevado", target: "3 series × 8 reps/pierna @ 15 kg mancuernas" },
                { name: "Elevación de Talones Sentado (Sóleo)", target: "4 series × 12-15 reps @ 30-35 kg (1s pausa arriba)" },
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
              title: "Tren Superior B — Hombro, Espalda, Fondos & Potencia Cadera",
              duration_min: 50,
              target_zone: "RIR 2 | FC media < 115 ppm",
              summary: "Día 3 de gimnasio (Jueves): cerramos el trabajo de fuerza semanal dejando las piernas descansadas para viernes y sábado.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 52.5 - 55 kg (RIR 2)" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 10 reps @ 30 kg c/u" },
                { name: "Jalón al Pecho / Dominadas Neutras", target: "4 series × 8-10 reps" },
                { name: "Fondos en Paralelas (Dips)", target: "3 series × 7-8 reps @ Peso Corporal" },
                { name: "Kettlebell Swings (Potencia Cadera)", target: "3 series × 12 reps @ 22.5 - 24 kg" }
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
          label: "Semana 2 (Carga Base 1)",
          dates: "23 Nov – 29 Nov 2026",
          phase_type: "Acumulación Base Aeróbica (L-M-J Gym · X-V-S Run)",
          run_km_target: 15.0,
          strength_sessions_target: 3,
          coach_note: "Pierna pesada el martes, rodaje Z2 el miércoles, torso el jueves, Fartlek controlado el viernes (72h post-pierna), tirada larga Z2 el sábado y descanso total el domingo.",
          days: [
            {
              id: "b1-w2-d1",
              day_short: "LUN 23 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Fuerza Máxima",
              duration_min: 55,
              target_zone: "RIR 2",
              summary: "Progresión lineal en Press Banca y tracción vertical con piernas frescas tras el domingo de descanso.",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Peso Muerto, Sentadilla & Cadena Posterior",
              duration_min: 52,
              target_zone: "RIR 2",
              summary: "Sesión principal de pierna el martes: tienes 72 horas hasta el Fartlek del viernes y 96 horas hasta la tirada del sábado.",
              steps: [
                { name: "Peso Muerto Barra (Deadlift)", target: "3 series × 3 reps @ 125 - 130 kg (RIR 2, agarre firme)" },
                { name: "Sentadilla Trasera Barra", target: "3 series × 5 reps @ 80 kg" },
                { name: "Curl Femoral Sentado/Tumbado", target: "3 series × 10 reps (excéntrica 3s para proteger isquios)" },
                { name: "Elevación de Sóleo Sentado", target: "4 series × 12 reps @ 35 kg" },
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
              title: "Tren Superior B + Acondicionamiento Aláctico",
              duration_min: 50,
              target_zone: "RIR 1-2",
              summary: "Tercer y último día de gimnasio de la semana: empuje vertical, fondos y potencia de cadera.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 55 kg" },
                { name: "Press Banca Inclinado Mancuernas", target: "3 series × 10 reps @ 30-32.5 kg" },
                { name: "Dominadas / Pullover Polea", target: "4 series × 10-12 reps" },
                { name: "Fondos en Paralelas", target: "4 series × 7 reps" },
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
              summary: "Piernas frescas (72h después del martes): reactivamos ritmos de 5:10-5:20/km en bloques cortos de 2 minutos sin vaciar glucógeno para mañana.",
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
          label: "Semana 3 (Pico Bloque 1)",
          dates: "30 Nov – 06 Dic 2026",
          phase_type: "Sobrecarga Progresiva Controlada (L-M-J Gym · X-V-S Run)",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Semana pico del Bloque 1: Lunes Banca 92.5 kg, Martes Sentadilla 82.5 kg + RDL 82.5 kg, Miércoles 4.5 km Z2, Jueves Militar 55-57.5 kg, Viernes 3×1000m Tempo, Sábado 8 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b1-w3-d1",
              day_short: "LUN 30 NOV",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
              title: "Tren Superior A — Intensidad 4×4 (92.5 kg Banca)",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Fuerza & Estabilidad Unilateral",
              duration_min: 52,
              target_zone: "RIR 2",
              summary: "Consolidamos 82.5 kg en Sentadilla 4×3 y 82.5 kg en Peso Muerto Rumano tras 72h sin impacto en piernas.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 82.5 kg (RIR 2)" },
                { name: "Peso Muerto Rumano (RDL)", target: "4 series × 4 reps @ 82.5 kg" },
                { name: "Puente de Glúteo / Hip Thrust", target: "3 series × 10 reps @ 40-50 kg" },
                { name: "Elevación de Sóleo Sentado", target: "4 series × 12 reps @ 35-40 kg" }
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
              title: "Tren Superior B — Pico de Volumen Bloque 1",
              duration_min: 52,
              target_zone: "RIR 1-2",
              summary: "Sesión fuerte de torso cerrando los 3 días de gimnasio de la semana.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 3-4 reps @ 55 - 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "4 series × 8-10 reps @ 32.5 kg" },
                { name: "Dominadas + Jalón", target: "4 series × 8 reps" },
                { name: "Fondos en Paralelas", target: "4 series × 8 reps" }
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
          label: "Semana 4 (Descarga 3:1)",
          dates: "07 Dic – 13 Dic 2026",
          phase_type: "Supercompensación & Descarga (-25% Volumen)",
          run_km_target: 13.5,
          strength_sessions_target: 3,
          coach_note: "Semana de descarga del Bloque 1: mantienes Lunes, Martes y Jueves de gimnasio a mitad de series (RIR 3), carreras suaves Miércoles-Viernes-Sábado y Domingo de descanso total.",
          days: [
            {
              id: "b1-w4-d1",
              day_short: "LUN 07 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Descarga Upper A",
              title: "Tren Superior A — Descarga Neural (3×5 RIR 3)",
              duration_min: 40,
              target_zone: "RIR 3",
              summary: "Mantenemos tensión mecánica con 85 kg pero reducimos las series a la mitad.",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Descarga Lower",
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
              title: "Tren Superior B — Bombeo & Movilidad",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Sesión ligera y técnica cerrando el gimnasio de la semana.",
              steps: [
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 27.5 kg" },
                { name: "Jalón al Pecho", target: "3 series × 10 reps" },
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
      name: "Bloque 2: Desarrollo de Umbral (LTHR) & Fuerza-Potencia",
      dates: "14 Dic 2026 – 10 Ene 2027 (Semanas 5 a 8)",
      focus: "Desplazar tu ritmo de Umbral de Lactato (163 ppm) hacia 5:05-5:10/km los viernes + tiradas sabatinas Z2, con gimnasio L-M-J y domingo de descanso total.",
      target_run_km_range: "18.0 → 22.0 km/sem",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower · Jue: Upper B)",
      weeks: [
        {
          week_number: 5,
          label: "Semana 5 (Inicio Umbral)",
          dates: "14 Dic – 20 Dic 2026",
          phase_type: "Construcción de Umbral (L-M-J Gym · X-V-S Run)",
          run_km_target: 18.0,
          strength_sessions_target: 3,
          coach_note: "Lunes igualamos 95 kg en Banca, Martes Sentadilla 85 kg + RDL 85 kg, Miércoles 4 km Z2, Jueves Upper B, Viernes 3×1.500m Umbral, Sábado 8.5 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b2-w5-d1",
              day_short: "LUN 14 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Fuerza + Rigidez Reactiva (Stiffness)",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Mejoramos la reactividad elástica del tobillo y cadera con 72h de margen hasta las series del viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 85 kg" },
                { name: "Peso Muerto Rumano (RDL)", target: "3 series × 5 reps @ 85 kg" },
                { name: "Split Squat Búlgaro", target: "3 series × 8 reps/pierna @ 17.5 kg" },
                { name: "Sóleo Sentado Pesado + Saltos Pogo Suaves", target: "4 × (10 reps @ 40 kg + 15 pequeños rebotes de tobillo)" }
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
          label: "Semana 6 (Consolidación Umbral)",
          dates: "21 Dic – 27 Dic 2026",
          phase_type: "Carga Específica Híbrida (L-M-J Gym · X-V-S Run)",
          run_km_target: 20.0,
          strength_sessions_target: 3,
          coach_note: "Rompemos la barrera de los 20 km semanales: Lunes 97.5 kg Banca, Martes 135 kg Peso Muerto, Miércoles 4.5 km Z2, Jueves Upper B, Viernes 2×2km+1km Umbral, Sábado 9.5 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b2-w6-d1",
              day_short: "LUN 21 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
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
              title: "Tren Superior B — Sesión Matutina Nochebuena",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Completamos los 3 días de gimnasio (L-M-J) al mediodía.",
              steps: [
                { name: "Press Militar + Dominadas", target: "4 superseries × 5-7 reps @ 55 kg" },
                { name: "Press Inclinado + Remo", target: "3 superseries × 10 reps @ 32.5 kg" },
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
          label: "Semana 7 (Pico Bloque 2)",
          dates: "28 Dic 2026 – 03 Ene 2027",
          phase_type: "Pico de Umbral & Fuerza (L-M-J Gym · X-V-S Run)",
          run_km_target: 22.0,
          strength_sessions_target: 3,
          coach_note: "Semana cumbre del Bloque 2: Lunes intento de 100 kg en Press Banca, Martes Sentadilla 90 kg, Miércoles 5 km Z2, Jueves Upper B, Viernes Tempo continuo 4 km @ 5:05/km, Sábado 10.5 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b2-w7-d1",
              day_short: "LUN 28 DIC",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Sentadilla 90 kg & RDL 87.5 kg",
              duration_min: 52,
              target_zone: "RIR 1-2",
              summary: "Fuerza máxima controlada en tren inferior con 72h de margen hasta el Tempo Run del viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "4 series × 3 reps @ 87.5 - 90 kg" },
                { name: "Peso Muerto Rumano", target: "3 series × 5 reps @ 85 - 87.5 kg" },
                { name: "Zancadas / Split Squat", target: "3 series × 8 reps @ 17.5 kg" },
                { name: "Sóleo Sentado", target: "4 series × 12 reps @ 40 kg" }
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
              title: "Tren Superior B — Hombro, Espalda & Brazos (Fin de Año)",
              duration_min: 50,
              target_zone: "RIR 2",
              summary: "Última sesión de gimnasio del año el jueves al mediodía.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 4 reps @ 57.5 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8-10 reps @ 32.5 kg" },
                { name: "Dominadas + Remo", target: "4 series × 8 reps" },
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
          label: "Semana 8 (Descarga 3:1)",
          dates: "04 Ene – 10 Ene 2027",
          phase_type: "Descarga & Asimilación Bloque 2 (L-M-J Gym · X-V-S Run)",
          run_km_target: 15.5,
          strength_sessions_target: 3,
          coach_note: "Semana de descarga del Bloque 2: reducimos volumen un 30% manteniendo Lunes-Martes-Jueves en gimnasio, Miércoles-Viernes-Sábado de carrera y Domingo de descanso total.",
          days: [
            {
              id: "b2-w8-d1",
              day_short: "LUN 04 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Descarga Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Descarga Lower",
              title: "Tren Inferior Ligero & Movilidad",
              duration_min: 38,
              target_zone: "RIR 3",
              summary: "Mantenimiento neuromuscular sin daño muscular.",
              steps: [
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 77.5 kg" },
                { name: "Peso Muerto Rumano", target: "2 series × 5 reps @ 75 kg" },
                { name: "Sóleo Sentado", target: "3 series × 12 reps @ 35 kg" }
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
      name: "Bloque 3: Pico Específico VO2máx & Objetivo 10K Sub-50'",
      dates: "11 Ene 2027 – 07 Feb 2027 (Semanas 9 a 12)",
      focus: "Series específicas de VO2máx y ritmo 10K (<5:00/km) los viernes, tiradas largas de hasta 12 km los sábados, mantenimiento neural L-M-J y domingo siempre descanso total.",
      target_run_km_range: "21.5 → 24.0 km/sem (Tapering Sem 12)",
      target_strength_sessions: "3 sesiones/sem (Lun: Upper A · Mar: Lower Neural · Jue: Upper B)",
      weeks: [
        {
          week_number: 9,
          label: "Semana 9 (VO2máx 800m)",
          dates: "11 Ene – 17 Ene 2027",
          phase_type: "Potencia Aeróbica VO2máx (L-M-J Gym · X-V-S Run)",
          run_km_target: 21.5,
          strength_sessions_target: 3,
          coach_note: "Martes pierna neural (3×3 con alta carga y bajo volumen) para que el viernes llegues pletórico al 6×800m y el sábado completes 10.5 km en Z2.",
          days: [
            {
              id: "b3-w9-d1",
              day_short: "LUN 11 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower Neural",
              title: "Tren Inferior — Mantenimiento Neural (Bajo Volumen)",
              duration_min: 45,
              target_zone: "RIR 2-3",
              summary: "Pocas repeticiones, alta carga y cero fatiga metabólica para llegar fresco al viernes.",
              steps: [
                { name: "Sentadilla Trasera Barra", target: "3 series × 3 reps @ 87.5 kg (RIR 2)" },
                { name: "Peso Muerto Rumano", target: "3 series × 4 reps @ 85 kg" },
                { name: "Sóleo Sentado Pesado", target: "4 series × 10 reps @ 42.5 kg" }
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
          label: "Semana 10 (Específico 5×1000m)",
          dates: "18 Ene – 24 Ene 2027",
          phase_type: "Especificidad 10K (L-M-J Gym · X-V-S Run)",
          run_km_target: 23.5,
          strength_sessions_target: 3,
          coach_note: "Martes Peso Muerto 140 kg (bajo volumen), Miércoles 5 km Z2, Jueves Upper B, Viernes sesión reina 5 × 1.000m @ 4:50-4:55/km, Sábado tirada de 11.5 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b3-w10-d1",
              day_short: "LUN 18 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Peso Muerto 140 kg & Sentadilla",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Nuevo hito en Peso Muerto (140 kg) con bajo volumen total y 72h antes del 5×1000m del viernes.",
              steps: [
                { name: "Peso Muerto Barra", target: "3 series × 2-3 reps @ 137.5 - 140 kg" },
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 85 kg" },
                { name: "Sóleo Sentado + Isquios", target: "3 series × 10 reps" }
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
              title: "Tren Superior B + Potencia",
              duration_min: 48,
              target_zone: "RIR 2",
              summary: "Tercer día de gimnasio (Jueves): torso fuerte sin fatiga de piernas.",
              steps: [
                { name: "Press Militar Barra", target: "4 series × 3 reps @ 57.5 - 60 kg" },
                { name: "Press Inclinado Mancuernas", target: "3 series × 8 reps @ 32.5 kg" },
                { name: "Dominadas + Fondos", target: "3 superseries × 8 reps" }
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
          label: "Semana 11 (Simulacro Específico)",
          dates: "25 Ene – 31 Ene 2027",
          phase_type: "Pico Específico (Última semana fuerte L-M-J / X-V-S)",
          run_km_target: 24.0,
          strength_sessions_target: 3,
          coach_note: "Última semana de carga alta antes del Tapering: Gimnasio L-M-J, Miércoles 4.5 km Z2, Viernes simulacro 3×2.000m @ 4:56/km, Sábado tirada pico de 12 km Z2 y Domingo Descanso Total.",
          days: [
            {
              id: "b3-w11-d1",
              day_short: "LUN 25 ENE",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Upper A",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · Lower",
              title: "Tren Inferior — Activación 3×3 (Sin fatiga residual)",
              duration_min: 42,
              target_zone: "RIR 2-3",
              summary: "Última sesión pesada de pierna a 72h del 3×2.000m del viernes.",
              steps: [
                { name: "Sentadilla Trasera", target: "3 series × 3 reps @ 85 kg" },
                { name: "Peso Muerto Rumano", target: "3 series × 4 reps @ 82.5 kg" },
                { name: "Sóleo Sentado", target: "3 series × 12 reps @ 40 kg" }
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
              title: "Tren Superior B — Mantenimiento",
              duration_min: 45,
              target_zone: "RIR 2",
              summary: "Sesión limpia de torso cerrando el gimnasio semanal.",
              steps: [
                { name: "Press Militar + Dominadas", target: "3 superseries × 5-7 reps" },
                { name: "Press Inclinado + Remo", target: "3 superseries × 8 reps" }
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
          phase_type: "Tapering (L-M-J Gym) & Objetivo 10K Sub-50' el Sábado",
          run_km_target: 16.5,
          strength_sessions_target: 3,
          coach_note: "Semana de Tapering respetando tus días L-M-J de gimnasio (activación neural RIR 3-4) y X-V-S de carrera: el Sábado 06 Feb atacas el 10K Sub-50' y el Domingo 07 Feb disfrutas de tu descanso total.",
          days: [
            {
              id: "b3-w12-d1",
              day_short: "LUN 01 FEB",
              day_name: "Lunes",
              modality: "strength",
              modality_label: "Gimnasio 1 · Tapering Upper",
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
              modality: "strength",
              modality_label: "Gimnasio 2 · PAP Lower",
              title: "Potenciación Tren Inferior (Cero Agujetas, 96h antes del 10K)",
              duration_min: 30,
              target_zone: "RIR 4",
              summary: "Último toque de pierna el martes (a 4 días completos del 10K del sábado): cargas moderadas a máxima velocidad.",
              steps: [
                { name: "Sentadilla Trasera (Velocidad)", target: "3 series × 2 reps @ 75 kg (explosivas)" },
                { name: "Sóleo Sentado Ligero", target: "2 series × 10 reps @ 30 kg" },
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
              title: "Sesión Ligera de Torso, Core & Movilidad en Gimnasio",
              duration_min: 30,
              target_zone: "RIR 4",
              summary: "Aprovechamos el jueves de gimnasio para bombeo suave de torso y liberación miofascial.",
              steps: [
                { name: "Press Inclinado + Jalón Ligero", target: "2 superseries × 8 reps (RIR 4)" },
                { name: "Core Planchas + Deadbug", target: "3 series suaves" },
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
