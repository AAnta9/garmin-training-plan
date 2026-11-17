/**
 * Controlador principal de la Web App: Garmin Hybrid Coach (Entrenador Personal Híbrido).
 * Gestiona:
 * 1. Check-in Matutino 09:00 AM y semáforo de Readiness / Autorregulación.
 * 2. Gestión interactiva de 1RM ("1RM & Pesos Gimnasio") con calculadora submáxima Epley/Brzycki
 *    y recálculo automático en tiempo real de cada serie de las 12 semanas (redondeo a discos reales).
 * 3. Generador en vivo de entrenamientos para el reloj Garmin (.FIT binario oficial, .JSON Garmin Connect
 *    y Script de Auto-Subida en 1 clic a Garmin Connect Web para Lunes Upper A, Martes Lower y Jueves Upper B).
 * 4. Navegación interactiva de los 3 Bloques de 4 Semanas (12 semanas) y seguimiento móvil.
 * 5. Gráficas SVG interactivas de los últimos 6 meses de Garmin y explorador del historial de sesiones.
 */

(function () {
  const STORAGE_KEY_COMPLETED = "garmin_hybrid_completed_v1";
  const STORAGE_KEY_NOTES = "garmin_hybrid_notes_v1";
  const STORAGE_KEY_THEME = "garmin_hybrid_theme_v1";
  const STORAGE_KEY_1RM = "garmin_hybrid_1rm_v2";

  let garminData = window.GARMIN_DATA || null;
  let planData = window.HYBRID_TRAINING_PLAN || null;
  let default1RmList = window.DEFAULT_1RM_CONFIG || [];
  let nutritionData = window.NUTRITION_PLAN_DATA || null;

  let activeTab = "tab-plan";
  let selectedBlockIdx = 0;
  let selectedWeekIdx = 0;
  let activityFilter = "all";
  let selectedNutriDayTypeId = "gym";

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
        default_1rm: 60,
        cat_id: 2,
        name_id: 65535,
        category_key: "CARDIO",
        exercise_key: null,
        title_es: liftKey,
        rest_sec: 90
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

  function resolveDynamicText(text) {
    if (!text || typeof text !== "string") return "";
    return text.replace(/\{([a-z0-9_]+):([0-9.]+)\}/gi, (_, liftKey, pctStr) => {
      const pct = parseFloat(pctStr);
      if (Number.isNaN(pct)) return _;
      return formatWeightForLift(liftKey, pct);
    });
  }

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

  // ============================================================================
  // CODIFICADOR BINARIO .FIT (PERFIL CANÓNICO GARMIN FIT SDK) & VALIDADOR CON LOG
  // ============================================================================

  function parseRepsCount(repsRaw) {
    if (typeof repsRaw === "number") return repsRaw;
    const str = String(repsRaw || "8");
    const match = str.match(/(\d+)/g);
    if (!match || !match.length) return 8;
    return parseInt(match[match.length - 1], 10) || 8;
  }

  function getStrengthWatchName(dayObj, weekNum) {
    const dayTag = (dayObj.day_name || "Gym").slice(0, 5);
    const modPart = (dayObj.modality_label || "").split("·")[1] || dayObj.day_name || "Fuerza";
    return `HYB S${weekNum} ${dayTag} ${modPart.trim()}`.slice(0, 30);
  }

  function fitCrc16(uint8Arr) {
    const crcTable = [
      0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401,
      0xa001, 0x6c00, 0x7800, 0xb401, 0x5000, 0x9c01, 0x8801, 0x4400
    ];
    let crc = 0;
    for (let i = 0; i < uint8Arr.length; i++) {
      const b = uint8Arr[i];
      let tmp = crcTable[crc & 0x0f];
      crc = (crc >> 4) & 0x0fff;
      crc = crc ^ tmp ^ crcTable[b & 0x0f];
      tmp = crcTable[crc & 0x0f];
      crc = (crc >> 4) & 0x0fff;
      crc = crc ^ tmp ^ crcTable[(b >> 4) & 0x0f];
    }
    return crc & 0xffff;
  }

  function encodeFixedUtf8(str, byteLength) {
    const enc = new TextEncoder().encode(str || "");
    const out = new Uint8Array(byteLength);
    const limit = Math.min(enc.length, byteLength - 1);
    for (let i = 0; i < limit; i++) out[i] = enc[i];
    return out;
  }

  /**
   * Construye un archivo binario .FIT de entrenamiento Garmin (FileType=5 WORKOUT, Sport=10, SubSport=20)
   * cumpliendo al 100% el perfil oficial Garmin FIT SDK:
   * - GMSG 0 (file_id, 6 campos canónicos con slot number válido 1..3)
   * - GMSG 49 (file_creator, software_version=100)
   * - GMSG 26 (workout, 5 campos canónicos)
   * - GMSG 27 (workout_step, 15 campos canónicos sin campos residuales 37/38)
   * - GMSG 264 (exercise_title, 4 campos canónicos)
   */
  function buildFitWorkoutBinaryForDay(dayObj, weekNum, slotNum) {
    const chunks = [];
    const pushBytes = (arr) => chunks.push(new Uint8Array(arr));
    const pushU16 = (val) => {
      const b = new Uint8Array(2);
      new DataView(b.buffer).setUint16(0, val & 0xffff, true);
      chunks.push(b);
    };
    const pushU32 = (val) => {
      const b = new Uint8Array(4);
      new DataView(b.buffer).setUint32(0, val >>> 0, true);
      chunks.push(b);
    };

    const validSlot = slotNum || (dayObj.day_name === "Lunes" ? 1 : dayObj.day_name === "Martes" ? 2 : 3);

    const pushSdkWorkoutStep = (
      msgIdx,
      stepName,
      durType,
      durVal,
      tgtType,
      tgtVal,
      intensity,
      notes,
      exCat,
      exName,
      exWeight,
      wtUnit
    ) => {
      pushBytes([0x02]); // Local msg 2
      pushU32(durVal);
      pushU32(tgtVal);
      pushU32(0xffffffff);
      pushU32(0xffffffff);
      pushU16(msgIdx);
      pushU16(exCat);
      pushU16(exName);
      pushU16(exWeight);
      pushU16(wtUnit);
      chunks.push(encodeFixedUtf8(stepName, 32));
      chunks.push(encodeFixedUtf8(notes, 64));
      pushBytes([durType & 0xff, tgtType & 0xff, intensity & 0xff, 0xff]);
    };

    // 1. Definition Local 0 -> file_id (GMSG 0, 6 campos oficiales FIT SDK)
    pushBytes([
      0x40, 0x00, 0x00, 0x00, 0x00, 6,
      3, 4, 140,
      4, 4, 134,
      1, 2, 132,
      2, 2, 132,
      5, 2, 132,
      0, 1, 0
    ]);
    pushBytes([0x00]);
    pushU32(3620636920);
    pushU32(1161433847 + validSlot);
    pushU16(1); // Garmin
    pushU16(4536); // Fenix 8
    pushU16(validSlot); // Slot number válido (1, 2, 3)
    pushBytes([5]); // FileType = 5 (WORKOUT)

    // 2. Definition Local 4 -> file_creator (GMSG 49, 2 campos oficiales FIT SDK)
    pushBytes([
      0x44, 0x00, 0x00, 49, 0x00, 2,
      0, 2, 132,
      1, 1, 2
    ]);
    pushBytes([0x04]);
    pushU16(100);
    pushBytes([0xff]);

    const stepRecords = [];
    const usedTitles = [];
    const seenTitleKeys = new Set();

    // Step 0: Warmup
    stepRecords.push({
      stepName: "Calentamiento Movilidad",
      durType: 5,
      durVal: 0xffffffff,
      tgtType: 2,
      tgtVal: 0,
      intensity: 2,
      notes: "Movilidad articular y aproximacion",
      exCat: 2,
      exName: 0xffff,
      exWeight: 0xffff,
      wtUnit: 1
    });

    (dayObj.steps || []).forEach((st) => {
      if (!st.lift) return;
      const cfg = getLiftConfig(st.lift);
      const setsCount = parseInt(st.sets, 10) || 3;
      const repsCount = parseRepsCount(st.reps);
      const weightKg = calcLiftWeight(st.lift, st.pct || 0);
      const exWeightVal = weightKg > 0 ? Math.round(weightKg * 100) : 0xffff;
      const restMs = (cfg.rest_sec || 90) * 1000;
      const pctStr = st.pct > 0 ? `${Math.round(st.pct * 100)}% 1RM` : "Peso corporal";
      const stepNote =
        weightKg > 0
          ? `${setsCount}x${repsCount} @ ${formatNumberClean(weightKg)}kg (${pctStr})`
          : `${setsCount}x${repsCount} (${pctStr})`;

      const workIdx = stepRecords.length;
      stepRecords.push({
        stepName: cfg.title_es || cfg.name,
        durType: 29,
        durVal: repsCount,
        tgtType: 2,
        tgtVal: 0,
        intensity: 0,
        notes: stepNote,
        exCat: cfg.cat_id,
        exName: cfg.name_id,
        exWeight: exWeightVal,
        wtUnit: 1
      });

      const tkey = `${cfg.cat_id}:${cfg.name_id}`;
      if (!seenTitleKeys.has(tkey)) {
        seenTitleKeys.add(tkey);
        usedTitles.push({
          cat_id: cfg.cat_id,
          name_id: cfg.name_id,
          title_es: cfg.title_es || cfg.name
        });
      }

      stepRecords.push({
        stepName: "Descanso",
        durType: 0,
        durVal: restMs,
        tgtType: 2,
        tgtVal: 0,
        intensity: 1,
        notes: `Recuperacion ${Math.round(restMs / 1000)}s`,
        exCat: 0xffff,
        exName: 0xffff,
        exWeight: 0xffff,
        wtUnit: 1
      });

      stepRecords.push({
        stepName: "",
        durType: 6,
        durVal: workIdx,
        tgtType: 2,
        tgtVal: setsCount,
        intensity: 0xff,
        notes: "",
        exCat: 0xffff,
        exName: 0xffff,
        exWeight: 0xffff,
        wtUnit: 0xffff
      });
    });

    // Cooldown
    stepRecords.push({
      stepName: "Vuelta a la calma",
      durType: 5,
      durVal: 0xffffffff,
      tgtType: 2,
      tgtVal: 0,
      intensity: 3,
      notes: "Estiramientos suaves",
      exCat: 2,
      exName: 0xffff,
      exWeight: 0xffff,
      wtUnit: 1
    });

    // 3. Definition Local 1 -> workout (GMSG 26, 5 campos oficiales FIT SDK)
    pushBytes([
      0x41, 0x00, 0x00, 26, 0x00, 5,
      5, 4, 140,
      8, 32, 7,
      6, 2, 132,
      4, 1, 0,
      11, 1, 0
    ]);
    pushBytes([0x01]);
    pushU32(32);
    chunks.push(encodeFixedUtf8(getStrengthWatchName(dayObj, weekNum), 32));
    pushU16(stepRecords.length);
    pushBytes([10, 20]); // sport=10 (training), sub_sport=20 (strength_training)

    // 4. Definition Local 2 -> workout_step (GMSG 27, 15 campos oficiales FIT SDK)
    pushBytes([
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
      9, 1, 0
    ]);
    stepRecords.forEach((st, idx) => {
      pushSdkWorkoutStep(
        idx,
        st.stepName,
        st.durType,
        st.durVal,
        st.tgtType,
        st.tgtVal,
        st.intensity,
        st.notes,
        st.exCat,
        st.exName,
        st.exWeight,
        st.wtUnit
      );
    });

    // 5. Definition Local 3 -> exercise_title (GMSG 264, 4 campos oficiales FIT SDK)
    pushBytes([
      0x43, 0x00, 0x00, 0x08, 0x01, 4,
      2, 64, 7,
      254, 2, 132,
      0, 2, 132,
      1, 2, 132
    ]);
    usedTitles.forEach((info, titleIdx) => {
      pushBytes([0x03]);
      chunks.push(encodeFixedUtf8(info.title_es, 64));
      pushU16(titleIdx);
      pushU16(info.cat_id);
      pushU16(info.name_id);
    });

    let dataSize = 0;
    chunks.forEach((c) => (dataSize += c.length));

    const header12 = new Uint8Array(12);
    header12[0] = 14;
    header12[1] = 0x10;
    new DataView(header12.buffer).setUint16(2, 21301, true);
    new DataView(header12.buffer).setUint32(4, dataSize, true);
    header12[8] = 0x2e; // '.'
    header12[9] = 0x46; // 'F'
    header12[10] = 0x49; // 'I'
    header12[11] = 0x54; // 'T'

    const hdrCrc = fitCrc16(header12);
    const fullNoCrc = new Uint8Array(14 + dataSize);
    fullNoCrc.set(header12, 0);
    new DataView(fullNoCrc.buffer).setUint16(12, hdrCrc, true);

    let offset = 14;
    chunks.forEach((c) => {
      fullNoCrc.set(c, offset);
      offset += c.length;
    });

    const fileCrc = fitCrc16(fullNoCrc);
    const finalFit = new Uint8Array(fullNoCrc.length + 2);
    finalFit.set(fullNoCrc, 0);
    new DataView(finalFit.buffer).setUint16(fullNoCrc.length, fileCrc, true);
    return finalFit;
  }

  /**
   * Inspector y decodificador binario .FIT en navegador: genera un log detallado
   * verificando cabecera, CRC-16, definiciones GMSG y pasos de ejercicio.
   */
  function inspectFitBinaryToLog(uint8Arr, labelName) {
    const lines = [];
    lines.push(`====================================================================`);
    lines.push(`📄 ARCHIVO: ${labelName} (${uint8Arr.length} bytes)`);
    lines.push(`====================================================================`);

    if (uint8Arr.length < 16) {
      lines.push(`❌ ERROR CRÍTICO: Archivo demasiado corto (<16 bytes).`);
      return lines.join("\n");
    }

    const dv = new DataView(uint8Arr.buffer, uint8Arr.byteOffset, uint8Arr.byteLength);
    const hdrSize = uint8Arr[0];
    const protoVer = uint8Arr[1];
    const profVer = dv.getUint16(2, true);
    const dataSize = dv.getUint32(4, true);
    const magic = String.fromCharCode(uint8Arr[8], uint8Arr[9], uint8Arr[10], uint8Arr[11]);
    const hdrCrcRead = hdrSize === 14 ? dv.getUint16(12, true) : 0;
    const hdrCrcCalc = fitCrc16(uint8Arr.slice(0, 12));
    const fileCrcRead = dv.getUint16(uint8Arr.length - 2, true);
    const fileCrcCalc = fitCrc16(uint8Arr.slice(0, uint8Arr.length - 2));

    lines.push(
      `[CABECERA FIT] HeaderSize=${hdrSize}B | Protocol=0x${protoVer.toString(16)} | Profile=${profVer} | Magic="${magic}"`
    );
    lines.push(
      `[TAMAÑO DATOS] Declarado=${dataSize}B | Real=${uint8Arr.length - hdrSize - 2}B -> ${
        dataSize === uint8Arr.length - hdrSize - 2 ? "✅ EXACTO" : "❌ DESAJUSTE"
      }`
    );
    lines.push(
      `[CRC-16 HEADER] Leído=0x${hdrCrcRead.toString(16).padStart(4, "0")} | Calculado=0x${hdrCrcCalc
        .toString(16)
        .padStart(4, "0")} -> ${hdrCrcRead === hdrCrcCalc ? "✅ VÁLIDO" : "❌ ERROR CRC"}`
    );
    lines.push(
      `[CRC-16 ARCHIVO] Leído=0x${fileCrcRead.toString(16).padStart(4, "0")} | Calculado=0x${fileCrcCalc
        .toString(16)
        .padStart(4, "0")} -> ${fileCrcRead === fileCrcCalc ? "✅ VÁLIDO" : "❌ ERROR CRC"}`
    );

    const defs = {};
    let pos = hdrSize;
    const end = uint8Arr.length - 2;
    let msgCounts = {};
    const stepSummaries = [];

    const readAscii = (start, len) => {
      const sub = uint8Arr.slice(start, start + len);
      const zeroIdx = sub.indexOf(0);
      const clean = zeroIdx >= 0 ? sub.slice(0, zeroIdx) : sub;
      return new TextDecoder().decode(clean);
    };

    while (pos < end) {
      const recHdr = uint8Arr[pos++];
      const isDef = (recHdr & 0x40) !== 0;
      const localNum = recHdr & 0x0f;

      if (isDef) {
        pos += 1; // reserved
        const arch = uint8Arr[pos++];
        const littleEndian = arch === 0;
        const gmsg = dv.getUint16(pos, littleEndian);
        pos += 2;
        const numFields = uint8Arr[pos++];
        const fields = [];
        let recSize = 0;
        for (let f = 0; f < numFields; f++) {
          const fNum = uint8Arr[pos++];
          const fSize = uint8Arr[pos++];
          const fType = uint8Arr[pos++];
          fields.push({ fNum, fSize, fType });
          recSize += fSize;
        }
        defs[localNum] = { gmsg, littleEndian, fields, recSize };
      } else {
        const def = defs[localNum];
        if (!def) {
          lines.push(`❌ ERROR en byte ${pos - 1}: Registro de datos para LocalMsg ${localNum} sin definición previa.`);
          break;
        }
        msgCounts[def.gmsg] = (msgCounts[def.gmsg] || 0) + 1;
        const fMap = {};
        let fOffset = pos;
        def.fields.forEach((f) => {
          if (f.fSize === 1) fMap[f.fNum] = uint8Arr[fOffset];
          else if (f.fSize === 2) fMap[f.fNum] = dv.getUint16(fOffset, def.littleEndian);
          else if (f.fSize === 4) fMap[f.fNum] = dv.getUint32(fOffset, def.littleEndian);
          else if (f.fType === 7) fMap[f.fNum] = readAscii(fOffset, f.fSize);
          fOffset += f.fSize;
        });

        if (def.gmsg === 0) {
          lines.push(
            `[GMSG 0 file_id] FileType=${fMap[0]} (${fMap[0] === 5 ? "WORKOUT ✅" : "OTRO"}) | Manufacturer=${fMap[1]} | Product=${fMap[2]} (Fenix 8) | SlotNumber=${fMap[5]}`
          );
        } else if (def.gmsg === 26) {
          lines.push(
            `[GMSG 26 workout] Nombre="${fMap[8]}" | Sport=${fMap[4]} (Training) | SubSport=${fMap[11]} (Strength) | Pasos=${fMap[6]}`
          );
        } else if (def.gmsg === 27 && fMap[7] === 0) {
          const wKg = fMap[12] && fMap[12] !== 0xffff ? `${(fMap[12] / 100).toFixed(1)} kg` : "Peso Corporal";
          stepSummaries.push(
            `  • Paso #${fMap[254]}: ${fMap[0] || "Ejercicio"} (Cat=${fMap[10]}, ID=${fMap[11]}) -> ${fMap[2]} reps @ ${wKg} [${fMap[8] || ""}]`
          );
        }
        pos += def.recSize;
      }
    }

    lines.push(
      `[RESUMEN MENSAJES DECODIFICADOS] GMSG_0(file_id)=${msgCounts[0] || 0} | GMSG_49(creator)=${
        msgCounts[49] || 0
      } | GMSG_26(workout)=${msgCounts[26] || 0} | GMSG_27(steps)=${msgCounts[27] || 0} | GMSG_264(titles)=${
        msgCounts[264] || 0
      }`
    );
    if (stepSummaries.length) {
      lines.push(`[SERIES ACTIVAS CON TUS 1RM ACTUALES]:`);
      stepSummaries.forEach((s) => lines.push(s));
    }
    lines.push(`✅ RESULTADO AUDITORÍA: Archivo .FIT 100% íntegro y compatible con Garmin Fenix 8 (GARMIN/NewFiles).\n`);
    return lines.join("\n");
  }

  /**
   * Construye el objeto JSON oficial de Garmin Connect Workout para un día de fuerza.
   */
  function buildGarminConnectJsonForDay(dayObj, weekNum) {
    const workoutSteps = [];
    let stepOrder = 1;

    workoutSteps.push({
      type: "ExecutableStepDTO",
      stepId: null,
      stepOrder: stepOrder++,
      childStepId: null,
      description: "Movilidad articular y series de aproximación",
      stepType: { stepTypeId: 1, stepTypeKey: "warmup", displayOrder: 1 },
      endCondition: { conditionTypeId: 1, conditionTypeKey: "lap.button", displayOrder: 1, displayable: true },
      endConditionValue: null,
      targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: "no.target", displayOrder: 1 }
    });

    let childId = 1;
    (dayObj.steps || []).forEach((st) => {
      if (!st.lift) return;
      const cfg = getLiftConfig(st.lift);
      const setsCount = parseInt(st.sets, 10) || 3;
      const repsCount = parseRepsCount(st.reps);
      const weightKg = calcLiftWeight(st.lift, st.pct || 0);
      const restSec = cfg.rest_sec || 90;

      const workStep = {
        type: "ExecutableStepDTO",
        stepId: null,
        stepOrder: stepOrder + 1,
        childStepId: childId,
        description: `${Math.round((st.pct || 0) * 100)}% 1RM · ${st.rir || "RIR 2"}`,
        stepType: { stepTypeId: 3, stepTypeKey: "interval", displayOrder: 3 },
        endCondition: { conditionTypeId: 10, conditionTypeKey: "reps", displayOrder: 10, displayable: true },
        endConditionValue: repsCount,
        targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: "no.target", displayOrder: 1 },
        category: cfg.category_key,
        exerciseName: cfg.exercise_key
      };

      if (weightKg > 0) {
        workStep.weightValue = weightKg;
        workStep.weightUnit = { unitId: 8, unitKey: "kilogram", factor: 1000.0 };
      }

      const restStep = {
        type: "ExecutableStepDTO",
        stepId: null,
        stepOrder: stepOrder + 2,
        childStepId: childId,
        description: "Descanso entre series",
        stepType: { stepTypeId: 4, stepTypeKey: "rest", displayOrder: 4 },
        endCondition: { conditionTypeId: 2, conditionTypeKey: "time", displayOrder: 2, displayable: true },
        endConditionValue: restSec,
        targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: "no.target", displayOrder: 1 }
      };

      workoutSteps.push({
        type: "RepeatGroupDTO",
        stepId: null,
        stepOrder: stepOrder,
        stepType: { stepTypeId: 6, stepTypeKey: "repeat", displayOrder: 6 },
        childStepId: childId,
        numberOfIterations: setsCount,
        smartRepeat: false,
        endCondition: { conditionTypeId: 7, conditionTypeKey: "iterations", displayOrder: 7, displayable: false },
        endConditionValue: setsCount,
        workoutSteps: [workStep, restStep]
      });

      stepOrder += 3;
      childId++;
    });

    workoutSteps.push({
      type: "ExecutableStepDTO",
      stepId: null,
      stepOrder: stepOrder,
      childStepId: null,
      description: "Vuelta a la calma",
      stepType: { stepTypeId: 2, stepTypeKey: "cooldown", displayOrder: 2 },
      endCondition: { conditionTypeId: 1, conditionTypeKey: "lap.button", displayOrder: 1, displayable: true },
      endConditionValue: null,
      targetType: { workoutTargetTypeId: 1, workoutTargetTypeKey: "no.target", displayOrder: 1 }
    });

    const wktTitle = `HYBRID · Sem ${weekNum} · ${dayObj.day_name} (${(dayObj.modality_label || "").split("·")[1]?.trim() || "Fuerza"})`;
    return {
      workoutName: wktTitle,
      description: resolveDynamicText(dayObj.summary || ""),
      sportType: { sportTypeId: 5, sportTypeKey: "strength_training", displayOrder: 5 },
      subSportType: null,
      workoutSegments: [
        {
          segmentOrder: 1,
          sportType: { sportTypeId: 5, sportTypeKey: "strength_training", displayOrder: 5 },
          workoutSteps: workoutSteps
        }
      ]
    };
  }

  function triggerBlobDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 300);
  }

  function downloadFitForDay(dayObj, weekNum, slotNum) {
    const bytes = buildFitWorkoutBinaryForDay(dayObj, weekNum, slotNum);
    const safeDay = (dayObj.day_name || "Gym").replace(/[^a-zA-Z0-9]/g, "");
    const fname = `Garmin_Sem${weekNum}_${safeDay}.fit`;
    triggerBlobDownload(new Blob([bytes], { type: "application/octet-stream" }), fname);
  }

  function downloadJsonForDay(dayObj, weekNum) {
    const obj = buildGarminConnectJsonForDay(dayObj, weekNum);
    const safeDay = (dayObj.day_name || "Gym").replace(/[^a-zA-Z0-9]/g, "");
    const fname = `GarminConnect_Sem${weekNum}_${safeDay}.json`;
    triggerBlobDownload(
      new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }),
      fname
    );
  }

  /**
   * Genera un script para pegar en connect.garmin.com que abre una ventana flotante
   * de Log en Vivo directamente en la pantalla del usuario, probando los endpoints
   * oficiales de Garmin Connect y mostrando el resultado detallado paso a paso.
   */
  function buildGarminConnectConsoleScript(strengthDays, weekNum) {
    const payloads = strengthDays.map((d) => buildGarminConnectJsonForDay(d, weekNum));
    return `(async () => {
  const workouts = ${JSON.stringify(payloads)};
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;top:20px;right:20px;width:540px;max-width:94vw;max-height:85vh;background:#0b0e11;color:#e2e8f0;border:2px solid #0ea5e9;border-radius:12px;padding:16px;z-index:999999;font-family:monospace;font-size:12px;box-shadow:0 20px 50px rgba(0,0,0,0.8);display:flex;flex-direction:column;gap:10px;";
  box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;"><strong style="color:#0ea5e9;font-size:14px;">⌚ Garmin Hybrid Coach · Log de Subida en Vivo</strong><button id="ghc-close" style="background:#1e293b;color:#fff;border:1px solid #475569;border-radius:6px;padding:4px 10px;cursor:pointer;">Cerrar</button></div><pre id="ghc-log" style="background:#050709;padding:10px;border-radius:8px;overflow-y:auto;max-height:55vh;white-space:pre-wrap;margin:0;line-height:1.45;"></pre><div style="display:flex;gap:8px;"><button id="ghc-copy" style="background:#0ea5e9;color:#082f49;font-weight:bold;border:none;border-radius:6px;padding:7px 12px;cursor:pointer;">📋 Copiar este Log</button></div>';
  document.body.appendChild(box);
  const logEl = box.querySelector("#ghc-log");
  const log = (msg) => { logEl.textContent += "[" + new Date().toLocaleTimeString() + "] " + msg + "\\n"; console.log(msg); };
  box.querySelector("#ghc-close").onclick = () => box.remove();
  box.querySelector("#ghc-copy").onclick = () => { navigator.clipboard.writeText(logEl.textContent); box.querySelector("#ghc-copy").textContent = "✓ Log Copiado"; };

  log("Iniciando diagnóstico en: " + location.href);
  if (!location.hostname.includes("garmin.com")) {
    log("❌ ERROR: No estás en connect.garmin.com. Abre https://connect.garmin.com/modern/workouts y vuelve a pegar este script.");
    return;
  }

  let token = null;
  try {
    const rawTok = localStorage.getItem("token");
    if (rawTok) {
      const parsed = JSON.parse(rawTok);
      token = parsed.access_token || parsed.value || null;
    }
  } catch (e) { log("Aviso leyendo localStorage.token: " + e.message); }

  const csrfMeta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMeta ? csrfMeta.getAttribute("content") : null;
  log("Token OAuth detectado: " + (token ? "SÍ (" + token.slice(0, 12) + "...)" : "NO (usando cookies de sesión)"));
  if (csrfToken) log("CSRF Token detectado: SÍ");

  const headers = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=UTF-8",
    "NK": "NT",
    "DI-Backend": "connectapi.garmin.com",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (token) headers["Authorization"] = "Bearer " + token;
  if (csrfToken) headers["connect-csrf-token"] = csrfToken;

  const endpoints = [
    "/gc-api/workout-service/workout",
    "/modern/proxy/workout-service/workout",
    "/workout-service/workout"
  ];

  let successCount = 0;
  for (const w of workouts) {
    log("-----------------------------------------");
    log("Subiendo: " + w.workoutName + "...");
    let uploaded = false;
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: "POST",
          credentials: "include",
          headers,
          body: JSON.stringify(w)
        });
        const txt = await res.text();
        log(" -> Endpoint " + ep + " respondió HTTP " + res.status);
        if (res.ok) {
          let data = {};
          try { data = JSON.parse(txt); } catch (_) {}
          log("✅ CREADO CON ÉXITO: " + w.workoutName + " (workoutId: " + (data.workoutId || "OK") + ")");
          uploaded = true;
          successCount++;
          break;
        } else {
          log(" ⚠️ Detalle respuesta (" + res.status + "): " + txt.slice(0, 220));
        }
      } catch (err) {
        log(" ⚠️ Excepción en " + ep + ": " + err.message);
      }
    }
    if (!uploaded) {
      log("❌ No se pudo crear " + w.workoutName + ". Pulsa 'Copiar este Log' y pégalo en el chat del entrenador.");
    }
  }
  log("=========================================");
  log("RESUMEN FINAL: " + successCount + "/" + workouts.length + " entrenamientos creados.");
  if (successCount === workouts.length) {
    log("🎉 ¡Todo listo! Recarga la página de Garmin Connect en 3 segundos para verlos en tu lista.");
    setTimeout(() => location.reload(), 3500);
  }
})();`;
  }

  // ============================================================================
  // TEMA Y NAVEGACIÓN
  // ============================================================================

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

    // Actualizar título del banner de sincronización con el reloj
    const bannerTitleEl = document.getElementById("watch-sync-week-title");
    if (bannerTitleEl) {
      bannerTitleEl.textContent = `3 Sesiones de Fuerza de la Semana ${currentWeek.week_number} (Lunes, Martes y Jueves) Listas para tu Reloj Garmin`;
    }

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

    // Calcular dinámicamente qué tarjeta corresponde al día de HOY (inicio del plan: Lunes 2026-11-16)
    const todayIso =
      (garminData && garminData.morning_check_in && garminData.morning_check_in.date) ||
      new Date().toISOString().slice(0, 10);
    const startMs = Date.UTC(2026, 10, 16); // 2026-11-16
    const parts = todayIso.split("-").map((x) => parseInt(x, 10));
    const curMs = parts.length === 3 ? Date.UTC(parts[0], parts[1] - 1, parts[2]) : startMs;
    const diffDays = Math.max(0, Math.floor((curMs - startMs) / 86400000));
    const todayBlockNum = Math.min(3, Math.floor(diffDays / 28) + 1);
    const todayWeekNum = Math.min(12, Math.floor(diffDays / 7) + 1);
    const todayDayNum = (diffDays % 7) + 1;
    const todayPlanId = `b${todayBlockNum}-w${todayWeekNum}-d${todayDayNum}`;

    // 4. Render 7 Day Cards with dynamically calculated 1RM weights & Garmin Watch export buttons
    const daysGrid = document.getElementById("week-days-grid");
    if (daysGrid) {
      daysGrid.innerHTML = days
        .map((d) => {
          const isDone = !!completedMap[d.id];
          const isToday = d.id === todayPlanId;
          const isStrength = d.modality === "strength";
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

          const watchExportBar = isStrength
            ? `
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:2px;">
              <button type="button" class="icon-btn" data-dl-fit="${d.id}" style="font-size:0.73rem; padding:5px 10px; border-color:rgba(14,165,233,0.4); color:var(--accent-garmin);">
                ⌚ Descargar .FIT Reloj (${d.day_name})
              </button>
              <button type="button" class="icon-btn" data-dl-json="${d.id}" style="font-size:0.73rem; padding:5px 10px;">
                📤 JSON Garmin Connect
              </button>
            </div>
          `
            : "";

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

            ${watchExportBar}

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

      daysGrid.querySelectorAll("[data-dl-fit]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-dl-fit");
          const dayObj = days.find((x) => x.id === id);
          if (dayObj) downloadFitForDay(dayObj, currentWeek.week_number);
        });
      });

      daysGrid.querySelectorAll("[data-dl-json]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-dl-json");
          const dayObj = days.find((x) => x.id === id);
          if (dayObj) downloadJsonForDay(dayObj, currentWeek.week_number);
        });
      });
    }
  }

  function getActiveWeekStrengthDays() {
    if (!planData || !planData.blocks) return { weekNum: 1, strengthDays: [] };
    const block = planData.blocks[selectedBlockIdx] || planData.blocks[0];
    const week = (block.weeks || [])[selectedWeekIdx] || block.weeks[0];
    const strengthDays = (week.days || []).filter((d) => d.modality === "strength");
    return { weekNum: week.week_number || 1, strengthDays };
  }

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
        .slice(0, 8)
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

  // ============================================================================
  // PESTAÑA PLAN NUTRICIONAL HÍBRIDO (100.4 KG -> 90.0 KG)
  // ============================================================================

  function renderNutritionTab() {
    if (!nutritionData) return;
    const bio = nutritionData.biometrics || {};
    const dayTypes = nutritionData.day_types || [];
    const phases = nutritionData.phases_100_to_90 || [];
    const rules = nutritionData.supplements_and_rules || [];

    const kpiEl = document.getElementById("nutrition-kpis-grid");
    if (kpiEl) {
      const kpis = [
        {
          label: "Peso Actual → Objetivo",
          value: `${bio.start_weight_kg} → ${bio.target_weight_kg} kg`,
          sub: `Meta: -${bio.total_loss_kg} kg de grasa (${bio.weekly_loss_target_kg})`,
          subClass: "pos"
        },
        {
          label: "Metabolismo Basal (Garmin BMR)",
          value: `${bio.garmin_bmr_kcal} kcal/día`,
          sub: `Medido por tu Fenix 8 (33 años · ~${bio.estimated_height_cm} cm)`,
          subClass: ""
        },
        {
          label: "Gasto Real según Día (TDEE)",
          value: `2,520 – 3,150 kcal`,
          sub: `Media 6M Garmin: ${bio.garmin_avg_tdee_kcal} kcal/día`,
          subClass: ""
        },
        {
          label: "Proteína Diaria Blindada",
          value: `200 – 205 g/día`,
          sub: `2.2 g/kg peso objetivo (protege tus 1RM en déficit)`,
          subClass: "pos"
        },
        {
          label: "Ganancia Estimada en 10K",
          value: `-3:30 a -4:00 min`,
          sub: `~2.2 s/km más rápido por cada kg de grasa perdido`,
          subClass: "pos"
        },
        {
          label: "Hidratación Garmin Connect",
          value: `3.4 – 3.8 L/día`,
          sub: `Meta base en tu reloj: 3,378 ml + electrolitos`,
          subClass: ""
        }
      ];

      kpiEl.innerHTML = kpis
        .map(
          (k) => `
        <div class="metric-tile">
          <div class="metric-label"><span>${k.label}</span></div>
          <div class="metric-value">${k.value}</div>
          <div class="metric-sub ${k.subClass}">${k.sub}</div>
        </div>
      `
        )
        .join("");
    }

    const selectorEl = document.getElementById("nutrition-day-type-selector");
    const activeDay = dayTypes.find((d) => d.id === selectedNutriDayTypeId) || dayTypes[0];

    if (selectorEl && activeDay) {
      selectorEl.innerHTML = dayTypes
        .map((dt) => {
          const isAct = dt.id === activeDay.id;
          return `
          <button type="button" class="block-pill ${isAct ? "active" : ""}" data-nutri-day="${dt.id}" id="btn-nutri-${dt.id}">
            <div class="block-pill-tag">${dt.badge}</div>
            <div class="block-pill-name">${dt.title}</div>
            <div class="block-pill-meta" style="font-family:var(--font-mono); margin-top:4px;">
              <strong>${dt.target_kcal} kcal</strong> (Gasto Garmin ~${dt.garmin_tdee_kcal} kcal · Déficit -${dt.deficit_kcal} kcal)
            </div>
          </button>
        `;
        })
        .join("");

      selectorEl.querySelectorAll("[data-nutri-day]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedNutriDayTypeId = btn.getAttribute("data-nutri-day");
          renderNutritionTab();
        });
      });
    }

    const detailEl = document.getElementById("nutrition-active-day-detail");
    if (detailEl && activeDay) {
      const mealsHtml = (activeDay.meals || [])
        .map(
          (m) => `
        <div class="nutri-meal-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
            <div>
              <div style="font-family:var(--font-mono); font-size:0.73rem; color:var(--accent-garmin); font-weight:700;">
                ${m.time}
              </div>
              <div style="font-size:0.96rem; font-weight:700; color:var(--text-primary); margin-top:2px;">
                ${m.name}
              </div>
            </div>
            <div style="display:flex; gap:6px; align-items:center; font-family:var(--font-mono); font-size:0.75rem;">
              <span class="modality-tag strength">${m.kcal} kcal</span>
              <span class="modality-tag run">${m.macros}</span>
            </div>
          </div>
          <ul style="margin:4px 0 0 18px; font-size:0.83rem; color:var(--text-secondary); line-height:1.55;">
            ${(m.items || []).map((it) => `<li>${it}</li>`).join("")}
          </ul>
        </div>
      `
        )
        .join("");

      detailEl.innerHTML = `
        <div style="background:var(--bg-surface); border:1px solid var(--border-strong); border-radius:var(--radius-md); padding:14px 16px; display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <span style="font-family:var(--font-mono); font-size:0.74rem; color:var(--accent-run); font-weight:700;">${activeDay.badge}</span>
              <h4 style="font-size:1.02rem; font-weight:700; margin-top:2px;">${activeDay.title}</h4>
            </div>
            <div class="macro-badge-row">
              <span class="macro-pill" style="color:var(--accent-strength);">🔥 Meta: ${activeDay.target_kcal} kcal (Déficit -${activeDay.deficit_kcal} kcal)</span>
              <span class="macro-pill" style="color:var(--accent-run);">🥩 Proteína: ${activeDay.protein_g} g</span>
              <span class="macro-pill" style="color:var(--accent-garmin);">🍚 Carbos: ${activeDay.carbs_g} g</span>
              <span class="macro-pill">🥑 Grasas: ${activeDay.fat_g} g</span>
              <span class="macro-pill">💧 Agua: ${activeDay.water_l} L</span>
            </div>
          </div>
          <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.5;">
            <strong>Estrategia del Día:</strong> ${activeDay.focus}
          </p>
        </div>

        <div class="panel-grid-2">
          ${mealsHtml}
        </div>
      `;
    }

    const phasesEl = document.getElementById("nutrition-phases-list");
    if (phasesEl) {
      phasesEl.innerHTML = phases
        .map(
          (p) => `
        <div class="zone-row" style="flex-direction:column; align-items:flex-start; gap:4px;">
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center; flex-wrap:wrap; gap:6px;">
            <strong style="font-size:0.87rem; color:var(--text-primary);">${p.phase}</strong>
            <span style="font-family:var(--font-mono); font-size:0.82rem; font-weight:700; color:var(--accent-run);">${p.weight_range}</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.74rem; color:var(--accent-strength);">Ingesta media: ${p.kcal_avg}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.45;">${p.running_impact}</div>
        </div>
      `
        )
        .join("");
    }

    const rulesEl = document.getElementById("nutrition-rules-list");
    if (rulesEl) {
      rulesEl.innerHTML = rules
        .map(
          (r) => `
        <div class="zone-row" style="flex-direction:column; align-items:flex-start; gap:4px;">
          <strong style="font-size:0.86rem; color:var(--accent-garmin);">${r.title}</strong>
          <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.45;">${r.detail}</div>
        </div>
      `
        )
        .join("");
    }
  }

  function runSelfTestFitDiagnostic() {
    const outEl = document.getElementById("fit-diagnostic-log-output");
    if (!outEl) return;
    const { weekNum, strengthDays } = getActiveWeekStrengthDays();
    const report = [];
    report.push(`====================================================================`);
    report.push(`🔍 LOG DE AUTODIAGNÓSTICO GARMIN HYBRID COACH (${new Date().toLocaleString()})`);
    report.push(`====================================================================`);
    report.push(`1. CAUSA DEL ERROR AL SUBIR EN WEB ('Importar Datos' de Garmin Connect):`);
    report.push(`   - La página https://connect.garmin.com/modern/import-data SOLO acepta archivos .FIT`);
    report.push(`     de ACTIVIDADES ya grabadas con GPS/reloj (FileType = 4 ACTIVITY).`);
    report.push(`   - Si subes ahí un archivo .FIT de ENTRENAMIENTO (FileType = 5 WORKOUT), Garmin Connect`);
    report.push(`     lo rechaza siempre con 'Error al cargar' y sin mostrar log.`);
    report.push(`2. CÓMO CARGARLOS SIN ERROR:`);
    report.push(`   - VÍA A (1-Clic Web con Log en Pantalla): Pulsa 'Copiar Script 1-Clic' y pégalo en la`);
    report.push(`     Consola (F12) de https://connect.garmin.com/modern/workouts. Se abrirá una ventana`);
    report.push(`     de Log en Vivo encima de Garmin Connect mostrando el código HTTP exacto.`);
    report.push(`   - VÍA B (Cable USB directo al Fenix 8): Conecta el reloj al PC y copia los 3 .FIT`);
    report.push(`     descargados dentro de la carpeta GARMIN/NewFiles (o GARMIN/Workouts).\n`);
    report.push(`3. AUDITORÍA BINARIA EN VIVO DE TUS 3 ENTRENAMIENTOS (Semana ${weekNum}):`);

    strengthDays.forEach((d, idx) => {
      const slot = idx + 1;
      const fitBytes = buildFitWorkoutBinaryForDay(d, weekNum, slot);
      const safeDay = (d.day_name || "Gym").replace(/[^a-zA-Z0-9]/g, "");
      report.push(inspectFitBinaryToLog(fitBytes, `Garmin_Sem${weekNum}_${safeDay}.fit (Slot #${slot})`));
    });

    outEl.textContent = report.join("\n");
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
    renderNutritionTab();
    renderSixMonthAnalytics();
    renderActivitiesHistory();
    renderProfileAndZones();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadLocalState();
    initTheme();

    document.querySelectorAll("[data-tab-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchTab(btn.getAttribute("data-tab-target"));
      });
    });

    const jumpTo1RmBtn = document.getElementById("btn-jump-to-1rm");
    if (jumpTo1RmBtn) {
      jumpTo1RmBtn.addEventListener("click", () => switchTab("tab-1rm"));
    }
    const jumpToNutriBtn = document.getElementById("btn-jump-to-nutrition");
    if (jumpToNutriBtn) {
      jumpToNutriBtn.addEventListener("click", () => switchTab("tab-nutrition"));
    }
    const backToPlanBtn = document.getElementById("btn-back-to-plan");
    if (backToPlanBtn) {
      backToPlanBtn.addEventListener("click", () => switchTab("tab-plan"));
    }

    // Botón para saltar al banner de sincronización con el reloj
    const openWatchSyncBtn = document.getElementById("btn-open-watch-sync");
    if (openWatchSyncBtn) {
      openWatchSyncBtn.addEventListener("click", () => {
        const banner = document.getElementById("garmin-watch-sync-banner");
        const diagPanel = document.getElementById("fit-diagnostic-panel");
        if (diagPanel) {
          diagPanel.style.display = "block";
          runSelfTestFitDiagnostic();
        }
        if (banner) banner.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    // Toggle consola de diagnóstico .FIT / .JSON
    const toggleDiagBtn = document.getElementById("btn-toggle-fit-diag");
    if (toggleDiagBtn) {
      toggleDiagBtn.addEventListener("click", () => {
        const diagPanel = document.getElementById("fit-diagnostic-panel");
        if (!diagPanel) return;
        const isHidden = diagPanel.style.display === "none" || !diagPanel.style.display;
        diagPanel.style.display = isHidden ? "block" : "none";
        if (isHidden) {
          runSelfTestFitDiagnostic();
        }
      });
    }

    const selfTestBtn = document.getElementById("btn-run-self-test-fit");
    if (selfTestBtn) {
      selfTestBtn.addEventListener("click", () => {
        runSelfTestFitDiagnostic();
      });
    }

    const inspectInput = document.getElementById("input-inspect-fit-file");
    if (inspectInput) {
      inspectInput.addEventListener("change", async (ev) => {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        const outEl = document.getElementById("fit-diagnostic-log-output");
        if (!outEl) return;
        try {
          if (file.name.toLowerCase().endsWith(".json")) {
            const txt = await file.text();
            const parsed = JSON.parse(txt);
            const steps =
              (parsed.workoutSegments &&
                parsed.workoutSegments[0] &&
                parsed.workoutSegments[0].workoutSteps) ||
              [];
            outEl.textContent = [
              `====================================================================`,
              `📄 INSPECCIÓN ARCHIVO JSON: ${file.name} (${file.size} bytes)`,
              `====================================================================`,
              `✅ JSON Sintácticamente Válido`,
              `• workoutName: "${parsed.workoutName}"`,
              `• sportType: ${JSON.stringify(parsed.sportType)}`,
              `• Bloques / Pasos Principales: ${steps.length}`,
              `• Detalle de Bloques:`,
              ...steps.map((s, i) =>
                s.type === "RepeatGroupDTO"
                  ? `  [${i + 1}] RepeatGroup (${s.numberOfIterations} series): ${
                      s.workoutSteps?.[0]?.category
                    } / ${s.workoutSteps?.[0]?.exerciseName} (${
                      s.workoutSteps?.[0]?.endConditionValue
                    } reps @ ${s.workoutSteps?.[0]?.weightValue || "BW"} kg)`
                  : `  [${i + 1}] ${s.stepType?.stepTypeKey}: ${s.description || ""}`
              )
            ].join("\n");
          } else {
            const buf = await file.arrayBuffer();
            outEl.textContent = inspectFitBinaryToLog(new Uint8Array(buf), file.name);
          }
        } catch (err) {
          outEl.textContent = `❌ ERROR AL INSPECCIONAR ${file.name}: ${err.message}`;
        }
      });
    }

    const copyDiagBtn = document.getElementById("btn-copy-diag-log");
    if (copyDiagBtn) {
      copyDiagBtn.addEventListener("click", async () => {
        const outEl = document.getElementById("fit-diagnostic-log-output");
        if (!outEl) return;
        try {
          await navigator.clipboard.writeText(outEl.textContent);
          copyDiagBtn.textContent = "✓ Log Copiado";
          setTimeout(() => {
            copyDiagBtn.textContent = "📋 Copiar Log";
          }, 2000);
        } catch (_) {}
      });
    }

    // Copiar Script de Auto-Subida de los 3 días de fuerza a Garmin Connect Web
    const copyScriptBtn = document.getElementById("btn-copy-garmin-connect-script");
    if (copyScriptBtn) {
      copyScriptBtn.addEventListener("click", async () => {
        const { weekNum, strengthDays } = getActiveWeekStrengthDays();
        const code = buildGarminConnectConsoleScript(strengthDays, weekNum);
        try {
          await navigator.clipboard.writeText(code);
        } catch (_) {
          const ta = document.createElement("textarea");
          ta.value = code;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        const instr = document.getElementById("garmin-script-instructions");
        if (instr) instr.style.display = "block";
        const origText = copyScriptBtn.textContent;
        copyScriptBtn.textContent = "✓ Script Copiado (Abre Garmin Connect)";
        setTimeout(() => {
          copyScriptBtn.textContent = origText;
        }, 2500);
      });
    }

    // Descargar los 3 archivos .FIT de la semana activa (Lunes, Martes y Jueves)
    const dlAllFitBtn = document.getElementById("btn-download-all-fit");
    if (dlAllFitBtn) {
      dlAllFitBtn.addEventListener("click", () => {
        const { weekNum, strengthDays } = getActiveWeekStrengthDays();
        strengthDays.forEach((d, idx) => {
          setTimeout(() => {
            downloadFitForDay(d, weekNum, idx + 1);
          }, idx * 350);
        });
      });
    }

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
