const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

// Quote routes
router.get("/fetch-daily-quote", quoteController.getDailyQuote);
router.post("/fetch-quote-byid", quoteController.getQuoteById);

router.post("/create-favorite-quote", quoteController.createUserFavoriteQuote);
router.post("/fetch-favorite-quotes", quoteController.getUserFavoriteQuotes);
router.post("/add-favorite-quote", quoteController.addFavoriteQuote);
router.post("/remove-favorite-quote", quoteController.removeFavoriteQuote);

module.exports = router;