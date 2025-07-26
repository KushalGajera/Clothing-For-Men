const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  createProductReview,
  getCategories,
  getBrands,
} = require('../controllers/productController');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules for review
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Comment must be between 10 and 500 characters'),
];

// Routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories/list', getCategories);
router.get('/brands/list', getBrands);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, reviewValidation, createProductReview);

module.exports = router;

