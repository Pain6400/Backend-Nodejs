import { User } from "../models/User.js";

import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user) throw { code: 1100};
        user = new User({ email, password });

        await user.save();
        return res.status(201).json({ status: true, message: "Usuario creado correctamente" });
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});

        if(!user) return res.status(403).json({ status: false, message: "El usuario no existe"});

        const respuestaPassword = await user.comparePassrowd(password);

        if(!respuestaPassword) return res.status(403).json({ status: false, message: "Contraseña incorrecta"});

        const token = generateToken(user.id)

        return res.json({ strtus:true, message: "Usuario logeado correctamente", token: token});

    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}


export const infoUser = async(req, res) => {
    try {
        const  { _id , email } = await User.findById(req.uid).lean();
        return res.json({ email, _id })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}