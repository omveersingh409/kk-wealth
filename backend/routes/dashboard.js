import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import CourseEnrollment from '../models/CourseEnrollment.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import AdvisoryCall from '../models/AdvisoryCall.js';

const router = express.Router();

// @desc    Get User Dashboard Summary
// @route   GET /api/dashboard
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).select('-password');
    
    const activeSubscription = await Subscription.findOne({ user: userId, status: 'active', expiryDate: { $gt: new Date() } }).populate('product', 'name durationDays');
    
    const courseAccess = await CourseEnrollment.find({ user: userId, status: 'active' }).populate('course', 'name');
    
    const recentOrders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(5).populate('product', 'name');
    
    // Ensure accurate counting
    const advisoryCallCount = await AdvisoryCall.countDocuments({ status: { $in: ['active', 'hit_target'] } });
    
    // Format response
    const dashboardData = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      subscription: activeSubscription ? {
        active: true,
        plan: activeSubscription.product.name,
        expiresAt: activeSubscription.expiryDate,
      } : { active: false },
      courses: courseAccess.map(c => ({
        id: c.course._id,
        name: c.course.name,
        enrolledAt: c.enrolledAt
      })),
      recentOrders: recentOrders.map(o => ({
        id: o._id,
        productName: o.product.name,
        amount: o.amount,
        status: o.status,
        date: o.createdAt
      })),
      stats: {
        totalAdvisoryCallsAvailable: activeSubscription ? advisoryCallCount : 0
      }
    };
    
    res.json({ success: true, data: dashboardData });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Get user advisory calls (only if subscribed)
// @route   GET /api/dashboard/my-advisory
// @access  Private
router.get('/my-advisory', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Check active subscription
        const activeSubscription = await Subscription.findOne({ user: userId, status: 'active', expiryDate: { $gt: new Date() } });
        
        if (!activeSubscription) {
            return res.status(403).json({ success: false, message: 'Active Advisory Subscription required' });
        }
        
        const calls = await AdvisoryCall.find().sort({ createdAt: -1 });
        res.json({ success: true, data: calls });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', errors: error.message });
    }
});

export default router;
