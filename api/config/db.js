const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Changed process.env.MONGODB_URI to process.env.MONGO_URI to match your .env file
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://trizenmart:mlTsdKJ1DMqTsFo5@trizenmart.uihfkzd.mongodb.net/trizenmart?retryWrites=true&w=majority");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;