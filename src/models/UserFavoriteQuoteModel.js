const { db } = require('../config/firebase');
const userFavoriteQuotesRef = db.collection('userFavoriteQuotes');

const createUserFavoriteQuote = async (userId, quoteId) => {
  const favoriteQuoteData = {
    user: userId,
    favoriteQuotes: [quoteId]
  };
  await userFavoriteQuotesRef.doc(userId).set(favoriteQuoteData, { merge: true });
  return favoriteQuoteData;
};

const getUserFavoriteQuotes = async (userId) => {
  const doc = await userFavoriteQuotesRef.doc(userId).get();
  return doc.exists ? doc.data() : null;
};

const addFavoriteQuote = async (userId, quoteId) => {
  const doc = await userFavoriteQuotesRef.doc(userId).get();
  let favoriteQuotes = doc.exists ? doc.data().favoriteQuotes : [];
  if (!favoriteQuotes.includes(quoteId)) {
    favoriteQuotes.push(quoteId);
    await userFavoriteQuotesRef.doc(userId).set({ user: userId, favoriteQuotes }, { merge: true });
  }
  return { user: userId, favoriteQuotes };
};

const removeFavoriteQuote = async (userId, quoteId) => {
  const doc = await userFavoriteQuotesRef.doc(userId).get();
  if (doc.exists) {
    let favoriteQuotes = doc.data().favoriteQuotes || [];
    favoriteQuotes = favoriteQuotes.filter(id => id !== quoteId);
    await userFavoriteQuotesRef.doc(userId).set({ user: userId, favoriteQuotes }, { merge: true });
    return { user: userId, favoriteQuotes };
  }
  return null;
};

module.exports = {
  createUserFavoriteQuote,
  getUserFavoriteQuotes,
  addFavoriteQuote,
  removeFavoriteQuote
};