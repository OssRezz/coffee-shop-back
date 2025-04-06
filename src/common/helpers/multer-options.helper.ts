import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_PATH } from 'src/common/constants/paths';

export const productImageMulterOptions = {
  storage: diskStorage({
    destination: `./${PRODUCT_PATH}`,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/i)) {
      return cb(
        new Error('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'),
        false,
      );
    }
    cb(null, true);
  },
};
