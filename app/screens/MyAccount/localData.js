import { translate } from '@localize';
import ScreenName from '../ScreenName';
import { images } from '@theme';

export const localData = (navigation) => [
  {
    key: 'key_point',
    icon: images.icons.ic_jollibee,
    title: translate('txtSettingPoint'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.MySavedPoint);
    },
  },
  {
    key: 'key_promotion',
    icon: images.icons.ic_promotion,
    title: translate('txtSettingPromotion'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.MyReward);
    },
  },
  {
    key: 'key_order_list',
    icon: images.icons.ic_order_list,
    title: translate('txtSettingOrderList'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.MyOrders);
    },
  },

  {
    key: 'key_address',
    icon: images.icons.ic_address,
    title: translate('txtSettingAddress'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.MyAddress);
    },
  },
  {
    key: 'key_jollibee_vn',
    icon: images.icons.ic_jollibee_vn,
    title: translate('txtJollibeeVN'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.JollibeeVN);
    },
  },
  // {
  //   key: 'key_notify',
  //   icon: images.icons.ic_notify,
  //   title: translate('txtSettingNotify'),
  //   isArrow: true,
  //   onPress: () => {
  //     navigation.navigate(ScreenName.HistorySavedPoint);
  //   },
  // },
  {
    key: 'key_support',
    icon: images.icons.ic_support,
    title: translate('txtSettingSupport'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.Support);
    },
  },
  {
    key: 'key_setting',
    icon: images.icons.ic_setting,
    title: translate('txtSetting'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.SettingAccount);
    },
  },
];
