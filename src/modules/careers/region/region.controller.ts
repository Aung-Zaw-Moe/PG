// src/modules/careers/region/region.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { extname } from 'path';

@Controller('regions')
export class RegionController {
  private s3: S3Client;

  constructor(private readonly regionService: RegionService) {
    this.s3 = new S3Client({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new category with file upload to S3' })
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Region Name' },
          image: { type: 'string', format: 'binary' },
          status: { type: 'boolean', example: true },
        },
      },
    })
    @UseInterceptors(
      FileInterceptor('image', {
        storage: multerS3({
          s3: new S3Client({
            region: 'ap-southeast-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
          }),
          bucket: process.env.AWS_S3_BUCKET_NAME,
          acl: 'public-read',
          key: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `category/${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async create(@Body() data: CreateRegionDto, @UploadedFile() file: any) {
      if (file) data.image = file.location;
      return this.regionService.create(data);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Update Category Name' },
          image: { type: 'string', format: 'binary' },
          status: { type: 'boolean', example: true },
        },
      },
    })
    @UseInterceptors(
      FileInterceptor('image', {
        storage: multerS3({
          s3: new S3Client({
            region: 'ap-southeast-1',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
          }),
          bucket: process.env.AWS_S3_BUCKET_NAME,
          acl: 'public-read',
          key: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `category/${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )    
  async update(@Param('id') id: string, @Body() data: UpdateRegionDto, @UploadedFile() file?: any) {
    if (file) data.image = file.location;
    return this.regionService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}