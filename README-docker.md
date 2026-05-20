# Docker Setup for MERN Application

This application is fully containerized using Docker and Docker Compose. It features separate configurations for development (with hot-reloading) and production (optimized builds).

## Prerequisites
- Docker
- Docker Compose

---

## Commands

### Development
Runs the application with development configuration, enabling hot-reloading for both the frontend and backend.
Volumes are mounted so that local file changes immediately reflect in the containers.

```bash
docker-compose up --build
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Production
Runs the optimized, minified production builds. The frontend is served using an Nginx alpine container, and the backend runs a compiled Node.js build.

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Build
To only build the Docker images without starting the containers:

**Build for Development:**
```bash
docker-compose build
```

**Build for Production:**
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
```
