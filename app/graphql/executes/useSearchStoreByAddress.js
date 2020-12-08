import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SEARCH_STORE_BY_ADDRESS } from '../gql';

export const useSearchStoreByAddress = () => {
  const { searchStore, storeResp } = useLazyQuery(SEARCH_STORE_BY_ADDRESS, {
    fetchPolicy: 'no-cache',
  });

  return [storeResp, searchStore];
};
