# Lead Manager – Professional SaaS Dashboard

A complete, production-ready MERN stack application tailored for lead management and tracking. Built with modern web development practices including strict TypeScript typing, modular architecture, and role-based access control.

## 📋 Table of Contents
- [Feature Overview](#feature-overview)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
- [Setup Instructions](#setup-instructions)
  - [Environment Setup](#environment-setup)
  - [Local Development Setup](#local-development-setup)
  - [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
  - [Authentication Flow](#authentication-flow)
  - [API Endpoints](#api-endpoints)
- [Deployment Instructions](#deployment-instructions)

---

## 🌟 Feature Overview

- **Leads Table:** Integrated CRUD (Create, Read, Update, Delete) modal system.
- **Advanced Filtering:** Instant table filtering by Lead Status and Lead Source.
- **Search UI:** Debounced search interface for optimized backend querying.
- **Sorting UI:** Easily sort leads by oldest or newest to manage priorities.
- **Pagination Features:** Server-side pagination for high-performance large dataset rendering.
- **CSV Export:** Dynamic CSV export reflecting current search queries and filters.
- **Robust UI/UX:** Responsive design, tailored empty states, and intuitive loading skeletons.
- **Security:** JWT authentication via HTTP headers and comprehensive route protection.

---

## 🏗 Architecture Overview

The system implements a classic **Client-Server Architecture**:
- **Frontend (SPA):** Built with React + Vite. Features a component-based UI leveraging `TailwindCSS` for styling. Global server state is managed through `@tanstack/react-query`, providing aggressive caching, loading states, and automatic background refetches.
- **Backend (REST API):** An Express.js node server implementing Controller-Service-Route layers. `Zod` is used for rigorous request validation. Data persistence relies on MongoDB and Mongoose ORM.
- **Containerization:** The platform is natively Dockerized featuring lightweight alpine-based multistage builds and orchestration via `docker-compose`.

### Tech Stack
**Frontend:**
- React 19 + TypeScript
- Vite
- TailwindCSS
- TanStack Query (React Query)
- TanStack Table (React Table v8)
- React Hook Form + Zod
- Lucide React (Icons)
- React Router DOM

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Token (JWT) + bcrypt
- Zod Validation

### Folder Structure
```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & Database config
│   │   ├── features/        # Modular domains (auth, leads)
│   │   │   ├── auth/        # Auth controllers, models, routes
│   │   │   └── leads/       # Lead controllers, models, routes
│   │   ├── middlewares/     # Auth, error handling, validation
│   │   ├── utils/           # Async handler, custom error classes
│   │   ├── app.ts           # Express application setup
│   │   └── server.ts        # Server entry point
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/      # Reusable UI components (Modals, Buttons)
│   │   ├── features/        # Feature-based architecture (auth, leads)
│   │   ├── hooks/           # Shared custom hooks (useDebounce)
│   │   ├── layouts/         # Layout wrappers
│   │   ├── lib/             # Third-party configuration (axios, react-query)
│   │   └── pages/           # Route components
│   └── Dockerfile
├── docker-compose.yml       # Dev orchestration
└── docker-compose.prod.yml  # Prod orchestration
```

---

## 🔐 Role-Based Access Control (RBAC)

The system supports strict tiered access control using backend middleware (`restrictTo`) and frontend conditional rendering (`usePermissions`).

- **Admin (`admin`)**: Has global privileges and complete CRUD access.
- **Sales (`sales`)**: Can view, create, and update leads. Delete permissions are strictly restricted at both the UI and API levels.

---

## ⚙️ Setup Instructions

### Environment Setup
1. Copy the provided `.env.example` file.
2. Create `.env` files in both the `frontend/` and `backend/` directories mapping to the variables listed in the example.

### Local Development Setup

1. **Start Backend Server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend Server:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Docker Setup

The repository is fully Dockerized for instant booting. Ensure you have Docker and Docker Compose installed.

**For Development (Hot-reloading enabled):**
```bash
docker-compose up --build
```
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5000`

---

## 📖 API Documentation

### Authentication Flow
1. User submits credentials to `/api/auth/login`.
2. The server verifies the payload against MongoDB using `bcrypt`.
3. An `accessToken` and `refreshToken` are returned to the client.
4. The client locally persists the tokens and attaches the `accessToken` via `Authorization: Bearer <token>` in subsequent requests.
5. React Query handles cache invalidation and UI state synchronisation automatically upon login/logout.

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user (`admin` or `sales`).
- `POST /api/auth/login` - Authenticate and receive JWT tokens.
- `GET /api/auth/me` - Retrieve the currently authenticated user's profile.

#### Leads
- `GET /api/leads` - Fetch paginated leads. Accepts query params (`page`, `limit`, `search`, `status`, `source`, `sort`).
- `POST /api/leads` - Create a new lead.
- `GET /api/leads/:id` - Retrieve a specific lead.
- `PATCH /api/leads/:id` - Update lead details.
- `DELETE /api/leads/:id` - Delete a lead **(Admin Only)**.

---

## 🚀 Deployment Instructions

### Production Docker Deployment
The project contains heavily optimized, multi-stage Docker builds configured specifically for production environments. The frontend is built and served via a lightweight Nginx container.

To deploy in a production environment:

```bash
# Bring up the Docker stack using the production override file in detached mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

### Manual Deployment
- **Backend:** Compile TypeScript using `npm run build` and run `npm start` (`node dist/server.js`) on your Node hosting provider (e.g., Render, Railway, AWS EC2). Ensure `MONGO_URI` is set.
- **Frontend:** Build the application using `npm run build` and host the `./dist` folder on a static hosting provider (e.g., Vercel, Netlify, AWS S3). Note: Ensure `VITE_API_URL` points to your production backend URL.
