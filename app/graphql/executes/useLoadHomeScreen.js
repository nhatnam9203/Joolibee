import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HOME_SCREEN } from '../gql';

export const useLoadHomeScreen = () => {
  const dispatch = useDispatch();

  const [getHomeScreen, { data, loading, refetch }] = useLazyQuery(
    HOME_SCREEN,
    {
      fetchPolicy: 'cache-first',
      onCompleted: () => {},
    },
  );

  const onLoadHomeScreen = () => {
    getHomeScreen();
  };

  return {
    loadHomeScreen: onLoadHomeScreen,
  };
};
