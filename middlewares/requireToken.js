import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if(!token) throw new Error("No existe el token ingresado");
        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;
        next()
    } catch (error) {
        return res.status(401).json({ status: false, message: error.message})
    }
}


export const generateRefreshToken = (res, uid ) => {
    const expiresIn = 60 * 60 * 23 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 10000)
        });
        
    } catch (error) {
        console.log(error)
    }
}