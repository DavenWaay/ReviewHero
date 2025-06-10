const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');

// Register route (optional, since Firebase handles registration)
// Here we just verify token and return user info
router.post('/login', async (req, res) => {
  console.log('=== AUTH LOGIN REQUEST ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  const { idToken } = req.body;
  if (!idToken) {
    console.log('No ID token provided');
    return res.status(400).json({ error: 'ID token is required' });
  }
  
  try {
    console.log('Verifying Firebase ID token...');
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded token:', JSON.stringify(decodedToken, null, 2));
    
    // Check if user exists in MongoDB, if not create one
    console.log('Looking for user with Firebase UID:', decodedToken.uid);
    let user = await User.findOne({ uid: decodedToken.uid });
    console.log('Found user:', user ? user.uid : 'NOT FOUND');
    
    if (!user) {
      console.log('Creating new user in MongoDB...');
      user = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
        quizzesCreated: [],
        quizzesTaken: []
      });
      await user.save();
      console.log('Created new user in MongoDB:', user.uid);
    }
    
    console.log('=== AUTH LOGIN SUCCESS ===');
    return res.json({ 
      uid: decodedToken.uid, 
      email: decodedToken.email,
      mongoId: user._id 
    });
  } catch (error) {
    console.error('=== AUTH LOGIN ERROR ===');
    console.error('Auth error:', error.stack || error);
    return res.status(401).json({ error: 'Invalid ID token' });
  }
});

module.exports = router;
