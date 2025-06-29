const streakModel = require("../models/StreakModel");
const { sendSuccess, sendError } = require("../helpers/responseHandler");

const checkIn = async (req, res) => {
  const [apiName, time] = ["Check In", Date.now()];
  console.log("[INFO]", apiName, time);
  const uid = req.user.uid;

  try {
    let streak = await streakModel.getStreak(uid);
    const now = new Date();
    const today = now.toDateString();

    if (!streak) {
      await streakModel.createStreak(uid);
      streak = { ...streakModel.initialState };
    }

    const lastCheckIn = streak.lastCheckIn
      ? new Date(streak.lastCheckIn)
      : null;
    const daysDiff = lastCheckIn
      ? Math.floor((now - lastCheckIn) / (1000 * 60 * 60 * 24))
      : Infinity;

    if (daysDiff === 0) {
      return sendSuccess(res, apiName, 200, {
        message: "Already checked in today",
        streak,
      });
    } else if (daysDiff === 1) {
      streak.currentStreak += 1;
    } else if (daysDiff > 1) {
      streak.currentStreak = 1;
    }

    if (streak.currentStreak > streak.bestStreak) {
      streak.bestStreak = streak.currentStreak;
    }

    streak.lastCheckIn = now.toISOString();
    streak.streakHistory.push(today);

    const next = streak.milestones.find((m) => m > streak.currentStreak);
    streak.nextMilestone = next || null;
    streak.progress = next ? (streak.currentStreak / next) * 100 : 100;

    await streakModel.updateStreak(uid, streak);

    sendSuccess(res, apiName, 200, { message: "Check-in successful", streak });
  } catch (error) {
    sendError(res, apiName, 500, "Failed to process check-in");
  }
};

const getStreak = async (req, res) => {
  const [apiName, time] = ["Get Streak", Date.now()];
  console.log("[INFO]", apiName, time);
  const { uid } = req.params;
  try {
    const streak = await streakModel.getStreak(uid);
    if (!streak) {
      return sendError(res, apiName, 404, "Streak not found");
    }
    sendSuccess(res, apiName, 200, streak);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to fetch streak");
  }
};

module.exports = {
  checkIn,
  getStreak,
};
