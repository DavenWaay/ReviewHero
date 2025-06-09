const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: [
    'https://davenwaay.github.io',  // GitHub Pages domain
    'http://localhost:3000',         // Local development
    'https://davenwaay.github.io/ReviewHero', // GitHub Pages subpath
    'https://reviewhero-frontend.onrender.com', // Render frontend
    /\.onrender\.com$/ // Allow any Render subdomain
  ],
  credentials: true
}));
app.use(express.json());

// Firebase Admin initialization
let serviceAccount;
try {
  // Try to load from file (local development)
  serviceAccount = require('./firebase-service-account.json');
} catch (error) {
  // Use environment variable (production deployment)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    throw new Error('Firebase service account not found. Please provide firebase-service-account.json file or FIREBASE_SERVICE_ACCOUNT environment variable.');
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

console.log('Attempting to connect to MongoDB...');
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
  console.log('Registering routes...');
  
  // Import routes
  const authRoutes = require('./routes/auth');
  const flashcardRoutes = require('./routes/flashcards');

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/flashcards', flashcardRoutes);
  console.log('Routes registered successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Basic route
app.get('/', (req, res) => {
  res.send('ReviewHero Backend is running');
});

// Add a catch-all route to handle unknown paths and avoid 404 on root
app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
