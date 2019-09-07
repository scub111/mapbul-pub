import handlebars from 'handlebars';
import fs from 'fs';
import { writeFileSync } from 'codegen/utils';

interface ICreateSorceConfig {
  templatePath: string;
  data: any;
  sourcePath: string;
}

export const createSorce = (config: ICreateSorceConfig) => {
  const templateFile = fs.readFileSync(config.templatePath, 'utf-8');
  const template = handlebars.compile(templateFile);
  const source = template(config.data);
  writeFileSync(config.sourcePath, source);
};
