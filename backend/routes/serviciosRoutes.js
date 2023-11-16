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

Srouter.post("/listado/servicios",async (req, res) => {
  let tabla = req.body.context;
  console.log(tabla);
  switch(tabla) {
    case "hoteles":
      await connection.query( "SELECT hoteles.idHotel AS id, hoteles.nombre, municipios.nombre AS nomMunicipio, hoteles.calificacion,hoteles.img"
      +" FROM hoteles"+
      " JOIN municipios ON hoteles.idMunicipio = municipios.idMunicipio", (err, rows) => {
        try{
          if(err) {
            res.status(500).json({msg: "Error en la base de datos"});
          }
          res.json({
            msg : rows,
            success : true
          })
          console.log(rows);

        } catch(error){
          res.status(500).json({msg: "Error en el servidor"});
        }
      })
      break;
    case "restaurantes":
      await connection.query( "SELECT restaurantes.idRestaurante AS id, restaurantes.nombre, municipios.nombre AS nomMunicipio, restaurantes.direccion,restaurantes.img"
      +" FROM restaurantes"+
      " JOIN municipios ON restaurantes.idMunicipio = municipios.idMunicipio", (err, rows) => {
        try{
          if(err) {
            res.status(500).json({msg: "Error en la base de datos"});
          }
          res.json({
            msg : rows,
            success : true
          })
          console.log(rows);

        } catch(error){
          res.status(500).json({msg: "Error en el servidor"});
        }
      })
  }
});

Srouter.put("/listado/servicios/modificar",async (req, res) => {});


export default Srouter;