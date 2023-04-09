import { AuthGuard } from '@nestjs/passport';

export class AccessTokenGuard extends AuthGuard('at-jwt') {
  constructor() {
    super({});
  }
}
