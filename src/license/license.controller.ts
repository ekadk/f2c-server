import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { GetUserId } from 'src/common/decorator/get-user-id.decorator';
import { LicenseGuard } from './guards/license.guard';

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

  @UseGuards(LicenseGuard)
  @Get('test-guard')
  testGuard(@GetUserId() userId: string) {
    return {
      userId,
      message: "passed license guard!"
    }
  }
}
