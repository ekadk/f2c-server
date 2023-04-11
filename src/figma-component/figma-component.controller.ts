import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FigmaComponentService } from './figma-component.service';
import { CreateFigmaComponentDto } from './dto/create-figma-component.dto';
import { UpdateFigmaComponentDto } from './dto/update-figma-component.dto';

@Controller('figma-component')
export class FigmaComponentController {
  constructor(private readonly figmaComponentService: FigmaComponentService) {}

  @Post()
  create(@Body() createFigmaComponentDto: CreateFigmaComponentDto) {
    return this.figmaComponentService.create(createFigmaComponentDto);
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
