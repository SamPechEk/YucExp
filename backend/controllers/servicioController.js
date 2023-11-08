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
  var archivo = '';
  try {
    if(req.file){
      //comprueba si el request trae un campo file
      archivo = req.file.filename;
    }
    else{
      archivo = req.body.foto;
    }
    const datos = {
      tipo : req.body.tipo,
      nombre : req.body.nombre,
      municipio : req.body.municipio,
      calificacion : req.body.calificacion,
      idLugar : req.body.idLugar,
      direccion : req.body.direccion,
      idTipoTransporte : req.body.idTipoTransporte,
      foto : archivo,
      tipoImg : req.body.tipoImg,
    };
    console.log(datos);
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