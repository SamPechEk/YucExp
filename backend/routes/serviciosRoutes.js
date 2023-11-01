import express from "express";
import { connection } from '../config/db.js';
const Srouter = express.Router();
import multer from "multer";
import path from "path";
import {registrarServicio} from "../controllers/servicioController.js";

const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null, file.fieldname + "_"+Date.now()+ path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({
  storage : storage,
});


Srouter.post("/registrarServicio",uploadImage.single("foto"), registrarServicio);


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