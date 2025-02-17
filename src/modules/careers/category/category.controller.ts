import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  private s3: S3Client;

  constructor(private readonly categoryService: CategoryService) {
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
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category with file upload to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Category Name' },
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
  async create(
    @Body() data: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File, // File handling updated here
  ) {
    if (file) {
      data.image = (file as any).location; // Set the URL from S3 to the image field
    }
    return this.categoryService.create(data, file); // Pass both data and file to service
  }

@Put(':id')
@ApiOperation({ summary: 'Update an existing category with optional file upload to S3' })
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
async update(
  @Param('id') id: string,
  @Body() data: UpdateCategoryDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  return this.categoryService.update(+id, data, file); // Pass both data and file to service
}



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
