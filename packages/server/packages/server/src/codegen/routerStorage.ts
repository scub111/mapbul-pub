import appRootPath from 'app-root-path';
import { removeFileSync, readFileSync, appendFileSync } from 'common/fileUtils';

const apiPath = `${appRootPath.path}/src/server/api.txt`;

export const deleteRouterSync = () => {
  removeFileSync(apiPath);
};

export const readRouterSync = () => {
  return readFileSync(apiPath);
};

export const appendRouterSync = (data: string) => {
  appendFileSync(apiPath, `${data} \n`);
};
