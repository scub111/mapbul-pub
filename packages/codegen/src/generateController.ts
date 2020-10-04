import * as path from 'path';
import appRootPath from 'app-root-path';
import { getFields } from 'codegenSrc/getFields';
import { createSorce } from 'codegenSrc/generateSource';
import { appendRouterSync } from 'codegenSrc/routerStorage';
import { IDbConnection } from '@mapbul-pub/types';

export interface IReplaceConfig {
  field: string;
  value: string;
}

export interface IMapConfig {
  needRequest?: boolean;
  replaceValues?: Array<IReplaceConfig>;
}

export interface IGenerateControllerConfig {
  connection: IDbConnection;
  tableName: string;
  dto: string;
  service: string;
  skipReadFields?: Array<string>;
  map?: IMapConfig;
}

export const generateController = async ({
  connection,
  tableName,
  dto,
  service,
  skipReadFields,
  map
}: IGenerateControllerConfig): Promise<void> => {
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

  const initFields = await getFields(connection, tableName, map);
  const readFields = initFields.filter(i => !skipReadFields?.some(t => t === i.field));

  const hasDateField = readFields.some(i => i.type === 'Date');
  const hasNotNullField = readFields.some(i => !i.nullable);

  const hasRequestImport = map && map.needRequest;

  // Create type *.dto.ts
  createSorce({
    templatePath: `${templateRootPath}/dto.hbs`,
    data: {
      interfaceName,
      fields: initFields,
    },
    sourcePath: `${typesRootPath}/server/api/${filePrefixDTO}.dto.ts`,
  });

  // Create class *.dto.ts
  createSorce({
    templatePath: `${templateRootPath}/class.hbs`,
    data: {
      className,
      interfaceName,
      fields: initFields,
      hasNotNullField,
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
      fields: initFields,
      readFields,
      hasDateField,
      hasRequestImport,
      map,
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
      fields: readFields,
      hasRequestImport,
      map,
    },
    sourcePath: `${serverRootPath}/${routerPath}/${filePrefix}.controller.ts`,
  });
};
