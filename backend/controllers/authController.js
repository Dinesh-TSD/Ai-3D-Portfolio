import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

const { sign, verify } = jwt;
// Generate JWT Token
const generateToken = (userId) => {
  return sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Register admin user (only if no admin exists)
export async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if admin user already exists
    const adminExists = await User.adminExists();
    if (adminExists) {
      return res.status(403).json({
        error: 'Admin user already exists. Only one admin account is allowed.'
      });
    }

    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or username already exists'
      });
    }

    // Create admin user (force role to admin)
    const user = new User({
      username,
      email,
      password,
      role: 'admin', // Force admin role
      profile: {
        firstName,
        lastName
      }
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Admin user registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

// Login admin user only
export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin login only.' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

// Get current user profile
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
}

// Update user profile
export async function updateProfile(req, res) {
  try {
    const { firstName, lastName, bio, socialLinks } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update profile fields
    if (firstName) user.profile.firstName = firstName;
    if (lastName) user.profile.lastName = lastName;
    if (bio) user.profile.bio = bio;
    if (socialLinks) {
      user.profile.socialLinks = {
        ...user.profile.socialLinks,
        ...socialLinks
      };
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

// Change password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
}

// Check if admin exists (public endpoint)
export async function checkAdminExists(req, res) {
  try {
    const adminExists = await User.adminExists();
    res.json({ adminExists });
  } catch (error) {
    console.error('Check admin exists error:', error);
    res.status(500).json({ error: 'Failed to check admin status' });
  }
}

// Get admin info (public endpoint)
export async function getAdminInfo(req, res) {
  try {
    const adminUser = await User.getAdminUser();
    if (!adminUser) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    res.json({
      admin: {
        username: adminUser.username,
        profile: adminUser.profile
      }
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({ error: 'Failed to get admin info' });
  }
}

// Verify token middleware
export async function verifyToken(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin middleware
export async function requireAdmin(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization failed' });
  }
}
