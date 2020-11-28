import { useLazyQuery } from '@apollo/client';
import { CUSTOMER_INFO } from '../gql';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCustomer = () => {
  const dispatch = useDispatch();
  const [getCustomerInfo, response] = useLazyQuery(CUSTOMER_INFO, {
    fetchPolicy: 'cache-and-network',
    //   onCompleted: (data) => {
    //     Logger.debug(data, 'get customer info complete');
    //   },
  });

  /**
   * {"customer":{"__typename":"Customer",
   * "email":"luc@gmail.com",
   * "firstname":"Lil",
   * "lastname":"Moi",
   * "phone_number":"0921251798",
   * "gender":2,
   * "date_of_birth":"2008-09-11",
   * "addresses":[
   * {"__typename":"CustomerAddress","full_address":"61 Cao Thắng, phường 3, Quận 3, Thành phố Hồ Chí Minh, Việt Nam","default_shipping":true},
   * {"__typename":"CustomerAddress","full_address":"33 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam","default_shipping":false},
   * {"__typename":"CustomerAddress","full_address":"29/31 Hoàng Hoa Thám, phường 6, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam","default_shipping":false}]}}
   */

  const user = useSelector((state) => state.account.user?.profile);

  React.useEffect(() => {
    if (response.data?.customer) {
      dispatch(account?.saveUserInfo(response.data));
    }
  }, [response, dispatch]);

  React.useEffect(() => {
    if (!user) {
      getCustomerInfo();
    }
  }, [getCustomerInfo, user]);

  return {
    getCustomerInfo,
    customer: user,
  };
};
