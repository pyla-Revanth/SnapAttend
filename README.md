# SnapAttend

SnapAttend is an attendance app built around face recognition. Students log in with their face through the camera, with optional voice enrolment. Teachers log in with a username and password. The attendance-marking system itself isn't built yet; this README covers the authentication and enrolment flows that exist today.

---

## 1. System architecture

```mermaid
flowchart LR
    subgraph Client["Browser"]
        FE["React 19 + Vite frontend<br/>:5173"]
        CAM[["Camera / Microphone<br/>getUserMedia · MediaRecorder"]]
        LS[("localStorage<br/>token")]
    end

    subgraph Server["Node.js"]
        BE["Express 5 backend<br/>:5000  /api/*"]
    end

    subgraph AI["Python"]
        AIS["FastAPI AI service<br/>:8000"]
        DLIB["dlib face models<br/>HOG detector · 68 landmarks · ResNet 128-d"]
        SVM["scikit-learn SVC<br/>+ distance threshold"]
        VOICE["Resemblyzer<br/>256-d voice embedding"]
    end

    DB[("Supabase Postgres<br/>teachers · students")]

    CAM --> FE
    FE <--> LS
    FE -- "axios, JSON / multipart<br/>Authorization: Bearer JWT" --> BE
    BE -- "supabase-js" --> DB
    BE -- "multipart (image / audio + students JSON)" --> AIS
    AIS --> DLIB
    AIS --> SVM
    AIS --> VOICE
```

**Responsibilities**

| Layer | Owns | Does **not** own |
|---|---|---|
| Frontend | UI, camera/mic capture, storing the JWT, route guards | Any recognition logic |
| Backend | Auth (bcrypt, JWT), validation, role checks, all DB access, orchestrating AI calls | ML models |
| AI service | Face detection, embeddings, matching, voice embeddings. It's **stateless**, so the backend sends it the candidate embeddings on every request | Database access |
| Supabase | Persistent storage for teachers and students (including embeddings) | — |

---

## 2. Tech stack

| Part | Stack |
|---|---|
| `frontend/` | React 19, Vite 8, React Router 7, Tailwind CSS 4, MUI icons, axios, react-hot-toast |
| `backend/` | Node.js (ES modules), Express 5, supabase-js, bcryptjs, jsonwebtoken, express-validator, multer (memory storage), axios |
| `ai-service/` | Python 3.13, FastAPI, uvicorn, dlib + face_recognition_models, scikit-learn, NumPy, Pillow, librosa, resemblyzer |
| Database | Supabase (Postgres) |

---

## 3. Project structure

```
SnapAttend/
├── frontend/
│   └── src/
│       ├── api/                 api.js (axios + JWT interceptor), studentApi.js, teacherApi.js
│       ├── routes/              index.jsx, StudentProtectedRoute.jsx, TeacherProtectedRoute.jsx
│       ├── pages/               Home, Student, StudentDashboard, Teacher, TeacherDashboard
│       └── components/          CameraInput, FaceRegister, VoiceInput, LoginForm, RegisterForm,
│                                PortalCard, Header, DashboardHeader, Card, Input, Button
├── backend/
│   └── src/
│       ├── server.js / app.js
│       ├── routes/              teacherRoutes.js, studentRoutes.js
│       ├── controllers/         teacherController.js, studentController.js
│       ├── services/            teacherService.js, studentService.js (Supabase), aiService.js (HTTP → AI)
│       ├── middleware/          authMiddleware, roleMiddleware, validationMiddleware, uploadMiddleware
│       ├── utils/               jwt.js, password.js
│       └── config/supabase.js
└── ai-service/
    ├── main.py                  FastAPI app, /health
    ├── api/                     face_routes.py, voice_routes.py
    ├── pipelines/               face_pipeline.py, voice_pipeline.py
    └── services/                student_service.py
```

---

## 4. Frontend routes

```mermaid
flowchart TD
    HOME["/  Home<br/>choose portal"] -->|Student Portal| S["/student<br/>Face ID login"]
    HOME -->|Teacher Portal| T["/teacher<br/>Login / Register form"]

    S -->|face recognised → token saved| SG{{"StudentProtectedRoute<br/>GET /api/student/profile"}}
    SG -->|200| SD["/student/dashboard"]
    SG -->|no token / 401 / 403| S

    T -->|login ok → token saved| TG{{"TeacherProtectedRoute<br/>GET /api/teacher/profile"}}
    TG -->|200| TD["/teacher/dashboard"]
    TG -->|no token / 401 / 403| T

    SD -->|Logout: remove token| S
    TD -->|Go Back Home| HOME
    S -->|Go Back Home| HOME
    T -->|Go Back Home| HOME
```

| Path | Component | Guard | Notes |
|---|---|---|---|
| `/` | `Home` | – | Two portal cards |
| `/student` | `Student` | – | If a valid student token exists, it redirects to the dashboard |
| `/student/dashboard` | `StudentDashboard` | `StudentProtectedRoute` | Placeholder page plus Logout |
| `/teacher` | `Teacher` | – | Toggles between `LoginForm` and `RegisterForm`; redirects if a valid teacher token exists |
| `/teacher/dashboard` | `TeacherDashboard` | `TeacherProtectedRoute` | Placeholder page |

The route guards and "already logged in" redirects all validate the token by calling the matching `/profile` endpoint. If that call fails, the token is removed from `localStorage`.

---

## 5. User flows

### 5.1 Teacher registration

```mermaid
sequenceDiagram
    actor U as Teacher
    participant FE as RegisterForm
    participant BE as Express
    participant DB as Supabase

    U->>FE: username, name, password, confirm
    FE->>FE: all fields filled? passwords match?
    FE->>BE: POST /api/teacher/register {username, name, password}
    BE->>BE: validateRegister (username 3–20, password ≥ 6, name 3–50)
    alt validation fails
        BE-->>FE: 400 {errors[]}
    end
    BE->>DB: select teacher_id where username = ?
    alt username taken
        BE-->>FE: 409 "Username already exists"
    end
    BE->>BE: bcrypt.hash(password, 10)
    BE->>DB: insert teachers {username, password(hash), name}
    BE-->>FE: 201 "Teacher registered successfully"
    FE-->>U: toast, then switch to login form after 1.5s
```

### 5.2 Teacher login

```mermaid
sequenceDiagram
    actor U as Teacher
    participant FE as LoginForm
    participant BE as Express
    participant DB as Supabase

    U->>FE: username, password
    FE->>BE: POST /api/teacher/login
    BE->>BE: validateLogin (both required)
    BE->>DB: select * where username = ?
    alt user missing or bcrypt.compare fails
        BE-->>FE: 401 "Invalid credentials"
    end
    BE->>BE: jwt.sign({id: teacher_id, role: "teacher"}, 1d)
    BE-->>FE: 200 {token}
    FE->>FE: localStorage.token = token
    FE-->>U: toast, then navigate to /teacher/dashboard after 1s
```

### 5.3 Student face login

```mermaid
sequenceDiagram
    actor U as Student
    participant FE as Student page / CameraInput
    participant BE as Express
    participant DB as Supabase
    participant AI as FastAPI

    U->>FE: Capture (webcam frame → PNG data URL)
    FE->>BE: POST /api/student/face-login (multipart: image)
    alt no image
        BE-->>FE: 400 "Image is required"
    end
    BE->>DB: select student_id, face_embedding where face_embedding not null
    BE->>AI: POST /face/predict (image + students JSON)
    AI->>AI: build X (embeddings), y (ids)
    AI->>AI: train linear SVC (needs ≥ 2 students, otherwise not recognised)
    AI->>AI: detect faces → 128-d encodings
    AI->>AI: SVC predicts id → keep only if euclidean distance ≤ 0.6
    AI-->>BE: {recognized, student_id}
    alt not recognised (no face, multiple matches, unknown face)
        BE-->>FE: 401 "Face not recognized"
        FE-->>U: show "Register New Profile" panel
    else recognised
        BE->>DB: select * where student_id = ?
        BE->>BE: jwt.sign({id: student_id, role: "student"}, 1d)
        BE-->>FE: 200 {token}
        FE->>FE: localStorage.token = token
        FE-->>U: navigate to /student/dashboard
    end
```

### 5.4 Student registration (face + optional voice)

This flow is reached from 5.3 when a face isn't recognised.

```mermaid
sequenceDiagram
    actor U as Student
    participant FE as FaceRegister / VoiceInput
    participant BE as Express
    participant AI as FastAPI
    participant DB as Supabase

    U->>FE: enter name, optionally record voice (MediaRecorder → audio/webm)
    FE->>BE: POST /api/student/register (multipart: name, image, voice?)
    alt no image / empty name
        BE-->>FE: 400
    end
    BE->>AI: POST /face/embedding (image)
    alt 0 faces or >1 faces
        AI-->>BE: 400 "No face detected." / "Multiple faces detected…"
        BE-->>FE: 500 "Student registration failed"
    end
    AI-->>BE: {embedding: float[128]}
    opt voice provided
        BE->>AI: POST /voice/embedding (audio)
        AI->>AI: librosa.load → preprocess_wav → embed_utterance
        AI-->>BE: {embedding: float[256]}
    end
    BE->>DB: insert students {name, face_embedding, voice_embedding?}
    BE-->>FE: 201 {token, student}
    FE-->>U: navigate to /student/dashboard
    Note over FE: The returned token must be saved to localStorage first,<br/>otherwise StudentProtectedRoute sends the student back to /student.
```

### 5.5 Session and route protection

```mermaid
flowchart LR
    REQ["Request to a protected API"] --> H{"Authorization header?"}
    H -- missing --> E1["401 header missing"]
    H -- "not 'Bearer &lt;token&gt;'" --> E2["401 invalid format"]
    H -- ok --> V{"jwt.verify(JWT_SECRET)"}
    V -- invalid / expired --> E3["401 invalid or expired"]
    V -- ok --> R{"role matches route?<br/>teacherOnly / studentOnly"}
    R -- no --> E4["403 access required"]
    R -- yes --> C["Controller"]
```

- Tokens are HS256 JWTs with `{ id, role }` that expire after **1 day**.
- The frontend attaches the token automatically through an axios request interceptor (`frontend/src/api/api.js`).
- Teachers and students share the single `localStorage` key `token`.

---

## 6. API reference

### Backend (Express, `http://localhost:5000/api`)

| Method | Endpoint | Auth | Body | Success | Errors |
|---|---|---|---|---|---|
| POST | `/teacher/register` | – | JSON `{username, password, name}` | 201 | 400 validation, 409 duplicate, 500 |
| POST | `/teacher/login` | – | JSON `{username, password}` | 200 `{token}` | 400, 401, 500 |
| GET | `/teacher/profile` | Bearer (teacher) | – | 200 `{user}` (decoded JWT) | 401, 403 |
| POST | `/student/face-login` | – | multipart `image` | 200 `{token}` | 400, 401, 404, 500 |
| POST | `/student/register` | – | multipart `name`, `image`, `voice?` | 201 `{token, student}` | 400, 500 |
| GET | `/student/profile` | Bearer (student) | – | 200 `{student}` | 401, 403, 404, 500 |

### AI service (FastAPI, `http://localhost:8000`, interactive docs at `/docs`)

| Method | Endpoint | Input | Output |
|---|---|---|---|
| GET | `/health` | – | `{success, message}` |
| POST | `/face/embedding` | multipart `image` | `{success, embedding[128]}`; 400 no face or multiple faces |
| POST | `/face/predict` | multipart `image`, `students` (JSON `[{student_id, face_embedding}]`) | `{recognized, student_id}`; 400 invalid JSON |
| POST | `/voice/embedding` | multipart `audio` | `{success, embedding[256]}`; 400 unreadable audio |

---

## 7. Recognition pipelines

**Face (`ai-service/pipelines/face_pipeline.py`)**

1. The dlib HOG frontal face detector runs with 1× upsampling.
2. A 68-point landmark predictor aligns each face.
3. The dlib ResNet model turns each face into a **128-d embedding**.
4. Matching trains a linear `SVC` on the stored embeddings (one per student) and predicts a student id. The match is accepted only if the euclidean distance to that student's stored embedding is **≤ 0.6**.

**Voice (`ai-service/pipelines/voice_pipeline.py`)**

1. `librosa.load` resamples the audio to 16 kHz.
2. Resemblyzer's `preprocess_wav` and `VoiceEncoder.embed_utterance` produce a **256-d embedding**.
3. `identify_speaker`, `process_voice` and `process_bulk_audio` do cosine-similarity matching (threshold 0.65). They're implemented but not wired to any endpoint yet; they're intended for attendance.

---

## 8. Data model (Supabase)

| Table | Columns |
|---|---|
| `teachers` | `teacher_id` (PK), `username` (unique), `password` (bcrypt hash), `name` |
| `students` | `student_id` (PK), `name`, `face_embedding` (float[128]), `voice_embedding` (float[256], nullable) |

---

## 9. Running locally

**Prerequisites:** Node.js 20+, Python 3.13, and a Supabase project containing the tables above.

```bash
# 1. AI service (port 8000)
cd ai-service
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python main.py
```

```bash
# 2. Backend (port 5000)
cd backend
npm install
npm run dev
```

```bash
# 3. Frontend (port 5173)
cd frontend
npm install
npm run dev
```

`backend/.env`:

```
PORT=5000
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
JWT_SECRET=...
```

The backend calls the AI service at `http://localhost:8000`, and the frontend calls the backend at `http://localhost:5000/api`. Both URLs are hard-coded in `backend/src/services/aiService.js` and `frontend/src/api/api.js`.

---

## 10. Current status

| Area | Status |
|---|---|
| Teacher register / login / protected dashboard | ✅ Working (verified via API tests) |
| Student face login | ✅ Backend + AI working. ⚠️ Needs **≥ 2 registered students** before anyone can be recognised |
| Student registration (face) | ✅ Backend + AI working |
| Student registration (voice) | ⚠️ Browser records WebM, which `librosa.load` can't decode from memory, so registrations with voice fail |
| Frontend build | ❌ `VoiceInput` imports `./Button` (should be `../Button`) |
| Teacher / student dashboards | 🚧 Placeholders |
| Attendance marking (face / voice) | 🚧 Not started (pipelines partly present in the AI service) |

**Known issues found during testing**

- Face login returns the same 401 for *no face*, *multiple faces* and *unknown face*, so the UI offers registration even when the capture was bad.
- Registering with a no-face or multi-face photo returns a generic 500. The AI service's clear 400 message is lost.
- Nothing stops the same face from being registered twice.
- A non-image upload returns 500 instead of 400.
- Malformed JSON and unknown routes return Express's HTML error page, which includes server file paths.
- The frontend has 11 ESLint errors (unused variables, `setState` inside effects, `CameraInput` effect ordering).
- There are no automated tests yet.
