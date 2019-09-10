import appRootPath from 'app-root-path';
import { deleteFileSync, readFileSync, appendFileSync } from 'common/utils';

const apiPath = `${appRootPath.path}/src/server/api.txt`;

export const deleteRouterSync = () => {
  deleteFileSync(apiPath);
};

export const readRouterSync = () => {
  return readFileSync(apiPath);
};

export const appendRouterSync = (data: string) => {
  appendFileSync(apiPath, `${data} \n`);
};
