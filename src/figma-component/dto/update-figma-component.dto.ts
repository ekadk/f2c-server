import { PartialType } from '@nestjs/mapped-types';
import { CreateFigmaComponentDto } from './create-figma-component.dto';

export class UpdateFigmaComponentDto extends PartialType(CreateFigmaComponentDto) {}
