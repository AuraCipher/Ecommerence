# 🛒 DailyBudget Mart

> A modern, full-stack ecommerce store built for everyday shoppers.  
> Powered by **Medusa.js v2**, **Next.js**, and **PostgreSQL** — fully open source and ready to deploy.

![Medusa](https://img.shields.io/badge/Medusa.js-v2-black?style=flat-square&logo=medusa)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=flat-square&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-Open%20Source-orange?style=flat-square)

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Medusa.js v2 |
| Frontend | Next.js |
| Database | PostgreSQL |
| Package Manager | npm + yarn |
| Admin (built-in) | Medusa Admin SDK |
| Admin (custom) | Full source — modify anything |

---

## 📦 Installation

### 1 — Clone the Repository

```bash
git clone https://auraciper/Ecommerence
cd ecommerence
```

---

## 🔧 Backend Setup

```bash
cd backend
```

### Environment Variables

Create a `.env` file inside `/backend` and add the following. `DATABASE_URL` is **required**.

```env
# Required — PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/dailybudget

# Other required variables
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

> ⚠️ **Make sure PostgreSQL is running and `DATABASE_URL` is correct before migrating. Wrong URL = migration failure.**

### Install, Migrate & Run

```bash
# Install dependencies
npm install

# Run database migrations (ensure DATABASE_URL is set correctly first)
yarn medusa db:migrate

# Start the backend dev server
npm run dev
```

### Backend URLs

| URL | Purpose |
|---|---|
| `http://localhost:9000` | Backend API |
| `http://localhost:9000/health` | Health Check |
| `http://localhost:9000/app` | Admin Dashboard |

### Create Admin User

```bash
npx medusa user -e admin@example.com -p supersecret
```

> 💡 After creating the user, login at `localhost:9000/app` and go to **Settings → API Keys** to generate a **Publishable Key**. You will need it for the frontend.

---

## 🖥️ Frontend Setup

### Environment Variables

Create a `.env.local` file inside `/frontend`:

```env
# Publishable key from Admin Panel > Settings > API Keys
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key_here

# Backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

| URL | Purpose |
|---|---|
| `http://localhost:8000` | Storefront (Live) |

---

## 🛠️ Custom Admin Panel *(Optional)*

The backend ships with an admin panel as an SDK dependency — but that limits what you can change. This repo also includes a **full-source admin panel** so you can modify every component, route, and feature freely.

**Why use it?**
- Full source access — no SDK lock-in
- Add custom pages, components, and workflows
- Rebrand and extend without restrictions

### Setup

First, go to `localhost:9000/app → Settings` and generate a **Secret Key**.

Create a `.env` file inside `/admin`:

```env
MEDUSA_ADMIN_BACKEND_URL=http://localhost:9000
MEDUSA_ADMIN_SECRET_KEY=your_secret_key_here

# Add any other required variables
```

### Install & Run

```bash
cd admin
npm install
npm run dev
```

---

## 📡 Full Setup Order

1. **Clone the repo** — `git clone` → `cd ecommerence`
2. **Configure backend `.env`** — PostgreSQL must be running
3. **Migrate & start backend** — `yarn medusa db:migrate` → `npm install` → `npm run dev`
4. **Create admin user** — `npx medusa user -e ... -p ...`
5. **Generate Publishable Key** — Login → Settings → API Keys
6. **Configure frontend `.env.local`** — Paste publishable key + backend URL
7. **Start storefront** — `cd frontend` → `npm install` → `npm run dev`
8. *(Optional)* **Custom admin** — Generate secret key → configure `.env` → `npm run dev`

---

## 📚 Learn More

New to the Medusa admin panel? The official user guide covers everything — managing products, orders, customers, inventory, and settings.

👉 [Medusa Admin User Guide](https://docs.medusajs.com/user-guide)

---

Built with ❤️ by [AuraCipher](https://github.com/AuraCipher) — contributions welcome.