if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test2');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { getFields } from './getFields';
import { createSorce } from './generateSource';
import appRootPath = require('app-root-path');

const main = async () => {
  const tableName = 'article';
  const service = 'articles2';

  const controller = service;
  const serviceName = `${service[0].toUpperCase()}${service.slice(1)}`;
  const controllerName = serviceName;
  const saveFolder = service;
  const interfaceName = `I${tableName[0].toUpperCase()}${tableName.slice(1)}DTO`;
  const filePrefixDTO = tableName.toLowerCase();
  const filePrefix = serviceName.toLowerCase();

  const templateRootPath = `${appRootPath.path}/src/codegen/templates`;
  const sourceRootPath = `${appRootPath.path}/src/server`;

  const fields = await getFields(tableName);

  // Create *.dto.ts
  createSorce({
    templatePath: `${templateRootPath}/dto.hbs`,
    data: {
      interfaceName,
      fields
    },
    sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefixDTO}.dto.ts`
  });

  // Create *.service.ts
  createSorce({
    templatePath: `${templateRootPath}/service.hbs`,
    data: {
      tableName,
      serviceName,
      interfaceName,
      saveFolder,
      fields
    },
    sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefix}.service.ts`
  });

  // Create *.controller.ts
  createSorce({
    templatePath: `${templateRootPath}/controller.hbs`,
    data: {
      tableName,
      controller,
      controllerName,
      interfaceName,
      saveFolder,
      fields
    },
    sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefix}.controller.ts`
  });
};

main();
