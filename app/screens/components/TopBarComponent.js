import React from 'react';
import { TopBar } from '@components';
import { images, AppStyles } from '@theme';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../ScreenName';
import { useDispatch } from 'react-redux';
import { showOrderList } from '@slices/order';

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
          <TopBar.Action source={images.icons.nav_qrcode} onPress={() => {}} />
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
              dispatch(showOrderList());
            }}
          />
        </>
      }>
      <TopBar.Logo source={images.icons.nav_logo} />
    </TopBar.Bar>
  );
});
