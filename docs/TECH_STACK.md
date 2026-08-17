# Tech Stack Documentation

## 1. Overview

YojanaFind is a lightweight React + Vite web application that helps users discover Indian government welfare schemes. The project combines a profile-driven UI with an AI layer to match users to relevant schemes and show step-by-step guidance.

## 2. Architecture at a glance

The app is organized around a simple frontend flow:

1. The user fills in a profile form.
2. The form data is sent to the AI integration layer.
3. The AI returns a list of relevant schemes.
4. The UI renders scheme cards and opens a detail modal.
5. Each scheme displays eligibility, benefits, official links, and suggested application steps.

## 3. Core technologies

### Frontend

- React 18
  - Used for component-based UI rendering.
  - Components include the hero section, search form, results list, cards, and detail modal.
- React DOM
  - Responsible for rendering React components into the browser.
- JSX
  - Used to write UI structure in a declarative way.

### Build and development tooling

- Vite 5
  - Fast local development server.
  - Handles hot module replacement and production bundling.
- @vitejs/plugin-react
  - Enables React support inside Vite.

### Styling

- CSS Modules
  - Each component owns its own styling file.
  - This avoids global style collisions and makes UI components easier to maintain.
- Global CSS
  - Shared styles such as typography, resets, landing page visuals, and common layout rules live in the global stylesheet.

### AI integration

- Groq API
  - The app calls the Groq chat completion endpoint to get a list of relevant schemes.
  - The primary models used are `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, or `qwen/qwen3.6-27b`.
- Environment-based API key
  - The key is read from the environment variable `GROQ_API_KEY` (or `VITE_GROQ_KEY`).

### Data layer

The data is not fetched from a database in the current version. Instead, the app uses local JavaScript modules:

- [src/data/schemes.js](../src/data/schemes.js)
  - Stores central and state scheme metadata.
  - Contains fields like name, ministry, description, eligibility, benefits, category tags, and official apply URLs.
- [src/data/howToApply.js](../src/data/howToApply.js)
  - Holds application guidance for each scheme.
  - Includes documents, step-by-step instructions, helpline, and processing time.

## 4. Project structure explained

### [src/components](../src/components)

Contains all UI components:

- Navbar
- Hero
- SearchForm
- Results
- SchemeCard
- SchemeDetailModal
- StatsBar

### [src/hooks](../src/hooks)

- [src/hooks/useSchemes.js](../src/hooks/useSchemes.js)
  - Central hook for managing loading state, results, errors, and profile state.

### [src/utils](../src/utils)

- [src/utils/api.js](../src/utils/api.js)
  - Handles all Groq API requests and response parsing.

### [src/data](../src/data)

- Contains curated project content and scheme metadata.

## 5. How the app works

### User flow

1. User selects their profile details.
2. The form is submitted.
3. The hook triggers the AI request.
4. The AI returns a JSON array of schemes.
5. Results are displayed as cards.
6. Clicking a card opens the detail modal for deeper scheme information.

### Data flow

- The UI form is handled by the search form component.
- The profile is passed into the custom hook.
- The hook calls the Groq integration function.
- The API response is parsed into a list of scheme objects.
- The scheme objects are rendered by the result and card components.

## 6. Why this stack was chosen

- React is ideal for building interactive, reusable UI components.
- Vite provides a very fast development experience and a clean build pipeline.
- CSS Modules keep styling maintainable and component-scoped.
- Groq makes it easy to add AI-powered matching without building a full backend first.
- A local data layer keeps the prototype simple and easy to iterate on.

## 7. Development workflow

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 8. Environment variables

The app expects:

```env
VITE_GROQ_KEY=your_groq_api_key_here
```

This is required for the AI-based scheme matching feature.

## 9. Strengths of the current stack

- Simple to understand and extend
- Fast local development
- Modular component design
- Easy to host as a static site
- Good fit for demos, hackathons, and MVPs

## 10. Limitations and next steps

The current stack is intentionally lightweight, but it has some trade-offs:

- No backend currently protects the API key.
- Scheme data is local and manually curated.
- AI results are not persisted to a database.

Recommended future upgrades:

- Add a secure backend for AI requests.
- Move scheme data to a database.
- Add authentication and analytics.
- Support multilingual content and offline access.

## 11. Summary

YojanaFind uses a modern frontend stack centered around React and Vite, with CSS Modules for styling, Groq for AI matching, and local JavaScript modules for curated scheme content. It is simple, fast, and well-suited for a purpose-built public service MVP.
