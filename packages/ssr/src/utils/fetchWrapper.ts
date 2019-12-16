import fetch from 'isomorphic-unfetch';

export async function fetchWrapper(endpoint: string, init?: RequestInit) {
  try {
    const data = await fetch(endpoint, init).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
