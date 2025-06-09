# Quick Deployment Steps for ReviewHero

Follow these steps to deploy ReviewHero so it works for everyone through GitHub Pages:

## 1. Deploy Backend to Render (Free Tier)

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect to your GitHub repository
4. Configure the service:
   - Name: `reviewhero-backend`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Environment Variables:
     ```
     MONGODB_URI=your_mongodb_atlas_uri
     PORT=10000
     ```
   - Add your `firebase-service-account.json` content as an environment variable:
     - Name: `FIREBASE_SERVICE_ACCOUNT`
     - Value: Copy entire content of firebase-service-account.json

5. Deploy the service
6. Note down your service URL (e.g., https://reviewhero-backend.onrender.com)

## 2. Update Frontend Configuration

1. Update `.env` file:
   ```
   REACT_APP_API_URL=https://reviewhero-backend.onrender.com/api
   ```

2. Update backend CORS in `backend/index.js`:
   ```javascript
   app.use(cors({
     origin: [
       'https://davenwaay.github.io',
       'http://localhost:3000'
     ],
     credentials: true
   }));
   ```

## 3. Deploy Frontend to GitHub Pages

1. Make sure `package.json` has:
   ```json
   {
     "homepage": "https://davenwaay.github.io/ReviewHero",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

## 4. Share with Classmates

Your classmates can now access the fully working app at:
https://davenwaay.github.io/ReviewHero

They don't need to:
- Set up MongoDB
- Configure Firebase
- Run anything locally
- Install any dependencies

Everything will just work when they visit the GitHub Pages URL!

## Troubleshooting

If something's not working:

1. Check the browser console (F12) for errors
2. Verify Render service is running
3. Check MongoDB Atlas connection
4. Ensure Firebase configuration is correct

Need help? Contact the team lead!
