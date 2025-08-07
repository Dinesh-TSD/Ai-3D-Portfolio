import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const { genSalt, hash, compare } = bcrypt;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatar: String,
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      instagram: String,
      youtube: String
    }
  }
}, {
  timestamps: true
});

// Static method to check if admin user exists
userSchema.statics.adminExists = async function() {
  const adminUser = await this.findOne({ role: 'admin' });
  return !!adminUser;
};

// Static method to get admin user
userSchema.statics.getAdminUser = async function() {
  return await this.findOne({ role: 'admin' });
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default model('User', userSchema);
