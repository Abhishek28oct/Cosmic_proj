# Cosmic Horizons Backend

This is the backend server for the Cosmic Horizons platform, a space exploration and education website.

## Features

- User authentication and authorization
- Article management
- ISRO updates and news
- User profiles and comments
- Admin dashboard

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cosmic_horizons
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- PUT `/api/users/change-password` - Change password
- GET `/api/users` - Get all users (admin only)
- PUT `/api/users/:userId/role` - Update user role (admin only)

### Articles
- GET `/api/articles` - Get all articles
- GET `/api/articles/:id` - Get single article
- POST `/api/articles` - Create article
- PUT `/api/articles/:id` - Update article
- DELETE `/api/articles/:id` - Delete article
- POST `/api/articles/:id/comments` - Add comment
- POST `/api/articles/:id/like` - Like article

### ISRO Updates
- GET `/api/isro` - Get all ISRO updates
- GET `/api/isro/:id` - Get single ISRO update
- POST `/api/isro` - Create ISRO update (admin only)
- PUT `/api/isro/:id` - Update ISRO update (admin only)
- DELETE `/api/isro/:id` - Delete ISRO update (admin only)

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security

- JWT authentication
- Password hashing with bcrypt
- CORS enabled
- Environment variables for sensitive data

## Development

To start the development server with hot reload:
```bash
npm run dev
```

## Production

To start the production server:
```bash
npm start
```

## License

ISC 