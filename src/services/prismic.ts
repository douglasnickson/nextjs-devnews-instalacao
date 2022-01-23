import * as Prismic from '@prismicio/client';
import fetch from 'node-fetch';

const routes = [
  {
    type: 'post',
    path: '/:uid',
  },
];

export function getPrismicClient() {
  const repoName = 'dn-devnews';
  const endpoint = Prismic.getEndpoint(repoName);
  const client = Prismic.createClient(endpoint, {
    routes,
    fetch,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  return client;
}
