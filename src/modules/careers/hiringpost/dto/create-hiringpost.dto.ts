
import { IsString, IsBoolean, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHiringPostDto {
  @ApiProperty({ example: 'Software Engineer', description: 'Position name', type: 'string' })
  @IsString()
  position: string;

  @ApiProperty({ example: '2025-03-01T00:00:00.000Z', description: 'Job Close Date', type: 'string', format: 'date' })
  @IsDateString()
  jobClose: string;

  @ApiProperty({ example: 'Description of the job', description: 'Job Description', type: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Requirements for the job', description: 'Job Requirements', type: 'string' })
  @IsString()
  requirement: string;

  @ApiProperty({ example: 'Responsibilities of the job', description: 'Job Responsibilities', type: 'string' })
  @IsString()
  responsibility: string;

  @ApiProperty({ example: 'Benefits and Allowances', description: 'Benefits and Allowances', type: 'string' })
  @IsString()
  benefit: string;

  @ApiProperty({ example: true, description: 'Status of the Job Post', type: 'boolean' })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: 1, description: 'Category ID', type: 'number' })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: 1, description: 'Job Type ID', type: 'number' })
  @IsInt()
  jobTypeId: number;

  @ApiProperty({ example: 1, description: 'Location ID', type: 'number' })
  @IsInt()
  locationId: number;
  
  @ApiProperty({ example: 1, description: 'Region ID', type: 'number' })
  @IsInt()
  regionId: number; 
}
