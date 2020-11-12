import React from 'react';
import { StyleSheet, Image, Text, FlatList, View } from 'react-native';
import { CustomButton } from '@components';
import { AppStyles, images, metrics } from '@theme';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import {
  HomePageName,
  MenuPageName,
  PromotionPageName,
  StorePageName,
  CardView,
} from '../../components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
import ScreenName from '../../ScreenName';

export default function Tabs() {
  const navigation = useNavigation();
  const TABS = [
    {
      title: translate('tabPromotion'),
      icon: images.icons.tab_new_promotion,
      screen: HomePageName,
    },
    {
      title: translate('tabMenu'),
      icon: images.icons.tab_new_menu,
      screen: ScreenName.Menu,
    },
    {
      title: translate('tabOrder'),
      icon: images.icons.tab_new_order,
      screen: PromotionPageName,
    },
    {
      title: translate('tabStore'),
      icon: images.icons.tab_new_store,
      screen: StorePageName,
    },
  ];

  const renderItem = ({ item, index }) => (
    <CardView
      onPress={() => navigation.navigate(item?.screen)}
      borderRadius={16}
      width={scaleWidth(185)}
      height={scaleHeight(94)}
      url={item.icon}
      title={item.title?.toUpperCase()}
      bgColor={AppStyles.colors.accent}
    />
  );
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        data={TABS}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(_, index) => index + ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: metrics.padding,
    alignItems: 'center',
    marginTop: scaleHeight(170),
  },
});
