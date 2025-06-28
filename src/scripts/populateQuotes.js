// scripts/populateQuotes.js
const { db } = require('../config/firebase');
const dailyQuotes = require('../utils/dailyQuotes');

const populateQuotes = async () => {
  const batch = db.batch();
  const quotesRef = db.collection('quotes');

  dailyQuotes.forEach((quote) => {
    const docRef = quotesRef.doc(quote.id.toString());
    batch.set(docRef, quote);
  });

  try {
    await batch.commit();
    console.log('Quotes uploaded successfully.');
  } catch (err) {
    console.error('Error uploading quotes:', err);
  }
};

populateQuotes();
