import {
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';

export const ImageFilePipe = new ParseFilePipe({
  fileIsRequired: false,
  validators: [
    new FileTypeValidator({
      fileType: /(jpg|jpeg|png|webp)$/i,
    }),
    new MaxFileSizeValidator({
      maxSize: 10 * 1024 * 1024, // 10 MB
    }),
  ],
});