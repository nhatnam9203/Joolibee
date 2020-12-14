import { useLazyQuery } from '@apollo/client';
import { GET_NOTIFY_LIST } from '../gql';
import { useDispatch, useSelector } from 'react-redux';
import { account } from '@slices';
import React from 'react';

export const useGetNotifyList = () => {
  const dispatch = useDispatch();
  const notifyList = useSelector((state) => state.account?.notificationList);

  const [getNotifyList, notifyResp] = useLazyQuery(GET_NOTIFY_LIST, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {},
    onError: (error) => {},
  });

  React.useEffect(() => {
    if (notifyResp?.data && !notifyResp?.error) {
      dispatch(
        account.setNotificationList(
          notifyResp?.data?.customerNotification?.list,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifyResp]);

  return [{ ...notifyResp, notifyList }, getNotifyList];
};
