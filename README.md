
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
cd John
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
