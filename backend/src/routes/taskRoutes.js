const express = require('express');
const router = express.Router();
const { getTasksByProject, createTask, updateTask, deleteTask, addAttachment } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:projectId').get(protect, getTasksByProject);
router.route('/').post(protect, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);
router.route('/:id/attachments').post(protect, addAttachment);

module.exports = router;
