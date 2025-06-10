# ReviewHero Setup Guide for Team Members

## The Problem
Classmates are experiencing issues because the application requires several configuration files that weren't included in the repository (for security reasons). These files contain sensitive information like database credentials and API keys.

## What's Missing
1. **MongoDB Database Connection** - The app needs a database to store flashcards and user data
2. **Firebase Authentication Setup** - Required for user login/signup
3. **Environment Configuration Files** - Contains API URLs and database connections

## Quick Setup Instructions

### Step 1: Frontend Setup
```bash
# In the root directory (ReviewHero/)
npm install

# Copy the environment template
copy .env.example .env

# The .env file should contain:
REACT_APP_API_URL=http://localhost:5001/api
```

### Step 2: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install backend dependencies
npm install

# Copy the environment template
copy .env.example .env
```

### Step 3: Database Setup (MongoDB)
Each team member needs their own MongoDB database:

1. **Create a free MongoDB Atlas account**: https://www.mongodb.com/atlas
2. **Create a new cluster** (choose the free tier)
3. **Create a database user**:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Remember the username and password
4. **Get your connection string**:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/reviewhero?retryWrites=true&w=majority`
5. **Update backend/.env**:
   ```
   MONGODB_URI=your_connection_string_here
   PORT=5001
   ```

### Step 4: Firebase Setup
**Option A: Get from Team Lead**
- Ask the team lead for the `firebase-service-account.json` file
- Place it in the `backend/` folder

**Option B: Create Your Own (if team lead unavailable)**
1. Go to Firebase Console: https://console.firebase.google.com/
2. Create a new project or use existing ReviewHero project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Save the file as `firebase-service-account.json` in the `backend/` folder

### Step 5: Running the Application
```bash
# Terminal 1: Start the backend
cd backend
npm run dev

# Terminal 2: Start the frontend (in a new terminal)
cd ..
npm start
```

The app should now work at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## Common Issues & Solutions

### "MongoDB connection error"
- Check your MongoDB connection string in `backend/.env`
- Make sure your IP address is whitelisted in MongoDB Atlas (Network Access)
- Verify username/password are correct

### "Firebase service account error"
- Make sure `firebase-service-account.json` exists in the `backend/` folder
- Check that the file is valid JSON

### "Network error" or API calls failing
- Make sure both frontend and backend servers are running
- Check that `REACT_APP_API_URL` in `.env` matches your backend URL
- Verify backend is accessible at http://localhost:5001

### "Module not found" errors
- Run `npm install` in both root directory and backend directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## For Team Lead
To help your teammates, you can:
1. Share your `firebase-service-account.json` file securely
2. Create a shared MongoDB cluster and share the connection string
3. Or guide them through creating their own MongoDB Atlas accounts

## Security Note
Never commit these files to Git:
- `.env` files
- `firebase-service-account.json`
- Any files containing passwords or API keys

These are already in `.gitignore` to prevent accidental commits.
