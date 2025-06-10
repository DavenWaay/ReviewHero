# Frontend Deployment Guide for ReviewHero on Render

This guide will help you deploy the React frontend of ReviewHero on Render as a separate web service.

## Prerequisites

- You have a Render account and are logged in.
- Your frontend code is in the current repository.
- The backend is already deployed and live (e.g., https://reviewhero-backend.onrender.com).
- The frontend is configured to use the backend API via the `.env` file (`REACT_APP_API_URL`).

## Steps to Deploy Frontend on Render

1. **Create a New Web Service**

   - Go to your Render dashboard.
   - Click the **New** button and select **Web Service**.

2. **Connect Your Repository**

   - Choose **GitHub** as the Git provider.
   - Select the `DavenWaay/ReviewHero` repository.
   - Choose the `main` branch.

3. **Configure the Service**

   - **Name:** `reviewhero-frontend`
   - **Root Directory:** Leave empty (or set to `/` if required).
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `serve -s build`
     - Note: You need to add `serve` as a dependency or use an alternative static server.
   - **Environment Variables:** None needed for frontend.

4. **Add `serve` Dependency**

   - Add `serve` to your `package.json` dependencies or devDependencies:
     ```json
     "serve": "^14.2.0"
     ```
   - Commit and push this change before deploying.

5. **Deploy**

   - Click **Create Web Service**.
   - Wait for the build and deployment to complete.
   - Your frontend will be live at the URL provided by Render (e.g., https://reviewhero-frontend.onrender.com).

## Notes

- Ensure your backend URL in `.env` is correct and accessible.
- You can test the frontend locally by running:
  ```
  npm install
  npm run build
  npx serve -s build
  ```
- If you prefer, you can deploy the frontend on other platforms like Netlify or Vercel.

---

If you want, I can help you create the `package.json` update and guide you through the deployment steps interactively.
