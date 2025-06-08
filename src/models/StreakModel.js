// src/models/streakModel.js
const { db } = require('../config/firebase');
const streaksRef = db.collection('streaks');

// Default initial state
const initialState = {
  currentStreak: 0,
  bestStreak: 0,
  streakHistory: [],
  milestones: [7, 14, 30, 60, 90, 180, 365],
  nextMilestone: 7,
  progress: 0,
  lastCheckIn: null,
};

const createStreak = async (uid) => {
  await streaksRef.doc(uid).set(initialState);
};

const getStreak = async (uid) => {
  const doc = await streaksRef.doc(uid).get();
  return doc.exists ? doc.data() : null;
};

const updateStreak = async (uid, data) => {
  await streaksRef.doc(uid).set(data, { merge: true });
};

const resetStreak = async (uid) => {
  await streaksRef.doc(uid).set(initialState, { merge: true });
};

module.exports = {
  createStreak,
  getStreak,
  updateStreak,
  resetStreak,
  initialState,
};