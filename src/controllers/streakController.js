// src/controllers/streakController.js
const streakModel = require('../models/StreakModel');

const checkIn = async (req, res) => {
  const uid = req.user.uid;

  try {
    let streak = await streakModel.getStreak(uid);
    const now = new Date();
    const today = now.toDateString();

    if (!streak) {
      // Create new streak if none exists
      await streakModel.createStreak(uid);
      streak = { ...streakModel.initialState };
    }

    const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
    const daysDiff = lastCheckIn
      ? Math.floor((now - lastCheckIn) / (1000 * 60 * 60 * 24))
      : Infinity;

    if (daysDiff === 0) {
      // Already checked in today
      return res.status(200).json({ message: 'Already checked in today', streak });
    } else if (daysDiff === 1) {
      // Consecutive day
      streak.currentStreak += 1;
    } else if (daysDiff > 1) {
      // Missed a day, reset streak
      streak.currentStreak = 1;
    }

    if (streak.currentStreak > streak.bestStreak) {
      streak.bestStreak = streak.currentStreak;
    }

    streak.lastCheckIn = now.toISOString();
    streak.streakHistory.push(today);

    // Update progress towards next milestone
    const next = streak.milestones.find((m) => m > streak.currentStreak);
    streak.nextMilestone = next || null;
    streak.progress = next ? (streak.currentStreak / next) * 100 : 100;

    await streakModel.updateStreak(uid, streak);

    res.status(200).json({ message: 'Check-in successful', streak });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Failed to process check-in' });
  }
};

const getStreak = async (req, res) => {
  const { uid } = req.params;
  try {
    const streak = await streakModel.getStreak(uid);
    if (!streak) {
      return res.status(404).json({ error: 'Streak not found' });
    }
    res.status(200).json(streak);
  } catch (error) {
    console.error('Get streak error:', error);
    res.status(500).json({ error: 'Failed to fetch streak' });
  }
};

module.exports = {
  checkIn,
  getStreak,
};