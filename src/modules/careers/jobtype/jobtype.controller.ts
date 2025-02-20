import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobTypeService } from './jobtype.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Job Type')
@Controller('jobtype')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new jobType' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'FullTime or PartTime or Intern' },
        status: { type: 'boolean', example: true },
      },
    },
  })
  create(@Req() req: Request) {
    const { name, status } = req.body;
    return this.jobTypeService.create(req, {
      name: String(name),
      status: status === 'true' || status === true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobTypes' })
  @ApiResponse({ status: 200, description: 'List of all jobTypes.' })
  findAll(@Req() req: Request) {
    return this.jobTypeService.getAllJobType(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a JobType by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'JobType ID' })
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.jobTypeService.getJobTypeById(req, +id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a JobType by ID' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Update FullTime or PartTime or Intern' },
        status: { type: 'boolean', example: true },
      },
    },
  })
  update(@Req() req: Request, @Param('id') id: string) {
    const { name, status } = req.body;
    return this.jobTypeService.updateJobType(req, +id, {
      name: String(name),
      status: status === 'true' || status === true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a JobType by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'JobType ID' })
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.jobTypeService.deleteJobType(req, +id);
  }
}
