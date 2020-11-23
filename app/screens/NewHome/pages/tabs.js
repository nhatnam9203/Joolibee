import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CardView, StorePageName } from '../../components';
import ScreenName from '../../ScreenName';
const { scaleWidth, scaleHeight } = scale;

const Tabs = React.memo(() => {
  const navigation = useNavigation();
  const TABS = [
    {
      title: translate('tabPromotion'),
      icon: images.icons.tab_new_promotion,
      screen: ScreenName.Promotion,
    },
    {
      title: translate('tabMenu'),
      icon: images.icons.tab_new_menu,
      screen: ScreenName.Menu,
    },
    {
      title: translate('tabOrder'),
      icon: images.icons.tab_new_order,
      screen: ScreenName.MyOrders,
    },
    {
      title: translate('tabStore'),
      icon: images.icons.tab_new_store,
      screen: StorePageName,
    },
  ];

  const renderItem = ({ item }) => (
    <CardView
      key={item.title}
      onPress={() => navigation.navigate(item?.screen)}
      borderRadius={scaleHeight(16)}
      width={scaleWidth(185)}
      height={scaleHeight(94)}
      url={item.icon}
      title={item.title?.toUpperCase()}
      bgColor={AppStyles.colors.accent}
    />
  );

  return (
    <View style={styles.container}>
      {/** !TODO: Remove when fixed, VirtualizedLists should never be nested */}
      <FlatList
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        data={TABS}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(_) => _.title}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    padding: 5,
  },
});

export default Tabs;
