if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { createDTO } from './dto';
import { getFields } from './getFields';
import { createService } from './service';

const main = async () => {
  const fields = await getFields('article');
  createDTO('articles2', 'Article', fields);
  createService('articles2', 'Articles', 'IArticleDTO', fields);
};

main();
