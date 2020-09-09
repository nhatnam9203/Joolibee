import React from 'react';
import { TopBar } from '@components';
import { images, AppStyles } from '@theme';

const TopBarComponent = () => (
  <TopBar.Bar
    style={AppStyles.styles.topBar}
    leftComponents={
      <>
        <TopBar.Action source={images.icons.nav_account} onPress={() => {}} />
        <TopBar.Space />
        <TopBar.Action source={images.icons.nav_qrcode} onPress={() => {}} />
      </>
    }
    rightComponents={
      <>
        <TopBar.Action source={images.icons.nav_notify} onPress={() => {}} />
        <TopBar.Space />
        <TopBar.Action source={images.icons.nav_order} onPress={() => {}} />
      </>
    }>
    <TopBar.Logo source={images.icons.nav_logo} />
  </TopBar.Bar>
);

export default TopBarComponent;
