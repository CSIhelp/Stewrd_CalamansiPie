
# John

## Overview
John is a web platform that compiles various automation scripts and tools that provides a collection of automation tools for handling invoice management, payment tracking, and financial reporting. It aims to save time for businesses and individuals by automating repetitive billing and payment processes.

    
## Tech Stack

- **Frontend:** React 18 with TypeScript
- **UI Framework:** Mantine UI
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Database:** MongoDB
- **State Management:** React Context
- **Styling:** CSS Modules

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git


### Installation
1. Clone the repository
```bash
git clone https://github.com/CSIhelp/John
cd John
```

2. Install dependencies
```bash
npm install
```

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
https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app
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
DELETE /api/bookmarks/bookmarks/:cardId
```
List Bookmarks 
```bash
GET /api/bookmarks/bookmarks
```

## Project Structure
```
src/
├── components/      # Reusable UI components
├── data/      # Automation data ( title, links, etc. ) 
├── pages/          # Route-based components
├── context/        # React context providers
├── types/          # TypeScript definitions
└── assets/         # Static assets


## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)
