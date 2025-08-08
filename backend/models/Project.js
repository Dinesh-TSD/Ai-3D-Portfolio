import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'mobile', 'ai', 'other'],
    default: 'other'
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  liveUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Live URL must be a valid URL'
    }
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/github\.com\/.+/.test(v);
      },
      message: 'GitHub URL must be a valid GitHub repository URL'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  tags: [{
    type: String,
    trim: true
  }],
  highlights: [{
    type: String,
    maxlength: 200
  }],
  challenges: [{
    type: String,
    maxlength: 300
  }],
  solutions: [{
    type: String,
    maxlength: 300
  }],
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ category: 1, featured: 1, status: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ tags: 1 });

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (!this.startDate || !this.endDate) return null;
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

export default model('Project', projectSchema);
