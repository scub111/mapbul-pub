import * as fsExtra from 'fs-extra';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

export const makeSureSync = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(filePath)) {
    mkdirp.sync(dir);
  }
};

export const removeFileSync = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const removeDirSync = (dirPath: string) => {
  fsExtra.removeSync(dirPath);
};

export const readFileSync = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  } else {
    return null;
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

export const copyFileSync = (source: string, destination: string, flags?: number) => {
  makeSureSync(destination);
  fs.copyFileSync(source, destination, flags);
};
