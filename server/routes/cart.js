const express = require('express');
const { body } = require('express-validator');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const addToCartValidation = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('size')
    .notEmpty()
    .withMessage('Size is required'),
  body('color')
    .notEmpty()
    .withMessage('Color is required'),
];

const updateCartValidation = [
  body('itemId')
    .isMongoId()
    .withMessage('Invalid item ID'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be 0 or greater'),
];

// All routes are protected
router.use(protect);

// Routes
router.get('/', getCart);
router.post('/add', addToCartValidation, addToCart);
router.put('/update', updateCartValidation, updateCartItem);
router.delete('/remove/:itemId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;

