import appRootPath from 'app-root-path';
import { getFields } from 'codegen/getFields';
import { createSorce } from 'codegen/generateSource';
import { appendRouterSync } from 'codegen/routerStorage';

export const generateController = async (tableName: string, dto: string, service: string) => {
  const baseName = `${service[0].toUpperCase()}${service.slice(1)}`;
  const serviceName = `${baseName}Service`;
  const controllerName = `${baseName}Controller`;
  const routerPath = `api/${service}`;
  const router = routerPath.toLowerCase();
  console.log(router);
  appendRouterSync(router);
  const interfaceName = `I${dto[0].toUpperCase()}${dto.slice(1)}DTO`;
  const filePrefixDTO = dto;
  const filePrefix = `${service[0].toLowerCase()}${service.slice(1)}`;

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
    sourcePath: `${sourceRootPath}/${routerPath}/${filePrefixDTO}.dto.ts`,
  });

  // Create *.service.ts
  createSorce({
    templatePath: `${templateRootPath}/service.hbs`,
    data: {
      tableName,
      serviceName,
      interfaceName,
      filePrefixDTO,
      fields,
    },
    sourcePath: `${sourceRootPath}/${routerPath}/${filePrefix}.service.ts`,
  });

  // Create *.controller.ts
  createSorce({
    templatePath: `${templateRootPath}/controller.hbs`,
    data: {
      filePrefixDTO,
      router,
      controllerName,
      service,
      serviceName,
      interfaceName,
      fields,
    },
    sourcePath: `${sourceRootPath}/${routerPath}/${filePrefix}.controller.ts`,
  });
};
