import handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'scub111-common';

interface ICreateSorceConfig {
  templatePath: string;
  data: any;
  sourcePath: string;
}

export const createSorce = (config: ICreateSorceConfig) => {
  const templateFile = readFileSync(config.templatePath);
  const template = handlebars.compile(templateFile);
  handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
  });
  handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
  });
  const source = template(config.data);
  writeFileSync(config.sourcePath, source);
};
