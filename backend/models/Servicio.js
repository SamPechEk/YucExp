import { connection } from '../config/db.js';


const Servicio = {

    async getServicio() {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM tiposervicio";
            connection.query(query, function (err, rows) {
              if (err) {
                reject(err); // Si hay un error, rechazamos la promesa
              } else { 
                console.log(rows);
                if (rows.length > 0) {
                   let service = rows;
                  resolve(service); // Resolvemos la promesa con el valor deseado
                } else {
                  resolve(null); // Resolvemos con null si no se encuentra un usuario
                }
              }
            });
          });
    }
};

export default Servicio;