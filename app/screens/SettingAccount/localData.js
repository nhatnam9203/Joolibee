import { translate } from '@localize';
import ScreenName from '../ScreenName';
import { CustomSwitch } from '@components';
import React from 'react';
import { LanguageFlag } from '../components';

export const localData = (navigation) => [
  // {
  //   key: 'key_notify',
  //   title: translate('txtReceiveNotify'),
  //   isArrow: false,
  //   buttonComponent: () => <CustomSwitch />,
  // },
  {
    key: 'key_change_password',
    title: translate('txtChangePassword'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.ChangePassword);
    },
  },
  {
    key: 'key_change_language',
    title: translate('txtChangeLanguage'),
    isArrow: true,
    onPress: () => {
      navigation.navigate(ScreenName.ChangeLanguage);
    },
    buttonComponent: () => <LanguageFlag />,
  },
  {
    key: 'key_logout',
  },
];
