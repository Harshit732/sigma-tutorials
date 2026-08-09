# Project101 — Sigma Tutorials

A Next.js (React + Node.js API routes) rebuild of the Sigma Tutorials / CLAT
Blueprint landing page, with registration and login backed by MongoDB.

## Stack

- **Frontend/Backend:** Next.js 14 (Pages Router), React 18
- **Database:** MongoDB (via Mongoose)
- **Auth:** bcrypt password hashing + JWT stored in an httpOnly cookie
- **Styling:** CSS Modules + CSS custom properties with a light/dark theme toggle
- **Deployment:** Vercel

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in:

   ```bash
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=some-long-random-string
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Pages

- `/` — landing page
- `/register` — create an account (first name, last name, email, phone, date of birth, password)
- `/login` — log in
- `/dashboard` — protected page showing the logged-in user's stored info

## Deployment

Connected to Vercel via GitHub — every push to `main` auto-deploys to production.

## Environment variables (set these in Vercel too)

- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — random secret used to sign session tokens
