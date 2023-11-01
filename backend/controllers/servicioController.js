import Servicio from "../models/Servicio.js";

// const obtener = async(req, res) => {
//     // console.log(datos);
//     const rows = await Servicio.getServicio();

//     try {
//       console.log(">>este es el resultado = ",rows);
//           res.json({
//           msg: rows,
//           success:true
//         });
        
//         // res.send(result);
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Error en el servidor" });
//       }
// }

const registrarServicio = async (req, res) => {
  try {
    console.log("Datos que recibe el request =>",req.body," Esta es la foto =>",req.file);
    const datos = {
      tipo : req.body.tipo,
      nombre : req.body.nombre,
      municipio : req.body.municipio,
      calificacion : req.body.calificacion,
      idLugar : req.body.idLugar,
      direccion : req.body.direccion,
      idTipoTransporte : req.body.idTipoTransporte,
      foto : req.file.filename,
    };

    console.log("Arreglo creado manualmente =>",datos);
   await Servicio.RegistrarServicio({ ...datos, confirmado: false });
      res.json({
        msg: "Servicio Guardado Correctamente",
        success : true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor", success:false });
  }
};
export {
         registrarServicio,
        };