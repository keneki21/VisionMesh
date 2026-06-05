# VisionMesh

AI-powered UI design evaluation platform — React frontend, Node.js backend, Python AI service, MongoDB.

---

## Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)
- An Anthropic API key

---

## 1. Clone & install

```bash

cd VisionMesh

# Frontend deps
npm install

# Backend deps
cd backend && npm install && cd ..

# AI deps
cd "VM AI (NEW)" && pip install -r requirements.txt && cd ..
```

---

## 2. Environment variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` — minimum required:

```env
MONGO_URI=mongodb://localhost:27017/visionmesh
JWT_SECRET=<random-64-char-string>
SESSION_SECRET=<random-64-char-string>

```

---

## 3. Download AI models (first run only)

```bash
cd "VM AI (NEW)"
python download_models.py        # WebUI ScreenRecognition (~129 MB)
python download_florence.py      # BLIP + Florence-2 (~1.8 GB total)
python download_uiclip.py        # UIClip + CLIP processor (~1.2 GB)
cd ..
```

---

## 4. Start each service

Open four terminals:

**MongoDB**
```bash
mongod
```

**Backend** — runs on `http://localhost:5000`
```bash
cd backend
npm start
```

**Frontend** — runs on `http://localhost:5173`
```bash
npm run dev
```

**AI service** — runs on `http://localhost:5001`
```bash
cd "VM AI (NEW)"
python api_server.py
```

---

## 5. Ports at a glance

| Service    | Port  |
|------------|-------|
| Frontend   | 5173  |
| Backend    | 5000  |
| AI service | 5001  |
| MongoDB    | 27017 |

---

## Optional: Docker (all services)

```bash
docker-compose up --build
```
