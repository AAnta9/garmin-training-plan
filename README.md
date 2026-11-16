# Garmin Hybrid Coach — Plan de Entrenamiento Híbrido (Carrera + Fuerza)

Aplicación web móvil y escritorio de entrenamiento personal híbrido conectada a la **API Oficial de Garmin Connect (Personal API v1.0)** con sincronización matutina automática cada día a las **09:00 AM**.

## Características Principales

1. **Check-in Matutino 09:00 AM & Autorregulación por VFC (HRV)**:
   - Intercambia la clave `GARMIN_API_KEY` por un token JWT de 24 horas en `https://personal.connectapi.garmin.com`.
   - Evalúa el sueño de anoche, VFC nocturna vs media de 7 días (banda equilibrada 50–60 ms), FC en reposo (media 6m: 45.6 ppm), Body Battery, Carga Aguda/Crónica (ACWR) y Fitness/Fatiga (CTL/ATL/TSB).
   - Emite un **Semáforo de Readiness (Verde / Ámbar / Rojo)** con ajustes diarios para el entrenamiento.
2. **Análisis de los Últimos 6 Meses (Mayo – Noviembre 2026)**:
   - **120 actividades analizadas (87.4 h)**: transición desde HIIT (40 sesiones en May–Jul) hacia **Fuerza estructurada (41 sesiones)** + **Carrera (27 salidas, 120.8 km)**.
   - Gráficas interactivas de VFC, CTL/ATL, FC en reposo, Sueño y Body Battery.
3. **Plan Híbrido en Bloques de 4 Semanas (3 Mesociclos × 4 Semanas = 12 Semanas)**:
   - **Bloque 1 (Semanas 1–4)**: Consolidación Aeróbica Z2 (3 carreras/semana) + Fuerza Básica (RIR 2) tras el 10K Ponle Freno (54:05).
   - **Bloque 2 (Semanas 5–8)**: Desarrollo de Umbral de Lactato (LTHR 163 ppm) + Fuerza-Potencia (objetivo 100 kg Press Banca, 90 kg Sentadilla, 135–140 kg Peso Muerto).
   - **Bloque 3 (Semanas 9–12)**: Pico específico VO2máx y Tapering para **10K Sub-50:00 (4:58/km)** sin perder masa muscular ni fuerza.
4. **Seguimiento desde el Móvil**:
   - Diseño *mobile-first* con barra de navegación inferior, botones de completado (✓) y registro rápido de pesos, ritmos y RPE con persistencia local (`localStorage`).

## Sincronización Automática a las 09:00 AM

- **Local / Servidor**: Ejecuta `python3 scripts/sync_garmin.py` (lee la clave desde `$GARMIN_API_KEY` o `~/.config/garmin/connect-personal-api-key`).
- **GitHub Actions**: El workflow `.github/workflows/daily-garmin-sync.yml` se ejecuta automáticamente a las 09:00 AM (Europe/Madrid). Para que se ejecute en la nube de GitHub, añade el secret `GARMIN_API_KEY` en `Settings -> Secrets and variables -> Actions` del repositorio.