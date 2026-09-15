import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Nodemailer Transporter Dummy/Config
const sendOtpEmail = async (email, otp) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn(`[OTP DEV MODE] Email config missing. OTP for ${email} is: ${otp}`);
    return true; // pretend it sent
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: '"KK Wealth" <noreply@kkwealth.com>',
      to: email,
      subject: "Verification OTP",
      text: `Your OTP for KK Wealth registration is: ${otp}. It will expire in 10 minutes.`,
    });
    return !!info.messageId;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

// @desc    Register a new user & Send OTP
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (userExists && !userExists.isVerified) {
      // update unverified user
      userExists.name = name;
      userExists.password = hashedPassword;
      userExists.otp = otp;
      userExists.otpExpiry = otpExpiry;
      await userExists.save();
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false
      });
    }

    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent && process.env.SMTP_USER) {
      return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }

    res.status(201).json({
      success: true,
      message: 'OTP sent to email. Please verify to continue.'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ success: false, message: 'Account already verified' });
    
    // Master bypass for automated testing (Only in dev)
    const isMasterBypass = otp === '000000' && process.env.NODE_ENV !== 'production';

    if (user.otp !== otp && !isMasterBypass) return res.status(400).json({ success: false, message: 'Invalid OTP' });
    if (user.otpExpiry < new Date() && !isMasterBypass) return res.status(400).json({ success: false, message: 'OTP expired' });

    // Mark verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ success: false, message: 'Account already verified' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ success: true, message: 'OTP resent to your email' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isVerified) {
        return res.status(403).json({ success: false, message: 'Account not verified. Please verify your email.' });
      }
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    // Note: Do not allow email change easily without re-verification in a real app, keeping simple here
    
    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
router.put('/password', protect, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ success: false, message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Admin Login
// @route   POST /api/auth/admin/login
// @access  Public
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Strict environment-bound credential check
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Provision or verify admin document dynamically bound to the env setup
    let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      adminUser = await User.create({
        name: 'Super Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
    }

    res.json({
      success: true,
      data: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        token: generateToken(adminUser._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: error.message });
  }
});

// @desc    Google OAuth Verify & Login
// @route   POST /api/auth/google
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;
    
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create verified user
      // Use Google 'sub' as a hashed password fallback since password is required
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(sub + process.env.JWT_SECRET, salt);
      
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        googleId: sub,
        profilePicture: picture,
        isVerified: true
      });
    } else {
      // Update existing user with Google details if missing
      user.isVerified = true;
      if (!user.googleId) user.googleId = sub;
      if (!user.profilePicture && picture) user.profilePicture = picture;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
    }
    
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ success: false, message: 'Google authentication failed', errors: error.message });
  }
});

export default router;
