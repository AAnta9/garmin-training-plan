/**
 * Controlador principal de la Web App: Garmin Hybrid Coach (Entrenador Personal Híbrido).
 * Gestiona:
 * 1. Check-in Matutino 09:00 AM y semáforo de Readiness / Autorregulación.
 * 2. Gestión interactiva de 1RM ("1RM & Pesos Gimnasio") con calculadora submáxima Epley/Brzycki
 *    y recálculo automático en tiempo real de cada serie de las 12 semanas (redondeo a discos reales).
 * 3. Navegación interactiva de los 3 Bloques de 4 Semanas (12 semanas) y seguimiento móvil
 *    (check de sesión completada, registro de cargas/sensaciones y persistencia en localStorage).
 * 4. Gráficas SVG interactivas de los últimos 6 meses de Garmin (VFC/HRV, Sueño, Carga Aguda/Crónica ACWR,
 *    CTL/ATL/TSB, Evolución Mensual Carrera vs Fuerza vs HIIT).
 * 5. Explorador del historial de actividades reales de Garmin con filtro por deporte.
 */

(function () {
  const STORAGE_KEY_COMPLETED = "garmin_hybrid_completed_v1";
  const STORAGE_KEY_NOTES = "garmin_hybrid_notes_v1";
  const STORAGE_KEY_THEME = "garmin_hybrid_theme_v1";
  const STORAGE_KEY_1RM = "garmin_hybrid_1rm_v1";

  let garminData = window.GARMIN_DATA || null;
  let planData = window.HYBRID_TRAINING_PLAN || null;
  let default1RmList = window.DEFAULT_1RM_CONFIG || [];

  let activeTab = "tab-plan";
  let selectedBlockIdx = 0;
  let selectedWeekIdx = 0;
  let activityFilter = "all";

  let completedMap = {};
  let notesMap = {};
  let oneRmMap = {};

  function getLiftConfig(liftKey) {
    return (
      default1RmList.find((item) => item.key === liftKey) || {
        key: liftKey,
        name: liftKey,
        unit: "kg",
        step: 2.5,
        default_1rm: 60
      }
    );
  }

  function initDefault1RmMap() {
    const map = {};
    default1RmList.forEach((item) => {
      map[item.key] = item.default_1rm;
    });
    return map;
  }

  function loadLocalState() {
    oneRmMap = initDefault1RmMap();
    try {
      const rawComp = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (rawComp) completedMap = JSON.parse(rawComp);
      const rawNotes = localStorage.getItem(STORAGE_KEY_NOTES);
      if (rawNotes) notesMap = JSON.parse(rawNotes);
      const raw1Rm = localStorage.getItem(STORAGE_KEY_1RM);
      if (raw1Rm) {
        const parsed = JSON.parse(raw1Rm);
        Object.keys(parsed).forEach((k) => {
          const val = parseFloat(parsed[k]);
          if (!Number.isNaN(val) && val >= 0) {
            oneRmMap[k] = val;
          }
        });
      }
    } catch (e) {
      console.warn("No se pudo leer localStorage:", e);
    }
    // Pre-marcar el entrenamiento de hoy lunes 16 Nov que ya consta en Garmin
    if (completedMap["b1-w1-d1"] === undefined) {
      completedMap["b1-w1-d1"] = true;
    }
    if (!notesMap["b1-w1-d1"]) {
      notesMap["b1-w1-d1"] =
        "Sincronizado de Garmin: 56.4 min, 13 series, Press Banca 85kg (3x8), Dominadas 4x6, Militar 45kg";
    }
  }

  function saveLocalState() {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedMap));
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notesMap));
      localStorage.setItem(STORAGE_KEY_1RM, JSON.stringify(oneRmMap));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }

  function roundToStep(value, step) {
    const s = step || 2.5;
    return Math.round(value / s) * s;
  }

  function formatNumberClean(num) {
    if (Number.isInteger(num)) return String(num);
    return num.toFixed(2).replace(/\.?0+$/, "");
  }

  function calcLiftWeight(liftKey, pct) {
    const cfg = getLiftConfig(liftKey);
    const base1Rm = oneRmMap[liftKey] !== undefined ? oneRmMap[liftKey] : cfg.default_1rm;
    if (liftKey === "pullup_load") {
      if (!pct || pct <= 0 || base1Rm <= 0) return 0;
      return roundToStep(base1Rm * pct, cfg.step || 1.25);
    }
    const raw = base1Rm * pct;
    return Math.max(cfg.step || 1, roundToStep(raw, cfg.step || 2.5));
  }

  function formatWeightForLift(liftKey, pct) {
    const cfg = getLiftConfig(liftKey);
    const w = calcLiftWeight(liftKey, pct);
    if (liftKey === "pullup_load") {
      if (w <= 0) return "Peso Corporal";
      return `+${formatNumberClean(w)} kg lastre`;
    }
    return `${formatNumberClean(w)} ${cfg.unit}`;
  }

  /**
   * Reemplaza marcadores dinámicos como {bench:0.85} o {squat:0.80} en títulos y notas
   * por el peso real calculado según los 1RM actuales del usuario.
   */
  function resolveDynamicText(text) {
    if (!text || typeof text !== "string") return "";
    return text.replace(/\{([a-z0-9_]+):([0-9.]+)\}/gi, (_, liftKey, pctStr) => {
      const pct = parseFloat(pctStr);
      if (Number.isNaN(pct)) return _;
      return formatWeightForLift(liftKey, pct);
    });
  }

  /**
   * Genera la prescripción visual de un paso de entrenamiento.
   * Si tiene `lift`, calcula el peso exacto a partir del 1RM del usuario.
   */
  function formatStepPrescription(st) {
    if (!st.lift) {
      return resolveDynamicText(st.target || "");
    }
    const weightStr = formatWeightForLift(st.lift, st.pct);
    const pctInt = Math.round((st.pct || 0) * 100);
    const pctBadge =
      st.lift === "pullup_load" && (!st.pct || st.pct <= 0)
        ? "BW"
        : `${pctInt}% 1RM`;
    const rirPart = st.rir ? ` · ${st.rir}` : "";
    return `${st.sets} series × ${st.reps} reps @ <strong style="color:var(--accent-strength);">${weightStr}</strong> <span style="opacity:0.82;">(${pctBadge}${rirPart})</span>`;
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME) || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeBtnLabel(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY_THEME, next);
    updateThemeBtnLabel(next);
  }

  function updateThemeBtnLabel(theme) {
    const btn = document.getElementById("btn-theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "Modo Claro" : "Modo Oscuro";
    }
  }

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".tab-panel").forEach((el) => {
      el.classList.toggle("active", el.id === tabId);
    });
    document.querySelectorAll("[data-tab-target]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab-target") === tabId);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderHeaderAndMorningCheckin() {
    if (!garminData) return;
    const meta = garminData.metadata || {};
    const check = garminData.morning_check_in || {};
    const m = check.metrics_today || {};

    const syncLabel = document.getElementById("header-sync-status");
    if (syncLabel) {
      syncLabel.textContent = `Sync 09:00 AM · Última: ${meta.last_sync || "2026-11-16 09:00"}`;
    }

    const semEl = document.getElementById("morning-semaphore-badge");
    if (semEl) {
      const sem = (check.semaphore || "AMBER").toLowerCase();
      semEl.className = `briefing-badge ${sem}`;
      semEl.textContent =
        sem === "green"
          ? "● Semáforo Verde · Vía Libre"
          : sem === "amber"
          ? "● Semáforo Ámbar · Carga Adaptada Post-10K"
          : "● Semáforo Rojo · Descanso Prioritario";
    }

    const headEl = document.getElementById("morning-headline");
    if (headEl) headEl.textContent = check.headline || "";

    const adviceEl = document.getElementById("morning-advice");
    if (adviceEl) adviceEl.textContent = check.coach_advice || "";

    const scoreEl = document.getElementById("morning-readiness-num");
    if (scoreEl) scoreEl.textContent = `${check.readiness_score || 68}/100`;

    const stripEl = document.getElementById("morning-telemetry-grid");
    if (stripEl) {
      const tiles = [
        {
          label: "VFC (HRV) Anoche / 7d",
          value: `${m.hrv_last_night_ms || 47} / ${m.hrv_weekly_avg_ms || 48} ms`,
          sub: `Estado: ${m.hrv_status || "UNBALANCED"} (Base ${m.hrv_baseline || "50-60 ms"})`,
          subClass: m.hrv_status === "BALANCED" ? "pos" : "warn"
        },
        {
          label: "Sueño Anoche",
          value: `${m.sleep_hours || 7.95} h`,
          sub: `Score ${m.sleep_score || 80}/100 · Profundo ${m.deep_sleep_hours || 1.7}h`,
          subClass: (m.sleep_score || 0) >= 75 ? "pos" : "warn"
        },
        {
          label: "FC en Reposo (RHR)",
          value: `${m.rhr_bpm || 49} ppm`,
          sub: `${m.rhr_delta_vs_avg >= 0 ? "+" : ""}${m.rhr_delta_vs_avg || 3.4} ppm vs media 6m (45.6)`,
          subClass: (m.rhr_delta_vs_avg || 0) <= 2 ? "pos" : "warn"
        },
        {
          label: "Body Battery (Al despertar)",
          value: `${m.body_battery_wake || 45} / 100`,
          sub: "En recarga tras 10K Ponle Freno",
          subClass: (m.body_battery_wake || 0) >= 70 ? "pos" : "warn"
        },
        {
          label: "Ratio Carga Aguda/Crónica",
          value: `${m.acwr || 1.15} ACWR`,
          sub: `Aguda ${m.acute_load || 310} · Crónica ${m.chronic_load || 270} (Óptimo 0.8-1.3)`,
          subClass: "pos"
        },
        {
          label: "Fitness / Fatiga (CTL/ATL)",
          value: `CTL ${m.ctl || 24.5}`,
          sub: `ATL ${m.atl || 38.2} · Forma (TSB) ${m.tsb || -13.7}`,
          subClass: ""
        }
      ];

      stripEl.innerHTML = tiles
        .map(
          (t) => `
        <div class="metric-tile">
          <div class="metric-label"><span>${t.label}</span></div>
          <div class="metric-value">${t.value}</div>
          <div class="metric-sub ${t.subClass}">${t.sub}</div>
        </div>
      `
        )
        .join("");
    }
  }

  function renderTrainingPlan() {
    if (!planData || !planData.blocks) return;

    const blocks = planData.blocks;
    const currentBlock = blocks[selectedBlockIdx] || blocks[0];
    const weeks = currentBlock.weeks || [];
    const currentWeek = weeks[selectedWeekIdx] || weeks[0];

    // 1. Render Block Selector Pills
    const blockBar = document.getElementById("block-selector-pills");
    if (blockBar) {
      blockBar.innerHTML = blocks
        .map(
          (b, idx) => `
        <button type="button" class="block-pill ${idx === selectedBlockIdx ? "active" : ""}" data-block-idx="${idx}" id="btn-block-${b.number}">
          <div class="block-pill-tag">Bloque ${b.number} · 4 Semanas</div>
          <div class="block-pill-name">${b.name.replace(/^Bloque \d:\s*/, "")}</div>
          <div class="block-pill-meta">${b.target_run_km_range} · ${b.dates.split("(")[0].trim()}</div>
        </button>
      `
        )
        .join("");

      blockBar.querySelectorAll("[data-block-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedBlockIdx = parseInt(btn.getAttribute("data-block-idx"), 10);
          selectedWeekIdx = 0;
          renderTrainingPlan();
        });
      });
    }

    // 2. Render Week Selector Tabs
    const weekBar = document.getElementById("week-selector-tabs");
    if (weekBar) {
      weekBar.innerHTML = weeks
        .map(
          (w, idx) => `
        <button type="button" class="week-tab ${idx === selectedWeekIdx ? "active" : ""}" data-week-idx="${idx}" id="btn-week-${w.week_number}">
          Sem ${w.week_number}${idx === 3 ? " (Descarga)" : ""}
        </button>
      `
        )
        .join("");

      weekBar.querySelectorAll("[data-week-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedWeekIdx = parseInt(btn.getAttribute("data-week-idx"), 10);
          renderTrainingPlan();
        });
      });
    }

    // 3. Render Week Overview & Progress
    const days = currentWeek.days || [];
    const completedCount = days.filter((d) => !!completedMap[d.id]).length;
    const pct = Math.round((completedCount / Math.max(1, days.length)) * 100);

    const weekSummaryEl = document.getElementById("week-overview-container");
    if (weekSummaryEl) {
      weekSummaryEl.innerHTML = `
        <div>
          <div style="font-size:0.76rem; font-family:var(--font-mono); color:var(--accent-run); text-transform:uppercase; font-weight:600;">
            ${currentBlock.name} · ${currentWeek.dates}
          </div>
          <div style="font-size:1.05rem; font-weight:700; margin-top:2px;">
            ${currentWeek.label} — ${currentWeek.phase_type}
          </div>
          <div style="font-size:0.84rem; color:var(--text-secondary); margin-top:4px; max-width:740px;">
            <strong>Nota del Entrenador:</strong> ${resolveDynamicText(currentWeek.coach_note)}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; min-width:230px;">
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-family:var(--font-mono);">
            <span>Meta Carrera: <strong>${currentWeek.run_km_target} km</strong></span>
            <span>Gimnasio (L-M-J): <strong>${currentWeek.strength_sessions_target} ses</strong></span>
          </div>
          <div class="week-progress-wrap">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${pct}%;"></div>
            </div>
            <span style="font-family:var(--font-mono); font-size:0.78rem; font-weight:700;">${completedCount}/${days.length} (${pct}%)</span>
          </div>
        </div>
      `;
    }

    // 4. Render 7 Day Cards with dynamically calculated 1RM weights
    const daysGrid = document.getElementById("week-days-grid");
    if (daysGrid) {
      daysGrid.innerHTML = days
        .map((d) => {
          const isDone = !!completedMap[d.id];
          const isToday = d.id === "b1-w1-d1";
          const noteVal = (notesMap[d.id] || "").replace(/"/g, "&quot;");
          const resolvedTitle = resolveDynamicText(d.title);
          const resolvedSummary = resolveDynamicText(d.summary);

          const stepsHtml = (d.steps || [])
            .map(
              (st) => `
            <div class="workout-step-row">
              <span class="step-name">${st.name}</span>
              <span class="step-target">${formatStepPrescription(st)}</span>
            </div>
          `
            )
            .join("");

          return `
          <article class="day-card ${isToday ? "today-highlight" : ""} ${isDone ? "completed" : ""}" id="card-${d.id}">
            <div class="day-card-header">
              <div class="day-title-group">
                <div class="day-name-row">
                  <span class="day-label">${d.day_short}</span>
                  <span class="modality-tag ${d.modality}">${d.modality_label}</span>
                  ${isToday ? '<span class="modality-tag" style="background:rgba(14,165,233,0.16);color:var(--accent-garmin);">HOY</span>' : ""}
                </div>
                <h3 class="day-workout-title">${resolvedTitle}</h3>
              </div>
              <button type="button" class="check-btn ${isDone ? "checked" : ""}" data-toggle-day="${d.id}" id="check-${d.id}" title="Marcar sesión como completada">
                ✓
              </button>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:12px; font-family:var(--font-mono); font-size:0.76rem; color:var(--text-secondary);">
              <span>⏱ ${d.duration_min} min</span>
              ${d.distance_km ? `<span>🏃 ${d.distance_km} km</span>` : ""}
              <span>🎯 ${d.target_zone}</span>
            </div>

            <p class="day-prescription">${resolvedSummary}</p>

            <div class="workout-blocks-list">
              ${stepsHtml}
            </div>

            <div class="day-logger">
              <input
                type="text"
                class="logger-input"
                id="note-${d.id}"
                data-note-day="${d.id}"
                placeholder="Anotar ritmo medio, pesos usados o RPE desde el móvil..."
                value="${noteVal}"
              />
            </div>
          </article>
        `;
        })
        .join("");

      daysGrid.querySelectorAll("[data-toggle-day]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-toggle-day");
          completedMap[id] = !completedMap[id];
          saveLocalState();
          renderTrainingPlan();
        });
      });

      daysGrid.querySelectorAll("[data-note-day]").forEach((inp) => {
        inp.addEventListener("change", () => {
          const id = inp.getAttribute("data-note-day");
          notesMap[id] = inp.value;
          saveLocalState();
        });
      });
    }
  }

  /**
   * Renderiza la pestaña interactiva "1RM & Pesos Gimnasio"
   * y el estimador submáximo Epley/Brzycki.
   */
  function renderOneRmTab() {
    const selectEl = document.getElementById("est-lift-select");
    if (selectEl && selectEl.options.length === 0) {
      selectEl.innerHTML = default1RmList
        .map((item) => `<option value="${item.key}">${item.name} (${item.unit})</option>`)
        .join("");
    }

    updateSubmaxEstimatorPreview();

    const gridEl = document.getElementById("rm-cards-grid");
    if (!gridEl) return;

    const pctList = [0.7, 0.75, 0.8, 0.85, 0.9];

    gridEl.innerHTML = default1RmList
      .map((item) => {
        const currentVal = oneRmMap[item.key] !== undefined ? oneRmMap[item.key] : item.default_1rm;
        const pillsHtml = pctList
          .map((p) => {
            const wLabel = formatWeightForLift(item.key, p);
            return `
            <div class="rm-pct-pill">
              <span class="pct-label">${Math.round(p * 100)}% 1RM</span>
              <span class="pct-val">${wLabel}</span>
            </div>
          `;
          })
          .join("");

        return `
        <article class="rm-card" id="rm-card-${item.key}">
          <div class="rm-card-header">
            <div>
              <div class="rm-lift-name">${item.name}</div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-top:2px;">${item.note}</div>
            </div>
            <span class="rm-lift-cat">${item.category}</span>
          </div>

          <div class="rm-input-row">
            <button type="button" class="rm-step-btn" data-rm-step="${item.key}" data-rm-dir="-1" title="Restar ${item.step} ${item.unit}">
              −
            </button>
            <input
              type="number"
              class="rm-number-input"
              id="rm-input-${item.key}"
              data-rm-input="${item.key}"
              value="${formatNumberClean(currentVal)}"
              min="0"
              max="500"
              step="${item.step}"
            />
            <button type="button" class="rm-step-btn" data-rm-step="${item.key}" data-rm-dir="1" title="Sumar ${item.step} ${item.unit}">
              +
            </button>
            <span class="rm-unit-label">${item.unit}</span>
          </div>

          <div class="rm-pct-pills">
            ${pillsHtml}
          </div>
        </article>
      `;
      })
      .join("");

    // Bind - / + step buttons
    gridEl.querySelectorAll("[data-rm-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-rm-step");
        const dir = parseInt(btn.getAttribute("data-rm-dir"), 10);
        const cfg = getLiftConfig(key);
        const cur = oneRmMap[key] !== undefined ? oneRmMap[key] : cfg.default_1rm;
        const next = Math.max(0, roundToStep(cur + dir * (cfg.step || 2.5), cfg.step || 2.5));
        oneRmMap[key] = next;
        saveLocalState();
        renderOneRmTab();
        renderTrainingPlan();
        renderProfileAndZones();
      });
    });

    // Bind direct numeric input change
    gridEl.querySelectorAll("[data-rm-input]").forEach((inp) => {
      inp.addEventListener("change", () => {
        const key = inp.getAttribute("data-rm-input");
        const cfg = getLiftConfig(key);
        const val = parseFloat(inp.value);
        if (!Number.isNaN(val) && val >= 0) {
          oneRmMap[key] = val;
          saveLocalState();
          renderOneRmTab();
          renderTrainingPlan();
          renderProfileAndZones();
        } else {
          inp.value = formatNumberClean(oneRmMap[key] || cfg.default_1rm);
        }
      });
    });
  }

  function computeEstimated1Rm() {
    const selectEl = document.getElementById("est-lift-select");
    const weightEl = document.getElementById("est-weight-input");
    const repsEl = document.getElementById("est-reps-input");
    if (!selectEl || !weightEl || !repsEl) return null;

    const liftKey = selectEl.value || "bench";
    const cfg = getLiftConfig(liftKey);
    const weight = parseFloat(weightEl.value);
    const reps = parseInt(repsEl.value, 10);

    if (Number.isNaN(weight) || weight <= 0 || Number.isNaN(reps) || reps <= 0) {
      return null;
    }
    if (reps === 1) {
      return { liftKey, cfg, est: roundToStep(weight, cfg.step || 2.5) };
    }
    // Media entre fórmula Epley y Brzycki para mayor precisión entre 2 y 12 repeticiones
    const epley = weight * (1 + reps / 30);
    const brzycki = reps < 36 ? weight * (36 / (37 - reps)) : epley;
    const rawEst = (epley + brzycki) / 2;
    const est = roundToStep(rawEst, cfg.step || 2.5);
    return { liftKey, cfg, est };
  }

  function updateSubmaxEstimatorPreview() {
    const outEl = document.getElementById("est-result-output");
    if (!outEl) return;
    const res = computeEstimated1Rm();
    if (!res) {
      outEl.textContent = "—";
      return;
    }
    outEl.textContent = `${formatNumberClean(res.est)} ${res.cfg.unit}`;
  }

  // SVG Chart Helper for Time Series
  function renderLineChartSVG(containerId, seriesData, config) {
    const container = document.getElementById(containerId);
    if (!container || !seriesData || !seriesData.length) return;

    const width = 620;
    const height = 200;
    const pad = { top: 18, right: 16, bottom: 28, left: 38 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    const vals = seriesData.map((d) => d.value).filter((v) => v !== null && v !== undefined);
    if (!vals.length) return;

    const minV = config.minY !== undefined ? config.minY : Math.floor(Math.min(...vals) * 0.92);
    const maxV = config.maxY !== undefined ? config.maxY : Math.ceil(Math.max(...vals) * 1.05);
    const rangeV = Math.max(1, maxV - minV);

    const xFor = (i) => pad.left + (i / Math.max(1, seriesData.length - 1)) * plotW;
    const yFor = (v) => pad.top + plotH - ((v - minV) / rangeV) * plotH;

    let bandRect = "";
    if (config.bandLow !== undefined && config.bandHigh !== undefined) {
      const yTop = yFor(config.bandHigh);
      const yBot = yFor(config.bandLow);
      bandRect = `<rect x="${pad.left}" y="${yTop}" width="${plotW}" height="${Math.max(2, yBot - yTop)}" fill="${config.bandColor || "rgba(16,185,129,0.13)"}" rx="3" />`;
    }

    const points = [];
    seriesData.forEach((d, idx) => {
      if (d.value !== null && d.value !== undefined) {
        points.push(`${xFor(idx).toFixed(1)},${yFor(d.value).toFixed(1)}`);
      }
    });

    let secPath = "";
    if (config.secondaryKey) {
      const secPts = [];
      seriesData.forEach((d, idx) => {
        if (d.secondary !== null && d.secondary !== undefined) {
          secPts.push(`${xFor(idx).toFixed(1)},${yFor(d.secondary).toFixed(1)}`);
        }
      });
      if (secPts.length > 1) {
        secPath = `<polyline fill="none" stroke="${config.secondaryColor || "#f59e0b"}" stroke-width="2" stroke-dasharray="4 3" points="${secPts.join(" ")}" />`;
      }
    }

    const ySteps = 4;
    let gridHtml = "";
    for (let s = 0; s <= ySteps; s++) {
      const val = minV + (rangeV * s) / ySteps;
      const y = yFor(val).toFixed(1);
      gridHtml += `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="rgba(148,163,184,0.12)" stroke-width="1" />
        <text x="${pad.left - 6}" y="${parseFloat(y) + 4}" text-anchor="end" fill="#64748b" font-size="10" font-family="JetBrains Mono">${val.toFixed(config.decimals || 0)}</text>
      `;
    }

    let xLabelsHtml = "";
    const labelIndices = [
      0,
      Math.floor(seriesData.length / 3),
      Math.floor((2 * seriesData.length) / 3),
      seriesData.length - 1
    ];
    labelIndices.forEach((idx) => {
      if (seriesData[idx]) {
        const x = xFor(idx).toFixed(1);
        const label = seriesData[idx].date.slice(5);
        xLabelsHtml += `<text x="${x}" y="${height - 6}" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">${label}</text>`;
      }
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
        ${gridHtml}
        ${bandRect}
        <polyline fill="none" stroke="${config.color || "#10b981"}" stroke-width="2.2" points="${points.join(" ")}" />
        ${secPath}
        ${xLabelsHtml}
      </svg>
    `;
  }

  function renderSixMonthAnalytics() {
    if (!garminData) return;
    const sum = garminData.six_month_summary || {};
    const health = sum.health_averages || {};
    const daily = garminData.daily_series || [];
    const monthly = garminData.monthly_progression || [];

    const kpiContainer = document.getElementById("six-month-kpis");
    if (kpiContainer) {
      const items = [
        {
          label: "Actividades Totales (6m)",
          value: `${sum.total_activities || 120} sesiones`,
          sub: `${sum.total_hours || 87.4} horas registradas en Garmin`
        },
        {
          label: "Volumen Carrera (27 salidas)",
          value: `${(sum.running || {}).total_km || 120.8} km`,
          sub: `FC media ${(sum.running || {}).avg_hr || 142} ppm · Cadencia ${(sum.running || {}).avg_cadence || 163} spm`
        },
        {
          label: "Entrenamiento de Fuerza",
          value: `${(sum.strength || {}).sessions || 41} sesiones`,
          sub: `${(sum.strength || {}).total_hours || 29.8} h (Media ${(sum.strength || {}).avg_duration_min || 44} min/sesión)`
        },
        {
          label: "Transición desde HIIT",
          value: `${(sum.hiit || {}).sessions || 40} sesiones`,
          sub: "Concentradas en May-Jul (0 en Sep-Nov)"
        },
        {
          label: "VFC Media 6 Meses",
          value: `${health.hrv_mean_ms || 52.0} ms`,
          sub: `${health.hrv_balanced_days_pct || 77}% de los días en estado BALANCED`
        },
        {
          label: "Sueño & Pasos Diarios (6m)",
          value: `${health.sleep_mean_hours || 6.51} h/noche`,
          sub: `Score medio ${health.sleep_mean_score || 73.3} · ${health.steps_mean || 10825} pasos/día`
        }
      ];
      kpiContainer.innerHTML = items
        .map(
          (it) => `
        <div class="metric-tile">
          <div class="metric-label"><span>${it.label}</span></div>
          <div class="metric-value">${it.value}</div>
          <div class="metric-sub">${it.sub}</div>
        </div>
      `
        )
        .join("");
    }

    const hrvSeries = daily.map((d) => ({
      date: d.date,
      value: d.hrv_night,
      secondary: d.hrv_weekly
    }));
    renderLineChartSVG("chart-hrv-6m", hrvSeries, {
      color: "#10b981",
      secondaryKey: true,
      secondaryColor: "#0ea5e9",
      bandLow: 50,
      bandHigh: 60,
      bandColor: "rgba(16, 185, 129, 0.14)",
      minY: 30,
      maxY: 66
    });

    const loadSeries = daily.map((d) => ({
      date: d.date,
      value: d.ctl,
      secondary: d.atl
    }));
    renderLineChartSVG("chart-load-6m", loadSeries, {
      color: "#0ea5e9",
      secondaryKey: true,
      secondaryColor: "#f59e0b",
      minY: 0,
      maxY: 60
    });

    const rhrSeries = daily.map((d) => ({
      date: d.date,
      value: d.rhr
    }));
    renderLineChartSVG("chart-rhr-6m", rhrSeries, {
      color: "#ef4444",
      bandLow: 43,
      bandHigh: 47,
      bandColor: "rgba(14, 165, 233, 0.10)",
      minY: 39,
      maxY: 56
    });

    const sleepSeries = daily.map((d) => ({
      date: d.date,
      value: d.sleep_score,
      secondary: d.bb_max
    }));
    renderLineChartSVG("chart-sleep-6m", sleepSeries, {
      color: "#10b981",
      secondaryKey: true,
      secondaryColor: "#f59e0b",
      minY: 25,
      maxY: 100
    });

    const monthTbody = document.getElementById("monthly-progression-tbody");
    if (monthTbody) {
      monthTbody.innerHTML = monthly
        .map(
          (m) => `
        <tr>
          <td class="mono" style="font-weight:700;">${m.month}</td>
          <td class="mono">${m.total_sessions} (${m.total_hours} h)</td>
          <td class="mono" style="color:var(--accent-run); font-weight:600;">${m.run_sessions} salidas · ${m.run_km} km</td>
          <td class="mono">${m.run_avg_pace ? m.run_avg_pace + " /km" : "—"}</td>
          <td class="mono" style="color:var(--accent-strength); font-weight:600;">${m.strength_sessions} ses (${m.strength_hours} h)</td>
          <td class="mono">${m.hiit_sessions} ses (${m.hiit_hours} h)</td>
          <td class="mono">${m.total_load}</td>
        </tr>
      `
        )
        .join("");
    }
  }

  function renderActivitiesHistory() {
    if (!garminData) return;
    const acts = garminData.recent_activities || [];
    const filtered =
      activityFilter === "all"
        ? acts
        : acts.filter((a) => {
            if (activityFilter === "running") return a.type.includes("run");
            if (activityFilter === "strength") return a.type === "strength_training";
            if (activityFilter === "hiit") return a.type === "hiit";
            return true;
          });

    const tbody = document.getElementById("activities-history-tbody");
    if (!tbody) return;

    tbody.innerHTML = filtered
      .map((a) => {
        const isRun = a.type.includes("run");
        const isStr = a.type === "strength_training";
        const badgeClass = isRun ? "run" : isStr ? "strength" : "rest";
        const exSummary =
          isStr && a.exercises && a.exercises.length
            ? a.exercises
                .slice(0, 3)
                .map((e) => `${e.name} (${e.sets}s, ${e.max_weight_kg ? e.max_weight_kg + "kg" : e.reps + "r"})`)
                .join(" · ")
            : isRun
            ? `Ritmo ${a.pace_min_km || "—"}/km · Cadencia ${a.cadence || "—"} spm`
            : `${a.te_label || "Sesión general"}`;

        return `
        <tr>
          <td class="mono">${a.date}</td>
          <td><span class="modality-tag ${badgeClass}">${a.type.replace("_", " ")}</span></td>
          <td style="font-weight:600;">${a.name}</td>
          <td class="mono">${a.duration_min} min</td>
          <td class="mono">${a.distance_km > 0 ? a.distance_km + " km" : a.total_sets ? a.total_sets + " series" : "—"}</td>
          <td class="mono">${a.avg_hr ? `${a.avg_hr} / ${a.max_hr} ppm` : "—"}</td>
          <td class="mono">${a.load || 0}</td>
          <td style="font-size:0.78rem; color:var(--text-secondary);">${exSummary}</td>
        </tr>
      `;
      })
      .join("");
  }

  function renderProfileAndZones() {
    if (!garminData) return;
    const prof = garminData.athlete_profile || {};

    const zonesContainer = document.getElementById("profile-hr-zones-list");
    if (zonesContainer && prof.hr_zones_running) {
      zonesContainer.innerHTML = prof.hr_zones_running
        .map(
          (z) => `
        <div class="zone-row">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="zone-badge">${z.zone}</span>
            <div>
              <div style="font-weight:600; font-size:0.86rem;">${z.name}</div>
              <div style="font-size:0.76rem; color:var(--text-secondary);">Ritmo orientativo: ${z.pace_guide}</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.88rem; font-weight:700;">
            ${z.min} – ${z.max} ppm
          </div>
        </div>
      `
        )
        .join("");
    }

    const prsContainer = document.getElementById("profile-strength-prs-list");
    if (prsContainer) {
      prsContainer.innerHTML = default1RmList
        .slice(0, 6)
        .map((item) => {
          const val = oneRmMap[item.key] !== undefined ? oneRmMap[item.key] : item.default_1rm;
          return `
        <div class="zone-row">
          <div>
            <div style="font-weight:600; font-size:0.86rem;">${item.name}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary);">${item.category} · 80% = ${formatWeightForLift(item.key, 0.8)} · 85% = ${formatWeightForLift(item.key, 0.85)}</div>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.92rem; font-weight:700; color:var(--accent-strength);">
            1RM: ${formatNumberClean(val)} ${item.unit}
          </div>
        </div>
      `;
        })
        .join("");
    }

    const benchContainer = document.getElementById("profile-run-benchmarks-list");
    if (benchContainer && prof.running_benchmarks) {
      benchContainer.innerHTML = prof.running_benchmarks
        .map(
          (b) => `
        <div class="zone-row">
          <div>
            <div style="font-weight:600; font-size:0.86rem;">${b.event} (${b.distance_km} km)</div>
            <div style="font-size:0.75rem; color:var(--text-secondary);">${b.date} · FC ${b.avg_hr}/${b.max_hr} ppm · Cadencia ${b.cadence} spm</div>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.9rem; font-weight:700; color:var(--accent-run);">
            ${b.time} (${b.pace})
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  async function refreshJsonIfAvailable() {
    try {
      const resp = await fetch(`./data/garmin_data.json?t=${Date.now()}`);
      if (resp.ok) {
        const fresh = await resp.json();
        if (fresh && fresh.metadata) {
          garminData = fresh;
          renderAll();
        }
      }
    } catch (_) {
      // Fallback to window.GARMIN_DATA already loaded
    }
  }

  function renderAll() {
    renderHeaderAndMorningCheckin();
    renderOneRmTab();
    renderTrainingPlan();
    renderSixMonthAnalytics();
    renderActivitiesHistory();
    renderProfileAndZones();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadLocalState();
    initTheme();

    // Navigation bindings
    document.querySelectorAll("[data-tab-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchTab(btn.getAttribute("data-tab-target"));
      });
    });

    // Quick jump buttons between Plan and 1RM tab
    const jumpTo1RmBtn = document.getElementById("btn-jump-to-1rm");
    if (jumpTo1RmBtn) {
      jumpTo1RmBtn.addEventListener("click", () => switchTab("tab-1rm"));
    }
    const backToPlanBtn = document.getElementById("btn-back-to-plan");
    if (backToPlanBtn) {
      backToPlanBtn.addEventListener("click", () => switchTab("tab-plan"));
    }

    // Reset 1RM button
    const reset1RmBtn = document.getElementById("btn-reset-1rm");
    if (reset1RmBtn) {
      reset1RmBtn.addEventListener("click", () => {
        oneRmMap = initDefault1RmMap();
        saveLocalState();
        renderOneRmTab();
        renderTrainingPlan();
        renderProfileAndZones();
      });
    }

    // Submaximal 1RM estimator bindings
    ["est-lift-select", "est-weight-input", "est-reps-input"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updateSubmaxEstimatorPreview);
        el.addEventListener("change", updateSubmaxEstimatorPreview);
      }
    });

    const applyEstBtn = document.getElementById("btn-apply-est-1rm");
    if (applyEstBtn) {
      applyEstBtn.addEventListener("click", () => {
        const res = computeEstimated1Rm();
        if (!res) return;
        oneRmMap[res.liftKey] = res.est;
        saveLocalState();
        renderOneRmTab();
        renderTrainingPlan();
        renderProfileAndZones();
        const cardEl = document.getElementById(`rm-card-${res.liftKey}`);
        if (cardEl) {
          cardEl.style.borderColor = "var(--accent-run)";
          setTimeout(() => {
            cardEl.style.borderColor = "";
          }, 900);
        }
      });
    }

    // Activity filter bindings
    document.querySelectorAll("[data-act-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activityFilter = btn.getAttribute("data-act-filter");
        document.querySelectorAll("[data-act-filter]").forEach((b) => {
          b.classList.toggle("active", b.getAttribute("data-act-filter") === activityFilter);
        });
        renderActivitiesHistory();
      });
    });

    const themeBtn = document.getElementById("btn-theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    const syncBtn = document.getElementById("btn-manual-refresh");
    if (syncBtn) {
      syncBtn.addEventListener("click", async () => {
        syncBtn.textContent = "Sincronizando...";
        await refreshJsonIfAvailable();
        setTimeout(() => {
          syncBtn.textContent = "↻ Sync 09:00";
        }, 400);
      });
    }

    renderAll();
    refreshJsonIfAvailable();
  });
})();
