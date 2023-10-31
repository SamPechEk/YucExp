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
    await Servicio.RegistrarServicio({ ...req.body, confirmado: false });

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