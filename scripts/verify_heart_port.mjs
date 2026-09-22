/**
 * Proves that the JavaScript port in `lib/heartModel.js` agrees with the
 * original scikit-learn estimator, to floating-point tolerance.
 *
 *   node scripts/verify_heart_port.mjs
 *
 * The Python side is invoked with the real pickles, so this is a genuine
 * cross-implementation check rather than a snapshot of remembered numbers.
 * Run it whenever the model artifacts change.
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { predictHeartRisk } from "../lib/heartModel.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const modelDir =
  process.env.HEART_MODEL_DIR ??
  path.join(process.env.USERPROFILE ?? process.env.HOME ?? "", "OneDrive", "Desktop", "ML Model");

const NUMERIC = ["Age", "RestingBP", "Cholesterol", "MaxHR", "Oldpeak"];

const CASES = [
  { age: 40, sex: "M", chestPainType: "ATA", restingBP: 120, cholesterol: 200, fastingBS: 0, restingECG: "Normal", maxHR: 150, exerciseAngina: "N", oldpeak: 1, stSlope: "Up" },
  { age: 70, sex: "M", chestPainType: "ASY", restingBP: 160, cholesterol: 300, fastingBS: 1, restingECG: "ST", maxHR: 100, exerciseAngina: "Y", oldpeak: 3, stSlope: "Flat" },
  { age: 30, sex: "F", chestPainType: "ATA", restingBP: 110, cholesterol: 180, fastingBS: 0, restingECG: "Normal", maxHR: 180, exerciseAngina: "N", oldpeak: 0, stSlope: "Up" },
  { age: 55, sex: "M", chestPainType: "NAP", restingBP: 140, cholesterol: 250, fastingBS: 0, restingECG: "Normal", maxHR: 140, exerciseAngina: "N", oldpeak: 1, stSlope: "Flat" },
  { age: 62, sex: "M", chestPainType: "ASY", restingBP: 150, cholesterol: 280, fastingBS: 0, restingECG: "LVH", maxHR: 120, exerciseAngina: "N", oldpeak: 2, stSlope: "Flat" },
  { age: 48, sex: "F", chestPainType: "TA", restingBP: 128, cholesterol: 210, fastingBS: 1, restingECG: "ST", maxHR: 158, exerciseAngina: "Y", oldpeak: 1.5, stSlope: "Down" },
  { age: 81, sex: "F", chestPainType: "ASY", restingBP: 178, cholesterol: 420, fastingBS: 1, restingECG: "LVH", maxHR: 88, exerciseAngina: "Y", oldpeak: 4.4, stSlope: "Down" },
  { age: 22, sex: "F", chestPainType: "NAP", restingBP: 96, cholesterol: 132, fastingBS: 0, restingECG: "Normal", maxHR: 204, exerciseAngina: "N", oldpeak: 0, stSlope: "Up" },
];

const PYTHON = `
import json, os, sys
import joblib, numpy as np

model_dir = os.environ["HEART_MODEL_DIR"]
model = joblib.load(os.path.join(model_dir, "LR_heart.pkl"))
scaler = joblib.load(os.path.join(model_dir, "scaler_heart.pkl"))
columns = list(joblib.load(os.path.join(model_dir, "columns_heart.pkl")))
numeric = ${JSON.stringify(NUMERIC)}

cases = json.loads(sys.stdin.read())
rows = []
for case in cases:
    raw = {
        "Age": case["age"], "RestingBP": case["restingBP"], "Cholesterol": case["cholesterol"],
        "FastingBS": case["fastingBS"], "MaxHR": case["maxHR"], "Oldpeak": case["oldpeak"],
        "Sex_" + case["sex"]: 1,
        "ChestPainType_" + case["chestPainType"]: 1,
        "RestingECG_" + case["restingECG"]: 1,
        "ExerciseAngina_" + case["exerciseAngina"]: 1,
        "ST_Slope_" + case["stSlope"]: 1,
    }
    vector = np.array([[raw.get(c, 0.0) for c in columns]], dtype=float)
    for i, name in enumerate(scaler.feature_names_in_):
        j = columns.index(name)
        vector[0, j] = (vector[0, j] - scaler.mean_[i]) / scaler.scale_[i]
    rows.append(float(model.predict_proba(vector)[0][1]))
print(json.dumps(rows))
`;

const python = spawnSync("python", ["-c", PYTHON], {
  input: JSON.stringify(CASES),
  env: { ...process.env, HEART_MODEL_DIR: modelDir },
  encoding: "utf8",
});

if (python.error || python.status !== 0) {
  console.error("Python side failed:", python.error?.message ?? python.stderr);
  process.exit(1);
}

const expected = JSON.parse(python.stdout.trim());
const tolerance = 1e-9;
let failures = 0;

console.log(`Comparing ${CASES.length} cases against scikit-learn\n`);
CASES.forEach((testCase, i) => {
  const actual = predictHeartRisk(testCase).probability;
  const delta = Math.abs(actual - expected[i]);
  const ok = delta <= tolerance;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  case ${i + 1}  sklearn=${expected[i].toFixed(12)}  port=${actual.toFixed(12)}  Δ=${delta.toExponential(2)}`,
  );
});

if (failures > 0) {
  console.error(`\n${failures} case(s) diverged from the pickled model.`);
  process.exit(1);
}

console.log("\nAll cases match the pickled model.");
