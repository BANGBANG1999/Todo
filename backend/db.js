const mongoose = require('mongoose');

// const mongoURI = 'mongodb://127.0.0.1:27017/kanbanBoard';

const mongoURI = "mongodb+srv://bangbang:udayasish@projecttaskmanager.5cgfhsl.mongodb.net/kanbanBoard"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToMongo;
