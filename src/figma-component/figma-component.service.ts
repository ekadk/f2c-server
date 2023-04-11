import { Injectable } from '@nestjs/common';
import { CreateFigmaComponentDto } from './dto/create-figma-component.dto';
import { UpdateFigmaComponentDto } from './dto/update-figma-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FigmaComponentService {
  constructor(private prismaService: PrismaService) {}

  async create(
    userId: string,
    createFigmaComponentDto: CreateFigmaComponentDto,
  ) {
    try {
      const figmaComponent = await this.prismaService.figmaComponent.create({
        data: {
          data: createFigmaComponentDto.data,
          userId,
        },
      });
      return figmaComponent;
    } catch (error) {
      throw error;
    }
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
