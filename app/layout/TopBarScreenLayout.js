import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TopBar } from '@components';
import { images, AppStyles } from '@theme';

const TopBarScreenLayout = ({ children }) => {
  const TopBarRender = React.memo(
    () => (
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
    ),
    [],
  );

  return (
    <View style={AppStyles.styles.container}>
      <TopBarRender />
      {children && (
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default TopBarScreenLayout;
