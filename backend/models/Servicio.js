import { connection } from '../config/db.js';


const Servicio = {

    async RegistrarServicio({tipo ,nombre, municipio, calificacion, idLugar,direccion, idTipoTransporte}) {

      switch(tipo) {
        case "1":
          connection.query("INSERT INTO hoteles(nombre, idMunicipio, calificacion) VALUES (?,?,?)",[nombre, municipio, calificacion],
          (error, rows) => {
              if(error)
                  throw error;
                  const insertId = rows.insertId;
                  return insertId || null;
              // response.status(201).json({"Usuario añadido correctamente": results.affectedRows})
          });
          break;
        case "2":
          connection.query("INSERT INTO transporte(idTipoTransporte, idMunicipio, nombre, calificacion) VALUES (?,?,?,?)",[idTipoTransporte, municipio, nombre,calificacion],
          (error, rows) => {
              if(error)
                  throw error;
                  const insertId = rows.insertId;
                  console.log("transportes");
                  return insertId || null;
              // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
          });
          break;
        case "3":
          connection.query("INSERT INTO lugar(idMunicipio, nombre) VALUES (?,?)",[municipio, nombre],
            (error, rows) => {
                if(error)
                    throw error;
                    const insertId = rows.insertId;
                    return insertId || null;
                // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
            }); 
          break;
        case 4:
            connection.query("INSERT INTO actividades(idMunicipio, nombre) VALUES (?,?)",[municipio, nombre],
              (error, rows) => {
                  if(error)
                      throw error;
                      const insertId = rows.insertId;
                      return insertId || null;
                  // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
              });
          break;
      }
    },

    async getServicio(req,res) {
      let query = "SELECT * FROM tiposervicio";
      const service = [];
      let responseApi = await connection.query(query, (err, rows)  => {
        // console.log(res);
        if (err) {
          // res.send({ err: "Error en el servidor"} ); // Si hay un error, rechazamos la promesa
          console.log(err);
        } 
          console.log('>> results: ', rows );
          var string=JSON.stringify(rows);
          console.log('>> string: ', string );
          var json =  JSON.parse(string);
          console.log('>> json: ', json);
          // res.json(json);
          // return string         
          service.push(json);
          return service     
      });
      // return responseApi
    }
};

export default Servicio;