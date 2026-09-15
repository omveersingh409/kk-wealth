import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    productType: {
      type: String,
      enum: ['Advisory', 'Course'],
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    durationDays: {
      type: Number, // Applicable for Advisory
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
