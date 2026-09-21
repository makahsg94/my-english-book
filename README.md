# My English Book (Speakout 3rd Edition B1)

An interactive companion app for the **Speakout 3rd Edition B1 Student's Book**. The whole course is in one place: every page, audio track, video clip, vocabulary bank, grammar bank, review and quiz — searchable and playable.

## Features

- **All 8 units + lead-in** with lessons A–D, reviews and BBC content
- **In-book page images** (`img()`) side by side with the digital content
- **Audio player** for every track with playback speed (0.5x–2x) and a floating mini player
- **BBC videos** (programmes & vlogs) bundled as `public/videos`
- **OCR hints** per book page for quick lookup (`src/content/ocrHints.json`)
- **Quizzes & in-lesson exercises** validated by `scripts/validate.mjs`
- **Progress & milestones** saved locally
- Full-text **search** across units, exercises and audio

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS 4
- Oxlint for linting
- GitHub Actions → GitHub Pages deployment

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run validate   # validate units, quizzes and exercises
npm run lint       # oxlint
npm run build      # type-check + production build
npm run preview    # preview the production build
```

## Live site

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## Accounts & admin

Every visitor must log in or register before using the app; progress is saved per account.

- Local fallback: if the Supabase env vars are missing, accounts live in `localStorage`.
- Cloud (default): with `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` set, real accounts
  are created in Supabase Auth and progress is synced through the `user_data` table.
- Admin: set `VITE_ADMIN_USERNAME` in `.env.production` (currently `admin`) to the exact
  username you log in with. Your account gets a shield button in the header and full access
  to the admin panel (all students, their progress, and the ability to delete accounts).

### One-time Supabase setup

1. Create/auth a project, then in **SQL Editor** run `supabase/schema.sql`
   (creates the `user_data` table + RLS) **then** `supabase/admin.sql`
   (creates the `admins` table, creates the admin row for `admin`, and the RPC functions).
2. In **Authentication → Sign In / Providers → Email**, disable **Confirm email** so
   student sign-ups get a session immediately (accounts use synthetic `<hash>@student.local`
   emails — no real inboxes are needed).
3. Put the project URL + anon key in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   (they are already in `.env` / `.env.production`).

## Content structure

- `src/content/book.ts` – book metadata
- `src/content/units/*.ts` – units 1–8 and the lead-in (lessons, exercises, audio, video)
- `src/content/audioMap.ts` – canonical track label → bundled `public/audio` file
- `src/content/ocrHints.json` – per-page OCR text used as ground truth
- `public/audio` – B1 audio pack (`Speakout_3E_B1_SB_*.mp3`)
- `public/videos` – B1 BBC video library
- `src/assets/book/` – page image renders