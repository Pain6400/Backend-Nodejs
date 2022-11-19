import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userShema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    },
});

userShema.pre("save", async function(next) {
    const user = this;

    if(!user.isModified("password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Fallo el hash de contraseña")
    }
});


userShema.methods.comparePassrowd = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userShema);