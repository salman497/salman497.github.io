import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('openai')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  @HttpCode(200)
  async generateResponse(@Body('prompt') prompt: string): Promise<string> {
    return this.appService.generateResponse(prompt);
  }
}
