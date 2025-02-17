import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { Public } from 'src/common/decorators/auth/public.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly s3Service: FilesService) {}

  @Public()
  @Get(':key')
  async getPresignedUrl(@Param('key') key: string, @Res() res: Response) {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    try {
      const presignedUrl = await this.s3Service.getPresignedUrl(
        bucketName!,
        key,
      );
      res.status(HttpStatus.OK).json({ presignedUrl });
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Image not found',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to generate presigned URL',
          error: error.message,
        });
      }
    }
  }
}
