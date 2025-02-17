import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';

// Configure AWS S3 Client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Create S3 storage configuration
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET_NAME!,
  // acl: 'public-read-write', // Adjust ACL as needed
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const page = (req as Request).query.page as string;
    const section = (req as Request).query.section as string;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();

    // Create S3 path with page/section structure
    const filename = `production/${page}/section_${section}/${uniqueSuffix}.${ext}`;

    cb(null, filename);
  },
});

export function DynamicFileInterceptor(): Type<NestInterceptor> {
  @Injectable()
  class DynamicFileInterceptorMixin implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const page = request.query.page;
      const section = request.query.section;

      // Determine the correct file field based on `page` and `section`
      const fileField =
        page === 'about_us' && section === '2' ? 'images' : 'image';

      let interceptor: NestInterceptor;

      if (fileField === 'images') {
        interceptor = new (FilesInterceptor(fileField, 10, {
          storage: s3Storage,
        }))();
      } else {
        interceptor = new (FileInterceptor(fileField, {
          storage: s3Storage,
        }))();
      }

      return interceptor.intercept(context, next);
    }
  }

  return DynamicFileInterceptorMixin;
}
