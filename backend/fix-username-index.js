const mongoose = require('mongoose');
require('dotenv').config();

async function fixUsernameIndex() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to MongoDB');
    
    // Get the users collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Drop the existing username index
    try {
      await usersCollection.dropIndex('username_1');
      console.log('Dropped existing username index');
    } catch (error) {
      console.log('Username index may not exist:', error.message);
    }
    
    // Create a new sparse unique index for username
    await usersCollection.createIndex(
      { username: 1 }, 
      { unique: true, sparse: true }
    );
    console.log('Created new sparse unique index for username');
    
    // List all indexes to verify
    const indexes = await usersCollection.indexes();
    console.log('Current indexes:', indexes);
    
    console.log('Username index fix completed successfully');
    
  } catch (error) {
    console.error('Error fixing username index:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

fixUsernameIndex();
