import { Injectable, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadPath = 'public';

  constructor() {
    this.ensureUploadPathExists();
  }

  async ensureUploadPathExists() {
    try {
      await fs.access(this.uploadPath);
    } catch (err) {
      console.log(err);
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async saveFile(email: string, file: any): Promise<string> {
    if (!file) {
      throw new BadRequestException('Picture is required');
    }
    const fileName = `${email}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);
    await fs.writeFile(filePath, file.buffer);
    return fileName;
  }
}
