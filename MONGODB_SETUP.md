# Setup Instructions for MongoDB

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Visit**: https://cloud.mongodb.com/
2. **Sign up** for a free account
3. **Create a new project**
4. **Build a Database** (choose M0 Free tier)
5. **Create Database User**:
   - Username: `todouser`
   - Password: `yourpassword123` (choose your own)
6. **Add IP Address**: Add `0.0.0.0/0` for development (allows all IPs)
7. **Connect** → **Connect your application**
8. **Copy the connection string**

Example connection string:
```
mongodb+srv://todouser:yourpassword123@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

9. **Update your backend/.env file**:
```env
MONGO_URI=mongodb+srv://todouser:yourpassword123@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

## Option 2: Local MongoDB Installation

If you prefer local installation:

1. **Download MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. **Install** following the installation wizard
3. **Start MongoDB service** (or run as admin):
   ```cmd
   net start MongoDB
   ```
4. **Keep the default connection string** in backend/.env:
   ```env
   MONGO_URI=mongodb://localhost:27017/todoapp
   ```

## Testing the Connection

Once MongoDB is set up:

1. **Restart the backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Look for this message**:
   ```
   ✅ Connected to MongoDB
   🚀 Server running on port 5000
   ```

3. **Test your todo app** at http://localhost:5173

## Troubleshooting

- If you see timeout errors, MongoDB isn't running or the connection string is wrong
- For Atlas, make sure your IP is whitelisted
- For local MongoDB, ensure the service is started