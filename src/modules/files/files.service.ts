import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  /**
   * Get a presigned URL for accessing a file
   * @param bucketName S3 Bucket name
   * @param key File Key in S3
   * @param expiresIn Expiration time in seconds (default 3600 seconds = 1 hour)
   * @returns Presigned URL
   */
  async getPresignedUrl(
    bucketName: string,
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // Generate a presigned URL that expires in `expiresIn` seconds
    return await getSignedUrl(this.s3, command, { expiresIn });
  }

  /**
   * Delete a file from S3
   * @param bucketName S3 Bucket name
   * @param key File Key in S3
   */
  async deleteFile(bucketName: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await this.s3.send(command);
  }
}
