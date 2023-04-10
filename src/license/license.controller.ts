import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { GetUserId } from 'src/common/decorator/get-user-id.decorator';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post()
  create(
    @GetUserId() userId: string,
    @Body() createLicenseDto: CreateLicenseDto,
  ) {
    return this.licenseService.create(userId, createLicenseDto);
  }
}
