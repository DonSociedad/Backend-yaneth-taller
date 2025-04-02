import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  constructor() {
    this.client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async sendSms(name: string, phone: string, verificationCode: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: `Hola ${name}, tu código de verificación es: ${verificationCode}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      console.log('SMS enviado con éxito');
    } catch (error) {
      console.error('Error enviando SMS:', error);
    }
  }
}

