
# STEWRD

## Overview
STEWRD is a web platform that compiles various automation scripts and tools that provides a collection of automation tools for handling invoice management, payment tracking, and financial reporting. It aims to save time for businesses and individuals by automating repetitive billing and payment processes.

    
## Tech Stack

- **Frontend:** React 18 with TypeScript
- **UI Framework:** Mantine UI
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Database:** Firestore Database
- **State Management:** React Context
- **Styling:** CSS Modules
- **Front-end Host:** Cloudflare Pages
- **Back-End Host:** Vercel 
- **SMTP:** Resend

### Backend
- **Server:** Express.js (Node.js)  
- **Database:** MongoDB Atlas  

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git
- MongoDB Atlas account (or local MongoDB instance)


### Installation
1. Clone the repository
```bash
git clone https://github.com/CSIhelp/John
cd STEWRD
```

2. Install dependencies
# Install root dependencies 
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd server
npm install

3. Start development front-end server
```bash
cd client
npm run dev
```

4. Start development back-end server
```bash
cd server
npm install && npm build
npm start
```
## Backend API
```bash
https://stewrd-calamasipie.vercel.app
```

### API endpoints
#### Authentication
Log in 
```bash
POST /api/auth/userManagement
```
#### User Management 
Get users
```bash
GET /api/auth/userManagement
```
Delete User 
```bash
DELETE /api/auth/userManagement/:clientId
```
Deactivate User 
```bash
PATCH  /api/auth/userManagement/deactivate/:clientId
```
Reactivate User
```bash
PATCH  /api/auth/userManagement/reactivate/:clientId
```
Resset Password (Admin Only)
```bash
PATCH  /api/auth/userManagement/:clientId
```
#### Bookmark 
Add Bookmark
```bash
POST /api/bookmarks
```
Remove Bookmark 
```bash
DELETE /api/bookmarks/:cardId
```
List Bookmarks 
```bash
GET /api/bookmarks
```

## Project Structure
The repository is divided into two main parts:
- client/ → Frontend (React + TypeScript + Vite)
- server/ → Backend (Node.js + Express + TypeScript)

Client (/client )
```bash
src/
├── assets/         # Static assets (images, fonts, icons, etc.)
├── components/     # Reusable UI components
├── data/           # Static/automation data (titles, links, constants, etc.)
├── hooks/          # Custom React hooks
├── pages/          # Route-based components (mapped to app routes)
├── service/        # API/service calls
├── context/        # React Context providers (state management)
├── types/          # TypeScript type definitions
├── App.tsx         # Root application an routing component
├── main.tsx        # Entry point
```
Server (/server) 
```bash 
server/
├── authentication/ # Auth logic (JWT, sessions, middleware, etc.)
├── dist/           # Compiled JavaScript (after build)
├── libraries/      # Utility libraries and helpers
├── models/         # Database models (e.g., Prisma, Mongoose, Sequelize)
├── routes/         # API routes/endpoints
├── types/          # TypeScript type definitions
├── AuthPayload.ts  # Auth payload definition
├── server.ts       # Main Express server entry point

```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)
