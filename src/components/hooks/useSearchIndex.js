import { useCallback, useRef, useState } from 'react';

/**
 * Lazily fetches the FlexSearch index and store.
 *
 * Querying `localSearchPages { index store }` inlines the whole index into the
 * page's data, which Gatsby then prefetches from every page that links here —
 * so every visitor paid for it whether or not they ever searched. Querying
 * `publicIndexURL` / `publicStoreURL` instead gives us plain URLs we can fetch
 * the first time someone actually interacts with the search box.
 *
 * @param {string} indexURL  from localSearchPages.publicIndexURL
 * @param {string} storeURL  from localSearchPages.publicStoreURL
 */
const useSearchIndex = (indexURL, storeURL) => {
  const [searchData, setSearchData] = useState(null);
  const started = useRef(false);

  const load = useCallback(() => {
    if (started.current || !indexURL || !storeURL) return;
    started.current = true;

    Promise.all([
      // The index must stay a raw string: FlexSearch's `import()` parses it
      // itself, and handing it an already-parsed object makes it stringify to
      // "[object Object]" and throw.
      fetch(indexURL).then(res => res.text()),
      fetch(storeURL).then(res => res.json()),
    ])
      .then(([index, store]) => setSearchData({ index, store }))
      .catch(() => {
        // Leave searchData null so the caller keeps rendering the full list.
        started.current = false;
      });
  }, [indexURL, storeURL]);

  return [searchData, load];
};

export default useSearchIndex;
