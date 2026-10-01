import model from "./heart-model.js";

export const FEATURE_COLUMNS = model.columns;

const COLUMN_INDEX = new Map(model.columns.map((name, i) => [name, i]));

const FACTOR_LABELS = {
  Age: "Age",
  RestingBP: "Resting blood pressure",
  Cholesterol: "Serum cholesterol",
  FastingBS: "Fasting blood sugar over 120 mg/dL",
  MaxHR: "Maximum heart rate achieved",
  Oldpeak: "ST depression (oldpeak)",
  Sex_M: "Male sex",
  ChestPainType_ATA: "Atypical angina",
  ChestPainType_NAP: "Non-anginal chest pain",
  ChestPainType_TA: "Typical angina",
  RestingECG_Normal: "Normal resting ECG",
  RestingECG_ST: "ST-T wave abnormality",
  ExerciseAngina_Y: "Exercise-induced angina",
  ST_Slope_Flat: "Flat ST slope",
  ST_Slope_Up: "Upsloping ST slope",
};

/** Categories folded into the all-zeros reference level of each one-hot group. */
export const REFERENCE_LEVELS = [
  { label: "Female sex", group: "Sex" },
  { label: "Asymptomatic chest pain", group: "ChestPainType" },
  { label: "LVH on resting ECG", group: "RestingECG" },
  { label: "Downsloping ST slope", group: "ST_Slope" },
];

export const RISK_BANDS = [
  {
    key: "low",
    label: "Low risk",
    short: "Low",
    min: 0,
    max: 0.15,
    stroke: "#3F7308",
    blurb:
      "Your signals sit in the low-risk range. Keep your routine checks and existing habits going.",
  },
  {
    key: "moderate",
    label: "Moderate risk",
    short: "Moderate",
    min: 0.15,
    max: 0.4,
    stroke: "#B45309",
    blurb:
      "Some markers are worth watching. A routine visit with your physician would be a sensible next step.",
  },
  {
    key: "high",
    label: "High risk",
    short: "High",
    min: 0.4,
    max: 0.7,
    stroke: "#E11D48",
    blurb:
      "Several markers point toward elevated cardiovascular risk. Book a clinical review.",
  },
  {
    key: "critical",
    label: "Very high risk",
    short: "Very high",
    min: 0.7,
    max: Infinity,
    stroke: "#BE123C",
    blurb:
      "This combination of markers is strongly associated with heart disease. Please seek a cardiology consultation.",
  },
];

export function bandFor(probability) {
  return RISK_BANDS.find((b) => probability >= b.min && probability < b.max) ?? RISK_BANDS[RISK_BANDS.length - 1];
}

/** Form controls, grouped for the UI and kept beside the model so they cannot drift. */
export const FIELD_GROUPS = [
  {
    id: "vitals",
    title: "Vitals",
    caption: "Continuous measurements from a standard cardiac workup",
    fields: [
      { id: "age", kind: "slider", label: "Age", unit: "yrs", min: 18, max: 100, step: 1, default: 54 },
      { id: "restingBP", kind: "slider", label: "Resting blood pressure", unit: "mm Hg", min: 80, max: 200, step: 1, default: 133 },
      { id: "cholesterol", kind: "slider", label: "Serum cholesterol", unit: "mg/dL", min: 100, max: 600, step: 1, default: 245 },
      { id: "maxHR", kind: "slider", label: "Maximum heart rate", unit: "bpm", min: 60, max: 220, step: 1, default: 137 },
      { id: "oldpeak", kind: "slider", label: "ST depression (oldpeak)", unit: "mm", min: 0, max: 6, step: 0.1, default: 0.7 },
    ],
  },
  {
    id: "markers",
    title: "Clinical markers",
    caption: "Findings your clinician records during the same workup",
    fields: [
      {
        id: "sex",
        kind: "segmented",
        label: "Sex",
        default: "M",
        options: [
          { value: "M", label: "Male" },
          { value: "F", label: "Female" },
        ],
      },
      {
        id: "chestPainType",
        kind: "segmented",
        label: "Chest pain type",
        default: "ATA",
        options: [
          { value: "ATA", label: "Atypical", hint: "Atypical angina" },
          { value: "NAP", label: "Non-anginal", hint: "Non-anginal pain" },
          { value: "TA", label: "Typical", hint: "Typical angina" },
          { value: "ASY", label: "Asymptomatic", hint: "No chest pain reported" },
        ],
      },
      {
        id: "fastingBS",
        kind: "segmented",
        label: "Fasting blood sugar",
        default: 0,
        options: [
          { value: 0, label: "≤ 120 mg/dL" },
          { value: 1, label: "> 120 mg/dL" },
        ],
      },
      {
        id: "restingECG",
        kind: "segmented",
        label: "Resting ECG",
        default: "Normal",
        options: [
          { value: "Normal", label: "Normal" },
          { value: "ST", label: "ST-T", hint: "ST-T wave abnormality" },
          { value: "LVH", label: "LVH", hint: "Probable left ventricular hypertrophy" },
        ],
      },
      {
        id: "exerciseAngina",
        kind: "segmented",
        label: "Exercise-induced angina",
        default: "N",
        options: [
          { value: "N", label: "No" },
          { value: "Y", label: "Yes" },
        ],
      },
      {
        id: "stSlope",
        kind: "segmented",
        label: "ST slope",
        default: "Up",
        options: [
          { value: "Up", label: "Upsloping" },
          { value: "Flat", label: "Flat" },
          { value: "Down", label: "Downsloping" },
        ],
      },
    ],
  },
];

export const DEFAULT_INPUT = Object.fromEntries(
  FIELD_GROUPS.flatMap((group) => group.fields.map((field) => [field.id, field.default])),
);

/**
 * One-hot expansion with `drop_first=True`, exactly as the training pipeline
 * built it. The reference level of each group contributes all zeros.
 */
export function buildFeatureVector(input) {
  const vector = new Array(FEATURE_COLUMNS.length).fill(0);

  const set = (column, value) => {
    const index = COLUMN_INDEX.get(column);
    if (index !== undefined) vector[index] = value;
  };

  set("Age", input.age);
  set("RestingBP", input.restingBP);
  set("Cholesterol", input.cholesterol);
  set("FastingBS", Number(input.fastingBS));
  set("MaxHR", input.maxHR);
  set("Oldpeak", input.oldpeak);

  if (input.sex === "M") set("Sex_M", 1);
  if (input.chestPainType !== "ASY") set(`ChestPainType_${input.chestPainType}`, 1);
  if (input.restingECG !== "LVH") set(`RestingECG_${input.restingECG}`, 1);
  if (input.exerciseAngina === "Y") set("ExerciseAngina_Y", 1);
  if (input.stSlope !== "Down") set(`ST_Slope_${input.stSlope}`, 1);

  return vector;
}

/**
 * Standardise the continuous columns; leave binaries and dummies untouched.
 *
 * The scaler is indexed by its own feature order, which is *not* the order of
 * the estimator's feature vector, so each scaled column is looked up by name.
 */
export function scaleFeatureVector(vector) {
  const scaled = vector.slice();
  model.scaler.columns.forEach((name, i) => {
    const index = COLUMN_INDEX.get(name);
    scaled[index] = (scaled[index] - model.scaler.mean[i]) / model.scaler.scale[i];
  });
  return scaled;
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

function contributionsOf(scaledVector) {
  const rows = FEATURE_COLUMNS.map((name, i) => ({
    feature: name,
    label: FACTOR_LABELS[name] ?? name,
    contribution: model.coefficients[i] * scaledVector[i],
  }));

  const absoluteTotal = rows.reduce((sum, row) => sum + Math.abs(row.contribution), 0) || 1;

  return rows
    .filter((row) => Math.abs(row.contribution) > 1e-6)
    .map((row) => ({
      ...row,
      direction: row.contribution > 0 ? "raises" : "lowers",
      share: Math.abs(row.contribution) / absoluteTotal,
      logOdds: row.contribution,
      oddsMultiplier: Math.exp(row.contribution),
    }))
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
}

/**
 * @returns the probability of heart disease plus the evidence behind it.
 */
export function predictHeartRisk(input) {
  const vector = buildFeatureVector(input);
  const scaled = scaleFeatureVector(vector);

  const logOdds =
    model.intercept + scaled.reduce((sum, value, i) => sum + value * model.coefficients[i], 0);
  const probability = sigmoid(logOdds);

  const factors = contributionsOf(scaled);
  const band = bandFor(probability);

  return {
    probability,
    percent: probability * 100,
    logOdds,
    confidence: Math.abs(probability - 0.5) * 2,
    band,
    factors,
    contributors: factors.filter((f) => f.direction === "raises").slice(0, 5),
    protectors: factors.filter((f) => f.direction === "lowers").slice(0, 5),
    vector,
    scaled,
    modelVersion: model.version,
  };
}

/** Guard rails for the form so the UI can only ever submit in-range values. */
export function validateInput(input, groups = FIELD_GROUPS) {
  const errors = {};

  for (const group of groups) {
    for (const field of group.fields) {
      const value = input[field.id];
      if (field.kind === "slider") {
        if (typeof value !== "number" || Number.isNaN(value)) {
          errors[field.id] = `${field.label} must be a number`;
        } else if (value < field.min || value > field.max) {
          errors[field.id] = `${field.label} must be between ${field.min} and ${field.max}`;
        }
      } else if (value === undefined || value === null || value === "") {
        errors[field.id] = `${field.label} is required`;
      }
    }
  }

  return errors;
}
