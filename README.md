# DSA Sheet Tracker (MERN)

A full stack DSA progress tracker built with React, Redux Toolkit, Node.js, Express, and MongoDB.

## Tech Stack

- Frontend: React, React Router, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT + bcrypt password hashing

## Features

- Signup/Login with JWT authentication
- Protected dashboard routes
- Topic-wise DSA sheets with problem links
- Mark/unmark problem completion
- Progress persisted in MongoDB
- Overall and topic-wise progress indicators
- Difficulty filter + search
- Modular architecture with reusable components/hooks

## Project Structure

```text
frontend/
  src/components
  src/pages
  src/hooks
  src/redux
  src/services
  src/routes
  src/utils

backend/
  src/controllers
  src/routes
  src/middleware
  src/models
  src/config
  src/data
```

## Local Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/topics` (protected)
- `GET /api/progress` (protected)
- `PATCH /api/progress/:problemId` (protected)

## Notes

- Make sure local MongoDB is running before seeding or starting backend.
- Seed script inserts sample topics and problems for all requested DSA sections.
