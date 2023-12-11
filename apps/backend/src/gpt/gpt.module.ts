import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GPTController } from './gpt.controller';
import { GPTService } from './services/gpt.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [GPTController],
  providers: [GPTService],
})
export class GPTModule  implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes(GPTController);
    }
}
