# Cosmic Horizons Frontend

The frontend application for Cosmic Horizons, built with React, TypeScript, and Vite.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- Responsive design
- Dark mode support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory with:
```
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/        # Page components
│   ├── assets/       # Static assets
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── hooks/        # Custom React hooks
├── public/           # Public assets
└── package.json      # Dependencies and scripts
``` 