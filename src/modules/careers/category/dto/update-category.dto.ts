import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string | null; 

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
