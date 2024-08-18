const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markAsRead } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/send', authMiddleware, sendMessage);
router.get('/conversation/:userId', authMiddleware, getMessages);
router.put('/read/:messageId', authMiddleware, markAsRead);

module.exports = router;
