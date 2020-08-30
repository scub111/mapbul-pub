import fetch from 'isomorphic-unfetch';
import { isClient } from 'utils';
//import { Mutex } from '@mapbul-pub/utils';
import { Mutex } from '@mapbul-pub/utils';

const cache = new Map();
const isCachingOnClient = true;
const mutex = new Mutex();

async function fetchWrapper(endpoint: string, init?: RequestInit) {
  try {
    let data;
    if (isCachingOnClient && isClient) {
      const unlock = await mutex.lock();
      if (cache.has(endpoint)) {
        data = cache.get(endpoint);
      } else {
        data = await fetch(endpoint, init).then(res => res.json());
        cache.set(endpoint, data);
      }
      unlock();
    } else {
      data = await fetch(endpoint.replace('https://', 'http://'), init).then(res => res.json());
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function get(endpoint: string) {
  return fetchWrapper(endpoint);
}
