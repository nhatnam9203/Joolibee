import { useQuery } from '@apollo/client';
import { Action, Avatar, Bar, Logo, Space } from '@components';
import { query } from '@graphql';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { account, app } from '@slices';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import ScreenName from '../ScreenName';

const BADGE_SIZE = 20;

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
            source={images.icons.nav_cart}
            onPress={() => {
              dispatch(app.showOrderList());
            }}
          />
        </>
      }>
      <Logo source={images.icons.nav_logo} />
    </Bar>
  );
});

export const TopBarRight = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={[AppStyles.styles.horizontalLayout, styles.container]}>
      <Action
        source={images.icons.nav_notify}
        onPress={() => {
          navigation.navigate(ScreenName.Notification);
        }}
        notifyNumber={3}
      />
      <Space />
      <Action
        source={images.icons.nav_cart}
        onPress={() => {
          dispatch(app.showOrderList());
        }}
        notifyNumber={2}
      />
    </View>
  );
});

export const TopBarLeft = React.memo(() => {
  const { data } = useQuery(query.CUSTOMER_INFO, {
    fetchPolicy: 'cache-first',
  });

  return (
    <View style={[AppStyles.styles.horizontalLayout, styles.container]}>
      <Avatar source={images.icons.ic_qr_logo} />

      <Space />
      {/* <Action
        source={images.icons.nav_qrcode}
        onPress={() => {
          dispatch(account.showQRCode());
        }}
      /> */}
      {data?.customer && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {data?.customer.firstname + ' ' + data?.customer.lastname}
          </Text>
          <Badge size={BADGE_SIZE} style={styles.badgeStyle}>
            {`${0} ${translate('txtPoint')}`}
          </Badge>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },

  userInfo: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  userName: { ...AppStyles.fonts.bold, fontSize: 15, color: 'white' },

  badgeStyle: {
    backgroundColor: '#FFC522',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});
