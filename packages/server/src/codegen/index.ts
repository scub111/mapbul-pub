if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test2');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { generateController } from './generateController';

const main = async () => {
  await generateController('article', 'articles2');
  await generateController('article', 'articles3');
};

main();
