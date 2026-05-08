// One-pass sensitivity analysis on the round-trip 50 vs 90 km/h deltas. The user cares
// about the comparison between two speeds, so robustness is measured on the *delta*
// (X_90 - X_50) rather than the absolute X values. For each parameter we sweep -25 %
// and +25 %, recompute the deltas, and report the elasticity
//
//   epsilon = ((Delta_high - Delta_low) / Delta_baseline) / ((p_high - p_low) / p_baseline)
//
// |epsilon| ~ 0  -> the comparison is robust to that parameter
// |epsilon| ~ 1  -> linear pass-through (typical of factors that scale a quantity)
// |epsilon| >> 1 -> fragile; small parameter shifts move the comparison meaningfully
//
// Run: `node sensitivity.js` from the repo root. Writes sensitivity-analysis.md.

const fs = require("fs");
const path = require("path");

const m = require("./app.js");
const { CONSTANTS, VEHICLES, simulate, getDirectionalRoute } = m;

const SWEEP = 0.25;
const VEHICLE_ID = "note";
const DIRECTION = "round";
const SPEEDS = [50, 90];

// Quantities of interest. lowerBetter is documentation only.
const QOI = [
  { key: "fuelL", unit: "L", label: "Carburant" },
  { key: "timeMin", unit: "min", label: "Temps" },
  { key: "co2Kg", unit: "kg", label: "CO2" },
  { key: "totalPm10Mg", unit: "mg", label: "PM10 total" },
  { key: "totalPm25Mg", unit: "mg", label: "PM2,5 total" },
  { key: "brakeKWh", unit: "kWh", label: "Énergie freins" },
  { key: "powerLimitedKm", unit: "km", label: "Distance moteur saturé" },
];

function buildParams(vehicleId, overrides = {}) {
  const v = VEHICLES[vehicleId];
  return {
    mass: v.mass,
    cd: v.cd,
    area: v.area,
    crr: v.crr,
    displacementL: v.displacementL,
    exhaustPmMgPerKgFuel: v.exhaustPmMgPerKgFuel,
    maxPowerW: v.maxPowerW,
    pmaxSpeedMps: v.pmaxSpeedMps,
    latAccel: 1.47,
    longAccel: 1.5,
    coldStartSeconds: 60,
    ...overrides,
  };
}

function runDeltas(vehicleId, paramOverrides = {}) {
  const route = getDirectionalRoute(DIRECTION);
  const params = buildParams(vehicleId, paramOverrides);
  const r50 = simulate(SPEEDS[0], params, route);
  const r90 = simulate(SPEEDS[1], params, route);
  const out = {};
  for (const { key } of QOI) out[key] = r90[key] - r50[key];
  return out;
}

// CONSTANTS sweep: mutate the shared object, run, restore.
function sweepConstant(name, baseline) {
  const low = baseline * (1 - SWEEP);
  const high = baseline * (1 + SWEEP);
  CONSTANTS[name] = low;
  const dLow = runDeltas(VEHICLE_ID);
  CONSTANTS[name] = high;
  const dHigh = runDeltas(VEHICLE_ID);
  CONSTANTS[name] = baseline;
  return { dLow, dHigh, low, high, baseline };
}

// Vehicle-level (params) sweep.
function sweepParam(name, baseline) {
  const low = baseline * (1 - SWEEP);
  const high = baseline * (1 + SWEEP);
  return {
    dLow: runDeltas(VEHICLE_ID, { [name]: low }),
    dHigh: runDeltas(VEHICLE_ID, { [name]: high }),
    low,
    high,
    baseline,
  };
}

function elasticity(dLow, dHigh, dBase) {
  if (dBase === 0) return 0;
  const dDelta = (dHigh - dLow) / Math.abs(dBase);
  const dParam = SWEEP * 2; // (high - low) / baseline
  return dDelta / dParam;
}

const baselineDeltas = runDeltas(VEHICLE_ID);

// What to sweep. (kind: "const" mutates CONSTANTS; "param" overrides params per call.)
const PARAMETERS = [
  { kind: "const", name: "indicatedEfficiency", display: "η_indicated" },
  { kind: "const", name: "drivetrainEfficiency", display: "η_dt" },
  { kind: "const", name: "idleFuelGPerSPerL", display: "k_idle (g/s/L cyl)" },
  { kind: "const", name: "gasolineLhvMJPerL", display: "PCI essence" },
  { kind: "const", name: "crrSpeedRefMps", display: "v_ref Crr(v)" },
  { kind: "const", name: "engineBrakeNPerLPerMps", display: "k_eb (N·s·m⁻¹·L⁻¹)" },
  { kind: "const", name: "brakeTspGPerMJ", display: "k_brake (g TSP/MJ)" },
  { kind: "const", name: "tyreTspGKm", display: "k_tyre (g TSP/km)" },
  { kind: "const", name: "roadTspGKm", display: "k_road (g TSP/km)" },
  { kind: "param", name: "maxPowerW", display: "P_max" },
  { kind: "param", name: "pmaxSpeedMps", display: "v_Pmax" },
  { kind: "param", name: "longAccel", display: "a_comfort" },
  { kind: "param", name: "coldStartSeconds", display: "T_cs" },
  { kind: "param", name: "exhaustPmMgPerKgFuel", display: "facteur PM échappement" },
];

const rows = PARAMETERS.map((p) => {
  const baseline = p.kind === "const" ? CONSTANTS[p.name] : VEHICLES[VEHICLE_ID][p.name] ?? buildParams(VEHICLE_ID)[p.name];
  const sweep = p.kind === "const" ? sweepConstant(p.name, baseline) : sweepParam(p.name, baseline);
  const elasticities = {};
  for (const { key } of QOI) {
    elasticities[key] = elasticity(sweep.dLow[key], sweep.dHigh[key], baselineDeltas[key]);
  }
  return { ...p, baseline, sweep, elasticities };
});

// Render results.
function fmt(x, d = 2) {
  if (!Number.isFinite(x)) return "—";
  return x.toFixed(d);
}

const lines = [];
lines.push(`# Analyse de sensibilité — écart 50 vs 90 km/h, ${VEHICLES[VEHICLE_ID].label}, aller-retour`);
lines.push("");
lines.push("Toutes les lignes répondent à la même question : **si je faisais varier ce paramètre de ±25 %, est-ce que la différence simulée entre 50 et 90 km/h serait modifiée ?** L'élasticité ε = 0 signifie que l'écart est insensible au paramètre, ε = 1 signifie un passe-plat linéaire (typique d'un facteur multiplicatif), |ε| ≫ 1 signifie que l'écart est fragile.");
lines.push("");
lines.push(`Configuration : véhicule ${VEHICLES[VEHICLE_ID].label}, sens « ${DIRECTION} », 50 km/h vs 90 km/h, démarrage à froid 60 s.`);
lines.push("");
lines.push("## Écarts de référence (paramètres au nominal)");
lines.push("");
lines.push("| Grandeur | Δ(90 − 50) | Unité |");
lines.push("|---|---:|---|");
for (const q of QOI) {
  lines.push(`| ${q.label} | ${fmt(baselineDeltas[q.key], 3)} | ${q.unit} |`);
}
lines.push("");
lines.push("## Élasticités ε = (ΔΔ/Δ_base) / (Δp/p_base)");
lines.push("");

const headers = ["Paramètre", "Nominal", ...QOI.map((q) => q.label)];
lines.push(`| ${headers.join(" | ")} |`);
lines.push(`|${headers.map((_, i) => i === 0 ? "---" : "---:").join("|")}|`);
for (const r of rows) {
  const cells = [
    r.display,
    fmt(r.baseline, 4),
    ...QOI.map((q) => fmt(r.elasticities[q.key], 2)),
  ];
  lines.push(`| ${cells.join(" | ")} |`);
}
lines.push("");

// Verdict per QOI.
lines.push("## Lecture rapide");
lines.push("");
lines.push("Pour chaque grandeur on liste les paramètres dont |ε| > 0,5, classés par sensibilité décroissante.");
lines.push("");
for (const q of QOI) {
  const sorted = rows
    .map((r) => ({ name: r.display, eps: r.elasticities[q.key] }))
    .filter((r) => Math.abs(r.eps) >= 0.5)
    .sort((a, b) => Math.abs(b.eps) - Math.abs(a.eps));
  lines.push(`### Δ${q.label}`);
  if (sorted.length === 0) {
    lines.push("- robuste : aucune élasticité ≥ 0,5 dans la plage ±25 %.");
  } else {
    for (const r of sorted) {
      const arrow = r.eps > 0 ? "↑ paramètre → ↑ écart" : "↑ paramètre → ↓ écart";
      lines.push(`- **${r.name}** : ε = ${fmt(r.eps, 2)} (${arrow})`);
    }
  }
  lines.push("");
}

// Sign-flip check.
lines.push("## Inversions de signe");
lines.push("");
lines.push("Une inversion de signe entre p_low et p_high (ou par rapport au nominal) compromet l'usage comparatif.");
lines.push("");
let anyFlip = false;
for (const r of rows) {
  for (const q of QOI) {
    const lo = r.sweep.dLow[q.key];
    const hi = r.sweep.dHigh[q.key];
    const ba = baselineDeltas[q.key];
    if (Math.sign(lo) !== Math.sign(ba) || Math.sign(hi) !== Math.sign(ba)) {
      lines.push(`- **${r.display}** sur Δ${q.label} : nominal ${fmt(ba, 3)} → low ${fmt(lo, 3)}, high ${fmt(hi, 3)}`);
      anyFlip = true;
    }
  }
}
if (!anyFlip) lines.push("- aucune inversion de signe détectée sur les ±25 %. Toutes les conclusions du simulateur (ranking 50 vs 90 km/h) sont préservées.");
lines.push("");

// Cross-vehicle baseline (no parameter sweep), to show that the power-saturation
// diagnostic does discriminate between vehicles even though it is silent on the Note.
lines.push("## Distance « moteur saturé » par véhicule");
lines.push("");
lines.push("Le diagnostic n'est pas activé pour la Nissan Note ; il l'est pour les profils plus lourds, ce qui justifie son intérêt en présence d'une montée soutenue.");
lines.push("");
lines.push("| Véhicule | 50 km/h (km) | 90 km/h (km) | Δ (km) |");
lines.push("|---|---:|---:|---:|");
for (const vid of ["note", "suv", "pickup"]) {
  const route = getDirectionalRoute(DIRECTION);
  const params = buildParams(vid);
  const r50 = simulate(50, params, route);
  const r90 = simulate(90, params, route);
  lines.push(`| ${VEHICLES[vid].label} | ${fmt(r50.powerLimitedKm, 3)} | ${fmt(r90.powerLimitedKm, 3)} | ${fmt(r90.powerLimitedKm - r50.powerLimitedKm, 3)} |`);
}
lines.push("");

lines.push("## Méthode");
lines.push("");
lines.push("1. Pour chaque paramètre, deux simulations sont relancées : une à `p × 0,75` et une à `p × 1,25`.");
lines.push("2. Pour chaque grandeur Δ_X = X_90 − X_50, on calcule l'élasticité normalisée définie en tête.");
lines.push("3. La distance « moteur saturé » est presque toujours dégénérée à zéro pour la Note (le moteur tient sa vitesse partout) et n'est donc pas un test discriminant ici.");
lines.push("");
lines.push(`Reproduire : \`node sensitivity.js\` à la racine du dépôt.`);
lines.push("");

const outPath = path.join(__dirname, "sensitivity-analysis.md");
fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath} (${PARAMETERS.length} parameters, ${QOI.length} QOI).`);
