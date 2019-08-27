
import { createConnection } from 'typeorm';
import { Article } from './article';
import appRootPath from 'app-root-path';

const typeOrmTest = async () => {
  console.log(appRootPath.path);
  const connection = await createConnection({
    // name: 'connection1',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '461301+MY',
    database: 'mapbul',
    // entities: ['src/article.ts'],
    entities: ['dist/article.ts'],
    // logging: true,
    // synchronize: true,
  });
  this.articleRepository = connection.getRepository(Article);
  const iterationCount = 1000;
  const t0 = new Date();
  for (let i = 0; i < iterationCount; i++) {
    const result = await this.articleRepository.find({take: 100});
  }
  const diff = new Date().valueOf() - t0.valueOf();
  const rps = iterationCount / diff * 1000;
  console.log(`Total: ${diff} ms, RPS: ${rps.toFixed(1)} req/s`);
};

typeOrmTest();
