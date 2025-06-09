# ReviewHero Deployment Guide

## GitHub Pages (Frontend)

### Option 1: Static Version (Without Backend Features)
If you want to deploy just the frontend static features to GitHub Pages:

1. Remove or disable backend-dependent features temporarily:
   - Comment out authentication requirements
   - Use static data instead of API calls
   - Disable features that require database

2. Deploy to GitHub Pages:
```bash
# Add homepage to package.json
"homepage": "https://[your-username].github.io/ReviewHero"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy scripts to package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

### Option 2: Full-Stack Deployment (Recommended)

For a complete working application with backend features:

1. **Deploy Backend First**
   - Deploy backend to a hosting service like:
     - [Render](https://render.com) (Free tier available)
     - [Heroku](https://heroku.com)
     - [DigitalOcean](https://digitalocean.com)
     - [Railway](https://railway.app)

2. **Configure MongoDB**
   - Keep using MongoDB Atlas (cloud database)
   - Update MONGODB_URI in backend environment variables

3. **Update Frontend Configuration**
   ```bash
   # Update .env for production
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy Frontend to GitHub Pages**
   ```bash
   # Update package.json
   {
     "homepage": "https://[your-username].github.io/ReviewHero",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }

   # Deploy
   npm run deploy
   ```

## Recommended Free Hosting Services for Backend

### Render (Recommended)
1. Sign up at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables:
   - MONGODB_URI
   - PORT
5. Deploy

### Railway
1. Sign up at https://railway.app
2. Create a new project
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

## Environment Setup for Production

### Backend (.env)
```
MONGODB_URI=your_mongodb_atlas_uri
PORT=5001
```

### Frontend (.env)
```
# For local development
REACT_APP_API_URL=http://localhost:5001/api

# For production (after backend deployment)
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Common Deployment Issues

### CORS Errors
If you get CORS errors after deployment:

1. Update backend CORS configuration in `backend/index.js`:
```javascript
app.use(cors({
  origin: [
    'https://[your-username].github.io',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### API Connection Issues
1. Make sure backend URL is correct in frontend .env
2. Verify backend is running and accessible
3. Check browser console for specific error messages

### Database Connection
1. Ensure MongoDB Atlas IP whitelist includes:
   - Your local development IP
   - Backend hosting service IPs (0.0.0.0/0 for all IPs)

### GitHub Pages 404 Errors
1. Make sure `homepage` in package.json matches your GitHub Pages URL
2. Add a `404.html` that redirects to `index.html`
3. Use HashRouter instead of BrowserRouter in React

## Deployment Checklist

### Backend
- [ ] Deploy backend to hosting service
- [ ] Set up environment variables
- [ ] Configure CORS for GitHub Pages domain
- [ ] Test API endpoints
- [ ] Ensure MongoDB connection works

### Frontend
- [ ] Update API URL to production backend
- [ ] Test build locally (`npm run build`)
- [ ] Deploy to GitHub Pages
- [ ] Test all features with production API
- [ ] Verify authentication works

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas and Firebase configurations are correct
4. Test API endpoints using tools like Postman
