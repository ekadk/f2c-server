import { Module } from '@nestjs/common';
import { FigmaComponentService } from './figma-component.service';
import { FigmaComponentController } from './figma-component.controller';

@Module({
  controllers: [FigmaComponentController],
  providers: [FigmaComponentService]
})
export class FigmaComponentModule {}
