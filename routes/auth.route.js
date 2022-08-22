import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
const router = express.Router();

router.get('/login', login);

router.post('/register', [
    body('email', "Formato incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")        
        .trim()
        .isLength( { min: 6 }),
    body("password", "Formato incorrecto")
        .custom((value, {req}) => {
            if(value !== req.body.repassword) {
                throw new Error("La contraseñas no coinciden")
            }

            return value;
        })
], register)


export default router;