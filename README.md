# Tsedey Activewear

Frontend and backend are **separate projects**. Run and deploy them independently.

## Frontend (this root)

- **Tech:** Vite + React
- **Run:** `npm install` then `npm run dev`
- **Config:** Create `.env` from `.env.example` and set `VITE_API_URL` to your backend URL (e.g. `http://localhost:3001` when running the backend locally).

## Backend

- **Location:** `backend/`
- **Tech:** Node.js, Express, **Firebase Firestore**
- **Run:**
  ```bash
  cd backend
  npm install
  cp .env.example .env   # edit .env with Firebase credentials (see backend/README.md)
  npm run seed           # first time only
  npm run dev
  ```
- **Default URL:** `http://localhost:3001`

The frontend talks to the backend only over HTTP using `VITE_API_URL`. No proxy or shared code.
