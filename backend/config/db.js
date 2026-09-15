import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("CRITICAL MONGODB FAIL:", error);
    // Don't kill the server abruptly, let it throw the 500 downstream so frontend sees explicitly!
  }
};

export default connectDB;
