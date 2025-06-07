# SS Backend - Express.js API

A well-structured Express.js backend application with Firebase Admin integration.

## Project Structure

```
ss-backend/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase Admin configuration
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middlewares/
│   │   └── errorHandler.js      # Global error handling
│   ├── models/
│   │   └── User.js              # User model with Firebase methods
│   ├── routes/
│   │   └── authRoutes.js        # Authentication routes
│   └── app.js                   # Main app configuration
├── server.js                    # Entry point
├── firebase.json                # Firebase service account key
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The server will run on `http://localhost:3000`

## Available Endpoints

### Health Check
- **GET** `/health` - Check server status

### Authentication
- **POST** `/auth/signup` - Create a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Features

- ✅ Modular folder structure
- ✅ Firebase Admin integration
- ✅ Error handling middleware
- ✅ User model with Firebase methods
- ✅ Clean separation of concerns
- ✅ Express 4.x (stable version)

## Development

The project uses nodemon for development, so any changes will automatically restart the server.

To add new features:
1. Create controllers in `src/controllers/`
2. Define routes in `src/routes/`
3. Add models in `src/models/`
4. Register routes in `src/app.js`
