const quoteModel = require("../models/QuoteModel");
const userFavoriteQuoteModel = require("../models/UserFavoriteQuoteModel");
const { sendSuccess, sendError } = require("../helpers/responseHandler");

const getDailyQuote = async (req, res) => {
  const [apiName, time] = ["Get Daily Quote", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const quote = await quoteModel.getDailyQuote();
    if (!quote) {
      return sendError(res, apiName, 404, "Quote not found");
    }
    sendSuccess(res, apiName, 200, quote);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to fetch quote");
  }
};

const getQuoteById = async (req, res) => {
  const [apiName, time] = ["Get Quote By Id", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const { id } = req.body;
    if (!id) {
      return sendError(res, apiName, 400, "Id not found");
    }
    const quote = await quoteModel.getQuoteById(id);
    if (!quote) {
      return sendError(res, apiName, 404, "Quote not found");
    }
    sendSuccess(res, apiName, 200, quote);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to fetch quote");
  }
};

const createUserFavoriteQuote = async (req, res) => {
  const [apiName, time] = ["Create User Favorite Quote", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const { userId, quoteId } = req.body;
    if (!userId || !quoteId) {
      return sendError(res, apiName, 400, "User ID and Quote ID are required");
    }
    const favoriteQuote = await userFavoriteQuoteModel.createUserFavoriteQuote(
      userId,
      quoteId
    );
    sendSuccess(res, apiName, 201, favoriteQuote);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to create favorite quote");
  }
};

const getUserFavoriteQuotes = async (req, res) => {
  const [apiName, time] = ["Get User Favorite Quotes", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const { userId } = req.body;
    if (!userId) {
      return sendError(res, apiName, 400, "User ID is required");
    }
    const favoriteQuotes = await userFavoriteQuoteModel.getUserFavoriteQuotes(
      userId
    );
    if (!favoriteQuotes) {
      return sendError(res, apiName, 404, "No favorite quotes found");
    }
    sendSuccess(res, apiName, 200, favoriteQuotes);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to fetch favorite quotes");
  }
};

const addFavoriteQuote = async (req, res) => {
  const [apiName, time] = ["Add Favorite Quote", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const userId = req.user?.uid;
    const { quoteId } = req.body;
    if (!userId || !quoteId) {
      return sendError(res, apiName, 400, "User ID and Quote ID are required");
    }
    const favoriteQuote = await userFavoriteQuoteModel.addFavoriteQuote(
      userId,
      quoteId
    );
    sendSuccess(res, apiName, 200, favoriteQuote);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to add favorite quote");
  }
};

const removeFavoriteQuote = async (req, res) => {
  const [apiName, time] = ["Remove Favorite Quote", Date.now()];
  console.log("[INFO]", apiName, time);
  try {
    const { userId, quoteId } = req.body;
    if (!userId || !quoteId) {
      return sendError(res, apiName, 400, "User ID and Quote ID are required");
    }
    const favoriteQuote = await userFavoriteQuoteModel.removeFavoriteQuote(
      userId,
      quoteId
    );
    if (!favoriteQuote) {
      return sendError(res, apiName, 404, "Favorite quote not found");
    }
    sendSuccess(res, apiName, 200, favoriteQuote);
  } catch (error) {
    sendError(res, apiName, 500, "Failed to remove favorite quote");
  }
};

module.exports = {
  getDailyQuote,
  getQuoteById,
  createUserFavoriteQuote,
  getUserFavoriteQuotes,
  addFavoriteQuote,
  removeFavoriteQuote,
};
