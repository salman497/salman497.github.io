import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health Check')

@Controller()
export class HealthCheckController {
  constructor() {}

  @Get(['/live'])
  @ApiOperation({ summary: 'Check Service Health' })
  @ApiOkResponse({ 
    description: 'Health check response', 
    schema: { 
      example: { 
        Status: 'Working' 
      } 
    } 
  })
  getData() {
    return {
        Status: 'Working'
    };
  }
}
