import { TopBar } from '@components';
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
    <TopBar.Bar
      style={AppStyles.styles.topBar}
      leftComponents={
        <>
          <TopBar.Action
            source={images.icons.nav_account}
            onPress={() => {
              navigation.navigate(ScreenName.Account);
            }}
          />
          <TopBar.Space />
          <TopBar.Action
            source={images.icons.nav_qrcode}
            onPress={() => {
              dispatch(account.showQRCode());
            }}
          />
        </>
      }
      rightComponents={
        <>
          <TopBar.Action
            source={images.icons.nav_notify}
            onPress={() => {
              navigation.navigate(ScreenName.Notification);
            }}
          />
          <TopBar.Space />
          <TopBar.Action
            source={images.icons.nav_order}
            onPress={() => {
              dispatch(order.showOrderList());
            }}
          />
        </>
      }>
      <TopBar.Logo source={images.icons.nav_logo} />
    </TopBar.Bar>
  );
});
