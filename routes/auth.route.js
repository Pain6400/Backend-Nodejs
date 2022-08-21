import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
const router = express.Router();

router.get('/login', login);

router.post('/register', [
    body('email', "Formato incorrecto").isEmail().normalizeEmail()
], register)


export default router;