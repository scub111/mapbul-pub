if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { Project } from 'ts-morph';
import { createDTO } from './dto';
import { getFields } from './getFields';
import appRootPath from 'app-root-path';
import handlebars from 'handlebars';
import fs from 'fs';

const main = async () => {
  // const project = new Project({
  //   tsConfigFilePath: `${appRootPath.path}/tsconfig.json`,
  // });
  // project.addExistingSourceFiles('src/**/*.ts');
  // const interfaceFile = createDTO(project, 'articles2', 'Article', fields);

  const fields = await getFields('article');

  const data = {
    title: 'practical node.js',
    author: '@azat_co',
    tags: ['express', 'node', 'javascript']
  };
  const source = fs.readFileSync(`${appRootPath.path}/src/codegen/dto.hbs`, 'utf-8');
  const template = handlebars.compile(source);
  const html = template(data);
  console.log(html);
  // project.save();
};

main();
