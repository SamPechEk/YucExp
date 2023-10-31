<<<<<<< HEAD
const app = express();
import  express from 'express';
=======
>>>>>>> 9a5985f633c1fec25275ca7cfe6ceb15a942dc5b

import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
app.use(express.json());

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

// app.use(cors(corsOptions));
app.use(cors());

// Routing
app.use("/api/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 7000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
