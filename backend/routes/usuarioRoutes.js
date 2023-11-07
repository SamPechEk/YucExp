import express from "express";
import { connection } from '../config/db.js';
const router = express.Router();
import {
  registrar,
  autenticar,
  confirma,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar); 
router.get("/confirma/:token", confirma);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);
router.get('/municipios', (req, res) => {
  const query = 'SELECT idMunicipio, nombre FROM municipios'; // Ajusta la consulta según tu esquema de base de datos
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error en la base de datos' });
      return;
    }

    const municipios = results.map(item => ({
      idMunicipio: item.idMunicipio,
      nombreMunicipio: item.nombre,
    }));
    res.json(municipios);
  });
});

router.get('/randomServices/:municipio', async (req, res) => {
  const { municipio } = req.params;

  // Función para obtener un registro aleatorio de una tabla
  const obtenerRegistroAleatorio = (tabla, nombreColumna, tablaNombre) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tabla} WHERE idmunicipio = ? ORDER BY RAND() LIMIT 1`;

      connection.query(query, [municipio], function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (rows.length > 0) {
            resolve({
              nombre: rows[0].nombre,
              img: rows[0].img,
              typeImg: rows[0].typeImg,
              tabla: tablaNombre,
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  };

  try {
    const actividadesPromise = obtenerRegistroAleatorio('actividades', 'nombre', 'Actividades');
    const hotelesPromise = obtenerRegistroAleatorio('hoteles', 'nombre', 'Hoteles');
    const restaurantesPromise = obtenerRegistroAleatorio('restaurantes', 'nombre', 'Restaurantes');
    const lugarPromise = obtenerRegistroAleatorio('lugar', 'nombre', 'Lugar');

    // Espera a que todas las promesas se resuelvan
    Promise.all([actividadesPromise, hotelesPromise, restaurantesPromise, lugarPromise])
      .then((resultados) => {
        const registros = resultados.filter((registro) => registro !== null);
        res.json(registros);
      })
      .catch((error) => {
        console.error('Error al obtener registros aleatorios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
      });
  } catch (error) {
    console.error('Error al obtener registros aleatorios:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


router.get('/Services/:municipio', async (req, res) => {
  const { municipio } = req.params;

  // Función para obtener todos los registros de una tabla
  const obtenerRegistros = (tabla, nombreColumna, tablaNombre) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tabla} WHERE idmunicipio = ?`;

      connection.query(query, [municipio], function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const registros = rows.map((row) => ({
            nombre: row.nombre,
            img: row.img,
            typeImg: row.typeImg,
          }));
          resolve({ [tablaNombre]: registros });
        }
      });
    });
  };

  try {
    const actividadesPromise = obtenerRegistros('actividades', 'nombre', 'Actividades');
    const hotelesPromise = obtenerRegistros('hoteles', 'nombre', 'Hoteles');
    const restaurantesPromise = obtenerRegistros('restaurantes', 'nombre', 'Restaurantes');
    const lugarPromise = obtenerRegistros('lugar', 'nombre', 'Lugar');

    // Espera a que todas las promesas se resuelvan
    Promise.all([actividadesPromise, hotelesPromise, restaurantesPromise, lugarPromise])
      .then((resultados) => {
        const respuesta = {};
        resultados.forEach((resultado) => {
          Object.assign(respuesta, resultado);
        });
        res.json(respuesta);
      })
      .catch((error) => {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: 'Error en el servidor' });
      });
  } catch (error) {
    console.error('Error al obtener registros:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Recibe datos desde frontend y se insertan en la tabla "itemscarrito" de la base de datos
router.post('/api/card', async (req, res) => {
  try {
    const { item } = req.body; // El objeto del servicio enviado desde el frontend

    // Inserta el artículo en la tabla del carrito en tu base de datos
    await query('INSERT INTO itemscarrito (nombre, img, typeImg) VALUES (?, ?, ?)', [
      //datos que se envian
      item.nombre,
      item.img,
      item.typeImg,
    ]);

    // Si se inserta bien a la tabla, devuelve este mensaje:
    res.status(200).json({ message: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    //Error
    console.error('Error al agregar el artículo al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Solicitud Get para agregar datos a la vista del Carrito
router.get('/api/itemcarrito', async (req, res) => {
  try {
    const itemsCarrito = await query('SELECT * FROM itemscarrito');

    // Enviar los datos del carrito como respuesta
    res.status(200).json(itemsCarrito);
  } catch (error) {
    //Mensaje de error
    console.error('Error al obtener los datos del carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar items del carrito
router.delete('/api/itemcarrito/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Se realiza la consulta a la base de datos para eliminar item del carrito por el ID
    await query('DELETE FROM itemscarrito WHERE id = ?', [id]);
    
    // Si se elimina correctamente, devuelve este mensaje
    res.status(200).json({ message: 'Artículo eliminado del carrito correctamente' });
  } catch (error) {
    //Mensaje de errores
    console.error('Error al eliminar el artículo del carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



export default router;
