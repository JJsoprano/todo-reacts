# Full-Stack Todo App

A modern Todo application with React frontend and Node.js/Express backend, connected to MongoDB.

## Features

- ✅ Create, read, update, and delete todos
- 🔥 Priority levels (High, Medium, Low)
- 🎯 Filter by status (All, Active, Completed)
- ✏️ Edit todos inline
- 💾 Persistent storage with MongoDB
- 🎨 Modern UI with custom CSS

## Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or start MongoDB service (Windows)
net start MongoDB

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### 4. Run the Application

**Option 1: Run both servers separately**

```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend development server
npm run dev
```

**Option 2: Run backend separately**

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
npm run dev
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/health` - Health check

## Development

- Frontend runs on: `http://localhost:5173` (or `5174` if 5173 is in use)
- Backend runs on: `http://localhost:5000`
- API base URL: `http://localhost:5000/api`

## Build for Production

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

## Project Structure

```
mytodo/
├── src/                 # Frontend React app
│   ├── api/            # API service layer
│   ├── App.jsx         # Main component
│   ├── App.css         # Styles
│   └── main.jsx        # Entry point
├── backend/            # Backend Express app
│   ├── server.js       # Main server file
│   ├── .env           # Environment variables
│   └── package.json   # Backend dependencies
├── public/            # Static assets
└── package.json       # Frontend dependencies
```

## Troubleshooting

1. **Frontend shows "Failed to load todos"**
   - Make sure the backend server is running on port 5000
   - Check MongoDB connection

2. **CORS errors**
   - Backend has CORS enabled for all origins in development

3. **MongoDB connection errors**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in backend/.env

4. **Port conflicts**
   - Backend uses port 5000, frontend uses 5173/5174
   - Change ports in .env (backend) or vite will auto-increment