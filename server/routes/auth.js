const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

// ----- Public Auth Routes -----
router.post('/register', registerUser);
router.post('/login', loginUser);

// ----- Protected User Routes -----
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
