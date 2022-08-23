import { Router } from 'express';
import { infoUser, login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';
const router = Router();

router.get('/login', [
    body('email', "Formato incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail()
], 
validationResultExpress,
login);

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
], 
validationResultExpress,
register)

router.get("/protected", requireToken, infoUser)

export default router;