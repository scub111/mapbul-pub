if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test');
import { setEnvVariables, serverConfig } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');
console.log(serverConfig.dbConnection);

import { Project } from 'ts-morph';
import { createDTO } from './dto';
import { IField } from './IField';
import { getFields } from './getFields';
import appRootPath from 'app-root-path';

const main = async () => {
  const project = new Project({
    tsConfigFilePath: `${appRootPath.path}/tsconfig.json`,
  });

  const fields = await getFields('article');

  project.addExistingSourceFiles('src/**/*.ts');

  createDTO(project, 'articles2', 'Article', fields);

  project.save();
};

main();

