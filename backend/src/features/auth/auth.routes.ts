import { Router } from 'express';
import { register, login, getMe, refreshToken } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.schema';
import { protect, restrictTo } from '../../middlewares/authMiddleware';
import { UserRole } from './auth.types';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh-token', validateRequest(refreshTokenSchema), refreshToken);

// Protected routes below
router.use(protect);

router.get('/me', getMe);

// Example of role-based restricted route
router.get('/admin-only', restrictTo(UserRole.ADMIN), (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome Admin' });
});

export default router;
