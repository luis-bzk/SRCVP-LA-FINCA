import nodemailer from 'nodemailer';
import { envs } from '../../config';

export class EmailGateway {
  constructor() {}

  static async sendEmailVerifyAccount({
    email,
    name,
    lastName,
    token,
  }: {
    email: string;
    name: string;
    lastName: string;
    token: string;
  }): Promise<{}> {
    const transport = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: Number(envs.SMTP_PORT),
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });

    await transport.sendMail({
      from: 'Iyai <gsgroup@gmail.com>',
      to: email,
      subject: 'Iyai - Confirma tu cuenta',
      text: 'Valida tu dirección email para acceder a tu cuenta por completo',
      html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Iyai - Confirma tu cuenta</title>
          <style>
            body {
              background-color: #f6f6f6;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #475569;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1 {
              text-align: center;
              color: #ea580c;
              margin-top: 0;
            }
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              background-color: #ea580c;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Iyai - Confirma tu cuenta</h1>
            <p>Hola ${name} ${lastName},</p>
            <p>Tu cuenta está casi lista. Haz clic en el siguiente enlace para verificar que eres el propietario de esta cuenta:</p>
            <p><a href="${envs.FRONTEND_URL}/auth/verify/${token}">Confirmar mi cuenta</a></p>
            <p>Si no creaste esta cuenta, por favor ignora este correo electrónico.</p>
          </div>
        </body>
      </html>
      `,
    });

    return {};
  }

  static async sendEmailRecoverPassword({
    email,
    name,
    lastName,
    token,
  }: {
    email: string;
    name: string;
    lastName: string;
    token: string;
  }): Promise<{}> {
    const transport = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: Number(envs.SMTP_PORT),
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });

    await transport.sendMail({
      from: 'Iyai <gsgroup@gmail.com>',
      to: email,
      subject: 'Iyai - Recuperar mi cuenta',
      text: 'Recupera el acceso a tu cuenta',
      html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Iyai - Cambiar mi contraseña</title>
          <style>
            body {
              background-color: #f6f6f6;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #475569;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1 {
              text-align: center;
              color: #ea580c;
              margin-top: 0;
            }
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              background-color: #ea580c;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Iyai - Cambia tu contraseña</h1>
            <p>Hola ${name} ${lastName},</p>
            <p>Nos has pedido recuperar el acceso a tu cuenta cambiando tu contraseña. No te preocupes, olvidar una contraseña es muy común.</p>
            <p>Para crear una nueva contraseña, haz clic en el siguiente enlace:</p>
            <p><a href="${envs.FRONTEND_URL}/auth/change-password/${token}">Cambiar mi contraseña</a></p>
            <p>Si no solicitaste este cambio de contraseña, por favor ignora este correo electrónico.</p>
          </div>
        </body>
      </html>
      `,
    });

    return {};
  }

  static async sendEmailVerifyAccountCustomer(userData: {
    email: string;
    name: string;
    lastName: string;
    token: string;
    temporalPassword: string;
  }): Promise<{}> {
    const { email, name, lastName, token, temporalPassword } = userData;

    const transport = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: Number(envs.SMTP_PORT),
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });
    await transport.sendMail({
      from: 'Iyai <gsgroup@gmail.com>',
      to: email,
      subject: 'Iyai - Confirma tu cuenta de afiliado',
      text: 'Valida tu dirección email para acceder a tu cuenta de afiliado',
      html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Iyai - Confirma tu cuenta de afiliado</title>
          <style>
            body {
              background-color: #f6f6f6;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #475569;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
            }
            h1 {
              text-align: center;
              color: #ea580c;
              margin-top: 0;
            }
            p {
              margin-top: 0;
              margin-bottom: 20px;
            }
            a {
              display: inline-block;
              background-color: #ea580c;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .password {
              display: block;
              padding: 10px 15px;
              color: #ea580c;
              background-color: #fff;
              border 1px solid #cbd5e1;
              border-radius: 5px;
              margin-top: 20px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Iyai - Confirma tu cuenta</h1>
            <p>Hola ${name} ${lastName},</p>
            <p>Has sido agregado al sistema Iyai como afiliado.</p>
            <p>Hemos generado una contraseña temporal para que puedas iniciar sesión una vez verifiques tu cuenta. Te recomendamos no compartir esta contraseña con nadie y, una vez que hayas iniciado sesión, cambiarla en tu perfil por una contraseña más segura.</p>
            <span class="password">${temporalPassword}</span>
            <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
            <p><a href="${envs.FRONTEND_URL}/auth/verify/${token}">Confirmar mi cuenta</a></p>
            <p>Si no creaste esta cuenta, por favor ignora este correo electrónico.</p>
          </div>
        </body>
      </html>
      `,
    });

    return {};
  }
}
