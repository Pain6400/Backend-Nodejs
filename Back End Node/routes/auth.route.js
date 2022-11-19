import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';
const router = Router();

router.get('/login', bodyLoginValidator, login);

router.post('/register', bodyRegisterValidator, register)

router.get("/protected", requireToken, infoUser);

router.get("/refreshToken", requireRefreshToken, refreshToken);

router.get("/logour", logout)

export default router;