import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const initialProducts = [
  {
    name: "Stock Market Online Class",
    description: "Learn Technical Analysis from Basic to Advanced level with a practical and structured approach.",
    productType: "Course",
    originalPrice: 9999,
    sellingPrice: 4999,
    durationDays: 365,
    features: ["Technical Analysis Only", "Basic to Advanced", "Chart Patterns", "Risk Management"]
  },
  {
    name: "Monthly Advisory",
    description: "30 Days of Equity Advisory and Stock Insights",
    productType: "Advisory",
    originalPrice: 2999,
    sellingPrice: 1999,
    durationDays: 30,
    features: ["Daily Calls", "Swing Trading", "Risk Checks"]
  },
  {
    name: "Quarterly Advisory",
    description: "90 Days of Structured Equity Advisory",
    productType: "Advisory",
    originalPrice: 5999,
    sellingPrice: 4499,
    durationDays: 90,
    features: ["Premium Insights", "Portfolio Analysis", "Priority Support"]
  },
  {
    name: "Yearly Advisory",
    description: "365 Days of Complete Wealth Management Ideas",
    productType: "Advisory",
    originalPrice: 15999,
    sellingPrice: 12499,
    durationDays: 365,
    features: ["Dedicated Support", "Long-term Picks", "Weekly Webinars"]
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(initialProducts);
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
