# 🧬 BioSort

### AI-Powered Biomedical Waste Classification & Segregation

**BioSort** is an AI-powered web application designed to help identify and classify biomedical waste from images and provide appropriate disposal/segregation guidance.

The system uses **computer vision and generative AI** to analyze an uploaded image, determine the likely category of biomedical waste, and present the result through a simple and intuitive web interface.

> **⚠️ Disclaimer:** BioSort is an educational/prototype project and should not be used as the sole authority for real-world biomedical waste disposal. Actual disposal must follow the regulations, guidelines, and procedures applicable to the relevant healthcare facility and jurisdiction.

---

## 🌐 Live Demo

**Website:**
https://biosort.vercel.app/

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Our Solution](#-our-solution)
* [Key Features](#-key-features)
* [How BioSort Works](#-how-biosort-works)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
* [Getting a Gemini API Key](#-getting-a-gemini-api-key)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [How to Use BioSort](#-how-to-use-biosort)
* [Application Workflow](#-application-workflow)
* [AI Classification](#-ai-classification)
* [API & Backend](#-api--backend)
* [Security](#-security)
* [Common Issues](#-common-issues)
* [Future Improvements](#-future-improvements)
* [Contributing](#-contributing)
* [License](#-license)
* [Acknowledgements](#-acknowledgements)

---

# 💡 About the Project

Biomedical waste requires proper segregation and disposal to reduce the risk of infection, contamination, and environmental damage.

However, correctly identifying different types of biomedical waste can be difficult, particularly when dealing with visually similar materials.

**BioSort** aims to simplify this process by allowing users to upload an image of a waste item and receive an AI-generated classification and disposal recommendation.

The application combines:

* Image-based AI analysis
* Generative AI
* A web-based user interface
* Automated waste classification
* Disposal/segregation recommendations

---

# ❗ Problem Statement

Biomedical waste is generated in hospitals, laboratories, clinics, research facilities, and other healthcare environments.

Improper segregation can result in:

* Environmental contamination
* Increased infection risk
* Improper handling of hazardous materials
* Higher waste-management costs
* Exposure of healthcare workers and waste handlers to potentially dangerous materials

A system capable of quickly analyzing and categorizing waste images can act as an additional decision-support tool for waste segregation.

---

# 💡 Our Solution

BioSort provides a simple workflow:

```text
User
  │
  ▼
Upload Waste Image
  │
  ▼
BioSort Web Application
  │
  ▼
AI Image Analysis
  │
  ▼
Waste Classification
  │
  ▼
Segregation / Disposal Recommendation
  │
  ▼
Result Displayed to User
```

The goal is to make biomedical waste classification **faster, simpler, and more accessible** through an AI-assisted interface.

---

# ✨ Key Features

### 📸 Image-Based Classification

Users can upload an image of biomedical waste for analysis.

### 🤖 AI-Powered Analysis

The uploaded image is analyzed using an AI vision model to identify the likely type/category of waste.

### 🗑️ Waste Segregation Guidance

After classification, BioSort provides guidance regarding the appropriate segregation/disposal category.

### ⚡ Fast Results

The application sends the image to the AI service and displays the generated classification without requiring manual identification.

### 🌐 Web-Based

BioSort works through a web browser and does not require users to install a separate application.

### 🎨 Simple User Interface

The interface is designed around a straightforward workflow:

**Upload → Analyze → View Result**

---

# 🏗️ How BioSort Works

At a high level, BioSort follows this architecture:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Web Frontend   │
                    │                  │
                    │ Image Upload UI  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Backend / API    │
                    │                  │
                    │ Request Handling │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Gemini AI      │
                    │  Vision Model    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Classification   │
                    │ + Recommendation │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Result Page    │
                    └──────────────────┘
```

---

# 🛠️ Technology Stack

The project can be divided into the following layers:

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React / JavaScript            |
| Styling         | CSS                           |
| Backend         | Node.js / Express             |
| AI              | Google Gemini API             |
| Image Analysis  | Gemini Vision / Multimodal AI |
| Package Manager | npm                           |
| Deployment      | Vercel                        |
| Version Control | Git & GitHub                  |

> The exact technologies may vary depending on the current implementation in the repository.

---

# 📁 Project Structure

A typical BioSort project structure looks like:

```text
BioSort/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

Your actual folder structure may differ depending on the version of BioSort you are using.

---

# ⚙️ Prerequisites

Before running BioSort locally, make sure you have:

### Required

* **Node.js** (LTS recommended)
* **npm**
* **Git**
* A **Google AI Studio / Gemini API key**

Check whether Node.js and npm are installed:

```bash
node --version
```

```bash
npm --version
```

If both commands return a version number, you are ready to continue.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project directory:

```bash
cd BioSort
```

---

## 2. Install Dependencies

Run:

```bash
npm install
```

If the backend has its own `package.json`, install its dependencies as well:

```bash
cd server
npm install
```

Then return to the root directory:

```bash
cd ..
```

---

# 🔑 Getting a Gemini API Key

BioSort uses Google's Gemini API for AI-powered image analysis.

You can create your own API key through **Google AI Studio**.

### Step 1 — Open Google AI Studio

Go to:

https://aistudio.google.com/

### Step 2 — Sign in

Sign in using your Google account.

### Step 3 — Open the API Keys section

Navigate to the API key section and create a new API key.

Google's current Gemini documentation provides the official process for creating and managing API keys.

### Step 4 — Copy your API key

Your key will look similar to:

```text
AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Do not upload this key to GitHub.**

---

# 🔐 Environment Variables

Create a `.env` file in the appropriate directory used by the project.

For example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

If your implementation uses a frontend environment variable, use the naming convention required by your frontend framework.

For example, Vite commonly uses:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Important

Never commit your `.env` file.

Add it to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
node_modules/
```

Google recommends environment variables as a secure way to configure Gemini API keys rather than embedding keys directly in source code.

---

# ▶️ Running the Project

After installing the dependencies and configuring your API key:

```bash
npm run dev
```

The terminal should display a local development URL, commonly something similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## Running the Backend

If BioSort uses a separate backend server, open another terminal:

```bash
cd server
```

Then run:

```bash
npm run dev
```

or, depending on the project's configuration:

```bash
npm start
```

You may then have:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

The exact ports depend on the configuration in the repository.

---

# 🧭 How to Navigate BioSort

BioSort is designed around a simple workflow.

## 1. Open the Website

Navigate to:

https://biosort.vercel.app/

You will be presented with the BioSort interface.

---

## 2. Upload an Image

Locate the image upload section.

Upload an image containing the biomedical waste item you want to analyze.

For best results:

* Use a clear image
* Make sure the waste item is visible
* Avoid extremely dark images
* Avoid heavily blurred images
* Keep unnecessary objects out of the frame when possible

---

## 3. Start the Analysis

After selecting the image, start the AI analysis.

The application sends the image to the configured AI service.

---

## 4. Wait for the AI Response

The AI model analyzes the image and attempts to identify the waste category.

The processing time can vary depending on:

* Image size
* Internet connection
* API response time
* Current API availability
* Model processing time

---

## 5. View the Result

BioSort displays the generated result.

Depending on the implementation, the result can contain information such as:

```text
Waste Type
     ↓
Waste Category
     ↓
Recommended Segregation
     ↓
Disposal Guidance
```

---

# 🧠 AI Classification

BioSort uses a multimodal AI model capable of processing both text and images.

The basic concept is:

```text
Image
  │
  ▼
AI Vision Model
  │
  ├── Identify object
  │
  ├── Determine waste type
  │
  ├── Determine category
  │
  └── Generate recommendation
  │
  ▼
Formatted Result
```

The AI is provided with instructions describing the task and is asked to analyze the uploaded image.

A simplified conceptual prompt could look like:

```text
Analyze the uploaded image.

Identify the biomedical waste item shown.

Determine:
1. What the item is
2. Its biomedical waste category
3. The appropriate segregation category
4. Recommended disposal guidance

Return the result in a clear and structured format.
```

The actual prompt used by the application may be more detailed.

---

# 🔌 API & Backend

The backend/API layer is responsible for handling communication between the application and the AI service.

A simplified request flow is:

```text
Frontend
   │
   │ Image
   ▼
Backend API
   │
   │ API Request
   ▼
Gemini API
   │
   │ AI Response
   ▼
Backend
   │
   │ Result
   ▼
Frontend
```

Keeping the AI API request on the server side is preferable because it prevents exposing sensitive API credentials directly in the browser.

---

# 🔒 Security

If you are deploying your own version of BioSort, pay special attention to API-key security.

### Never do this:

```javascript
const API_KEY = "AIzaSyXXXXXXXXXXXXXXXX";
```

And never commit:

```text
.env
```

to GitHub.

Instead:

```env
GEMINI_API_KEY=your_key_here
```

and load the value through environment variables.

For production deployments, configure environment variables through your hosting provider rather than committing secrets to the repository.

---

# 🐛 Common Issues

## `npm install` fails

Try:

```bash
npm cache clean --force
```

Then:

```bash
npm install
```

If the problem persists, verify your Node.js version:

```bash
node --version
```

---

## Gemini API Key Error

If you receive an authentication error:

1. Check that the API key is correct.
2. Check that the `.env` file is in the correct location.
3. Make sure the variable name matches the code.
4. Restart the development server after changing `.env`.

For example:

```env
GEMINI_API_KEY=YOUR_KEY
```

Then restart:

```bash
npm run dev
```

---

## API Key Is Undefined

If the application reports something similar to:

```text
API key is undefined
```

check whether the application expects:

```env
GEMINI_API_KEY=...
```

or:

```env
VITE_GEMINI_API_KEY=...
```

The variable name must exactly match what the code reads.

---

## Image Analysis Is Not Working

Check:

* Internet connection
* Gemini API key
* API quota/rate limits
* Image format
* Image size
* Browser console
* Backend terminal logs

---

## Changes to `.env` Are Not Taking Effect

Restart the development server:

```bash
Ctrl + C
```

Then:

```bash
npm run dev
```

Environment variables are generally loaded when the development process starts.

---

# 🌍 Deployment

BioSort can be deployed using platforms such as **Vercel** or another Node.js-compatible hosting platform.

A typical deployment workflow is:

```text
GitHub Repository
       │
       ▼
   Vercel
       │
       ├── Build Application
       │
       ├── Configure Environment Variables
       │
       └── Deploy
       │
       ▼
   Live Website
```

When deploying, add your Gemini API key to the hosting provider's **Environment Variables** section.

Do **not** place the API key directly into the repository.

---

# 🔮 Future Improvements

Potential future improvements for BioSort include:

* [ ] Support for more biomedical waste categories
* [ ] Custom-trained computer vision model
* [ ] Improved classification accuracy
* [ ] Confidence scores
* [ ] Multi-image analysis
* [ ] Real-time camera classification
* [ ] Waste segregation history
* [ ] User accounts
* [ ] Analytics dashboard
* [ ] Hospital/clinic-specific deployment
* [ ] Multilingual support
* [ ] Offline classification
* [ ] Integration with waste-management systems
* [ ] Regulatory guideline database
* [ ] Explainable AI classification
* [ ] Automated reporting

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

### 1. Fork the repository

Click **Fork** on GitHub.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/BioSort.git
```

### 3. Create a new branch

```bash
git checkout -b feature/your-feature
```

### 4. Make your changes

Implement and test your changes locally.

### 5. Commit your changes

```bash
git add .
git commit -m "Add: your feature"
```

### 6. Push your branch

```bash
git push origin feature/your-feature
```

### 7. Create a Pull Request

Open a Pull Request from your branch to the main BioSort repository.

---
# ⚠️ Important Disclaimer

BioSort is an **AI-assisted classification tool**, not a replacement for professional biomedical waste-management procedures.

AI-generated classifications may occasionally be incorrect.

Users should always follow:

* Local biomedical waste regulations
* Healthcare facility protocols
* Official waste-segregation guidelines
* Instructions from qualified professionals

The project should therefore be treated as a **decision-support and educational tool**, rather than an authoritative disposal system.

---

# 👨‍💻 Project

**BioSort — AI-Powered Biomedical Waste Classification**

Built as an AI/web development project exploring the use of multimodal artificial intelligence for practical environmental and healthcare applications.

---

## ⭐ Support the Project

If you find BioSort interesting or useful:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements
🤝 Contribute to the project

---

## 🔗 Links

**Live Demo:**
https://biosort.vercel.app/

**GitHub:**
Add your repository URL here.

---

### Built with ❤️ using AI, web technologies, and a goal of making biomedical waste segregation smarter.
