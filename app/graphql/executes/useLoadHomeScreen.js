import { useLazyQuery } from '@apollo/client';
import { HOME_SCREEN } from '../gql';

export const useLoadHomeScreen = (fetchPolicy) => {
  const [getHomeScreen, homeScreenResp] = useLazyQuery(HOME_SCREEN, {
    fetchPolicy: fetchPolicy ?? 'network-only',
  });

  const loadHomeScreen = () => {
    getHomeScreen();
  };

  return [homeScreenResp, loadHomeScreen];
};
