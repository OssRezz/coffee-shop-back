import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_PATH } from 'src/common/constants/paths';

export function productFilename(
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) {
  const uniqueName = `${Date.now()}${extname(file.originalname)}`;
  cb(null, uniqueName);
}

export function imageFileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(
      new Error('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'),
      false,
    );
  }
  cb(null, true);
}

export const productImageMulterOptions = {
  storage: diskStorage({
    destination: `./${PRODUCT_PATH}`,
    filename: productFilename,
  }),
  fileFilter: imageFileFilter,
};
