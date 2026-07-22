# YojanaFind — AI-Powered Government Scheme Finder

YojanaFind helps Indian citizens discover government welfare schemes they're eligible for. Enter your profile details and get AI-matched schemes with eligibility info and official application links.

## Features

- AI-based scheme matching using Groq (Llama 3.3 70B)
- Central and state scheme discovery
- Scheme cards with eligibility, benefits, and official links
- Detailed modal with required documents and application steps
- Responsive UI built with React and CSS Modules

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, JSX, CSS Modules |
| Build tool | Vite 5 |
| AI | Groq API (Llama 3.3 70B) |
| Backend | Node.js + Express (proxy for Groq API) |
| Deployment | Vercel / Netlify / GitHub Pages |

## Project Structure

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
├── server.js
├── package.json
└── .env
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Vineet2511SRM/yojana-find.git
cd yojana-find
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com).

### 3. Run locally

```bash
npm start
```

App runs at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Data Sources

- Official portals: myscheme.gov.in and ministry portals
- Curated scheme data: `src/data/schemes.js`
- Application guidance: `src/data/howToApply.js`

## License

MIT
