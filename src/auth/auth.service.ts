import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // --------------
  // MAIN METHODS |
  // --------------

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    try {
      // creating user in DB
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      // create tokens
      const tokens = await this.getTokens(
        user.id,
        user.email,
        user.licenseExpiredDate,
      );

      // update user's RT hash
      await this.updateRtHash(user.id, tokens.rt);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      return error;
    }
  }

  async siginLocal(dto: AuthDto): Promise<Tokens> {
    // finding user in DB
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('invalid email/password');

    // check if password match
    const match = await argon.verify(user.password, dto.password);
    if (!match) throw new ForbiddenException('invalid email or password!');

    // create tokens
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.licenseExpiredDate,
    );

    // update user's RT hash
    await this.updateRtHash(user.id, tokens.rt);
    return tokens;
  }

  async logout(user: any) {
    try {
      await this.prismaService.user.updateMany({
        where: { id: user.sub, rtHash: { not: null } },
        data: {
          rtHash: null,
        },
      });
      return { message: 'logged out successfully' };
    } catch (error) {
      return error;
    }
  }

  async refreshToken() {
    return {
      message: 'from refresh token',
    };
  }

  // ----------------
  // HELPER METHODS |
  // ----------------

  async hashData(data: string) {
    return argon.hash(data);
  }

  async getTokens(
    userId: string,
    email: string,
    licenseExp: Date,
    licenseKeyHash: string = '',
  ) {
    const payload = {
      sub: userId,
      email,
      licenseExp,
      licenseKeyHash,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);

    return { at, rt };
  }

  async updateRtHash(userId: string, rt: string) {
    try {
      const rtHash = await this.hashData(rt);
      await this.prismaService.user.update({
        where: { id: userId },
        data: { rtHash },
      });
      return;
    } catch (error) {
      return error;
    }
  }
}
