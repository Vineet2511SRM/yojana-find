# YojanaFind — AI-Powered Government Scheme Finder

YojanaFind helps citizens discover Indian government welfare schemes they may be eligible for by combining a simple profile form with AI-based matching and official application links.

## What it does

Users enter their profile details such as state, age, income, caste, and category. The app then suggests the most relevant central and state schemes, provides eligibility context, and shows step-by-step application guidance.

## Key features

- AI-based scheme matching using Groq
- Central and state scheme discovery
- Scheme cards with eligibility, benefits, and official links
- Detailed modal with documents and application steps
- Responsive UI built with React and CSS Modules
- Simple local development workflow with Vite

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, JSX, CSS Modules |
| Build tool | Vite 5 |
| Styling | CSS Modules + custom global styles |
| AI integration | Groq API (Llama 3.3 70B) |
| Data layer | Local JSON-like scheme data in JavaScript modules |
| Deployment | Static frontend; can be hosted on Vercel, Netlify, or GitHub Pages |

## Project structure

```text
yojana-find/
├── public/
├── scripts/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the Groq API key

Create a file named `.env` in the project root and add:

```env
VITE_GROQ_KEY=your_groq_api_key_here
```

### 3. Run locally

```bash
npm start
```

The app will open at <http://localhost:5173> (or the next available Vite port).

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Available scripts

- `npm start` — starts the Vite dev server
- `npm run build` — creates a production build
- `npm run preview` — previews the built app locally

## Data sources and content

The app currently uses:

- Official scheme portals such as myscheme.gov.in and ministry portals
- Local curated scheme data in [src/data/schemes.js](src/data/schemes.js)
- Application guidance in [src/data/howToApply.js](src/data/howToApply.js)

## Notes

- The AI layer is currently connected client-side through the Groq API. For production, it is recommended to move API calls to a secure backend.
- The project is intentionally lightweight and optimized for quick local demos or static deployment.

## License

MIT
