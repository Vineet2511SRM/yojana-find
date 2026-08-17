# YojanaFind — AI-Powered Government Scheme Finder 🇮🇳

**YojanaFind** is an AI-driven web application designed to help Indian citizens quickly discover central and state government welfare schemes they are eligible for. By entering basic demographic, economic, and occupational details, users receive personalized, AI-matched welfare programs complete with benefit breakdowns, eligibility criteria, required documents, and official application portals.

---

## ✨ Key Features

- 🎯 **Intelligent AI Matching**: Powered by Groq's high-speed inference engine with multi-model fallback (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, and `qwen/qwen3.6-27b`).
- 🏛️ **Comprehensive Coverage**: Central and state welfare schemes across healthcare, agriculture, education, housing, entrepreneurship, and social welfare.
- 📋 **Detailed Application Guidance**: Interactive modal breakdown with required documents, step-by-step application instructions, helpline numbers, and direct official links.
- ⚡ **Lightning Fast & Lightweight**: Modern React 18 + Vite 5 frontend styled with scoped CSS Modules for performance and clean UI aesthetics.
- 🛡️ **Reliable Architecture**: Backend Express proxy on Node.js ensures secure API key handling, schema validation, and automatic AI model failover.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, JSX | Component-driven UI (cards, filters, profile wizard, modals) |
| **Build Tool** | Vite 5 | Fast HMR and optimized production bundling |
| **Styling** | CSS Modules & Vanilla CSS | Scoped styling with modern responsive design system |
| **AI Inference** | Groq API | High-speed LLM inference (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.6-27b`) |
| **Backend / Proxy** | Node.js + Express | API proxy with strict JSON schema enforcement & failover |
| **Deployment** | Vercel | Full-stack serverless deployment (`@vercel/node` + `@vercel/static-build`) |

---

## 📁 Project Structure

```text
yojana-find/
├── docs/                     # Architecture and technical documentation
│   └── TECH_STACK.md
├── public/                   # Static assets & icons
├── scripts/                  # Data maintenance and utility scripts
├── src/
│   ├── components/           # React UI components
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Results.jsx
│   │   ├── SchemeCard.jsx
│   │   ├── SchemeDetailModal.jsx
│   │   ├── SearchForm.jsx
│   │   └── StatsBar.jsx
│   ├── data/                 # Curated baseline schemes & application guides
│   │   ├── howToApply.js
│   │   └── schemes.js
│   ├── hooks/                # Custom React hooks (useSchemes)
│   ├── styles/               # Global CSS tokens and resets
│   ├── utils/                # Client-side API helpers
│   ├── App.jsx               # Main application component
│   └── index.jsx             # React DOM root entry
├── .env.example              # Environment variables template
├── server.js                 # Express server & Groq AI proxy endpoint
├── vercel.json               # Vercel serverless routing configuration
├── vite.config.js            # Vite configuration with local API proxy
└── package.json              # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Groq API Key**: Free API key from [GroqCloud Console](https://console.groq.com/keys)

### 2. Clone and Install

```bash
git clone https://github.com/Vineet2511SRM/yojana-find.git
cd yojana-find
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

*(Optional: Set `GROQ_MODEL=openai/gpt-oss-120b` to override the default model)*

### 4. Run Locally

Start both the Vite dev server and the backend proxy concurrently:

```bash
npm start
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Runs both Vite frontend (`:5173`) and Express backend (`:3001`) concurrently |
| `npm run dev` | Alias for `npm start` |
| `npm run server` | Starts only the Express backend server (`node server.js`) |
| `npm run build` | Builds the optimized frontend bundle into `dist/` |
| `npm run preview` | Previews the production build locally |

---

## 🌐 Deployment (Vercel)

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com) using `vercel.json`:

1. Import the repository into your Vercel account.
2. In **Project Settings &rarr; Environment Variables**, add:
   - `GROQ_API_KEY`: Your Groq API key.
3. Deploy! Vercel will automatically build the static assets and deploy `server.js` as a serverless function handling `/api/*`.

---

## 🔒 Disclaimer

YojanaFind is an informational tool that uses AI to match citizens with potential welfare opportunities. Scheme guidelines, eligibility thresholds, and benefits change periodically. Always verify specific criteria on official Indian Government portals ([india.gov.in](https://www.india.gov.in) / [myscheme.gov.in](https://www.myscheme.gov.in)) before applying.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
