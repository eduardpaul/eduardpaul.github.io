import { useFlexSearch } from 'react-use-flexsearch';

/**
 * `useFlexSearch` throws if the index or store is falsy, so it cannot be called
 * while they are still loading. Isolating it in a component that is only
 * mounted once the data has arrived keeps the hook's contract satisfied without
 * breaking the rules of hooks in the caller.
 */
const FlexSearchResults = ({ query, index, store, children }) => {
  const results = useFlexSearch(query, index, store);
  return children(results);
};

export default FlexSearchResults;
