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

Srouter.put('/listado/servicios/modificar', (req, res) => {
  const nombre = req.body.nombre; // Asegúrate de enviar el ID de usuario en el cuerpo de la solicitud
  const id = req.body.id;
  const context = req.body.context;
  // Realiza una consulta SQL para actualizar el estado del carrito
  const updateCarritoQuery = `UPDATE hoteles SET nombre = ${nombre}, WHERE idusuario = ${id}`;

  connection.query(updateCarritoQuery, (error, result) => {
    if (error) {
      console.error('Error al cambiar la informacion:', error);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }
    return res.status(200).json({ success: true, msg: 'Datos actualizados correctamente' });
  });
});

Srouter.delete("/listado/servicios/eliminar/:id", async(req, res) =>{
  const { id } = req.params;
  console.log(id);
  await connection.query("DELETE FROM hoteles WHERE idHotel = ?",[id], (err, rows) => {
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
})


export default Srouter;