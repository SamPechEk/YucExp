import express from "express";
import { connection } from '../config/db.js';


const Srouter = express.Router();

import {registrarServicio} from "../controllers/servicioController.js";




Srouter.post("/registrarServicio", registrarServicio);
Srouter.get("/getServicios", async (req, res) =>{
    await connection.query("SELECT * FROM tiposervicio",
    (err, rows) =>{
      try {
        if(err){
            res.status(500).json({ msg: "Error en la base de datos" });
        }
                res.json({
                    msg : rows,
                    success: true});
                    console.log(rows);
          
      } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });        
      }
        })

});


export default Srouter;