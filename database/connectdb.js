import mongoose from "mongoose";

try {
   await mongoose.connect(process.env.URI_MONGO);
   console.log("Coneccion exitosa 👌");    
} catch (error) {
    console.log("Error de coneccion a mongo db" + error)
}