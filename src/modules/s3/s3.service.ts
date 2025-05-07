import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface S3Config {
  s3Url: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  region: string;
  swiftUrl?: string;
}

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(config: S3Config) {  // Убрали private readonly
    this.bucket = config.bucket;

    this.s3Client = new S3Client({
      region: config.region,
      endpoint: config.s3Url,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(key: string, fileBuffer: Buffer, contentType: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async getFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new Error('File body is undefined');
      }

      return Buffer.from(await response.Body.transformToByteArray());
    } catch (error) {
      throw new Error(`Failed to get file: ${error.message}`);
    }
  }
}
