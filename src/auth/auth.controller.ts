import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  signupLocal() {
    return this.authService.signupLocal()
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
