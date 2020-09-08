import * as path from 'path';
import appRootPath from 'app-root-path';
import { getFields } from 'codegenSrc/getFields';
import { createSorce } from 'codegenSrc/generateSource';
import { appendRouterSync } from 'codegenSrc/routerStorage';
import { IDbConnection } from '@mapbul-pub/types';

export const generateController = async (
  connection: IDbConnection,
  tableName: string,
  dto: string,
  service: string,
): Promise<void> => {
  const baseName = `${service[0].toUpperCase()}${service.slice(1)}`;
  const serviceName = `${baseName}Service`;
  const controllerName = `${baseName}Controller`;
  const routerPath = `api/${service}`;
  const router = routerPath.toLowerCase();
  console.log(router);
  appendRouterSync(`${router};${dto}`);
  const interfaceName = `I${dto[0].toUpperCase()}${dto.slice(1)}DTO`;
  const className = `${dto[0].toUpperCase()}${dto.slice(1)}DTO`;
  const filePrefixDTO = dto;
  const filePrefix = `${service[0].toLowerCase()}${service.slice(1)}`;

  const templateRootPath = `${appRootPath.path}/src/templates`;
  const serverRootPath = path.join(appRootPath.path, '..', '/server/src');
  const typesRootPath = path.join(appRootPath.path, '..', '/types');

  const fields = await getFields(connection, tableName);

  const hasDateField = fields.some(i => i.type === 'Date');
  const hasNotNullField = fields.some(i => !i.nullable);

  // Create type *.dto.ts
  createSorce({
    templatePath: `${templateRootPath}/dto.hbs`,
    data: {
      interfaceName,
      fields,
    },
    sourcePath: `${typesRootPath}/server/api/${filePrefixDTO}.dto.ts`,
  });

  // Create class *.dto.ts
  createSorce({
    templatePath: `${templateRootPath}/class.hbs`,
    data: {
      className,
      interfaceName,
      fields,
      hasNotNullField
    },
    sourcePath: `${serverRootPath}/${routerPath}/${filePrefix}.dto.ts`,
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
      hasDateField
    },
    sourcePath: `${serverRootPath}/${routerPath}/${filePrefix}.service.ts`,
  });

  // Create *.controller.ts
  createSorce({
    templatePath: `${templateRootPath}/controller.hbs`,
    data: {
      filePrefixDTO,
      router,
      routerPath,
      controllerName,
      service,
      serviceName,
      interfaceName,
      className,
      fields,
    },
    sourcePath: `${serverRootPath}/${routerPath}/${filePrefix}.controller.ts`,
  });
};
