import * as path from 'path';
import appRootPath from 'app-root-path';
import { createSorce } from 'codegen/generateSource';
import { parseRouterSync } from 'codegen/routerStorage';

export const generateCommonTypes = async (): Promise<void> => {
  const templateRootPath = `${appRootPath.path}/src/templates`;
  const typesRootPath = path.join(appRootPath.path, '..', '/types');

  const routers = parseRouterSync();
  // console.log(routers);
  
  // Create index.ts
  createSorce({
    templatePath: `${templateRootPath}/commonTypes.hbs`,
    data: {
      routers,
    },
    sourcePath: `${typesRootPath}/server/index.ts`,
  });
};
