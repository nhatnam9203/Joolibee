import React from 'react';
import { TopBar } from '@components';
import { images, AppStyles } from '@theme';

const TopBarComponent = () => (
  <TopBar.Bar
    style={AppStyles.styles.topBar}
    leftComponents={
      <>
        <TopBar.Action source={images.icons.nav_account} />
        <TopBar.Space />
        <TopBar.Action source={images.icons.nav_qrcode} />
      </>
    }
    rightComponents={
      <>
        <TopBar.Action source={images.icons.nav_notify} />
        <TopBar.Space />
        <TopBar.Action source={images.icons.nav_order} />
      </>
    }>
    <TopBar.Logo source={images.icons.nav_logo} />
  </TopBar.Bar>
);

export default TopBarComponent;
