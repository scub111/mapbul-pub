import { IField } from './IField';
import appRootPath from 'app-root-path';
import handlebars from 'handlebars';
import fs from 'fs';

export const createDTO = (saveFolder: string, name: string, fields: IField[]) => {
  const data = {
    name: `I${name}DTO`,
    fields,
  };
  const templateFile = fs.readFileSync(`${appRootPath.path}/src/codegen/templates/dto.hbs`, 'utf-8');
  const template = handlebars.compile(templateFile);
  const source = template(data);
  fs.writeFileSync(`src/server/${saveFolder}/${name.toLowerCase()}.dto.ts`, source);
  console.log(source);
};
