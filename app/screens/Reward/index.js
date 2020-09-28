import React from 'react';
import { CustomScrollTabView } from '@components';
import { NewRewardPage, MyRewardPage } from './pages';
import { translate } from '@localize';

const RewardScreen = () => {
  return (
    <CustomScrollTabView>
      <NewRewardPage tabLabel={translate('txtNewReward')} key="NewRewardPage" />
      <MyRewardPage tabLabel={translate('txtMyReward')} key="MyRewardPage" />
    </CustomScrollTabView>
  );
};

export default RewardScreen;
