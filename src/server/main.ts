import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'server/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server started at http://localhost:${port}`);
}
bootstrap();
