import nodemailer from "nodemailer";

// Definir el tipo de opciones de correo electrónico
interface OpcionesCorreo {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Crear un transportador utilizando configuraciones personalizadas de SMTP
const transportador = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Servidor SMTP (ejemplo: smtp.ejemplo.com)
  port: parseInt(process.env.SMTP_PORT || "587"), // Puerto SMTP (ejemplo: 587 para TLS)
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Dirección de correo electrónico (ejemplo: reservaciones@margaritavilleresorts.com.mx)
    pass: process.env.SMTP_PASSWORD, // Contraseña del correo electrónico
  },
});

// Función para enviar un correo electrónico
export const enviarCorreo = async ({
  to,
  subject,
  text,
  html,
}: OpcionesCorreo): Promise<void> => {
  const opcionesCorreo = {
    from: `Reservaciones <${process.env.SMTP_USER}>`, // Dirección del remitente
    to, // Dirección del destinatario
    subject, // Asunto del correo
    text, // Cuerpo del correo en texto plano
    html, // Cuerpo del correo en HTML (opcional)
  };

  try {
    await transportador.sendMail(opcionesCorreo);
  } catch (error) {
    throw new Error("Error al enviar el correo");
  }
};
