import { Router } from 'express';
import { body, query } from 'express-validator';
import { getAllProjects, getFeaturedProjects, searchProjects, getProjectCategories, getProjectById, createProject, updateProject, deleteProject, getProjectStats } from '../controllers/projectController.js';
import { verifyToken, requireAdmin } from '../controllers/authController.js';

const router = Router();

// Validation middleware
const createProjectValidation = [
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description must be less than 200 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .isString()
    .withMessage('Each technology must be a string'),
  body('category')
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'ai', 'other'])
    .withMessage('Invalid category'),
  body('image')
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isURL()
    .withMessage('Each image must be a valid URL'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('status')
    .optional()
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Invalid status'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Invalid difficulty level'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string'),
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  body('highlights.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each highlight must be less than 200 characters'),
  body('challenges')
    .optional()
    .isArray()
    .withMessage('Challenges must be an array'),
  body('challenges.*')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Each challenge must be less than 300 characters'),
  body('solutions')
    .optional()
    .isArray()
    .withMessage('Solutions must be an array'),
  body('solutions.*')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Each solution must be less than 300 characters'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

const updateProjectValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description must be less than 200 characters'),
  body('technologies')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .optional()
    .isString()
    .withMessage('Each technology must be a string'),
  body('category')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'ai', 'other'])
    .withMessage('Invalid category'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isURL()
    .withMessage('Each image must be a valid URL'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('status')
    .optional()
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Invalid status'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Invalid difficulty level'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string'),
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  body('highlights.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Each highlight must be less than 200 characters'),
  body('challenges')
    .optional()
    .isArray()
    .withMessage('Challenges must be an array'),
  body('challenges.*')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Each challenge must be less than 300 characters'),
  body('solutions')
    .optional()
    .isArray()
    .withMessage('Solutions must be an array'),
  body('solutions.*')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Each solution must be less than 300 characters'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isIn(['title', 'createdAt', 'updatedAt', 'order', 'difficulty'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('category')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'ai', 'other'])
    .withMessage('Invalid category'),
  query('status')
    .optional()
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Invalid status'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be true or false')
];

// Public routes
router.get('/', queryValidation, getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/search', searchProjects);
router.get('/categories', getProjectCategories);
router.get('/:id', getProjectById);

// Admin routes (protected)
router.post('/', verifyToken, requireAdmin, createProjectValidation, createProject);
router.put('/:id', verifyToken, requireAdmin, updateProjectValidation, updateProject);
router.delete('/:id', verifyToken, requireAdmin, deleteProject);
router.get('/admin/stats', verifyToken, requireAdmin, getProjectStats);

export default router;
