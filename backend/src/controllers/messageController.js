const Message = require('../models/Message');
const mongoose = require('mongoose');

exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({ error: 'Invalid receiver ID' });
  }

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Message content is required and must be a string' });
  }

  try {
    const message = new Message({
      senderId,
      receiverId,
      content,
      timestamp: Date.now(),
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully', messageId: message._id });
  } catch (error) {
    res.status(500).json({ error: `Error sending message: ${error.message}` });
  }
};

exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving messages: ${error.message}` });
  }
};

exports.markAsRead = async (req, res) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const message = await Message.findByIdAndUpdate(messageId, { read: true });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: `Error marking message as read: ${error.message}` });
  }
};
