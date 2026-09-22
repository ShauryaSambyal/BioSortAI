# BioSort AI ♻️

BioSort AI is an AI-powered web platform focused on **waste segregation** and **health-risk prediction**. It combines an interactive waste-segregation workflow with a browser-based heart-attack risk prediction model in a modern dark clinical interface.

---

## ✨ Features

### ♻️ BioSort

An interactive waste-segregation workflow featuring:

* Drag-and-drop interactions
* File/image validation
* Error handling
* Waste classification
* Clear segregation results
* Responsive design

Available at:

```text
/biosort
```

### ❤️ Heart Risk Predictor

A browser-based logistic-regression model that:

* Runs entirely on the client
* Applies the original training scaler
* Calculates risk probability
* Assigns a risk band
* Displays per-marker attribution
* Requires no Python inference server

Available at:

```text
/heart
```

---

## 🧠 Heart Risk Model

The original scikit-learn logistic-regression model has been ported to JavaScript so predictions can be performed directly in the browser.

```text
User Input
    ↓
Feature Encoding
    ↓
Training Scaler
    ↓
Logistic Regression
    ↓
Risk Probability
    ↓
Risk Band + Factor Attribution
```

### Model Port

```text
scripts/
├── extract_heart_model.py
└── verify_heart_port.mjs

lib/
├── heart-model.js
└── heartModel.js
```

`extract_heart_model.py` reads the trained model and scaler from the ML Model directory and generates the JavaScript model representation.

`heartModel.js` handles feature preparation, scaling, prediction, risk-band calculation, and marker attribution.

### Bug Fixes

Two issues from the original implementation were fixed:

1. **Missing scaler application**
   The original application loaded the scaler but did not apply it to incoming values, causing predictions to become saturated near 0% or 99%.

2. **Incorrect RestingECG feature name**
   The incorrect one-hot encoded column name caused both ECG features to remain zero. The feature mapping now matches the training data.

### Verification

The JavaScript implementation is compared against the original scikit-learn implementation using eight test profiles.

Run:

```bash
node scripts/verify_heart_port.mjs
```

The expected prediction difference is:

```text
≤ 1e-9
```

---

## 🎨 Design System

The project uses a dark clinical visual system designed around clarity and focused interaction.

### Design characteristics

* Dark interface
* Teal and coral accent colors
* High-contrast typography
* Grid-based background
* Responsive cards and layouts
* Purposeful animations

### Animation

The project uses:

* **Framer Motion** for UI transitions and reveal animations
* **Anime.js** for animated counters

Decorative effects that distracted from the main experience were removed, including:

* Hero ECG decoration
* Keyword cloud
* Marquee
* Scroll-linked hero fade

The hero section was also resized so both primary tool CTAs remain visible above the fold.

---

## 🏠 Home Page

The home page acts as the central entry point for both tools.

```text
Hero
  ↓
Tool CTAs
  ↓
Statistics
  ↓
Tool Cards
  ↓
How It Works
```

Users can navigate directly to:

* ❤️ Heart Risk Predictor
* ♻️ BioSort

---

## 🗂️ Routes

| Route      | Description                |
| ---------- | -------------------------- |
| `/`        | Main landing page          |
| `/heart`   | Heart-risk prediction      |
| `/biosort` | Waste-segregation workflow |

---

## 🛠️ Tech Stack

### Frontend

* React
* Next.js
* JavaScript / TypeScript
* CSS
* Framer Motion
* Anime.js

### Machine Learning

* Python
* scikit-learn
* Logistic Regression
* JavaScript client-side model

### Testing

* Node.js
* scikit-learn reference predictions
* Automated numerical verification

### Deployment

The application can be deployed using platforms such as Vercel.

---

## 📁 Project Structure

```text
project/
│
├── app/
│   ├── page.*
│   ├── heart/
│   │   └── page.*
│   └── biosort/
│       └── page.*
│
├── lib/
│   ├── heart-model.js
│   └── heartModel.js
│
├── scripts/
│   ├── extract_heart_model.py
│   └── verify_heart_port.mjs
│
├── ML Model/
│   └── trained model files
│
├── public/
│   └── assets
│
├── globals.css
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔄 Regenerating the Heart Model

If the trained model or scaler is updated, regenerate the JavaScript model:

```bash
python scripts/extract_heart_model.py
```

Then verify the generated implementation:

```bash
node scripts/verify_heart_port.mjs
```

---

## ♻️ BioSort Workflow

The BioSort workflow provides an interactive way to classify and segregate waste.

```text
Input
  ↓
Validation
  ↓
Classification
  ↓
Drag & Drop
  ↓
Segregation Result
```

The application validates uploaded files and handles invalid or unsupported inputs without breaking the workflow.

---

## 📱 Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

Layouts and interactions adapt to different screen sizes while keeping the primary actions accessible.

---

## 🎯 Project Goals

BioSort AI demonstrates the integration of machine learning with modern web development.

The project showcases:

* Client-side ML inference
* Machine-learning model portability
* Model verification
* Interactive UI design
* Drag-and-drop workflows
* Input validation
* Data visualization
* Responsive web development
* Purposeful animation

---

## 🔐 Privacy

The heart-risk prediction model runs directly in the browser. Prediction therefore does not require sending the entered model inputs to a dedicated prediction server.

Users should still avoid entering unnecessary personal information.

---

## ⚠️ Medical Disclaimer

The heart-risk predictor is intended **for educational and demonstration purposes only**.

It is not a medical diagnostic tool and should not replace professional medical advice, clinical assessment, or emergency medical services.

---

## 🚧 Future Improvements

* Camera-based waste detection
* Expanded waste categories
* Improved accessibility
* Additional ML models
* Automated model regression testing
* User history and analytics
* PWA/mobile support
* Expanded educational content

---

## 👨‍💻 BioSort AI

An interactive AI platform combining **waste segregation** and **browser-based machine-learning prediction** in a modern, responsive web experience.
