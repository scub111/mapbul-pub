import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

export const writeFileSync = (filePath: string, data: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(filePath)) {
    mkdirp.sync(dir);
  }
  fs.writeFileSync(filePath, data, { encoding: 'utf8', flag: 'w' });
};
