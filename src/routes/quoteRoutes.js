const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

// Quote routes
router.get("/fetch-daily-quote", quoteController.getDailyQuote);
router.get("/fetch-quote-byid", quoteController.getQuoteById);

module.exports = router;
