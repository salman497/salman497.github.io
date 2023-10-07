import { Controller, Post, Body, HttpCode, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express'; // for Express.js Response object
import { AppService } from './app.service';

@Controller('openai')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  @HttpCode(200)
  async generateResponse(@Body('prompt') prompt: string, @Res() res: Response) {
    const result = await this.appService.generateResponse(prompt);
    
    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({ message: result.getResponse() });
    } else {
      return res.json(result); // result is an object with markdown property
    }
  }
}
