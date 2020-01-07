import fetch from 'isomorphic-unfetch';
import { Mutex } from 'utils';

const cache = new Map();
const isCachingOnClient = true;
const isClientEnviroment = typeof window !== 'undefined';
const mutex = new Mutex();

async function fetchWrapper(endpoint: string, init?: RequestInit) {
  try {
    let data;
    if (isCachingOnClient && isClientEnviroment) {
      const unlock = await mutex.lock();
      if (cache.has(endpoint)) {
        data = cache.get(endpoint);
      } else {
        data = await fetch(endpoint, init).then(res => res.json());
        cache.set(endpoint, data);
      }
      unlock();
    } else {
      data = await fetch(endpoint, init).then(res => res.json());
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export namespace api {
  export async function get(endpoint: string) {
    return fetchWrapper(endpoint);
  }
}
