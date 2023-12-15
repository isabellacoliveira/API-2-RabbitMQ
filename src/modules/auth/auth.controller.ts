import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// mudar a rota
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
