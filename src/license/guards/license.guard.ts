import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = await this.prismaService.user.findUnique({
        where: { id: request.user.sub },
      });

      if (!user) throw new ForbiddenException('no user');
      const license_key = request.headers.license_key;
      if (!license_key) throw new ForbiddenException('no license key');

      const matchedLicenseKey = await argon.verify(
        user.licenseKey,
        license_key,
      );
      if (!matchedLicenseKey)
        throw new ForbiddenException('invalid license key');

      const currentDate = new Date();
      const expiredDate = new Date(user.licenseExpiredDate);
      if (currentDate >= expiredDate)
        throw new ForbiddenException('license expired');

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
