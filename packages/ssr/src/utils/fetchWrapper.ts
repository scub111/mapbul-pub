import fetch from 'isomorphic-unfetch';
import getConfig from "next/config";
// import { setConfig } from 'next/config'
const { publicRuntimeConfig } = getConfig();
// setConfig({ publicRuntimeConfig })

export async function fetchWrapper(endpoint: string, init?: RequestInit) {
  try {
    const baseUrl = publicRuntimeConfig.BASE_URL;
    console.log(baseUrl);
    const data = await fetch(`${baseUrl}/${endpoint}`, init).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
