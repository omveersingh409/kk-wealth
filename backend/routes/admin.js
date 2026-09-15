import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import CourseEnrollment from '../models/CourseEnrollment.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import AdvisoryCall from '../models/AdvisoryCall.js';
import Product from '../models/Product.js';
import Setting from '../models/Setting.js';

const router = express.Router();

// ==================================================
// 1. DASHBOARD OVERVIEW
// ==================================================
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const successfulPayments = await Payment.countDocuments({ status: 'paid' });
    
    // Revenue from successful payments
    const revenueStats = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].totalRevenue : 0;
    
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active', expiryDate: { $gt: new Date() } });
    const totalCourseEnrollments = await CourseEnrollment.countDocuments({ status: 'active' });

    // Latest real transactions (Orders populated)
    const recentOrders = await Order.find({ status: 'paid' })
      .populate('user', 'name email')
      .populate('product', 'name productType')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalRevenue,
        activeSubscriptions,
        totalCourseEnrollments,
        successfulPayments,
        recentActivity: recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// ==================================================
// 2. USERS MANAGEMENT
// ==================================================
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
    // Technically we could aggregate totals per user, but doing basic list here for performance
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.get('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    const subscriptions = await Subscription.find({ user: user._id }).populate('product', 'name');
    const courses = await CourseEnrollment.find({ user: user._id }).populate('course', 'name');
    const payments = await Payment.find({ user: user._id }).populate('product', 'name');
    
    res.json({ success: true, data: { user, subscriptions, courses, payments } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.put('/users/:id', protect, admin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isActive = isActive !== undefined ? isActive : user.isActive;
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// ==================================================
// 3. ADVISORY CALLS MANAGEMENT
// ==================================================
router.get('/advisory', protect, admin, async (req, res) => {
  try {
    const calls = await AdvisoryCall.find().populate('createdBy', 'name').sort({ createdAt: -1 });
    res.json({ success: true, data: calls });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.post('/advisory', protect, admin, async (req, res) => {
  try {
    const { stockName, entryPrice, targetPrice, stopLoss } = req.body;
    const call = await AdvisoryCall.create({
      stockName,
      entryPrice,
      targetPrice,
      stopLoss,
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, data: call });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.put('/advisory/:id', protect, admin, async (req, res) => {
  try {
    const call = await AdvisoryCall.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!call) return res.status(404).json({ success: false, message: 'Call not found' });
    res.json({ success: true, data: call });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.delete('/advisory/:id', protect, admin, async (req, res) => {
  try {
    const call = await AdvisoryCall.findByIdAndDelete(req.params.id);
    if (!call) return res.status(404).json({ success: false, message: 'Call not found' });
    res.json({ success: true, message: 'Call deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// ==================================================
// 4. COURSES / PRODUCTS MANAGEMENT
// ==================================================
router.get('/courses', protect, admin, async (req, res) => {
  try {
    // Both Courses and Advisory plans represent platform products.
    const products = await Product.find().sort({ createdAt: -1 });
    // Also attach enrollment counts for Course products dynamically
    const data = await Promise.all(products.map(async (prod) => {
       const prodObj = prod.toObject();
       if (prod.productType === 'Course') {
          prodObj.enrollments = await CourseEnrollment.countDocuments({ course: prod._id, status: 'active' });
       }
       return prodObj;
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.post('/courses', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.put('/courses/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.delete('/courses/:id', protect, admin, async (req, res) => {
  try {
    // Soft Delete (Deactivate) to preserve historical payment records & access
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product, message: 'Product successfully deactivated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// ==================================================
// 5. PAYMENTS MANAGEMENT
// ==================================================
router.get('/payments', protect, admin, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('product', 'name productType sellingPrice')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// ==================================================
// 6. SETTINGS MANAGEMENT
// ==================================================
router.get('/settings', protect, admin, async (req, res) => {
  try {
    const settings = await Setting.find();
    // Convert to a neat key-value object map
    const formattedMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json({ success: true, data: formattedMap });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

router.post('/settings', protect, admin, async (req, res) => {
  try {
    const { key, value, description } = req.body;
    let setting = await Setting.findOne({ key });
    
    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value, description });
    }
    
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

export default router;
