const express = require('express');
const router = express.Router();

// Controllers
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
} = require('../controllers/userController');

const { protect } = require('../middleware/auth');

// ----- Protected User Routes -----
router.use(protect);

// Wishlist routes
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', addToWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);
router.delete('/wishlist', clearWishlist);

module.exports = router;
