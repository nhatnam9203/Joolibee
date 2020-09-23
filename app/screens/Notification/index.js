import React from 'react';
import { CustomScrollTabView } from '@components';
import { ReceivedPointPage, UsedPointPage } from './pages';
import { translate } from '@localize';

const NotificationScreen = () => {
  return (
    <CustomScrollTabView>
      <ReceivedPointPage
        tabLabel={translate('txtReceivedPoint')}
        key="ReceivedPoint"
      />
      <UsedPointPage tabLabel={translate('txtUsedPoint')} key="UsedPoint" />
    </CustomScrollTabView>
  );
};

export default NotificationScreen;
