const quoteModel = require("../models/QuoteModel");

const getDailyQuote = async (req, res) => {
  try {
    const quote = await quoteModel.getDailyQuote();

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error) {
    console.error("Get Quote error:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id not found" });
    }
    const quote = await quoteModel.getQuoteById(id);
    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error) {
    console.error("Get Quote error:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

module.exports = {
  getDailyQuote,
  getQuoteById,
};
