import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://localhost:3222'
});

export const fetcher = (url: string, ...args: any) =>
  api.get(url, ...args).then((res) => res.data);
