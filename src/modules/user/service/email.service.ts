import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true если используется SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  public async sendVerificationEmail(to: string, confirmUrl: string): Promise<void> {
    const subject = 'Подтверждение регистрации';
    const html = `
      <p>Здравствуйте!</p>
      <p>Пожалуйста, подтвердите ваш email, перейдя по ссылке ниже:</p>
      <p><a href="${confirmUrl}">Подтверждение</a></p>
      <p>Если вы не регистрировались — просто проигнорируйте это письмо.</p>
    `;

    try {
      await this.transporter.sendMail({
        from: `<${process.env.SMTP_HOST}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Verification email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${to}`, error.stack);
      throw error;
    }
  }
}
