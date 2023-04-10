import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import axios from 'axios';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LicenseService {
  constructor(
    private prismaService: PrismaService,
    configService: ConfigService,
  ) {}

  async create(userId: string, createLicenseDto: CreateLicenseDto) {
    try {
      const instance_name = await argon.hash(userId);
      const data = await this.requestToLemonSqueezy(
        createLicenseDto.license_key,
        instance_name,
      );
      if (data.status !== 'active')
        throw new ForbiddenException(`can't activate license`);

      const expiredDate = this.getLicenseExpiredDate(data.createdAt);
      const hashedKey = await argon.hash(createLicenseDto.license_key);

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          licenseKey: hashedKey,
          licenseExpiredDate: expiredDate,
        },
      });

      return {
        message: 'license key added!', 
      };
    } catch (error) {
      return error;
    }
  }

  async requestToLemonSqueezy(license_key: string, instance_name: string) {
    const url = 'https://api.lemonsqueezy.com/v1/licenses/activate';
    try {
      const { data } = await axios.post(
        url,
        {
          license_key,
          instance_name,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const extracted = {
        status: data.license_key.status,
        createdAt: data.license_key.created_at,
        instanceId: data.instance.id,
        instanceName: data.instance.name,
      };

      return extracted;
    } catch (error) {
      throw error;
    }
  }

  getLicenseExpiredDate(createdDate) {
    const formattedCreatedDate = new Date(createdDate);
    const licenseExpiredDate = new Date(
      formattedCreatedDate.setMonth(formattedCreatedDate.getMonth() + 1),
    );
    return licenseExpiredDate.toJSON();
  }
}
