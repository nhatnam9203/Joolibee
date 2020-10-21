import { Bar, Action, Space, Logo } from '@components';
import { useNavigation } from '@react-navigation/native';
import { account, order } from '@slices';
import { AppStyles, images } from '@theme';
import React from 'react';
import { useDispatch } from 'react-redux';
import ScreenName from '../ScreenName';

export const TopBarComponent = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Bar
      style={AppStyles.styles.topBar}
      leftComponents={
        <>
          <Action
            source={images.icons.nav_account}
            onPress={() => {
              navigation.navigate(ScreenName.Account);
            }}
          />
          <Space />
          <Action
            source={images.icons.nav_qrcode}
            onPress={() => {
              dispatch(account.showQRCode());
            }}
          />
        </>
      }
      rightComponents={
        <>
          <Action
            source={images.icons.nav_notify}
            onPress={() => {
              navigation.navigate(ScreenName.Notification);
            }}
          />
          <Space />
          <Action
            source={images.icons.nav_order}
            onPress={() => {
              dispatch(order.showOrderList());
            }}
          />
        </>
      }>
      <Logo source={images.icons.nav_logo} />
    </Bar>
  );
});
