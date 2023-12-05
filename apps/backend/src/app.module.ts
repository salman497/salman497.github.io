import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { GPTModule } from './gpt/gpt.module';

@Module({
  imports: [HealthCheckModule, GPTModule],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply().forRoutes('*');
  }
}
