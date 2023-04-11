import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FigmaComponentService } from './figma-component.service';
import { CreateFigmaComponentDto } from './dto/create-figma-component.dto';
import { UpdateFigmaComponentDto } from './dto/update-figma-component.dto';
import { LicenseGuard } from 'src/license/guards/license.guard';
import { GetUserId } from 'src/common/decorator/get-user-id.decorator';

@UseGuards(LicenseGuard)
@Controller('figma-component')
export class FigmaComponentController {
  constructor(private readonly figmaComponentService: FigmaComponentService) {}

  @Post()
  create(
    @GetUserId() userId: string,
    @Body() createFigmaComponentDto: CreateFigmaComponentDto,
  ) {
    return this.figmaComponentService.create(userId, createFigmaComponentDto);
  }

  @Get()
  findAll(@GetUserId() userId: string) {
    return this.figmaComponentService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUserId() userId: string, @Param('id') id: string) {
    return this.figmaComponentService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUserId() userId: string,
    @Param('id') id: string,
    @Body() updateFigmaComponentDto: UpdateFigmaComponentDto,
  ) {
    return this.figmaComponentService.update(
      userId,
      id,
      updateFigmaComponentDto,
    );
  }

  @Delete(':id')
  remove(@GetUserId() userId: string, @Param('id') id: string) {
    return this.figmaComponentService.remove(userId, id);
  }
}
