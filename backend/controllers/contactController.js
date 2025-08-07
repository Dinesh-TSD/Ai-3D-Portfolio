import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

import nodemailer from 'nodemailer';
const { createTransport: _createTransporter } = nodemailer;


// Create email transporter
const createTransporter = () => {
  return _createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Submit contact form
export async function submitContact(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactData = req.body;
    
    // Add client information
    contactData.ipAddress = req.ip;
    contactData.userAgent = req.get('User-Agent');

    // Check for spam (basic check)
    const spamCheck = await checkForSpam(contactData);
    if (spamCheck.isSpam) {
      contactData.isSpam = true;
      contactData.tags = ['spam'];
    }

    const contact = new Contact(contactData);
    await contact.save();

    // Send notification email
    try {
      await sendNotificationEmail(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Thank you for your message! I will get back to you soon.',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
}

// Get all contacts (admin only)
export async function getAllContacts(req, res) {
  try {
    const { 
      status, 
      priority, 
      isSpam,
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (isSpam !== undefined) filter.isSpam = isSpam === 'true';

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

// Get contact by ID (admin only)
export async function getContactById(req, res) {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ contact });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
}

// Update contact status (admin only)
export async function updateContactStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, priority, notes, followUpDate } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Update fields
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (notes) contact.notes = notes;
    if (followUpDate) contact.followUpDate = followUpDate;

    await contact.save();

    res.json({
      message: 'Contact updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
}

// Mark contact as spam (admin only)
export async function markAsSpam(req, res) {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.isSpam = true;
    contact.tags = [...(contact.tags || []), 'spam'];
    await contact.save();

    res.json({
      message: 'Contact marked as spam',
      contact
    });
  } catch (error) {
    console.error('Mark as spam error:', error);
    res.status(500).json({ error: 'Failed to mark contact as spam' });
  }
}

// Delete contact (admin only)
export async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
}

// Get contact statistics (admin only)
export async function getContactStats(req, res) {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          newContacts: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          spamContacts: { $sum: { $cond: ['$isSpam', 1, 0] } },
          urgentContacts: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } }
        }
      }
    ]);

    const statusStats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Contact.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const projectTypeStats = await Contact.aggregate([
      {
        $group: {
          _id: '$projectType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overall: stats[0] || {},
      byStatus: statusStats,
      byPriority: priorityStats,
      byProjectType: projectTypeStats
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ error: 'Failed to fetch contact statistics' });
  }
}

// Send notification email
const sendNotificationEmail = async (contact) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP credentials not configured, skipping email');
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL || 'dinesh@example.com',
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <p><strong>Project Type:</strong> ${contact.projectType}</p>
      <p><strong>Budget:</strong> ${contact.budget}</p>
      <p><strong>Timeline:</strong> ${contact.timeline}</p>
      <p><strong>Submitted:</strong> ${contact.createdAt}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Basic spam detection
const checkForSpam = async (contactData) => {
  const spamIndicators = [
    contactData.message.length < 10,
    contactData.message.includes('http://') && contactData.message.length < 50,
    contactData.email.includes('spam'),
    contactData.name.length < 2
  ];

  const isSpam = spamIndicators.some(indicator => indicator);
  
  return { isSpam };
};
