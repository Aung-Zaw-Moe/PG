// src/common/interfaces/multer-s3-file.interface.ts
import { Express } from 'express';

export interface MulterS3File extends Express.Multer.File {
  location: string;    // Public URL of the uploaded file
  key: string;         // S3 object key/path
  bucket: string;      // S3 bucket name
}