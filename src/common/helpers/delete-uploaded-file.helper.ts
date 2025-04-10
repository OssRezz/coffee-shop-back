import * as fs from 'fs';
import * as path from 'path';

export function deleteUploadedFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${fullPath}`, err);
    } else {
      console.log(`File deleted: ${fullPath}`);
    }
  });
}
