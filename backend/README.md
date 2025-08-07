# Portfolio Backend API

A comprehensive backend API for a portfolio website with single admin authentication, project management, and contact form handling.

## Features

### 🔐 Single Admin Authentication
- **Single Admin User Only**: Only one admin account can exist in the system
- **Admin-Only Registration**: Registration is restricted to creating the first admin account
- **Admin-Only Login**: Only admin users can log into the system
- **JWT Token Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **Session Management**: Automatic token expiration and renewal

### 📊 Project Management
- CRUD operations for portfolio projects
- Project categorization and tagging
- Featured project management
- Project statistics and analytics
- Search and filtering capabilities

### 📧 Contact Form Handling
- Contact form submission processing
- Spam detection and filtering
- Email notifications
- Contact message management
- Response tracking

### 🛡️ Security Features
- Rate limiting for API endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### 📈 Admin Dashboard
- Real-time statistics
- Project management interface
- Contact message handling
- User profile management
- System health monitoring

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, express-rate-limit, cors
- **Email**: nodemailer
- **Logging**: morgan
- **Compression**: compression

## Project Structure

```
backend/
├── controllers/          # Business logic handlers
│   ├── authController.js     # Authentication logic
│   ├── projectController.js  # Project management
│   └── contactController.js  # Contact form handling
├── models/              # Database schemas
│   ├── User.js             # User/Admin model
│   ├── Project.js          # Project model
│   └── Contact.js          # Contact model
├── routes/              # API route definitions
│   ├── auth.js             # Authentication routes
│   ├── projects.js         # Project routes
│   ├── contact.js          # Contact routes
│   └── admin.js            # Admin-specific routes
├── middleware/          # Custom middleware
│   ├── errorHandler.js      # Error handling
│   └── asyncHandler.js      # Async error wrapper
├── utils/              # Utility functions
│   └── seedData.js         # Database seeding
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config.env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:3000
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=admin@example.com
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # File Upload
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif
   
   # Security
   BCRYPT_ROUNDS=12
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Public Endpoints
- `POST /register` - Create the first admin account (only works if no admin exists)
- `POST /login` - Admin login
- `GET /admin/exists` - Check if admin account exists
- `GET /admin/info` - Get public admin information

#### Protected Endpoints
- `GET /profile` - Get current admin profile
- `PUT /profile` - Update admin profile
- `PUT /change-password` - Change admin password

### Project Routes (`/api/projects`)

#### Public Endpoints
- `GET /` - Get all public projects
- `GET /featured` - Get featured projects
- `GET /:id` - Get project by ID
- `GET /search` - Search projects
- `GET /categories` - Get project categories

#### Admin Protected Endpoints
- `POST /` - Create new project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `GET /admin/stats` - Get project statistics

### Contact Routes (`/api/contact`)

#### Public Endpoints
- `POST /` - Submit contact form

#### Admin Protected Endpoints
- `GET /` - Get all contact messages
- `GET /:id` - Get contact message by ID
- `PUT /:id/status` - Update contact status
- `PUT /:id/spam` - Mark as spam
- `DELETE /:id` - Delete contact message
- `GET /stats` - Get contact statistics

### Admin Routes (`/api/admin`)

#### Admin Protected Endpoints
- `GET /dashboard` - Get dashboard overview
- `GET /users` - Get all users
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /health` - System health check
- `GET /export` - Export data

## Single Admin Authentication

### How It Works

1. **First Time Setup**: When the system starts for the first time, no admin account exists
2. **Admin Creation**: The first registration request creates an admin account
3. **Subsequent Registrations**: All subsequent registration attempts are blocked
4. **Admin-Only Login**: Only users with admin role can log into the system

### Implementation Details

- **User Model**: Includes `role` field with enum values `['admin', 'user']`
- **Registration Logic**: Checks if admin exists before allowing registration
- **Login Logic**: Validates user role is 'admin' before allowing login
- **Static Methods**: `User.adminExists()` and `User.getAdminUser()` for admin checks

### Security Features

- **Password Requirements**: Minimum 6 characters with uppercase, lowercase, and number
- **JWT Tokens**: 7-day expiration with secure secret
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: All inputs are validated and sanitized
- **Error Handling**: Secure error messages that don't leak information

## Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['admin', 'user'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
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
}
```

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  technologies: [String],
  category: String,
  image: String,
  liveUrl: String,
  githubUrl: String,
  featured: Boolean (default: false),
  status: String (enum: ['draft', 'in-progress', 'completed']),
  difficulty: String (enum: ['beginner', 'intermediate', 'advanced', 'expert']),
  tags: [String],
  highlights: [String],
  challenges: [String],
  solutions: [String],
  metrics: Object,
  isPublic: Boolean (default: true),
  order: Number
}
```

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  phone: String,
  company: String,
  budget: String,
  timeline: String,
  projectType: String,
  status: String (enum: ['new', 'read', 'replied', 'closed']),
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),
  ipAddress: String,
  userAgent: String,
  source: String,
  tags: [String],
  notes: String,
  followUpDate: Date,
  isSpam: Boolean (default: false)
}
```

## Development Guidelines

### Code Style
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for complex functions
- Use async/await for database operations

### Error Handling
- Use the `asyncHandler` wrapper for route handlers
- Implement proper error logging
- Return consistent error response format
- Handle both operational and programming errors

### Security Best Practices
- Validate all inputs
- Sanitize data before database operations
- Use parameterized queries
- Implement proper authentication checks
- Set secure HTTP headers

### Testing
- Test all API endpoints
- Verify authentication flows
- Test error scenarios
- Validate data integrity

## Deployment Checklist

### Environment Setup
- [ ] Set production environment variables
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS

### Security Configuration
- [ ] Change default JWT secret
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Enable security headers
- [ ] Set up monitoring and logging

### Database Setup
- [ ] Create production database
- [ ] Set up database backups
- [ ] Configure connection pooling
- [ ] Set up database monitoring

### Application Deployment
- [ ] Build and deploy application
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up load balancing (if needed)
- [ ] Configure monitoring and alerts

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Validate token format

3. **Email Not Sending**
   - Verify SMTP credentials
   - Check firewall settings
   - Test SMTP connection

4. **Rate Limiting**
   - Check rate limit configuration
   - Monitor request frequency
   - Adjust limits if needed

### Logs and Monitoring

- Application logs are written to console
- Use `morgan` for HTTP request logging
- Monitor error rates and response times
- Set up alerts for critical errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
