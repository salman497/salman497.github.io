import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [],
})
export class HealthCheckModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes(HealthCheckController);
    }
}
