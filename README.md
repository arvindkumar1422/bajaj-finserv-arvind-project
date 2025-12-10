# Bajaj Finserv Health – Doctor Finder

Single-page React + TypeScript experience to help users search and filter doctors, view rich profiles, and book appointments. Built with Vite and Tailwind for fast iteration and a polished UI (light/dark), plus optional voice-driven search.

## Highlights
- Text and voice search (Web Speech API) for doctors and specialties.
- Multi-criteria filters: specialty, availability, gender, language, minimum rating, and basic sorting.
- Detailed doctor cards with experience, languages, fees, availability chips, and booking modal.
- Theme toggle with persisted preference (light/dark).
- Data fetched via React Query from a hosted mock API; mock seed data also lives in `src/data`.

## Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS for styling
- React Query for data fetching/caching
- React Router for routing shell
- Axios for HTTP, lucide-react for icons

## Project Structure
- `src/App.tsx` – wraps layout with theme provider and header.
- `src/pages/DoctorFinderPage.tsx` – core page: search, filters, results list, URL param sync.
- `src/components/` – UI building blocks (`DoctorCard`, `DoctorList`, `Filters`, `SearchBar`, `BookingModal`, `Header`, `ThemeToggle`).
- `src/hooks/` – `useDoctors` (data fetch) and `useSpeechRecognition` (voice search).
- `src/context/ThemeContext.tsx` – theme state/persistence.
- `src/data/` – mock doctor seed and derived filter lists.
- `src/types/` – shared TypeScript types.

## Getting Started
Prereqs: Node 18+ and npm.

```bash
cd /Users/arvindkumarchandramouleeswaran/Downloads/bajaj-finserv-arvind-project-main/project
npm install
npm run dev
```

Then open the shown local URL (default `http://localhost:5173`).

## Scripts
- `npm run dev` – start Vite dev server.
- `npm run build` – production build to `dist/`.
- `npm run preview` – preview the production build locally.
- `npm run lint` – run ESLint.

## Data & APIs
- Doctors load from: `https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json` via `useDoctors`.
- If the API is unreachable, you can adapt `useDoctors` to fall back to `src/data/doctors.ts`.

## Feature Notes for Reviewers
- Voice search relies on the browser’s Web Speech API (best in Chrome).
- Theme preference is saved to `localStorage`.
- Booking modal is a UI flow only; submissions log to the console.

## Production Preview
After `npm run build`, open `dist/index.html` or host the `dist` folder with any static server (e.g., `npm run preview`).
