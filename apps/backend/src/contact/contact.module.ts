import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContactController } from './contact.controller';


@Module({
  imports: [],
  controllers: [ContactController],
  providers: [],
})
export class ContactModule  implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes(ContactController);
    }
}
