import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUseDto } from 'src/users/dtos/user.dto';
import { AuthService } from 'src/users/services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('register')
  async create(@Body() payload: RegisterUseDto) {
    return this.authService.register(payload).catch((error) => {
      return error;
    });
  }

  @Post('login')
  async login(@Body() payload: LoginUserDto) {
    return this.authService.login(payload).catch((error) => {
      return error;
    });
  }
}
