import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    const products = [
      {
        name: 'Equity Advisory Monthly',
        description: 'Monthly stock market advisory.',
        productType: 'Advisory',
        sellingPrice: 1999,
        durationDays: 30,
      },
      {
        name: 'Equity Advisory Quarterly',
        description: 'Quarterly stock market advisory.',
        productType: 'Advisory',
        sellingPrice: 4499,
        durationDays: 90,
      },
      {
        name: 'Equity Advisory Yearly',
        description: 'Yearly stock market advisory.',
        productType: 'Advisory',
        sellingPrice: 12499,
        durationDays: 365,
      },
      {
        name: 'Stock Market Online Class',
        description: 'Comprehensive stock market training.',
        productType: 'Course',
        sellingPrice: 4999,
        originalPrice: 9999,
      },
    ];

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
