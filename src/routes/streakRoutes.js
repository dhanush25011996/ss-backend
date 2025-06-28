const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');
const authenticate = require('../middlewares/auth');

// Auth routes
router.post('/check-in', authenticate, streakController.checkIn);
router.get('/:uid', authenticate, streakController.getStreak);

module.exports = router;