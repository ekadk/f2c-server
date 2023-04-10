import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/rt.guard';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  siginLocal(@Body() dto: AuthDto) {
    return this.authService.siginLocal(dto);
  }

  @Post('local/logout')
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('local/refresh')
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(user);
  }
}
