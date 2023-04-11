import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  create(@GetUserId() userId: string, @Body() createFigmaComponentDto: CreateFigmaComponentDto) {
    return this.figmaComponentService.create(userId, createFigmaComponentDto);
  }

  @Get()
  findAll() {
    return this.figmaComponentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.figmaComponentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFigmaComponentDto: UpdateFigmaComponentDto) {
    return this.figmaComponentService.update(+id, updateFigmaComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.figmaComponentService.remove(+id);
  }
}
