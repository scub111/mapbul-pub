import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

export const makeSureSync = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(filePath)) {
    mkdirp.sync(dir);
  }
};

export const deleteFileSync = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const readFileSync = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
};

export const writeFileSync = (filePath: string, data: string) => {
  makeSureSync(filePath);
  fs.writeFileSync(filePath, data, { encoding: 'utf8', flag: 'w' });
};

export const appendFileSync = (filePath: string, data: string) => {
  makeSureSync(filePath);
  fs.appendFileSync(filePath, data, { encoding: 'utf8' });
};
