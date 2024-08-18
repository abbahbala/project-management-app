// backend/src/routes/projectRoutes.js
const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, authorize('instructor'), createProject).get(protect, getProjects);

module.exports = router;
