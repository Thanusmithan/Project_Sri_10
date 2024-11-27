const express = require('express');
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Ensure these middlewares exist and are properly implemented

// Routes
/**
 * @route POST /api/announcements
 * @desc Create a new announcement (Admin only)
 * @access Private (Admin)
 */
router.post('/', verifyToken, verifyAdmin, createAnnouncement);

/**
 * @route GET /api/announcements
 * @desc Get all announcements
 * @access Private (Authenticated Users)
 */
router.get('/', verifyToken, getAnnouncements);

/**
 * @route DELETE /api/announcements/:announcementId
 * @desc Delete an announcement (Admin only)
 * @access Private (Admin)
 */
router.delete('/:announcementId', verifyToken, verifyAdmin, deleteAnnouncement);

module.exports = router;
