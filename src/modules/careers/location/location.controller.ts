import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocationService } from './location.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly LocationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Onsite or Hybrid or Remote' },
        status: { type: 'boolean', example: true },
      },
    },
  })
  create(@Req() req: Request) {
    const { name, status } = req.body;
    return this.LocationService.create(req, {
      name: String(name),
      status: status === 'true' || status === true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all location' })
  @ApiResponse({ status: 200, description: 'List of all location.' })
  findAll(@Req() req: Request) {
    return this.LocationService.getAlllocation(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'location ID' })
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.LocationService.getlocationById(req, +id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Update Onsite or Hybrid or Remote'  },
        status: { type: 'boolean', example: true },
      },
    },
  })
  update(@Req() req: Request, @Param('id') id: string) {
    const { name, status } = req.body;
    return this.LocationService.updatelocation(req, +id, {
      name: String(name),
      status: status === 'true' || status === true,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'location ID' })
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.LocationService.deletelocation(req, +id);
  }
}
