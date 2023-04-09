import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto)
  }

  @Post('local/signin')
  siginLocal() {
    return this.authService.siginLocal()
  }

  @Post('local/logout')
  logout() {
    return this.authService.logout()
  }

  @Post('local/refresh')
  refreshToken() {
    return this.authService.refreshToken()
  }
}
