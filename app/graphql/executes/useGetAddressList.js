import { useLazyQuery } from '@apollo/client';
import { account, app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADDRESS_LIST } from '../gql';

export const useGetAddressList = (onCompleted) => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.account.addresses);

  Logger.debug(addresses, '======> addresses');

  const [getAddressList, getAddressListResp] = useLazyQuery(ADDRESS_LIST, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      if (typeof onCompleted === 'function') {
        onCompleted();
      }
    },
    onError: () => {
      dispatch(app.hideLoading());
    },
  });

  React.useEffect(() => {
    if (addresses?.length <= 0) {
      getAddressList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (getAddressListResp.data?.customer?.addresses) {
      dispatch(
        account.saveAddressCustomer(
          getAddressListResp.data?.customer?.addresses,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAddressListResp]);

  return [addresses, getAddressList];
};
