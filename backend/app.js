// Importa express
const express = require("express");
// Importa cors
const cors = require("cors");

// Crea una instancia de Express
const app = express();

// cors
app.use(cors());

// Define un puerto para el servidor
const port = 3050;

// Crea un endpoint que devuelva un JSON
app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo desde el servidor",
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
