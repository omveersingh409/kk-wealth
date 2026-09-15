import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import Subscription from '../models/Subscription.js';
import CourseEnrollment from '../models/CourseEnrollment.js';
import { protect } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Active product not found' });
    }

    // Amount should be strictly calculated in backend
    const amountInPaise = product.sellingPrice * 100;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${req.user._id}_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ success: false, message: 'Error creating Razorpay order' });
    }

    res.json({
      success: true,
      data: {
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
        product: {
          id: product._id,
          name: product.name,
          type: product.productType
        }
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Check if Payment already exists (prevent duplicate processing)
    const existingPayment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, status: 'paid' });
    if (existingPayment) {
      return res.json({ success: true, message: 'Payment already processed' });
    }

    // 1. Create/Update Order
    const dbOrder = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        user: req.user._id,
        product: product._id,
        productType: product.productType,
        amount: product.sellingPrice,
        currency: 'INR',
        razorpayOrderId: razorpay_order_id,
        status: 'paid',
      },
      { upsert: true, new: true }
    );

    // 2. Create Payment Record
    const dbPayment = await Payment.create({
      user: req.user._id,
      order: dbOrder._id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      product: product._id,
      productType: product.productType,
      amount: product.sellingPrice,
      currency: 'INR',
      status: 'paid',
    });

    dbOrder.payment = dbPayment._id;
    await dbOrder.save();

    // 3. Activate Subscription or Course access
    if (product.productType === 'Advisory') {
      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + product.durationDays);

      await Subscription.create({
        user: req.user._id,
        product: product._id,
        payment: dbPayment._id,
        startDate,
        expiryDate,
        status: 'active'
      });
    } else if (product.productType === 'Course') {
      await CourseEnrollment.create({
        user: req.user._id,
        course: product._id,
        payment: dbPayment._id,
        status: 'active'
      });
    }

    res.json({ success: true, message: 'Payment verified and access activated' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});


// @desc    Get user's payments
// @route   GET /api/payments/my-payments
// @access  Private
router.get('/my-payments', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate('product', 'name');
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});


// @desc    Razorpay Webhook listener
// @route   POST /api/payments/webhook
// @access  Public
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    // Note: server.js must use express.raw for this route to keep req.body as buffer
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    // In express, raw body comes as Buffer if configured properly (see server.js)
    const bodyStr = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);

    const expectedSignature = crypto.createHmac('sha256', secret).update(bodyStr).digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const payload = JSON.parse(bodyStr);
    const event = payload.event;
    // process events securely
    // we only acknowledge it for now; verification endpoint does primary job. Webhook is fallback/async tracker
    
    // In a full prod app, we'd find the associated order by razorpay_order_id inside payload
    // and activate subscription securely here if it wasn't already.

    res.status(200).send('Webhook handled securely');
  } catch (error) {
    console.error(error);
    res.status(500).send('Webhook error');
  }
});

export default router;
