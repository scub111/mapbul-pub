import * as path from 'path';
import appRootPath from 'app-root-path';
import { removeFileSync, readFileSync, appendFileSync } from 'scub111-common';

const apiPath = path.join(appRootPath.path, '..', 'server/src/api.txt');

export interface IParseRouter {
  router: string;
  dto: string;
}

export const deleteRouterSync = () => {
  removeFileSync(apiPath);
};

export const readRouterSync = (path: string = apiPath): string => {
  return readFileSync(path);
};

export const parseRouterSync = (path: string = apiPath): Array<IParseRouter> => {
  return readFileSync(path).split(/\r?\n/).filter(i => i !== '').map(i => {
    const fields = i.trim().split(';');
    return {
      router: fields[0],
      dto: fields[1],
    }
  });
};

export const appendRouterSync = (data: string) => {
  appendFileSync(apiPath, `${data} \n`);
};
