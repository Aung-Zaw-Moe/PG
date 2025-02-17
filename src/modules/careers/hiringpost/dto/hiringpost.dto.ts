import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHiringPostDto {
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNumber()
  jobTypeId: number;

  @IsDateString()
  jobClose: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  requirement: string;

  @IsNotEmpty()
  @IsString()
  responsibility: string;

  @IsNotEmpty()
  @IsString()
  benefit: string;

  @IsBoolean()
  status: boolean;
}

export class UpdateHiringPostDto {
  @IsNumber()
  categoryId?: number;

  @IsString()
  position?: string;

  @IsNumber()
  jobTypeId?: number;

  @IsDateString()
  jobClose?: Date;

  @IsString()
  description?: string;

  @IsString()
  requirement?: string;

  @IsString()
  responsibility?: string;

  @IsString()
  benefit?: string;

  @IsBoolean()
  status?: boolean;
}
