import axios from "axios";
import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const bodyLinkValidator = [
    body("longLink", "Formato incorrecto")
    .trim()
    .notEmpty()
    .custom(async value => {
        try {
            await axios.get(value);
            return value;
        } catch (error) {
            throw new Error("NOT FOUND LONGlINK 404");
        }
    }),
    validationResultExpress
];

export const bodyRegisterValidator = [
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
            }
        ),
        validationResultExpress,
];

export const bodyLoginValidator = [
    body('email', "Formato incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    validationResultExpress
];