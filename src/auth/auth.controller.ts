import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/at.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto);
  }

  @Post('local/signin')
  siginLocal(@Body() dto: AuthDto) {
    return this.authService.siginLocal(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('local/logout')
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user);
  }

  @UseGuards(AuthGuard('rt-jwt'))
  @Post('local/refresh')
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(user);
  }
}
