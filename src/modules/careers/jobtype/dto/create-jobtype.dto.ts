import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobTypeDto {
  @ApiProperty({ example: 'JobType Name', description: 'Name of the jobtype', type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: true, description: 'Status of the jobtype', type: 'boolean' })
  status: boolean;
}
