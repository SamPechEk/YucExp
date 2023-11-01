import bcrypt from 'bcrypt';
import { connection } from '../config/db.js';

const Usuario = {
  async create({ idtipousuario, nombre, password, email, token, confirmado }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    


    connection.query("INSERT INTO usuario(idtipousuario, nombre, password, email, token, confirmado) VALUES (?,?,?,?,?,?) ", 
    [idtipousuario, nombre, hashedPassword, email, token, confirmado],
    (error, rows) => {
        if(error)
            throw error;
            const insertId = rows.insertId;
            return insertId || null;
        // response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
    });
    
    
  },

  async findByEmail({ email }) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM usuario WHERE email = ?";
      connection.query(query, [email], function (err, rows) {
        if (err) {
          reject(err); // Si hay un error, rechazamos la promesa
        } else {
          if (rows.length > 0) {
            // let idUsuario = rows[0].idUsuario;
            resolve(rows); // Resolvemos la promesa con el valor deseado
          } else {
            resolve(null); // Resolvemos con null si no se encuentra un usuario
          }
        }
      });
    });
  }
  ,

  

  async findById(id) {
    const [rows] = await connection.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0];
  },


  async comparePassword(passwordFormulario,password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwordFormulario, password, (err, result) => {
        if (err) {
          // Ocurrió un error al comparar las contraseñas.
          reject(err);
        } else {
          if (result) {
            // Las contraseñas coinciden, el inicio de sesión es exitoso.
            resolve(true);
          } else {
            // Las contraseñas no coinciden, el inicio de sesión falló.
            resolve(false);
          }
        }
      });
    });
  },

  async confirmarUsuario(token) {

     return new Promise((resolve, reject) => {
      let query = 'UPDATE usuario SET confirmado = true, token = "" WHERE token = ?';
      connection.query(query, [token], function (err, rows) {
        if (err) {
          reject(err); // Si hay un error, rechazamos la promesa
        } else {
          console.log(rows.affectedRows)
          if (rows.affectedRows > 0) {
            // let idUsuario = rows[0].idUsuario;
            resolve(true); // Resolvemos la promesa con el valor deseado
          } else {
            resolve(false); // Resolvemos con null si no se encuentra un usuario
          }
        }
      });
    });
  }
  

};

export default Usuario;
