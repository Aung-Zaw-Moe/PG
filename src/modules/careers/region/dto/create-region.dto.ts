import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string | null;

  @IsBoolean()
  status: boolean;
}