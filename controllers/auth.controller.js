import { User } from "../models/User.js";

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


        return res.json({ strtus:true, message: "Usuario logeado correctamente"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}