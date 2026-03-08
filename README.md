# YojanaFind — AI Government Scheme Finder

Find Indian government welfare schemes you're eligible for, instantly.

---

## What It Does

Most Indian citizens don't know what government schemes they qualify for. YojanaFind fixes that — enter your state, age, income, caste, and category, and the AI returns the schemes most relevant to your profile with step-by-step application guides.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, CSS Modules               |
| AI         | Groq API (Llama 3.3 70B) — free     |
| Data       | myscheme.gov.in, data.gov.in        |
| Hosting    | Vercel / Netlify / GitHub Pages     |

---

## Project Structure

```
yojana-find/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.js
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── schemes.js          # Scheme database + verified URLs
│   │   └── howToApply.js       # Step-by-step application guides
│   ├── hooks/
│   │   └── useSchemes.js       # State management for AI fetch
│   ├── utils/
│   │   └── api.js              # Groq API integration
│   └── components/
│       ├── Navbar
│       ├── Hero
│       ├── StatsBar
│       ├── SearchForm
│       ├── SchemeCard
│       ├── SchemeDetailModal   # Full scheme info + how to apply
│       └── Results
└── package.json
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Vineet2511SRM/yojana-find.git
cd yojana-find
npm install
```

### 2. Get a free Groq API key

- Go to [console.groq.com](https://console.groq.com)
- Sign up → API Keys → Create Key (free, no credit card)

### 3. Set up environment

Create a `.env` file in the project root:

```
REACT_APP_GROQ_KEY=gsk_your_key_here
```

### 4. Run

```bash
npm start
```

Opens at `http://localhost:3000`

---


## Features

- AI-matched schemes based on user profile (state, age, income, caste, category)
- 16 central schemes + state-specific schemes for 6 states in the local database
- Step-by-step application guide for each scheme (documents, steps, helpline, processing time)
- Verified official government URLs — no dead links
- Click any card to open full detail modal
- Income bracket slider, category chips, responsive layout
- Skeleton loading states

---

## Roadmap

- [ ] Node.js + Express backend to secure API key
- [ ] MySQL scheme database with admin panel
- [ ] Regional language support (Tamil, Hindi, Telugu)
- [ ] More state-specific schemes
- [ ] Offline PWA support for rural users with low connectivity

---

## Data Sources

- [myscheme.gov.in](https://www.myscheme.gov.in/) — Official government scheme portal
- [data.gov.in](https://data.gov.in) — Open government data
- Individual ministry portals for scheme details and URLs

---

## License

MIT