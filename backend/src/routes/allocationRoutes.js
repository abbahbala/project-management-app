const express = require('express');
const { allocateProjects } = require('../controllers/allocationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Ensure that the protect and instructor middleware are defined and used correctly
router.post('/allocate', protect, authorize('instructor'), allocateProjects);
// Test protected route
router.post('/test-protect', protect, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
  });
  
  // Test authorized route for 'instructor'
  router.post('/test-authorize', protect, authorize('instructor'), (req, res) => {
    res.status(200).json({ message: 'Authorized route accessed', user: req.user });
  });
  
module.exports = router;
