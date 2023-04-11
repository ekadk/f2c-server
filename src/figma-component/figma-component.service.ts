import { Injectable } from '@nestjs/common';
import { CreateFigmaComponentDto } from './dto/create-figma-component.dto';
import { UpdateFigmaComponentDto } from './dto/update-figma-component.dto';

@Injectable()
export class FigmaComponentService {
  create(createFigmaComponentDto: CreateFigmaComponentDto) {
    return 'This action adds a new figmaComponent';
  }

  findAll() {
    return `This action returns all figmaComponent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} figmaComponent`;
  }

  update(id: number, updateFigmaComponentDto: UpdateFigmaComponentDto) {
    return `This action updates a #${id} figmaComponent`;
  }

  remove(id: number) {
    return `This action removes a #${id} figmaComponent`;
  }
}
