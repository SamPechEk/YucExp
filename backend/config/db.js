import mysql from 'mysql';
import dotenv from "dotenv";
dotenv.config();
let connection; // Declaración de la conexión fuera de la función para que esté disponible en otros lugares

// const conectarDB = async () => {
  try {
    connection = mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
    });

    // Abre la conexión
    connection.connect((err) => {
      if (err) {
        console.error(`Error al conectar a MySQL: ${err.message}`);
        process.exit(1);
      } else {
        console.log(`MySQL Conectado en: ${process.env.DBHOST}`);
        
      }
    });
  } catch (error) {
    console.error(`Error al conectar a MySQL: ${error.message}`);
    process.exit(1);
  }
// };

export  {connection};
