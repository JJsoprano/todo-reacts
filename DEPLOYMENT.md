# Deployment Guide

## Backend Deployment Options

### Option 1: Render (Recommended - Free tier available)

1. **Go to [Render.com](https://render.com)**
2. **Connect your GitHub account**
3. **Create a new Web Service**
4. **Select your repository**: `todo-reacts`
5. **Configure settings**:
   - **Name**: `todo-backend` (or any name you prefer)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. **Add Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://joshuajohnston22_db_user:rut7xJfaF3vhwOk3@todo.hl4i933.mongodb.net/todoapp?retryWrites=true&w=majority&appName=ToDo
   PORT=10000
   NODE_ENV=production
   ```

7. **Deploy**: Click "Create Web Service"

### Option 2: Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Connect GitHub account**
3. **Deploy from GitHub repo**
4. **Add same environment variables**

### Option 3: Heroku (Paid plans only now)

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Go to [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: Leave empty (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Option 2: Netlify

1. **Go to [Netlify.com](https://netlify.com)**
2. **New site from Git**
3. **Select your repository**
4. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Option 3: GitHub Pages (Already configured)

Your `package.json` already has the deploy script configured for GitHub Pages.

## Quick Start Deployment Steps

1. **Deploy Backend first** (use Render)
2. **Get your backend URL** (e.g., `https://your-app.onrender.com`)
3. **Update frontend API URL**
4. **Deploy frontend** (use Vercel)
5. **Test the live application**

## Environment Variables Needed

**Backend (.env)**:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=10000
NODE_ENV=production
```

**Frontend (will be updated in code)**:
```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com';
```