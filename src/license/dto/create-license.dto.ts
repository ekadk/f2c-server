import { IsNotEmpty, IsString } from 'class-validator';
export class CreateLicenseDto {
  @IsNotEmpty()
  @IsString()
  license_key: string;
}
