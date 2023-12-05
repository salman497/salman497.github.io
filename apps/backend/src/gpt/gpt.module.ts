import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GPTController } from './gpt.controller';

@Module({
  imports: [],
  controllers: [GPTController],
  providers: [],
})
export class GPTModule  implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes(GPTController);
    }
}
