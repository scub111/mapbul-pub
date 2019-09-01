import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { INestApplication } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import promisePool from 'es6-promise-pool';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    jest.setTimeout(600000);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('/ (GET)', () => {
    return request(server as any)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const generatePromises = (iterationCount: number, url: string) =>
    function*() {
      for (let i = 0; i < iterationCount; i++) {
        yield request(url).get('/');
        // yield sleep(100);
      }
    };

  it.only('/ (GET) 1000', async () => {
    const iterationCount = 100;
    // const url = `http://localhost:3100/articles`;
    const url = `http://pub.mapbul.scub111.com/articles`;
    // const url = `http://localhost:8081/api/values`;
    // const url = `https://www.google.com/`;
    const threadCount = 10;
    const pool = new promisePool(
      generatePromises(iterationCount, url) as any,
      threadCount,
    );
    const t0 = new Date();
    await pool.start();
    const diff = new Date().valueOf() - t0.valueOf();
    const rps = (iterationCount / diff) * 1000;
    console.log(`Total: ${diff} ms, RPS: ${rps.toFixed(1)} req/s`);
  });

  it('/ MySql', async done => {
    const iterationCount = 10000;
    const t0 = new Date();
    const articlesService = new ArticlesService();

    for (let i = 0; i < iterationCount; i++) {
      const articles = await articlesService.getAll();
      // console.log(articles);
      // console.log('test');
    }

    // await articlesService.test();

    const diff = new Date().valueOf() - t0.valueOf();
    const rps = (iterationCount / diff) * 1000;
    console.log(`Total: ${diff} ms, RPS: ${rps.toFixed(1)} req/s`);
    done();
  });
});
