const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin initialization
const serviceAccount = require('./firebase-service-account.json');

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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
