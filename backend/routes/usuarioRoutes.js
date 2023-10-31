import express from "express";
import { connection } from '../config/db.js';
const router = express.Router();
import {
  registrar,
  autenticar,
  confirma,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar); 
router.get("/confirma/:token", confirma);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);
router.get('/municipios', (req, res) => {
  const query = 'SELECT idMunicipio, nombre FROM municipios'; // Ajusta la consulta según tu esquema de base de datos
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error en la base de datos' });
      return;
    }

    const municipios = results.map(item => ({
      idMunicipio: item.idMunicipio,
      nombreMunicipio: item.nombre,
    }));
    res.json(municipios);
  });
});

export default router;
