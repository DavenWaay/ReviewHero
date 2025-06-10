# Render Deployment Guide for ReviewHero

## Prerequisites
- MongoDB Atlas connection string 
- Firebase service account JSON 
- GitHub repository (needs to be set-up already.)

## Step 1: Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `reviewhero-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/index.js`
   - **Branch**: main

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://gerwinalcober:<db_password>@reviewhero.zqtdntx.mongodb.net/?retryWrites=true&w=majority&appName=reviewhero
   PORT=5001
   ```

6. For Firebase service account:
   - Open your `firebase-service-account.json`
   - Copy all contents
   - Add as environment variable:
   ```
   FIREBASE_SERVICE_ACCOUNT=<paste the entire JSON content here>
   ```

## Step 2: Deploy Frontend Service

1. In Render Dashboard, click "New +" and select "Static Site"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `reviewhero-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://reviewhero-backend.onrender.com/api
   ```

## Step 3: Update Your Application

1. Backend is already configured for Render with:
   - CORS settings for Render domains
   - Environment variable support for Firebase and MongoDB
   - Error handling for configuration issues

2. Frontend is configured to:
   - Use environment variables for API URL
   - Handle authentication with Firebase
   - Manage API requests with proper error handling

## Step 4: Testing the Deployment

1. Wait for both services to deploy (this may take a few minutes)
2. Test the backend by visiting:
   ```
   https://reviewhero-backend.onrender.com
   ```
   You should see: "ReviewHero Backend is running"

3. Test the frontend by visiting:
   ```
   https://reviewhero-frontend.onrender.com
   ```

4. Test the complete flow:
   - Login with Firebase authentication
   - Create a new flashcard set
   - Verify data is saved to MongoDB

## Troubleshooting

1. If backend fails to start:
   - Check Render logs for errors
   - Verify environment variables are set correctly
   - Ensure MongoDB connection string is valid

2. If frontend can't connect to backend:
   - Verify REACT_APP_API_URL is set correctly
   - Check CORS settings in backend
   - Look for network errors in browser console

3. If authentication fails:
   - Verify Firebase service account JSON is properly formatted
   - Check Firebase configuration in frontend
   - Ensure backend can decode Firebase tokens

## Next Steps

1. Share the frontend URL with your classmates:
   ```
   https://reviewhero-frontend.onrender.com
   ```

2. Monitor the application:
   - Watch Render dashboard for any issues
   - Check MongoDB Atlas metrics
   - Monitor Firebase authentication logs

Need help? Check Render's documentation or reach out to their support team.
