import appRootPath = require('app-root-path');
import { getFields } from './getFields';
import { createSorce } from './generateSource';

export const generateController = async (tableName: string, service: string) => {
  const baseName = `${service[0].toUpperCase()}${service.slice(1)}`;
  const serviceName = `${baseName}Service`;
  const controllerName = `${baseName}Controller`;
  const router = `api/${service}`;
  console.log(router);
  const interfaceName = `I${tableName[0].toUpperCase()}${tableName.slice(1)}DTO`;
  const filePrefixDTO = tableName.toLowerCase();
  const filePrefix = baseName.toLowerCase();

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
    sourcePath: `${sourceRootPath}/${router}/${filePrefixDTO}.dto.ts`
  });

  // Create *.service.ts
  createSorce({
    templatePath: `${templateRootPath}/service.hbs`,
    data: {
      tableName,
      serviceName,
      interfaceName,
      saveFolder: router,
      fields
    },
    sourcePath: `${sourceRootPath}/${router}/${filePrefix}.service.ts`
  });

  // Create *.controller.ts
  createSorce({
    templatePath: `${templateRootPath}/controller.hbs`,
    data: {
      tableName,
      router,
      controllerName,
      service,
      serviceName,
      interfaceName,
      fields
    },
    sourcePath: `${sourceRootPath}/${router}/${filePrefix}.controller.ts`
  });
};
