
import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import serviciosRoutes from "./routes/serviciosRoutes.js";

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


//rutas para formularios de servicios
app.use("/obtener/servicios", serviciosRoutes);


const PORT = process.env.PORT || 7000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
