import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('rt-jwt') {
  constructor() {
    super({});
  }
}
