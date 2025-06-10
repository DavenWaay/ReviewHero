const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const FlashcardSet = require('../models/FlashcardSet');
const User = require('../models/User');

// Create a new flashcard set
router.post('/create', verifyToken, async (req, res) => {
  try {
    console.log('=== CREATE FLASHCARD SET REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('User from token:', JSON.stringify(req.user, null, 2));
    
    const { title, description, cards } = req.body;
    const firebaseUid = req.user.uid;

    console.log('Looking for user with Firebase UID:', firebaseUid);

    // Find MongoDB User by Firebase UID
    let user = await User.findOne({ uid: firebaseUid });
    console.log('Found user:', user ? user.uid : 'NOT FOUND');
    
    if (!user) {
      console.log('Creating new user...');
      // Create user if not exists (backup in case auth route didn't create it)
      user = new User({
        uid: firebaseUid,
        email: req.user.email || 'unknown@example.com',
        name: req.user.name || req.user.email?.split('@')[0] || 'User',
        quizzesCreated: [],
        quizzesTaken: []
      });
      await user.save();
      console.log('Created new user in flashcard route:', user.uid);
    }

    console.log('Creating flashcard set with data:', { title, description, cards: cards?.length });

    const flashcardSet = new FlashcardSet({
      userId: user._id,
      title,
      description,
      cards
    });

    console.log('Saving flashcard set...');
    const savedSet = await flashcardSet.save();
    console.log('Flashcard set saved with ID:', savedSet._id);
    
    // Update user's quizzesCreated array
    console.log('Updating user quizzesCreated array...');
    await User.findByIdAndUpdate(user._id, {
      $push: { quizzesCreated: savedSet._id }
    });

    console.log('=== CREATE FLASHCARD SET SUCCESS ===');
    res.status(201).json(savedSet);
  } catch (error) {
    console.error('=== CREATE FLASHCARD SET ERROR ===');
    console.error('Error creating flashcard set:', error.stack || error);
    res.status(500).json({ error: 'Error creating flashcard set', details: error.message });
  }
});

// Get all flashcard sets for a user
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const firebaseUid = req.params.userId;
    
    // First find the user by Firebase UID
    const user = await User.findOne({ uid: firebaseUid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Then find flashcard sets using the user's MongoDB _id
    const flashcardSets = await FlashcardSet.find({ userId: user._id });
    res.json(flashcardSets);

  } catch (error) {
    console.error('Error fetching flashcard sets:', error);
    res.status(500).json({ error: 'Error fetching flashcard sets' });
  }
});

// Get a specific flashcard set by ID
router.get('/:setId', verifyToken, async (req, res) => {
  try {
    const flashcardSet = await FlashcardSet.findById(req.params.setId);
    if (!flashcardSet) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }
    res.json(flashcardSet);
  } catch (error) {
    console.error('Error fetching flashcard set:', error);
    res.status(500).json({ error: 'Error fetching flashcard set' });
  }
});

// Update a flashcard set
router.put('/:setId', verifyToken, async (req, res) => {
  try {
    const { title, description, cards } = req.body;
    const updatedSet = await FlashcardSet.findByIdAndUpdate(
      req.params.setId,
      { title, description, cards },
      { new: true }
    );
    if (!updatedSet) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }
    res.json(updatedSet);
  } catch (error) {
    console.error('Error updating flashcard set:', error);
    res.status(500).json({ error: 'Error updating flashcard set' });
  }
});

// Delete a flashcard set
router.delete('/:setId', verifyToken, async (req, res) => {
  try {
    const deletedSet = await FlashcardSet.findByIdAndDelete(req.params.setId);
    if (!deletedSet) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }
    
    // Remove reference from user's quizzesCreated array
    await User.findByIdAndUpdate(deletedSet.userId, {
      $pull: { quizzesCreated: deletedSet._id }
    });

    res.json({ message: 'Flashcard set deleted successfully' });
  } catch (error) {
    console.error('Error deleting flashcard set:', error);
    res.status(500).json({ error: 'Error deleting flashcard set' });
  }
});

// Create sample data (for testing purposes)
router.post('/create-sample', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const sampleSets = [
      {
        userId,
        title: 'Statistics Formulas',
        description: 'Key formulas for statistics and Probability',
        cards: [
          { term: 'Mean', definition: 'The average of a set of numbers' },
          { term: 'Median', definition: 'The middle value in a sorted list of numbers' },
          { term: 'Mode', definition: 'The most frequently occurring value in a dataset' },
          { term: 'Standard Deviation', definition: 'A measure of the amount of variation in a dataset' }
        ]
      },
      {
        userId,
        title: 'JavaScript Fundamentals',
        description: 'Basic concepts and syntax in JavaScript programming',
        cards: [
          { term: 'Variable', definition: 'A container for storing data values' },
          { term: 'Function', definition: 'A block of code designed to perform a particular task' },
          { term: 'Array', definition: 'A data structure that holds multiple values' },
          { term: 'Object', definition: 'A collection of key-value pairs' }
        ]
      },
      {
        userId,
        title: 'Biology Terms',
        description: 'Essential biology vocabulary and definitions',
        cards: [
          { term: 'Cell', definition: 'The basic unit of life' },
          { term: 'DNA', definition: 'Deoxyribonucleic acid, carries genetic information' },
          { term: 'Photosynthesis', definition: 'Process by which plants make food using sunlight' },
          { term: 'Mitosis', definition: 'Process of cell division' }
        ]
      }
    ];

    const savedSets = await FlashcardSet.insertMany(sampleSets);
    res.status(201).json({ message: 'Sample data created', sets: savedSets });
  } catch (error) {
    console.error('Error creating sample data:', error);
    res.status(500).json({ error: 'Error creating sample data' });
  }
});

module.exports = router;
