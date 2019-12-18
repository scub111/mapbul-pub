import fetch from 'isomorphic-unfetch';

async function fetchWrapper(endpoint: string, init?: RequestInit) {
  try {
    const data = await fetch(endpoint, init).then(res => res.json());
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