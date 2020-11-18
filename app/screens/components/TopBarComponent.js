import { Action, Avatar, Bar, Logo, Space } from '@components';
import { useCustomer, useCustomerCart } from '@hooks';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { account, app } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import ScreenName from '../ScreenName';

const { scaleHeight } = scale;

const BADGE_SIZE = scaleHeight(20);
const AVATAR_SIZE = scaleHeight(50);

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

export const TopBarRight = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { cart } = useCustomerCart();

  return (
    <View style={[AppStyles.styles.horizontalLayout, styles.container]}>
      <Action
        source={images.icons.nav_notify}
        onPress={() => {
          navigation.navigate(ScreenName.Notification);
        }}
        notifyNumber={0}
        bagSize={BADGE_SIZE}
        bagStyle={styles.badgeStyle}
      />
      <Space />
      <Action
        source={images.icons.nav_cart}
        onPress={() => {
          dispatch(app.showOrderList());
        }}
        notifyNumber={cart?.customerCart?.total_quantity}
        bagSize={BADGE_SIZE}
        bagStyle={styles.badgeStyle}
      />
    </View>
  );
};

export const TopBarLeft = React.memo(() => {
  const navigation = useNavigation();
  const { user } = useCustomer();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenName.Account);
      }}>
      <View style={[AppStyles.styles.horizontalLayout, styles.container]}>
        <Avatar source={images.icons.ic_qr_logo} size={AVATAR_SIZE} />

        <Space />
        {/* <Action
        source={images.icons.nav_qrcode}
        onPress={() => {
          dispatch(account.showQRCode());
        }}
      /> */}
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user.firstname + ' ' + user.lastname}
            </Text>
            <Badge size={BADGE_SIZE} style={styles.badgeStyle}>
              {`${0} ${translate('txtPoint')}`}
            </Badge>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInfo: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },

  userName: {
    ...AppStyles.fonts.bold,
    fontSize: scaleHeight(18),
    color: 'white',
  },

  badgeStyle: {
    backgroundColor: '#FFC522',
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: scaleHeight(12),
    alignSelf: 'flex-start',
  },
});
