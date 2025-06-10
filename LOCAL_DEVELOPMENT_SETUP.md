# Local Development Setup for ReviewHero

Just a short "how-to" guide on how to set it up.
This will let you run the app locally using MongoDB and Firebase while keeping our Render deployment intact.

## What You'll Need

- Node.js (version 14 or higher)
- MongoDB (either local install or Atlas account)
- Git
- The Firebase config I'll share with you

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/DavenWaay/ReviewHero.git
cd ReviewHero
```

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 2. Environment Setup

You'll need to create two `.env` files:

#### Backend Environment (backend/.env)
```env
MONGODB_URI=mongodb://localhost:27017/reviewhero
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

If you're using MongoDB Atlas instead of local MongoDB:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reviewhero
```

#### Frontend Environment (.env in root folder)
I'll share the Firebase config values with you separately. Create a `.env` file in the root with:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000
```

### 3. Database Setup

#### Option 1: Local MongoDB
1. Download and install MongoDB Community Edition
2. Start the MongoDB service on your machine
3. It should automatically create the database when you first run the app

#### Option 2: MongoDB Atlas (Recommended)
1. Create a free MongoDB Atlas account
2. Set up a new cluster
3. Get your connection string and update the MONGODB_URI
4. Make sure to add your IP to the whitelist

### 4. Running the App

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm start
```

The app should open at `http://localhost:3000` and the backend runs on `http://localhost:5000`.

## Important Notes

- **Don't commit .env files** - they contain sensitive info
- Each of you can use your own local database for testing
- The Render deployment stays completely separate from this local setup
- Ask me for the Firebase configuration values

## Troubleshooting

**MongoDB connection issues:** Make sure MongoDB is running and check your connection string

**Firebase auth errors:** Double-check the Firebase config values

**Port conflicts:** If port 5000 is taken, change it in the backend .env and update the frontend API URL

**CORS errors:** Make sure the FRONTEND_URL in backend .env matches your frontend URL

## Project Structure
```
ReviewHero/
├── src/                    # React frontend
├── backend/               # Express backend
├── public/               # Static files
├── .env                  # Frontend config
└── backend/.env          # Backend config
```

Thank you!