import { User } from "../models/User.js";

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        return res.json({ ok: true });
    } catch (error) {
        console.log(error)
    }
}

export const login = (req, res) => {
    res.json({ok:true});
}