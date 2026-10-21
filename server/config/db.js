import mongoose from "mongoose";
import { seedDefaultAdmin } from "../utils/seedAdmin.js";

const connectDB = async () => {

  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed default admin accounts
    await seedDefaultAdmin();

  } catch (error) {

    console.error(`Error: ${error.message}`);
    process.exit(1);

  }

};

export default connectDB;