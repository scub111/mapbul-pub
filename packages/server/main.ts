if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}

import { setEnvVariables, serverConfig } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');
console.log(serverConfig);

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'server/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  await app.listen(port);
  console.log(`Server started at http://localhost:${port}`);
}
bootstrap();
