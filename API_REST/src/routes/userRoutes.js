import express from 'express';
import { register, login, getProfile } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
import { registerValidator } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

export default router;