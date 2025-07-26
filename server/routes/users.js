const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
} = require('../controllers/userController');

const { protect } = require('../middleware/auth');

// ----- Public Auth Routes -----
router.post('/register', registerUser);
router.post('/login', loginUser);

// ----- Protected User Routes -----
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Wishlist routes
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', addToWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);
router.delete('/wishlist', clearWishlist);

module.exports = router;
