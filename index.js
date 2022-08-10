const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Ruta index")
});

app.listen(3000, () => console.log("Encendido"))