import { useLazyQuery } from '@apollo/client';
import { order } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { ORDERS_CUSTOMER } from '../gql';

export const useOrderList = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.order.orderList);

  const [getOrderList, orderListResp] = useLazyQuery(ORDERS_CUSTOMER, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res) {
        dispatch(order.setOrderItemList(res?.customerOrders?.items));
        Logger.debug(res, '=======> getOrderList');
      }
    },
    onError: (error) => {},
  });

  return [{ ...orderListResp, orderList }, getOrderList];
};
