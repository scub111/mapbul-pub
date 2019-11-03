import handlebars from 'handlebars';
import { readFileSync, writeFileSync } from '@mapbul-pub/common';

interface ICreateSorceConfig {
  templatePath: string;
  data: any;
  sourcePath: string;
}

export const createSorce = (config: ICreateSorceConfig) => {
  const templateFile = readFileSync(config.templatePath);
  const template = handlebars.compile(templateFile);
  const source = template(config.data);
  writeFileSync(config.sourcePath, source);
};
