import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  company: {
    type: String,
    trim: true,
    maxlength: 100
  },
  budget: {
    type: String,
    enum: ['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k+', 'not-specified'],
    default: 'not-specified'
  },
  timeline: {
    type: String,
    enum: ['asap', '1-2-weeks', '1-2-months', '3-6-months', '6+months', 'not-specified'],
    default: 'not-specified'
  },
  projectType: {
    type: String,
    enum: ['web-development', 'mobile-app', 'ui-ux-design', 'consultation', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  source: {
    type: String,
    enum: ['contact-form', 'email', 'social-media', 'referral'],
    default: 'contact-form'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    maxlength: 1000
  },
  followUpDate: {
    type: Date
  },
  isSpam: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ isSpam: 1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return this.name;
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', { virtuals: true });
contactSchema.set('toObject', { virtuals: true });

export default model('Contact', contactSchema);
