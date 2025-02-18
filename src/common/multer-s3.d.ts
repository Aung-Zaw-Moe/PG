declare namespace Express {
    export interface MulterS3 {
      File: MulterS3File;
    }
  
    export interface MulterS3File extends Multer.File {
      location: string; // This is the S3 URL of the uploaded file
    }
  }
  