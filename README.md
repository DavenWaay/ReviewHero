# ReviewHero

<!-- Added a trivial comment to trigger fresh build on Render -->
<!-- Redeploy triggered to clear build cache and fix deployment issues -->
A responsive and interactive **web-based application** designed to help users review and manage flashcards efficiently. Ideal for learners who prefer a clean, fast, and focused review experience.

---

## 🔗 Live Demo  
Check out the live version here:  
👉 https://reviewhero.onrender.com/

📐 Optimized for screens 1366×768 and above.

---

## 📌 Description  
Review Hero is a **flashcard-based website application** focused on reviewing term-definition pairs. Built using React, it supports dynamic and reusable components tailored for an efficient learning experience.

> 🚧 **Project Status:**  
> The project is **currently ongoing**. Both frontend and backend features are implemented, including user authentication, flashcard management, and study progress tracking.

---

## ✨ Features  
- Term-definition flashcard system with study progress tracking
- User authentication and personal study sets
- Interactive study modes: Flashcards, Learn, and Quiz
- Responsive layout with component-based design  
- Sidebar navigation with hover and active state styling  
- Smooth transitions using Framer Motion

---

## 🛠️ Built With  
- [React](https://reactjs.org/)  
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)  
- [Boxicons](https://boxicons.com/) – for UI icons  
- [Framer Motion](https://www.framer.com/motion/) – for animations  
- [Visual Studio Code](https://code.visualstudio.com/) – development environment  
- [MongoDB](https://www.mongodb.com/) - for database
- [Express](https://expressjs.com/) - for backend API
- [Firebase](https://firebase.google.com/) - for authentication
- [Render](https://render.com/) - for deployment and hosting

---

## 👥 Team Members  
- [@slricta](https://github.com/slricta) – Stephen Rodriguez  
- [@DavenWaay](https://github.com/davenwaay) – Daven Waay  
- [@docurev111](https://github.com/docurev111) – Gerwin Dean Alcober  
- [@mattquiling](https://github.com/mattquiling) – Matthew Meinrad Quiling  
- Rhodel Andaya  

---

## 📫 Contact Us  
- ic.stephen.rodriguez@cvsu.edu.ph  
- davenwaay18@gmail.com
- ic.gerwin.alcober@cvsu.edu.ph  
- ic.matthewmeinrad.quiling@cvsu.edu.ph  

---

## 🧪 Installation (For Local Development)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/DavenWaay/ReviewHero

# Navigate into the folder
cd ReviewHero

# Install the frontend dependencies
npm install

# Create a .env file in the root directory with:
REACT_APP_API_URL=http://localhost:5000

# Start the frontend development server
npm start
```

### Backend Setup
```bash
# Navigate to the backend folder
cd backend

# Install the backend dependencies
npm install

# Create a .env file in the backend directory with:
MONGODB_URI=your_mongodb_connection_string
PORT=5000

# Get your Firebase service account key:
# 1. Go to Firebase Console
# 2. Project Settings > Service Accounts
# 3. Generate New Private Key
# 4. Save as 'firebase-service-account.json' in the backend folder

# Start the backend development server
npm run dev
```

### Important Notes for Team Members
1. You need to set up your own MongoDB database:
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Replace 'your_mongodb_connection_string' in backend/.env

2. You need Firebase configuration:
   - Get the firebase-service-account.json from the team lead
   - Place it in the backend folder

3. Make sure both frontend and backend servers are running:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

4. Common Issues:
   - If MongoDB connection fails, check your connection string and network access in MongoDB Atlas
   - If Firebase auth fails, ensure firebase-service-account.json is properly placed
   - If API calls fail, check if both servers are running and REACT_APP_API_URL is set correctly
