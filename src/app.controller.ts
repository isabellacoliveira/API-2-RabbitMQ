import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//  podemos modificar nosso controller desse jeito
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // define o método
  @Get('name')
  getHello(): string {
    return this.appService.getHello();
  }
}
