
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { HiringPostService } from './hiringpost.service';
import { CreateHiringPostDto } from './dto/create-hiringpost.dto';
import { UpdateHiringPostDto } from './dto/update-hiringpost.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('HiringPost')
@Controller('hiringpost')
export class HiringPostController {
  constructor(private readonly hiringPostService: HiringPostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hiring post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        position: { type: 'string', example: 'Software Engineer' },
        jobClose: { type: 'string', example: '2025-03-01T00:00:00.000Z' },
        description: { type: 'string',  example: 'Description of the job' },
        requirement: { type: 'string',  example: 'Requirements for the job' },
        responsibility: { type: 'string',  example: 'Responsibilities of the job' },
        benefit: { type: 'string',  example: 'Benefits and Allowances' },
        status: { type: 'boolean',  example: true },
        categoryId: { type: 'number', example: 1 },
        jobTypeId: { type: 'number',  example: 1 },
        locationId: { type: 'number', example: 1 },
        regionId: { type: 'number', example: 1 }
      },
    },
  })

  create(@Body() createHiringPostDto: CreateHiringPostDto) {
    return this.hiringPostService.create(createHiringPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hiring posts' })
  findAll() {
    return this.hiringPostService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hiring post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Hiring post ID' })
  findOne(@Param('id') id: string) {
    return this.hiringPostService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a hiring post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Hiring post ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        position: { type: 'string', example: 'Update Software Engineer' },
        jobClose: { type: 'string', example: '2025-03-01T00:00:00.000Z' },
        description: { type: 'string',  example: 'Update Description of the job' },
        requirement: { type: 'string',  example: 'Update Requirements for the job' },
        responsibility: { type: 'string',  example: 'Update Responsibilities of the job' },
        benefit: { type: 'string',  example: 'Update Benefits and Allowances' },
        status: { type: 'boolean',  example: true },
        categoryId: { type: 'number', example: 1 },
        jobTypeId: { type: 'number',  example: 1 },
        locationId: { type: 'number', example: 1 },
        regionId: { type: 'number', example: 1 }
      },
    },
  })
  update(@Param('id') id: string, @Body() updateHiringPostDto: UpdateHiringPostDto) {
    return this.hiringPostService.update(+id, updateHiringPostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hiring post by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Hiring post ID' })
  remove(@Param('id') id: string) {
    return this.hiringPostService.remove(+id);
  }
}
