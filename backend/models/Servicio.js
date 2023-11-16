import { connection } from '../config/db.js';


const Servicio = {

    async RegistrarServicio({tipo ,nombre, municipio, calificacion, idLugar,direccion, idTipoTransporte, idLocalidad, foto, tipoImg}) {
      let url_foto = foto;
      if(tipoImg == 1){    
         url_foto = "http://localhost:7000/"+foto;
      }
      switch(tipo) {
        case "1":
<<<<<<< HEAD
          connection.query("INSERT INTO hoteles(nombre, idMunicipio, calificacion, foto, typeImg) VALUES (?,?,?,?,?)",[nombre, municipio, calificacion,foto, tipoImg],
=======
          connection.query("INSERT INTO hoteles(nombre, idMunicipio, calificacion, img, typeImg) VALUES (?,?,?,?,?)",[nombre, municipio, calificacion,url_foto, tipoImg],
>>>>>>> 182404bfde96fdf25ba692e814a952fed4636cfa
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
                  return insertId || null;
              // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
          });
          break;
        case "3":
          connection.query("INSERT INTO lugar(idMunicipio, nombre, img, typeImg) VALUES (?,?,?,?)",[municipio, nombre,foto, tipoImg],
            (error, rows) => {
                if(error)
                    throw error;
                    const insertId = rows.insertId;
                    return insertId || null;
                // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
            }); 
          break;
        case "4":
            connection.query("INSERT INTO actividades(idMunicipio, nombre, img, typeImg) VALUES (?,?,?,?)",[municipio, nombre,foto,tipoImg],
              (error, rows) => {
                  if(error)
                      throw error;
                      const insertId = rows.insertId;
                      return insertId || null;
                  // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
              });
          break;
        case "5":
            connection.query("INSERT INTO restaurantes(nombre, direccion, idMunicipio, img, typeImg) VALUES (?,?,?,?,?)",[nombre, direccion, municipio,foto, tipoImg],
              (error, rows) => {
                  if(error)
                      throw error;
                      const insertId = rows.insertId;
                      return insertId || null;
                  // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
              });
          break;
        case "6":
            connection.query("INSERT INTO localidad(nombreLocalidad) VALUES (?)",[nombre],
              (error, rows) => {
                  if(error)
                      throw error;
                      const insertId = rows.insertId;
                      return insertId || null;
                  // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
              });
          break;
        case "7":
            connection.query("INSERT INTO municipios(idLocalidad, nombre) VALUES (?, ?)",[idLocalidad,nombre],
              (error, rows) => {
                  if(error)
                      throw error;
                      const insertId = rows.insertId;
                      return insertId || null;
                  // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
              });
          break;
        case "9":
            connection.query("INSERT INTO paquetes(nombre) VALUES (?)",[nombre],
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