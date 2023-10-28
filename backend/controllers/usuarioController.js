import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";


const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findByEmail({email});
   // Comprueba si el usuario ya existe en la base de datos
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({success:false, msg: error.message });
  }
  try {
    // Crea un nuevo usuario
    const token = generarId();
    await Usuario.create({ ...req.body, token, confirmado: false });

    // Enviar el email de confirmación
    emailRegistro({
      email: req.body.email,
      nombre: req.body.nombre,
      token,
    });

    res.json({
      success: true,
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
    res.json({ 
      success: false,
      msg: "Error en el servidor" 
    });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findByEmail(email);
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password
  if (await usuario.comparePassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El Password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};



const confirma = async (req, res) => {
  const { token } = req.params;

  try {
    const usuarioConfirmar = await Usuario.confirmarUsuario(token);
    if (usuarioConfirmar) {
      return res.status(201).json({ success:true,msg: "Usuario confirmado con éxito" });

      
    }
    return res.status(404).json({ success:false,msg: "Token no válido" });
  } catch (error) {
    
    return res.json({ success:false,msg: "Error al confirmar el usuario" });
  }
};


const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // Enviar el email
    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token válido y el Usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirma,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
