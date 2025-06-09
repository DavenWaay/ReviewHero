# Deploy ReviewHero to Render - Complete Guide

## Why Render is Better Than GitHub Pages

✅ **Full-Stack Support**: Hosts both React frontend AND Node.js backend
✅ **No Routing Issues**: Properly handles React Router without SPA problems
✅ **Environment Variables**: Built-in support for MongoDB URI, Firebase config
✅ **Database Integration**: Easy MongoDB Atlas connection
✅ **Auto Deployments**: Connects to GitHub and deploys on push
✅ **Free Tier**: Perfect for student projects
✅ **Single URL**: Classmates just visit one URL - no local setup needed

## Step-by-Step Deployment

### 1. Setup MongoDB Atlas (Database)
1. Go to https://www.mongodb.com/atlas
2. Create free account and cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/reviewhero`
4. Whitelist all IPs (0.0.0.0/0) for Render access

### 2. Deploy Backend to Render
1. Go to https://render.com and create account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `reviewhero-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reviewhero
   PORT=10000
   NODE_ENV=production
   ```

6. Upload `firebase-service-account.json` content as environment variable:
   - Variable name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Copy entire JSON content

7. Update `backend/index.js` to handle Firebase config from env var:
   ```javascript
   // Replace this line:
   const serviceAccount = require('./firebase-service-account.json');
   
   // With this:
   const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
     ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
     : require('./firebase-service-account.json');
   ```

### 3. Deploy Frontend to Render
1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `reviewhero-frontend`
   - **Root Directory**: `/` (root)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://reviewhero-backend.onrender.com/api
   ```
   (Replace with your actual backend URL from step 2)

### 4. Update Frontend API Configuration
Update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://reviewhero-backend.onrender.com/api';
```

### 5. Update CORS in Backend
Update `backend/index.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://reviewhero-frontend.onrender.com',
    'https://your-custom-domain.com' // if you have one
  ],
  credentials: true
}));
```

## Final URLs
- **Backend**: `https://reviewhero-backend.onrender.com`
- **Frontend**: `https://reviewhero-frontend.onrender.com`
- **Share this frontend URL with classmates!**

## Benefits for Classmates
- ✅ No local installation needed
- ✅ No MongoDB setup required
- ✅ No environment variables to configure
- ✅ Works on any device with internet
- ✅ Real database with persistent data
- ✅ Professional deployment

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure Firebase service account is properly set

### Frontend Issues
- Verify API URL points to backend
- Check CORS configuration
- Test API endpoints directly

### Database Issues
- Whitelist all IPs in MongoDB Atlas
- Test connection string locally first
- Check MongoDB Atlas cluster status

## Auto-Deployment
Once set up, any push to your GitHub main branch will automatically:
1. Rebuild and redeploy backend
2. Rebuild and redeploy frontend
3. Update live site for classmates

## Cost
- **Free Tier Limits**:
  - 750 hours/month (enough for student projects)
  - Sleeps after 15 minutes of inactivity
  - Wakes up automatically when accessed

## Next Steps
1. Deploy backend first
2. Test backend endpoints
3. Deploy frontend with correct API URL
4. Test full application
5. Share frontend URL with classmates
