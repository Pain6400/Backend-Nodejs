import { User } from "../models/User.js";


import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

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

        generateRefreshToken(res, user.uid);

        return res.json({ strtus:true, message: "Usuario logeado correctamente", tokenInfo: token});

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

export const refreshToken = (req, res) => {
    try {
        const tokenInfo = generateToken(req.uid);
        return res.json({ status:true, message: "Usuario logeado correctamente", tokenInfo: tokenInfo});
    } catch (error) {
        return res.status(401).json({status: false, message: error.message})
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({ status:true, message: "Sesion cerrada correctamente"});
}