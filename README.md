# Cosmic Horizons

A modern web application for space enthusiasts, featuring blog posts, news updates, and educational content about astronomy and space exploration.

## Features

- User authentication (Email, Google Sign-in)
- Blog system with rich text editor
- News updates and ISRO information
- Responsive design with modern UI
- Interactive night sky map
- Learning resources and guides

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- Tailwind CSS
- React Router
- React Quill
- React Toastify

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Google OAuth

## Project Structure

```
cosmic-horizons/
├── frontend/                 # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Static assets
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Backend Node.js application
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cosmic-horizons.git
cd cosmic-horizons
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create `.env` file in frontend directory
   - Create `.env` file in backend directory

5. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## Deployment

The application is configured for deployment on:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
