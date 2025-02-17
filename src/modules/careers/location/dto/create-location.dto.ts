import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Location Name', description: 'Name of the Location', type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ example: true, description: 'Status of the Location', type: 'boolean' })
  status: boolean;
}
