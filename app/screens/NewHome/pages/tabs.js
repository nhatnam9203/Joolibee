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
} from '../../components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

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
      screen: MenuPageName,
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
    <CustomButton
      onPress={() => navigation.navigate(item?.screen)}
      borderRadius={16}
      width={scaleWidth(185)}
      height={scaleHeight(94)}
      style={styles.cardContainer}
      styleContent={styles.cardContent}>
      <Image source={item.icon} style={styles.img} />
      <Text style={styles.txtTitle}>{item.title?.toUpperCase()}</Text>
    </CustomButton>
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
  cardContainer: {
    margin: 7,
    shadowColor: '#00000090',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 10,
    backgroundColor: AppStyles.colors.accent,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: 5,
  },
  txtTitle: {
    fontSize: scaleHeight(14),
    color: AppStyles.colors.primary,
    ...AppStyles.fonts.SVN_Merge_Bold,
  },
  img: {
    width: scaleWidth(50),
    height: scaleHeight(39),
    resizeMode: 'contain',
  },
});
