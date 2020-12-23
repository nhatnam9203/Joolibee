import { useLazyQuery } from '@apollo/client';
import { order } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { ORDERS_CUSTOMER } from '../gql';

export const useOrderList = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.order.orderList);

  const [getOrders, orderListResp] = useLazyQuery(ORDERS_CUSTOMER, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res) {
        dispatch(order.setOrderItemList(res?.customerOrders?.orders));
      }
    },
    onError: (error) => {},
  });

  const getOrderList = (pageInfo) => {
    const { currentPage = 1, pageSize = 20 } = pageInfo || {};

    getOrders({ variables: { currentPage, pageSize } });
  };

  return [{ ...orderListResp, orderList }, getOrderList];
};
