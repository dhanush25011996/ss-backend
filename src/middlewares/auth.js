// src/middlewares/auth.js
const { admin } = require('../config/firebase');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid }; // Attach uid to request
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;