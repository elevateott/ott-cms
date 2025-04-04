# 🎬 OTT CMS – Fullstack Video Platform CMS

This project is a **multi-service OTT CMS platform** that includes:

- 🧠 **Strapi v5** – Headless CMS for managing videos, users, categories, and analytics.
- 🌐 **Astro** – Blazing-fast frontend framework used to build the admin dashboard for clients.
- 🎨 **TailwindCSS** – Utility-first CSS framework for styling the Astro admin interface.
- 🔐 **Optional: Next.js** – Used separately to serve the subscriber-facing frontend (not included here).

---

## 📁 Project Structure

. ├── astro-admin/ # Astro frontend dashboard for clients (admin UI) ├── src/ # Strapi backend content types, plugins, extensions ├── scripts/ # Custom utilities like data seeding ├── node_modules/ # Shared dependencies ├── .env # Strapi environment variables ├── .gitignore ├── package.json # Unified scripts for both Strapi & Astro └── README.md

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18 (recommended LTS)
- npm ≥ 6 (we’re using npm, not yarn)
- PostgreSQL or SQLite (DB of your choice)
- Git (optional, but recommended)

---

## 📦 Install Dependencies

Install dependencies for both the root and Astro project:

```bash
npm install
cd astro-admin && npm install

🧪 Development Scripts
You can run either service individually or both in parallel:

Script	Description
npm run dev	Start both Strapi & Astro
npm run dev:strapi	Start only Strapi backend
npm run dev:astro	Start only Astro frontend
npm run build	Build both dashboards
npm run build:strapi	Build Strapi admin panel
npm run build:astro	Build Astro static site
npm run start	Start both in production mode
npm run start:strapi	Start Strapi in production
npm run start:astro	Start Astro in production
npm run seed	Run seed script for default data
npm run upgrade	Upgrade Strapi to latest stable version


⚙️ Environment Variables
Root .env (for Strapi backend)

DATABASE_URL=your_database_connection_string
ADMIN_JWT_SECRET=your_secret
APP_KEYS=your_keys
API_TOKEN_SALT=your_salt
STRAPI_TELEMETRY_DISABLED=true

Astro .env (inside astro-admin/)
PUBLIC_API_URL=http://localhost:1337/api

🌐 Deployment
App	Hosting Type	Suggested Host
Strapi	Node.js app	Render, Railway
Astro	Static/SSR frontend	Vercel, Netlify
Each service deploys independently.

Note: Make sure PUBLIC_API_URL in Astro points to your production Strapi API.

🛠 Features
✅ Admin dashboard built with Astro

🔄 Real-time content updates from Strapi

🎥 Video template support (Episode, Trailer, Clip)

🔌 Support for Mux and embedded HLS streams

🗂 Auto-created video filtering and badge indicators

⚡ Custom actions for bulk video updates and deletions

🧠 Tech Stack
Strapi v5 – API & admin CMS

Astro – Lightweight UI frontend

TailwindCSS – For fast custom UI styling

PostgreSQL – Primary DB (or SQLite)

Render – For deploying both services

🧰 Contributing

# Clone the repo
git clone https://github.com/your-org/ott-cms.git
cd ott-cms
npm install

📚 Resources
Strapi Docs

Astro Docs

TailwindCSS Docs

Render Deployment Guide

✨ License
MIT © Elevate OTT, LLC

<sub>Built with 💙 using Strapi, Astro & Tailwind to power scalable video content platforms.</sub>


---

Let me know if you’d like me to generate a `README.md` file and drop it into your actual project directory too.
```
