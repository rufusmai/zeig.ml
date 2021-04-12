import { NextRouter, useRouter as useNextRouter } from 'next/router';

/**
 * Given a string such as:
 *
 * https://example.com/foo?bar=zip&name=Sam
 *
 * Will return:
 *
 * {
 *   bar: 'zip',
 *   name: 'Sam',
 * }
 */
const queryFromUrl = (url: string) => {
  const [, ...queryStrings] = url.split('?');
  const queryString = queryStrings.join('?');
  const query: {[key: string]: string} = {};

  for (let [key, value] of new URLSearchParams(queryString).entries()) {
    query[key] = value;
  }

  return query;
}

const extractQueryFromRouter = (router: NextRouter) => ({
  ...queryFromUrl(router.asPath),
  ...router.query,
})

/**
 * Provide a router hook which ensures router.query is always correctly hydrated
 * on the first render even when statically optimised to avoid [this caveat from
 * the docs](https://nextjs.org/docs/routing/dynamic-routes):
 *
 * > Pages that are statically optimized by Automatic Static Optimization will
 * > be hydrated without their route parameters provided, i.e `query` will be an
 * > empty object (`{}`).
 *
 * Usage is identical to `import { useRouter } from 'next/router';
 */
export const useRouter = () => {
  const router: NextRouter = useNextRouter();
  router.query = extractQueryFromRouter(router);
  return router;
}
