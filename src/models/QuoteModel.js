// src/models/quoteModel.js
const { db } = require('../config/firebase');
const quotesRef = db.collection('quotes');

const getDailyQuote = async () => {
  const today = new Date();
  const dayIndex = today.getDate();

  const totalQuotes = 3;
  const quoteId = ((dayIndex - 1) % totalQuotes) + 1;

  const doc = await quotesRef.doc(quoteId.toString()).get();
  return doc.exists ? doc.data() : null;
};

const getQuoteById = async (id) => {
  const doc = await quotesRef.doc(id.toString()).get();
  return doc.exists ? doc.data() : null;
};

module.exports = {
  getDailyQuote,
  getQuoteById,
};
