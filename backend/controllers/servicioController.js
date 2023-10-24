import Servicio from "../models/Servicio.js";

const obtener = async(req, res) => {
    const rows = await Servicio.getServicio();
    const datos = res.body;
    try {
        res.json({
          msg: rows,
          success:true,
        });
    // console.log(rows);
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
}
export { obtener};