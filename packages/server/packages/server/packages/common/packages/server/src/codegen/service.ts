import { IField } from './IField';
import appRootPath from 'app-root-path';
import handlebars from 'handlebars';
import fs from 'fs';

export const createService = (saveFolder: string, serviceName: string, interfaceName: string, fields: IField[]) => {
  const data = {
    serviceName,
    interfaceName,
    fields,
  };
  const templateFile = fs.readFileSync(`${appRootPath.path}/src/codegen/templates/service.hbs`, 'utf-8');
  const template = handlebars.compile(templateFile);
  const source = template(data);
  fs.writeFileSync(`src/server/${saveFolder}/${serviceName.toLowerCase()}.service.ts`, source);
  console.log(source);
};
