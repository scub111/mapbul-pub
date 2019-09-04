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


interface ICodeData {
  interfaceName: string;
}

const main = async () => {
  const fields = await getFields('article');
  createDTO()
};

main();
