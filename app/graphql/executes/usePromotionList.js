import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { PROMOTION_LIST } from '../gql';
import React from 'react';

export const usePromotionList = () => {
  const dispatch = useDispatch();

  const [promotionList, setPromotionList] = React.useState(null);

  const [getPromotions, promotionResp] = useLazyQuery(PROMOTION_LIST, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      dispatch(app.hideLoading());
      setPromotionList(promotionResp.data?.promotionScreen?.list);
    },
    onError: (error) => {
      dispatch(app.hideLoading());
    },
  });

  const getPromotionList = () => {
    dispatch(app.showLoading());
    getPromotions();
  };

  return [promotionList, getPromotionList];
};
