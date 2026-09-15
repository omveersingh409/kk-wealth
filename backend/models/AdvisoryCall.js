import mongoose from 'mongoose';

const advisoryCallSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    stopLoss: {
      type: Number,
      required: true,
    },
    callDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'hit_target', 'hit_stoploss', 'closed'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdvisoryCall = mongoose.model('AdvisoryCall', advisoryCallSchema);
export default AdvisoryCall;
