//controllers/announcementController.js
const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    // Create announcement
    const announcement = new Announcement({
      adminId: req.user.id, // Assuming user information is stored in req.user
      title,
      content,
    });

    await announcement.save();
    res.status(201).json({ message: 'Announcement created successfully.', data: announcement });
  } catch (error) {
    console.error('Error creating announcement:', error.message);
    res.status(500).json({ error: 'Error creating announcement.' });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Error fetching announcements:', err.message);
    res.status(500).json({ error: 'Error fetching announcements' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    // Check if announcement exists
    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    // Soft delete
    announcement.isDeleted = true;
    await announcement.save();

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting announcement:', err.message);
    res.status(500).json({ error: 'Error deleting announcement' });
  }
};
