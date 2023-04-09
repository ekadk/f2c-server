import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: string
  email: string
  licenseKeyHash: string
  licenseExp: string
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
