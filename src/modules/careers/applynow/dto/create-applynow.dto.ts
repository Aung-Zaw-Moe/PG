import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplyNowDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  email: string;

  // In create-applynow.dto.ts
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsString()
  cv: string;

  @ApiProperty({ example: 'Cover letter text', required: false })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  // @ApiProperty({ example: true })
  // @IsBoolean()
  // status: boolean;


  @ApiProperty({ example: 1 })
  @IsInt()
  hiringPostId: number;
  
}