# Render Deployment Checklist

## Before You Start
- [x] MongoDB Atlas connection string ready
- [x] Firebase service account JSON file ready
- [x] GitHub repository updated and pushed
- [x] Backend configured for Render
- [x] Frontend configured for environment variables

## Backend Deployment Steps

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign up/Login with GitHub

2. **Create Backend Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository: `DavenWaay/ReviewHero`
   - Service name: `reviewhero-backend`
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `node backend/index.js`

3. **Set Environment Variables**
   ```
   MONGODB_URI = mongodb+srv://gerwinalcober:<YOUR_PASSWORD>@reviewhero.zqtdntx.mongodb.net/?retryWrites=true&w=majority&appName=reviewhero
   PORT = 5001
   FIREBASE_SERVICE_ACCOUNT = <paste entire firebase-service-account.json content>
   ```

4. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Test: Visit `https://reviewhero-backend.onrender.com`

## Frontend Deployment Steps

1. **Create Frontend Service**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Service name: `reviewhero-frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `build`

2. **Set Environment Variables**
   ```
   REACT_APP_API_URL = https://reviewhero-backend.onrender.com/api
   ```

3. **Deploy Frontend**
   - Click "Create Static Site"
   - Wait for deployment (5-10 minutes)
   - Test: Visit `https://reviewhero-frontend.onrender.com`

## Testing Checklist

- [ ] Backend responds at root URL
- [ ] Frontend loads without errors
- [ ] Login/Signup works
- [ ] Can create flashcard sets
- [ ] Data persists in MongoDB
- [ ] Navigation works properly

## Share with Classmates

Once deployed, share this URL:
```
https://reviewhero-frontend.onrender.com
```

## Need Help?

1. Check Render service logs for errors
2. Verify all environment variables are set
3. Test MongoDB connection in Atlas dashboard
4. Check Firebase console for authentication issues

Ready to deploy? Follow the steps above! 🚀
