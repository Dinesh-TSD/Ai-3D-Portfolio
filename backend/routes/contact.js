import { Router } from 'express';
import { body, query } from 'express-validator';
import { submitContact, getAllContacts, getContactStats, getContactById, updateContactStatus, markAsSpam, deleteContact } from '../controllers/contactController.js';
import { verifyToken, requireAdmin } from '../controllers/authController.js';

const router = Router();

// Validation middleware
const submitContactValidation = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('subject')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters')
    .trim(),
  body('message')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .trim(),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters')
    .trim(),
  body('company')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters')
    .trim(),
  body('budget')
    .optional()
    .isIn(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k+', 'not-specified'])
    .withMessage('Invalid budget range'),
  body('timeline')
    .optional()
    .isIn(['asap', '1-2-weeks', '1-2-months', '3-6-months', '6+months', 'not-specified'])
    .withMessage('Invalid timeline'),
  body('projectType')
    .optional()
    .isIn(['web-development', 'mobile-app', 'ui-ux-design', 'consultation', 'other'])
    .withMessage('Invalid project type')
];

const updateContactValidation = [
  body('status')
    .optional()
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters'),
  body('followUpDate')
    .optional()
    .isISO8601()
    .withMessage('Follow-up date must be a valid date'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string')
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
    .isIn(['createdAt', 'updatedAt', 'name', 'email', 'status', 'priority'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('status')
    .optional()
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
  query('isSpam')
    .optional()
    .isBoolean()
    .withMessage('isSpam must be true or false'),
  query('projectType')
    .optional()
    .isIn(['web-development', 'mobile-app', 'ui-ux-design', 'consultation', 'other'])
    .withMessage('Invalid project type')
];

// Public routes
router.post('/submit', submitContactValidation, submitContact);

// Admin routes (protected)
router.get('/', verifyToken, requireAdmin, queryValidation, getAllContacts);
router.get('/stats', verifyToken, requireAdmin, getContactStats);
router.get('/:id', verifyToken, requireAdmin, getContactById);
router.put('/:id', verifyToken, requireAdmin, updateContactValidation, updateContactStatus);
router.put('/:id/spam', verifyToken, requireAdmin, markAsSpam);
router.delete('/:id', verifyToken, requireAdmin, deleteContact);

export default router;
