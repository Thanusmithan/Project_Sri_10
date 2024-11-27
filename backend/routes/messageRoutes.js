//routes/messageRoutes.js
const express = require('express');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const router = express.Router();

router.post('/', sendMessage);
router.get('/:userId', getMessages);
router.delete('/:messageId', deleteMessage);

module.exports = router;
