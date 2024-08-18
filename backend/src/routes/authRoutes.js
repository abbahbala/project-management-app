const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

router.post('/instructors/register', (req, res) => {
  // Logic to register an instructor
});

// Example of a protected route
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile data' });
});

// Example of an authorized route for instructors only
router.get('/instructor-data', protect, authorize('instructor'), (req, res) => {
  res.json({ message: 'Instructor specific data' });
});

module.exports = router;
