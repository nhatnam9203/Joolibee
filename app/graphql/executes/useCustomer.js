import { useLazyQuery } from '@apollo/client';
import { CUSTOMER_INFO } from '../gql';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCustomer = () => {
  const dispatch = useDispatch();
  const [getCustomerInfo, getCustomerResp] = useLazyQuery(CUSTOMER_INFO, {
    fetchPolicy: 'no-cache',
  });

  const customerInfo = useSelector((state) => state.account.user?.profile);
  // console.log('customerInfo', customerInfo);
  React.useEffect(() => {
    if (getCustomerResp.data?.customer) {
      dispatch(account?.saveUserInfo(getCustomerResp.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerResp?.data]);

  React.useEffect(() => {
    if (!customerInfo) {
      getCustomerInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [customerInfo, getCustomerInfo];
};
