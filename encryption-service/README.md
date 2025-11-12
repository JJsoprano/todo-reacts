# 🔐 Todo Encryption Service

A Node.js microservice that provides AES-256-CBC encryption for todo data.

## � Quick Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## �️ Manual Deployment

### 1. Environment Variables
Set these in your Render dashboard:
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### 2. Build Settings
- **Build Command**: (leave empty)
- **Start Command**: `node server.js`
- **Node Version**: 18.x

## � API Endpoints

- `GET /` - Health check
- `GET /todos` - Get all todos (auto-decrypted)
- `POST /todos` - Create todo (auto-encrypted)
- `PATCH /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
- `GET /encryption/status` - Encryption status
- `POST /encryption/test` - Test encryption

## �️ Architecture

```
React Frontend → Encryption Service → MongoDB Atlas
```

## 🛡️ Security Features

- **AES-256-CBC encryption** for todo text
- **Auto-generated encryption keys**
- **CORS enabled** for frontend
- **Helmet.js** security headers
- **Input validation** and error handling

## 📦 Dependencies

- Express.js for HTTP server
- Mongoose for MongoDB connection
- Crypto for encryption
- Helmet.js for security
- CORS for cross-origin requests

---

**Note**: This service is designed to work with the [Todo React App](https://github.com/JJsoprano/todo-reacts)