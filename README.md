# FitClub Frontend + Backend

Ce repo contient:
- un front React/Vite (racine du projet)
- un backend Node/Express (`backend/`)

## 1) Installation

```bash
npm install
npm --prefix backend install
```

## 2) Variables d'environnement

Front (`.env`):

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

Backend (optionnel, valeurs par defaut incluses):

```bash
PORT=4000
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## 3) Lancer le projet en local

Terminal 1 (backend):

```bash
npm run dev:backend
```

Terminal 2 (frontend):

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000`

## 4) Identifiants de demo

- Email: `admin@fitclub.com`
- Mot de passe: `admin123`
- Le dashboard est accessible aux utilisateurs connectes.
- La vue `Clients` est reservee au role administrateur.

## 5) Endpoints backend

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/register` (name, email, password, phone, birthDate, address, city, country)
- `GET /api/auth/me` (token Bearer requis)
- `PATCH /api/auth/me` (token Bearer requis)
- `GET /api/dashboard/overview`
- `GET /api/dashboard/clients` (admin uniquement, token Bearer requis)
- `POST /api/contact`
