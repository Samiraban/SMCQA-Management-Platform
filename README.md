# Star Management Consultancy — Frontend

A React + Vite rebuild of smcqa.com with a working admin panel, live chatbot,
and a real-time data layer — all frontend-only, ready to plug into a real
backend later.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Admin panel

Go to `/admin/login`.

- **Email:** `admin@smcqa.com`
- **Password:** `admin123`

(Change these in `src/context/AuthContext.jsx` — search for `DEMO_USER`.)

From the admin panel you can manage: Services, Team, Clients, Jobs,
Applicants, Blog posts, contact Inquiries, and the site's editable copy
(hero title/subtitle, about text).

## How "real-time" works right now

Everything goes through `src/lib/store.js`:

- Data is saved to `localStorage`, so it survives refreshes.
- A `BroadcastChannel` pushes every change to **every open tab instantly**.
  Try it: open the site in one tab and `/admin` in another — add a job in
  admin and watch it appear on the Careers page immediately, no refresh.
- The Careers "Apply Now" form and the Contact form both write straight into
  the store, so submissions show up in `/admin/applicants` and
  `/admin/inquiries` live, the moment someone submits.
- The chatbot logs every message into the store too (`/admin` doesn't have a
  dedicated chat-log screen yet, but the data collection — `chats` — is
  already there if you want to add one).

## Handing this to your backend developer

Your friend only needs to touch **one file**: `src/lib/api.js`. Every page
and admin screen calls functions from that file (`getJobs()`,
`createInquiry()`, etc.) — none of them talk to `store.js` or
`localStorage` directly. Swapping mock data for a real API means:

1. Rewrite each function in `api.js` to `fetch()` your real endpoints,
   keeping the same function names and return shapes.
2. For true real-time from a real server, swap the `BroadcastChannel` logic
   in `store.js` for a WebSocket/Socket.IO connection, and call the same
   `subscribe()`/`notify()` pattern when a message arrives from the server.
3. Replace `AuthContext.jsx`'s `login()` with a real call to your auth
   endpoint (e.g. `POST /api/auth/login`), and store a JWT instead of the
   boolean session flag.

Everything else (all pages, the admin screens, the chatbot) stays exactly
as-is — they don't know or care whether the data came from localStorage or
a real database.

## Project structure

```
frontend/src/
  admin/            admin panel: layout, login, ResourceManager (generic CRUD), pages/
  components/       Navbar, Footer, ScrollToTop, chatbot/
  context/          AuthContext (admin session)
  lib/              store.js (real-time engine), api.js (swap point), useRealtime.js
  pages/            public site pages
  styles/           variables.css (design tokens), global.css, pages.css, per-component CSS
```

## Mobile responsiveness

Every stylesheet (Navbar, Footer, Home, pages, admin, chatbot) has its own
`@media` breakpoints — checked at 900px and ~480–600px. The admin sidebar
collapses into a slide-out drawer with a hamburger toggle below 900px.

## Known limitations (frontend-only, by design)

- No real authentication/authorization — the admin login is a demo gate.
- No server-side validation — forms only validate in the browser.
- Data lives in the browser's localStorage per-device, not in a shared
  database, until the real backend is wired in via `api.js`.
- The chatbot's replies are simple keyword matching, not a real AI/LLM —
  swap `botReply()` in `Chatbot.jsx` for a real API call when ready.
