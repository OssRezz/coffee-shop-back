import { productFilename, imageFileFilter } from '../multer-options.helper';
import { extname } from 'path';

describe('productFilename', () => {
  it('should generate unique filename with correct extension', () => {
    const mockFile = { originalname: 'test.jpg' } as any;
    const callback = jest.fn();
    const now = 1712345678901;
    jest.spyOn(Date, 'now').mockReturnValue(now);

    productFilename({} as any, mockFile, callback);

    const expected = `${now}${extname(mockFile.originalname)}`;
    expect(callback).toHaveBeenCalledWith(null, expected);
  });
});

describe('imageFileFilter', () => {
  it('should accept valid image mimetype', () => {
    const file = { mimetype: 'image/png' } as any;
    const cb = jest.fn();
    imageFileFilter({} as any, file, cb);
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('should reject invalid mimetype', () => {
    const file = { mimetype: 'application/pdf' } as any;
    const cb = jest.fn();
    imageFileFilter({} as any, file, cb);
    expect(cb).toHaveBeenCalledWith(expect.any(Error), false);
  });
});
