import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register); // User registration
router.post('/login', login); // User login
router.get('/me', verifyToken, me); // Get user profile (JWT required)

export default router;