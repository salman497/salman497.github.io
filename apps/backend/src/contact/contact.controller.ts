import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiProperty } from '@nestjs/swagger';
import * as nodemailer from 'nodemailer';

// Define a DTO (Data Transfer Object) for better type checking and Swagger documentation
class ContactMailDto {
  @ApiProperty({
    description: 'subject of email.',
    required: true
  })
  title: string;
  @ApiProperty({
    description: 'Message body of email.',
    required: true
  })
  message: string;
  @ApiProperty({
    description: 'email address.',
    required: true
  })
  email: string;
  @ApiProperty({
    description: 'request type.',
    required: true
  })
  type: string;
}

@ApiTags('contact')
@Controller('contact')
export class ContactController {

  @Post()
  @ApiOperation({ summary: 'Send email' })
  @ApiBody({ type: ContactMailDto })
  async sendMail(@Body() body: ContactMailDto) {
    const transporter = nodemailer.createTransport({
      // Set up your SMTP server details here
      service: 'Gmail',
      auth: {
        user: 'genaitutorials@gmail.com',
        pass: 'lsow brct lvdd qajb'
      }
    });

    const mailOptions = {
      from: body.email,
      to: 'genaitutorials@gmail.com',
      subject: body.title,
      text: `Message: ${body.message}\nFrom: ${body.email}\nType: ${body.type}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
