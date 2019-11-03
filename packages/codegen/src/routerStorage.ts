import * as path from 'path';
import appRootPath from 'app-root-path';
import { removeFileSync, readFileSync, appendFileSync } from '@mapbul-pub/common';

const apiPath = path.join(appRootPath.path, '..', 'server/src/api.txt');
console.log(apiPath);

export const deleteRouterSync = () => {
  removeFileSync(apiPath);
};

export const readRouterSync = (path: string = apiPath) => {
  return readFileSync(path);
};

export const appendRouterSync = (data: string) => {
  appendFileSync(apiPath, `${data} \n`);
};
