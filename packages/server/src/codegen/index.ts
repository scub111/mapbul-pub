if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { getFields } from './getFields';
import { createSorce } from './generateSource';
import appRootPath = require('app-root-path');

const main = async () => {
  const tableName = 'Article';
  const saveFolder = 'articles2';
  const serviceName = 'Articles';

  const interfaceName = `I${tableName}DTO`;
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
      fields,
    },
    sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefixDTO}.dto.ts`,
  });

  // Create *.service.ts
  // createSorce({
  //   templatePath: `${templateRootPath}/service.hbs`,
  //   data: {
  //     serviceName,
  //     interfaceName,
  //     fields,
  //   },
  //   sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefix}.service.ts`,
  // });

  // Create *.controller.ts
  // createSorce({
  //   templatePath: `${templateRootPath}/controller.hbs`,
  //   data: {
  //     serviceName,
  //     interfaceName,
  //     fields,
  //   },
  //   sourcePath: `${sourceRootPath}/${saveFolder}/${filePrefix}.controller.ts`,
  // });
};

main();
