import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

interface ICreateSorceConfig {
  templatePath: string;
  data: any;
  sourcePath: string;
}

export const createSorce = (config: ICreateSorceConfig) => {
  const templateFile = fs.readFileSync(config.templatePath, 'utf-8');
  const template = handlebars.compile(templateFile);
  const source = template(config.data);
  const dir = path.dirname(config.sourcePath);
  if (!fs.existsSync(config.sourcePath)) {
    mkdirp.sync(dir);
  }
  fs.writeFileSync(config.sourcePath, source, {encoding: 'utf8', flag: 'w'});
};
