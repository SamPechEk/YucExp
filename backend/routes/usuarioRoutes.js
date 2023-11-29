import express from "express";
import { connection } from '../config/db.js';
import jwt from "jsonwebtoken";


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
import Stripe from "stripe";
import { emailReserva } from "../helpers/email.js";



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

const stripe = Stripe(process.env.STRIPE_SECRET);
router.post('/create-checkout-session', async (req, res) => {
  const token = req.body.token;
  const donativo = req.body.donativo * 100;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: 'Donativo YucExp',
          },
          unit_amount: donativo,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:7000/api/usuarios/reser/carget/${token}/${donativo}`,
    cancel_url: process.env.FRONTEND_URL+'/ShoppingCart',
  });
  // console.log(session.url);

  // res.redirect(303, session.url);
  return res.status(200).json({ success: true, url:session.url });
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
          let id;
          if (tabla == "actividades") {
            id = "idActividad";
          }
          if (tabla == "hoteles") {
            id = "idHotel";
          }
          if (tabla == "restaurantes") {
            id = "idRestaurante";
          }
          if (tabla == "lugar") {
            id = "idLugar";
          }
          const registros = rows.map((row) => ({
            nombre: row.nombre,
            img: row.img,
            tabla: tabla,
            idservicio: row[id],
            id: id,
            idMunicipio: row.idMunicipio
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



// Recibe datos desde frontend y se insertan en la tabla "itemscarrito" de la base de dato

router.post('/add/car', async (req, res) => {


  const { idusuario, tabla, idservicio, idMunicipio } = req.body;

  const decoded = jwt.verify(idusuario, process.env.JWT_SECRET);
  let iduser = decoded.id;
  const fechaCreacion = new Date(); // Obtén la fecha actual

  const verificarYCrearCarrito = async () => {
    return new Promise((resolve, reject) => {
      const carritoQuery = 'SELECT idcarrito FROM carrito WHERE idusuario = ? AND status = 0';
      connection.query(carritoQuery, [iduser], (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          if (rows.length > 0) {
            resolve(rows[0].idcarrito);
          } else {
            const createCarritoQuery = 'INSERT INTO carrito (idusuario, fechaCreacion, status, idmunicipio) VALUES (?, ?, 0,?)';
            connection.query(createCarritoQuery, [iduser, fechaCreacion, idMunicipio], (err, result) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve(result.insertId);
              }
            });
          }
        }
      });
    });
  };

  const insertarItemCarrito = (idcarrito) => {
    return new Promise((resolve, reject) => {
      const insertItemCarritoQuery = 'INSERT INTO itemscarrito (idcarrito, referenceIdServicio, idtiposervicio) VALUES (?, ?, ?)';
      connection.query(insertItemCarritoQuery, [idcarrito, idservicio, tabla], (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  verificarYCrearCarrito()
    .then((idcarrito) => insertarItemCarrito(idcarrito))
    .then(() => {
      return res.status(200).json({ success: true, msg: 'Item agregado al carrito' });
    })
    .catch((error) => {
      console.error('Error al agregar item al carrito:', error);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    });


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

// Eliminar items de itemscarrito
router.delete('/api/itemcarrito/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Realizar una consulta a la base de datos para eliminar el item del carrito por su ID
    await query('DELETE FROM itemscarrito WHERE id = ?', [id]);

    // Si se elimina correctamente, devuelve una respuesta exitosa
    res.status(200).json({ message: 'Artículo eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/user/:token', async (req, res) => {
  // Obtiene el token del encabezado de la solicitud
  const obtenerUser = (token) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE idUsuario = ?';

      connection.query(query, [token], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          resolve(null); // Usuario no encontrado
        } else {
          resolve(results[0]); // Devuelve los datos del usuario (primera fila)
        }
      });
    });
  };

  const { token } = req.params;
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Realiza una consulta a la base de datos para obtener la información del usuario
    const user = await obtenerUser(decoded.id);

    // Si el usuario no se encuentra en la base de datos, puedes manejarlo según tus necesidades
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía la información del usuario en la respuesta
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }



});

// Promisify the connection query method

router.get('/historial/car/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const idUsuario = decoded.id;

    const obtenerCarritosQuery = "SELECT carrito.idcarrito, carrito.fechaCreacion FROM carrito WHERE idusuario = ? AND status = 1";
    const carritoRows = await promisifyQuery(obtenerCarritosQuery, [idUsuario]);

    if (carritoRows.length === 0) {
      return res.status(200).json({ success: true, msg: 'No se encontraron carritos finalizados para el usuario.', items: [] });
    }

    const items = [];

    for (const carrito of carritoRows) {
      const { idcarrito, fechaCreacion } = carrito;
      const obtenerDetallesServicioQuery =
        "SELECT itemscarrito.iditem, itemscarrito.idcarrito, itemscarrito.idTipoServicio, itemscarrito.referenceIdServicio" +
        " FROM itemscarrito" +
        " WHERE itemscarrito.idcarrito = ?";
      const elementosRows = await promisifyQuery(obtenerDetallesServicioQuery, [idcarrito]);

      for (const elemento of elementosRows) {
        const { iditem, idTipoServicio, referenceIdServicio } = elemento;
        let id = "";

        if (elemento.idTipoServicio == "actividades") {
          id = "idActividad";
        }
        if (elemento.idTipoServicio == "hoteles") {
          id = "idHotel";
        }
        if (elemento.idTipoServicio == "restaurantes") {
          id = "idRestaurante";
        }
        if (elemento.idTipoServicio == "lugar") {
          id = "idLugar";
        }

        const obtenerDetallesServicioQuery = `SELECT nombre, img FROM ${elemento.idTipoServicio} WHERE ${id} = ?`;
        const servicioRow = await promisifyQuery(obtenerDetallesServicioQuery, [referenceIdServicio]);

        if (servicioRow.length > 0) {
          items.push({
            iditem,
            idcarrito,
            fechaCreacion,
            idTipoServicio,
            referenceIdServicio,
            detallesServicio: servicioRow[0],
          });
        }
      }
    }

    return res.status(200).json({ success: true, msg: 'Carritos finalizados encontrados.', items });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, msg: 'Error en el servidor' });
  }
});

router.get('/historial2/car/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const idUsuario = decoded.id;
    const obtenerCarritosQuery = "SELECT carrito.idcarrito, carrito.fechaCreacion, carrito.donativo FROM carrito WHERE idusuario = ? AND status = 1";
    const carritoRows = await promisifyQuery(obtenerCarritosQuery, [idUsuario]);

    if (carritoRows.length === 0) {
      return res.status(200).json({ success: true, msg: 'No se encontraron carritos finalizados para el usuario.', items: [] });
    }

    const carritos = {};
    const lugar = "";
    for (const carrito of carritoRows) {
      const { idcarrito, fechaCreacion, donativo } = carrito;
      
      const obtenerDetallesServicioQuery =
        "SELECT itemscarrito.iditem, itemscarrito.idcarrito, itemscarrito.idTipoServicio, itemscarrito.referenceIdServicio" +
        " FROM itemscarrito" +
        " WHERE itemscarrito.idcarrito = ?";
      const elementosRows = await promisifyQuery(obtenerDetallesServicioQuery, [idcarrito]);

      for (const elemento of elementosRows) {
        const { iditem, idTipoServicio, referenceIdServicio } = elemento;
        let id = "";

        if (elemento.idTipoServicio == "actividades") {
          id = "idActividad";
        }
        if (elemento.idTipoServicio == "hoteles") {
          id = "idHotel";
        }
        if (elemento.idTipoServicio == "restaurantes") {
          id = "idRestaurante";
        }
        if (elemento.idTipoServicio == "lugar") {
          id = "idLugar";
        }

        const obtenerDetallesServicioQuery = `SELECT nombre, img, idMunicipio FROM ${elemento.idTipoServicio} WHERE ${id} = ?`;
        const servicioRow = await promisifyQuery(obtenerDetallesServicioQuery, [referenceIdServicio]);
        const obtenerDetallesMunicipioQuery = `SELECT nombre FROM municipios WHERE idMunicipio = ?`;
        const municipioRow = await promisifyQuery(obtenerDetallesMunicipioQuery, [servicioRow[0].idMunicipio]);
        
        if (servicioRow.length > 0) {
          // Si es la primera vez que encontramos este carrito, creamos un objeto vacío para él
          if (!carritos[idcarrito]) {
            carritos[idcarrito] = {
              idcarrito,
              fechaCreacion,
              items: [],
              municipio:municipioRow[0].nombre,
              donativo
            };
          }
          
          carritos[idcarrito].items.push({
            iditem,
            idcarrito,
            idTipoServicio,
            referenceIdServicio,
            detallesServicio: servicioRow[0],
            donativo
          });
        }
      }
    }

    // Convertimos el objeto de carritos en un array para obtener la respuesta final
    const carritosArray = Object.values(carritos);
    

    return res.status(200).json({ success: true, msg: 'Carritos finalizados encontrados.', carritos: carritosArray });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, msg: 'Error en el servidor' });
  }
});

router.get('/paquetes/:idMunicipio', async (req, res) => {
  try {
    const { idMunicipio } = req.params;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const idUsuario = decoded.id;
    const obtenerCarritosQuery = "SELECT carrito.idcarrito, carrito.fechaCreacion, carrito.donativo FROM carrito WHERE idmunicipio = ? and status = 1";
    const carritoRows = await promisifyQuery(obtenerCarritosQuery, [idMunicipio]);

    if (carritoRows.length === 0) {
      return res.status(200).json({ success: true, msg: 'No se encontraron paquetes', items: [] });
    }

    const carritos = {};
    const lugar = "";
    for (const carrito of carritoRows) {
      const { idcarrito, fechaCreacion, donativo } = carrito;
      
      const obtenerDetallesServicioQuery =
        "SELECT itemscarrito.iditem, itemscarrito.idcarrito, itemscarrito.idTipoServicio, itemscarrito.referenceIdServicio" +
        " FROM itemscarrito" +
        " WHERE itemscarrito.idcarrito = ?";
      const elementosRows = await promisifyQuery(obtenerDetallesServicioQuery, [idcarrito]);

      for (const elemento of elementosRows) {
        const { iditem, idTipoServicio, referenceIdServicio } = elemento;
        let id = "";

        if (elemento.idTipoServicio == "actividades") {
          id = "idActividad";
        }
        if (elemento.idTipoServicio == "hoteles") {
          id = "idHotel";
        }
        if (elemento.idTipoServicio == "restaurantes") {
          id = "idRestaurante";
        }
        if (elemento.idTipoServicio == "lugar") {
          id = "idLugar";
        }

        const obtenerDetallesServicioQuery = `SELECT nombre, img, idMunicipio FROM ${elemento.idTipoServicio} WHERE ${id} = ?`;
        const servicioRow = await promisifyQuery(obtenerDetallesServicioQuery, [referenceIdServicio]);
        const obtenerDetallesMunicipioQuery = `SELECT nombre FROM municipios WHERE idMunicipio = ?`;
        const municipioRow = await promisifyQuery(obtenerDetallesMunicipioQuery, [servicioRow[0].idMunicipio]);
        
        if (servicioRow.length > 0) {
          // Si es la primera vez que encontramos este carrito, creamos un objeto vacío para él
          if (!carritos[idcarrito]) {
            carritos[idcarrito] = {
              idcarrito,
              fechaCreacion,
              items: [],
              municipio:municipioRow[0].nombre,
              donativo
            };
          }
          
          carritos[idcarrito].items.push({
            iditem,
            idcarrito,
            idTipoServicio,
            referenceIdServicio,
            detallesServicio: servicioRow[0],
            donativo
          });
        }
      }
    }

    // Convertimos el objeto de carritos en un array para obtener la respuesta final
    const carritosArray = Object.values(carritos);
    

    return res.status(200).json({ success: true, msg: 'Carritos finalizados encontrados.', carritos: carritosArray });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, msg: 'Error en el servidor' });
  }
});


// Función para convertir las consultas a promesas
function promisifyQuery(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}







// Ruta para obtener elementos del carrito del usuario
router.get('/list/car/:token', async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let iduser = decoded.id;
  // Desencripta el token para obtener el id del usuario
  const idusuario = iduser;
  const obtenerCarritoQuery = 'SELECT idcarrito FROM carrito WHERE idusuario = ? AND status = 0';
  connection.query(obtenerCarritoQuery, [idusuario], (err, carritoRows) => {
    if (err) {
      console.error('Error al obtener el carrito:', err);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }

    if (carritoRows.length === 0) {
      // No se encontró un carrito activo para el usuario
      return res.status(200).json({ success: true, items: [] });
    }

    const idcarrito = carritoRows[0].idcarrito;

    // Obtener los elementos del carrito
    const obtenerElementosCarritoQuery = `
      SELECT ic.iditem, ic.idcarrito, ic.idTipoServicio, ic.referenceIdServicio
      FROM itemscarrito ic
      WHERE ic.idcarrito = ?
    `;

    connection.query(obtenerElementosCarritoQuery, [idcarrito], (err, elementosRows) => {
      if (err) {
        console.error('Error al obtener elementos del carrito:', err);
        return res.status(500).json({ success: false, msg: 'Error en el servidor' });
      }

      const items = [];

      // Procesar los elementos del carrito y obtener detalles de los servicios
      elementosRows.forEach((elemento) => {
        const { iditem, idTipoServicio, referenceIdServicio } = elemento;
        let id = "";
        if (idTipoServicio == "actividades") {
          id = "idActividad";
        }
        if (idTipoServicio == "hoteles") {
          id = "idHotel";
        }
        if (idTipoServicio == "restaurantes") {
          id = "idRestaurante";
        }
        if (idTipoServicio == "lugar") {
          id = "idLugar";
        }
        // Consulta para obtener detalles del servicio de la tabla correspondiente (usando idTipoServicio)
        const obtenerDetallesServicioQuery = `SELECT nombre, img FROM ${idTipoServicio} WHERE ${id} = ?`;

        connection.query(obtenerDetallesServicioQuery, [referenceIdServicio], (err, servicioRow) => {
          if (err) {
            console.error('Error al obtener detalles del servicio:', err);
          } else {
            if (servicioRow.length > 0) {
              items.push({
                iditem,
                idcarrito,
                idTipoServicio,
                referenceIdServicio,
                detallesServicio: servicioRow[0],
              });
            }
          }

          // Cuando hayas procesado todos los elementos, envía la respuesta
          if (items.length === elementosRows.length) {
            return res.status(200).json({ success: true, items });
          }
        });
      });
    });
  });
});

router.delete('/delete/caritem/:id', (req, res) => {
  const itemId = req.params.id;

  // Realiza una consulta para eliminar el artículo del carrito
  const deleteItemQuery = 'DELETE FROM itemscarrito WHERE iditem = ?';

  connection.query(deleteItemQuery, [itemId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el artículo del carrito:', err);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, msg: 'No se encontró el artículo en el carrito' });
    }

    return res.status(200).json({ success: true, msg: 'Artículo eliminado del carrito' });
  });
});

// Ruta para cambiar el estado del carrito a 1
router.put('/reser/car', (req, res) => {
  const idUsuario = req.body.idusuario; // Asegúrate de enviar el ID de usuario en el cuerpo de la solicitud
  const decoded = jwt.verify(idUsuario, process.env.JWT_SECRET);
  let iduser = decoded.id;
  // Realiza una consulta SQL para actualizar el estado del carrito
  const updateCarritoQuery = 'UPDATE carrito SET status = 1 WHERE idusuario = ?';

  connection.query(updateCarritoQuery, [iduser], (error, result) => {
    if (error) {
      console.error('Error al cambiar el estado del carrito:', error);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }
    return res.status(200).json({ success: true, msg: 'Estado del carrito actualizado correctamente' });
  });
});
router.get('/reser/carget/:idUsuario/:donativo', async (req, res) => {
  const { idUsuario, donativo } = req.params;
  const decoded = jwt.verify(idUsuario, process.env.JWT_SECRET);
  let iduser = decoded.id;

  const query = 'SELECT * FROM usuario WHERE idUsuario = ?';
  const user = "";
  const userElementosRows = await promisifyQuery(query, [iduser]);

  // Realiza una consulta SQL para actualizar el estado del carrito
  const updateCarritoQuery = 'UPDATE carrito SET status = 1, donativo = ? WHERE idusuario = ? and status = 0';

  connection.query(updateCarritoQuery, [donativo/100,iduser], (error, result) => {
    if (error) {
      console.error('Error al cambiar el estado del carrito:', error);
      return res.status(500).json({ success: false, msg: 'Error en el servidor' });
    }
    return res.redirect(302, process.env.FRONTEND_URL+'/ShoppingList/1');
  });

  
    
  emailReserva({
    email: userElementosRows[0].email,
    nombre: userElementosRows[0].nombre,
    donativo:donativo/100
  });
});
async function fetchAccessToken2() {
  try {
    const body = {
      name: "6452b8ab-f069-4f37-9052-a6fdadf48f72",
      secret: "729563199d07622a6b3296c3320c6732f9d3e6efdce42cfbfb30c5e445d5218a"
    }

    const response = await fetch(
      "https://api.app.preset.io/v1/auth/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const jsonResponse = await response.json()
    // console.log("access",jsonResponse);
    return jsonResponse.payload.access_token
  } catch (e) {
    console.error(e)
  }
}

async function fetchGuestToken2() {
  const accessToken = await fetchAccessToken2()
  console.log("access",accessToken);
  try {
    const body = {
      resources: [
        {
          type: "dashboard",
          id: "c17ccf6b-eb68-402e-b435-bc121350df89",
        },
      ],
      rls: [],
      user: {
        username: "Samuel Ismael",
        first_name: "Pech",
        last_name: "Ek",
      },
    }
    const response = await fetch(
      "https://api.app.preset.io/v1/teams/a197342f/workspaces/b16d05ec/guest-token/",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const jsonResponse = await response.json()
    // console.log("guesy",jsonResponse);
    return jsonResponse.payload.token
  } catch (error) {
    console.error(error)
  }
}

router.get("/guest-token2", async (req, res) => {
  const token = await fetchGuestToken2()
  // console.log("tok",token);
  res.json(token)
})
export default router;
