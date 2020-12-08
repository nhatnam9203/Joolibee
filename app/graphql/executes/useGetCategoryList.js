import { useLazyQuery } from '@apollo/client';
import { MENU_LIST } from '../gql';

export const useGetCategoryList = (onSuccess = () => {}) => {
  const [getCategoryList, categoryListResp] = useLazyQuery(MENU_LIST, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {},
    onError: (error) => {},
  });

  return [categoryListResp, getCategoryList];
};
