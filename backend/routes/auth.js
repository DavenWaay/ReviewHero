const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');

// Register route (optional, since Firebase handles registration)
// Here we just verify token and return user info
router.post('/login', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Check if user exists in MongoDB, if not create one
    let user = await User.findOne({ uid: decodedToken.uid });
    if (!user) {
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
    
    return res.json({ 
      uid: decodedToken.uid, 
      email: decodedToken.email,
      mongoId: user._id 
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid ID token' });
  }
});

module.exports = router;
