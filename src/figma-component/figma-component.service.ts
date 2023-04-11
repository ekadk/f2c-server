import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(userId: string) {
    try {
      const figmaComponents = await this.prismaService.figmaComponent.findMany({
        where: { userId },
      });
      return figmaComponents;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const figmaComponent = await this.prismaService.figmaComponent.findFirst({
        where: { userId, id },
      });
      if (!figmaComponent) throw new NotFoundException('component not found!');
      return figmaComponent;
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: string,
    id: string,
    updateFigmaComponentDto: UpdateFigmaComponentDto,
  ) {
    try {
      const figmaComponent = await this.prismaService.figmaComponent.findFirst({
        where: { userId, id },
      });
      if (!figmaComponent) throw new NotFoundException('component not found!');

      if (!updateFigmaComponentDto.data) return { message: 'nothing change' };

      const updatedFigmaComponent =
        await this.prismaService.figmaComponent.update({
          where: { id },
          data: {
            data: updateFigmaComponentDto.data,
          },
        });

      return {
        ...updatedFigmaComponent,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: string, id: string) {
    try {
      const figmaComponent = await this.prismaService.figmaComponent.findFirst({
        where: { userId, id },
      });
      if (!figmaComponent) throw new NotFoundException('component not found!');

      await this.prismaService.figmaComponent.delete({
        where: { id },
      });
      return {
        message: 'figma component deleted',
      };
    } catch (error) {
      throw error;
    }
  }
}
