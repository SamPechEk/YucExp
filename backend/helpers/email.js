import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"YucExp - Administrador" <cuentas@YucExp.com.mx>',
    to: email,
    subject: "YucExp - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en YucExp",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en YucExp</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirma/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

export const emailReserva = async (datos) => {
  const { donativo, email, nombre } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"YucExp - Confirmación" <info@YucExp.com.mx>',
    to: email,
    subject: "YucExp - Tu reserva se completo",
    text: "Detalles de servicio y donativo",
    html: `<p>Hola: ${nombre} tu reserva esta lista</p>
    <p>Gracias por tu donación de: $${donativo}MXN tu reserva esta lista</p>
    <p>Puedes verificar y descargar el comprobante en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/ShoppingList/1">Ver detalles</a>
    
    <p>Gracias!</p>
    
    
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"YucExp - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "YucEcp - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};
