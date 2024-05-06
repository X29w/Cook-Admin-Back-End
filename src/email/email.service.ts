import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('NODEMAILER_USER'),
        pass: this.configService.get('NODEMAILER_PASS'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '方圆小厨房',
        address: this.configService.get('NODEMAILER_USER'),
      },
      to,
      subject,
      html,
    });
  }
}
