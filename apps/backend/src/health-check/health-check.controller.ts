import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  constructor() {}

  @Get()
  getData() {
    return {
        Status: 'Working'
    };
  }
}
