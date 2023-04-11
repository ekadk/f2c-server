import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFigmaComponentDto {
  @IsNotEmpty()
  @IsString()
  data: String;

  @IsNotEmpty()
  @IsString()
  userId: String;
}
