import * as fs from 'fs';
import * as path from 'path';

export function ensureUploadFolderExists() {
  const folderPath = path.join(process.cwd(), 'uploads', 'products');

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log('📂 Carpeta de uploads creada:', folderPath);
  }
}
