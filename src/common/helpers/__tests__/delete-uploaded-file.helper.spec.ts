import * as fs from 'fs';
import * as path from 'path';
import { deleteUploadedFile } from '../delete-uploaded-file.helper';

jest.mock('fs');

describe('deleteUploadedFile', () => {
  const mockUnlink = fs.unlink as unknown as jest.Mock;

  beforeEach(() => {
    mockUnlink.mockReset();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call fs.unlink with the correct full path', () => {
    const filePath = 'uploads/test-file.jpg';
    const expectedPath = path.join(process.cwd(), filePath);

    deleteUploadedFile(filePath);

    expect(mockUnlink).toHaveBeenCalledWith(expectedPath, expect.any(Function));
  });

  it('should log success message if file is deleted', () => {
    const filePath = 'uploads/test-file.jpg';
    const expectedPath = path.join(process.cwd(), filePath);

    deleteUploadedFile(filePath);

    const callback = mockUnlink.mock.calls[0][1];
    callback(null);

    expect(console.log).toHaveBeenCalledWith(
      `File deleted: ${expectedPath}`,
    );
  });

  it('should log error message if deletion fails', () => {
    const filePath = 'uploads/test-file.jpg';
    const expectedPath = path.join(process.cwd(), filePath);
    const error = new Error('Permission denied');

    deleteUploadedFile(filePath);

    const callback = mockUnlink.mock.calls[0][1];
    callback(error);

    expect(console.error).toHaveBeenCalledWith(
      `Error deleting file: ${expectedPath}`,
      error,
    );
  });
});
