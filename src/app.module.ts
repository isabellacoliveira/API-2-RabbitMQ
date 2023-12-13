import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  // precisa da declaração da service para a controller funcionar
  providers: [AppService],
})
export class AppModule {}
