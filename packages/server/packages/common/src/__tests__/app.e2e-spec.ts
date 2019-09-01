import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'server/app.module';
import { INestApplication } from '@nestjs/common';
import { ArticlesService } from 'server/articles/articles.service';
import promisePool from 'es6-promise-pool';
import axios from 'axios';

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

  const simulate = async (iter: number, ms: number) => {
    try {
      if (iter % 1000 === 0) {
        throw new Error('Trouble');
      }
      await sleep(ms);
    } catch (e) {
      // console.log(e);
    }
  };

  const get = async (url: string) => {
    try {
      // await request(url).get('/');
      await axios({url});
    } catch (e) {
      console.log(e);
    }
  };

  const generatePromises = (iterationCount: number, url: string) =>
    function*() {
      for (let i = 0; i < iterationCount; i++) {
        // yield request(url).get('/').catch(e => console.log(e));
        yield get(url);
        // yield simulate(i, 1);
        // yield sleep(100);
      }
    };

  it.only('/ (GET) 1000', async () => {
    const iterationCount = 5000;
    // const url = `http://localhost:3100/articles`;
    const url = `http://pub.mapbul.scub111.com/articles`;
    // const url = `http://mapbul.scub111.com`;
    // const url = `http://192.168.0.22:8081/articles`;
    // const url = `http://192.168.0.22:8082`;
    // const url = `http://localhost:8081/api/values`;
    // const url = `https://www.google.com/`;
    const threadCount = 50;
    const pool = new promisePool(
      generatePromises(iterationCount, url) as any,
      threadCount,
    );

    pool.addEventListener('fulfilled', (event: any) => {
      // console.log('Fulfilled: ' + event.data.result);
    });

    pool.addEventListener('rejected', (event: any) => {
      console.log('Rejected: ' + event.data.error.message);
    });

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
