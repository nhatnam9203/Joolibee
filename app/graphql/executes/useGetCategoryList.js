import { useLazyQuery } from '@apollo/client';
import { MENU_LIST } from '../gql';

export const useGetCategoryList = (fetchPolicy) => {
  const [getCategoryList, categoryListResp] = useLazyQuery(MENU_LIST, {
    fetchPolicy: fetchPolicy ?? 'network-only',
    onCompleted: (res) => {},
    onError: (error) => {},
  });

  return [categoryListResp, getCategoryList];
};
