import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsBoolean()
  status: boolean;
}

export class UpdateJobTypeDto {
  @IsString()
  name?: string;

  @IsString()
  image?: string;

  @IsBoolean()
  status?: boolean;
}
