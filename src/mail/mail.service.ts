import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // Usamos el servicio de Gmail
      auth: {
        user: 'juanma.correo2006@gmail.com',  // Cambia esto por tu email de Gmail
        pass: 'byff tppg bflq yzct', // Usa la contraseña de aplicación de Gmail
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"Mi App" juanma.correo2006@gmail.com', // Cambia esto
        to,
        subject,
        text,
        html,
      });

      console.log('Correo enviado: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw new Error('No se pudo enviar el correo.');
    }
  }
}