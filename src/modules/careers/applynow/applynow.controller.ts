import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ApplyNowService } from './applynow.service';
import { CreateApplyNowDto } from './dto/create-applynow.dto';
import { UpdateApplyNowDto } from './dto/update-applynow.dto';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { MulterS3File } from '../../../common/interfaces/multer-s3-file.interface';
import { extname } from 'path';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('ApplyNow')
@Controller('applynow')
export class ApplyNowController {
  private s3: S3Client;

  constructor(private readonly applyNowService: ApplyNowService) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: multerS3({
        s3: new S3Client({
          region: process.env.AWS_REGION,
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
          callback(null, `applynow/${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Submit a new application' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },  
        cv: { type: 'string', format: 'binary', example: 'cv.pdf' },
        coverLetter: { type: 'string', example: 'Cover letter text' },
        hiringPostId: { type: 'number', example: 1 },
      },
    },
  })
  create(
    @Body() createApplyNowDto: CreateApplyNowDto,
    @UploadedFile() cv: MulterS3File // <-- Use custom type here
  ) {
    if (!cv) {
      throw new BadRequestException('CV file is required');
    }
    createApplyNowDto.cv = cv.location; // Now TypeScript recognizes .location
    return this.applyNowService.create(createApplyNowDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  findAll() {
    return this.applyNowService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an application by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Application ID' })
  findOne(@Param('id') id: string) {
    return this.applyNowService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'Update John Doe' },
        email: { type: 'string', example: 'updatejohn@example.com' },  
        cv: { type: 'string', format: 'binary', example: 'updatecv.pdf' },
        coverLetter: { type: 'string', example: 'Update Cover letter text' },
        hiringPostId: { type: 'number', example: 1 },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: multerS3({
        s3: new S3Client({
          region: process.env.AWS_REGION,
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
          callback(null, `applynow/${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Update an application' })
  update(
    @Param('id') id: string,
    @Body() updateApplyNowDto: UpdateApplyNowDto,
    @UploadedFile() cv: MulterS3File // <-- And here
  ) {
    if (cv) {
      updateApplyNowDto.cv = cv.location;
    }
    return this.applyNowService.update(+id, updateApplyNowDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiParam({ name: 'id', type: 'number', description: 'Application ID' })
  remove(@Param('id') id: string) {
    return this.applyNowService.remove(+id);
  }
}
