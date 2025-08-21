# 🚀 Flexi.AI — Full-Stack AI-Powered SaaS Platform

[![Live Frontend](https://img.shields.io/badge/Live%20App-Vercel-black?style=for-the-badge&logo=vercel)](https://flexi-ai-3h15.vercel.app)
[![Live Backend](https://img.shields.io/badge/Live%20API-Render-blue?style=for-the-badge&logo=render)](https://flexi-backend-she4.onrender.com)

Flexi.AI is a powerful AI-driven SaaS platform designed to automate creative, resume-related, and image-processing tasks. Built with modern full-stack technologies and hosted using Vercel (frontend) & Render (backend), it delivers a seamless experience to users with production-grade APIs and responsive UI.

---

## 🌟 Features

- ✍️ **Blog & Article Generation** — OpenAI/Gemini powered content creation.
- 📄 **Resume Review & Objective Generation** — AI-driven resume analyzer & career objective builder.
- 🖼️ **Image from Text** — Convert prompts to AI-generated images using Gemini.
- 🧼 **Background/Object Removal** — Powered by ClipDrop API.
- 📤 **PDF Upload & Extraction** — Using Multer and pdf-parse.
- ☁️ **Cloud Storage** — All media handled via Cloudinary.

---

## 🧰 Tech Stack

### 🖥️ Frontend (Vercel)
- React (Vite)
- TailwindCSS
- shadcn/ui
- Clerk Authentication
- Context API
- Responsive design
📁 Folder Structure:

client/
├─ components/ → UI + Reusable Components
├─ pages/ → Routes like /dashboard, /resume, /blog, etc.
├─ context/ → Clerk & global state providers
├─ lib/ → API utilities and helpers
└─ App.jsx, main.jsx

---

### ⚙️ Backend (Render)
- Node.js (ESM) + Express
- PostgreSQL (Neon DB)
- Clerk Auth Middleware
- Cloudinary + ClipDrop APIs
- pdf-parse, multer for files

📁 Folder Structure:


backend/
├─ routes/
│ ├─ airoute.js
│ └─ userRoute.js
├─ controllers/
│ ├─ aiCont.js
│ └─ userCont.js
├─ middleware/
│ └─ authMiddleware.js
├─ configs/
│ ├─ cloudinary.js
│ └─ clipdrop.js
└─ server.js


---

## 🔗 Live Links

| Section     | URL                                                                 |
|-------------|----------------------------------------------------------------------|
| 🔹 Frontend | [https://flexi-ai-3h15.vercel.app](https://flexi-ai-3h15.vercel.app) |
| 🔹 Backend  | [https://flexi-backend-she4.onrender.com](https://flexi-backend-she4.onrender.com) |
| 🔹 GitHub   | [https://github.com/rajxxxxer/Flexi.Ai](https://github.com/rajxxxxer/Flexi.Ai) |

---

## 🛠 Setup Instructions (Local)

### 🔸 Clone the Repo
```bash
git clone https://github.com/rajxxxxer/Flexi.Ai.git
cd Flexi.Ai

