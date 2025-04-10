import * as fs from 'fs';
import * as path from 'path';
import { ensureUploadFolderExists } from '../ensure-upload-folder-exists';

jest.mock('fs');

describe('ensureUploadFolderExists', () => {
  const mockExistsSync = fs.existsSync as unknown as jest.Mock;
  const mockMkdirSync = fs.mkdirSync as unknown as jest.Mock;

  beforeEach(() => {
    mockExistsSync.mockReset();
    mockMkdirSync.mockReset();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the folder if it does not exist', () => {
    mockExistsSync.mockReturnValue(false);

    ensureUploadFolderExists();

    const expectedPath = path.join(process.cwd(), 'uploads', 'products');

    expect(mockMkdirSync).toHaveBeenCalledWith(expectedPath, {
      recursive: true,
    });
    expect(console.log).toHaveBeenCalledWith(
      'Carpeta de uploads creada:',
      expectedPath,
    );
  });

  it('should not create the folder if it already exists', () => {
    mockExistsSync.mockReturnValue(true);

    ensureUploadFolderExists();

    expect(mockMkdirSync).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
  });
});
