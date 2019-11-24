import fetch from 'isomorphic-unfetch';

export async function sampleFetchWrapper(input: string, init?: RequestInit) {
  try {
    const baseUrl = 'http://localhost:3100/api';
    // const baseUrl = 'http://api.mapbul.scub111.com/api';
    const data = await fetch(`${baseUrl}/${input}`, init).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
