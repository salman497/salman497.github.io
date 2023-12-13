import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { GPTModule } from './gpt/gpt.module';
import { CommonModule } from './common/common.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HttpHeaderMiddleware } from './common/middleware/http-header.middleware';
import { AppInsightsMiddleware } from './common/middleware/app-insights.middleware';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
  }),
    CommonModule, 
    HealthCheckModule, 
    GPTModule, 
    // no more than 30 calls in a second, 200 calls in 10 seconds, and 1000 calls in a minute
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1 * 1000,
        limit: 30,
      },
      {
        name: 'medium',
        ttl: 10 * 1000,
        limit: 200
      },
      {
        name: 'long',
        ttl: 60 * 1000,
        limit: 1000
      }
      ])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpHeaderMiddleware, AppInsightsMiddleware).forRoutes('*');
  }
}
