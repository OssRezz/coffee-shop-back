// import { ImageFilePipe } from '../image-file-pipe.helper';
import { ImageFilePipe } from '../image-file.pipe';
import { BadRequestException } from '@nestjs/common';
import { Readable } from 'stream';

describe('ImageFilePipe', () => {
  it('should allow valid image file', async () => {
    const file: Express.Multer.File = {
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
      size: 1024 * 1024 * 2, // 2MB
      buffer: Buffer.from('mock content'),
      fieldname: '',
      encoding: '',
      destination: '',
      filename: '',
      path: '',
      stream: new Readable(), // en lugar de null
    };

    const result = await ImageFilePipe.transform(file);
    expect(result).toBe(file);
  });

  it('should throw if file type is invalid', async () => {
    const file = {
      originalname: 'test.pdf',
      mimetype: 'application/pdf',
      size: 1024,
      buffer: Buffer.from('mock content'),
      fieldname: '',
      encoding: '',
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    await expect(ImageFilePipe.transform(file)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw if file size exceeds 10MB', async () => {
    const file = {
      originalname: 'big-image.png',
      mimetype: 'image/png',
      size: 11 * 1024 * 1024, // 11MB
      buffer: Buffer.from(''),
      fieldname: '',
      encoding: '',
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    await expect(ImageFilePipe.transform(file)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return undefined if file is not provided and fileIsRequired is false', async () => {
    const result = await ImageFilePipe.transform(undefined);
    expect(result).toBeUndefined();
  });
});
