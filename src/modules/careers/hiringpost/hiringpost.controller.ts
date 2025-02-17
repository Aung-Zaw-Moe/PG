
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { HiringPostService } from './hiringpost.service';
import { CreateHiringPostDto } from './dto/create-hiringpost.dto';
import { UpdateHiringPostDto } from './dto/update-hiringpost.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('HiringPost')
@Controller('hiringpost')
export class HiringPostController {
  constructor(private readonly hiringPostService: HiringPostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hiring post' })
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
