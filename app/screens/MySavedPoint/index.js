import { CustomFlatList, CustomTextLink } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem, FlatListItemWithImgHorizontal } from '../components';
import ScreenName from '../ScreenName';

const newRewards = [
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 1,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 2,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 3,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 4,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 5,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 6,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 7,
  },
];

const MySavedPointScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setSettingList([
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
        key: 'key_notify',
        icon: images.icons.ic_notify,
        title: translate('txtSettingNotify'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.HistorySavedPoint);
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
    ]);
  }, [navigation]);

  React.useEffect(() => {
    setData(newRewards);
  }, []);

  const renderMyPointItem = ({ item }) => {
    switch (item.key) {
      case 'key_point':
        return (
          <View style={styles.pointContainer}>
            <View style={styles.pointContent}>
              <View style={styles.pointImage}>
                <Image source={images.icons.ic_jollibee} resizeMode="stretch" />
              </View>
              <Text style={styles.txtPoint}>250</Text>
            </View>
            <CustomTextLink
              label={translate('txtMySavedPoint')}
              style={styles.txtPointDesc}
              onPress={() => {}}
            />
          </View>
        );
      default:
        return (
          <SettingItem item={item} key={item.key} onPress={item?.onPress} />
        );
    }
  };

  const renderNewRewardItem = ({ item }) => (
    <FlatListItemWithImgHorizontal
      imgStyle={styles.imageStyle}
      contentStyle={styles.itemStyle}
      image={item.image}
      item={item}
      onPress={() => {}}>
      <Text style={styles.txtTitle} numberOfLines={4} ellipsizeMode="tail">
        {item.title}
      </Text>
      <View style={styles.bottomStyle}>
        <Text style={styles.beforePrice}>{item.price}</Text>
        <View style={styles.priceContentStyle}>
          <Text style={styles.pricePay}>{item.discount}</Text>
          <Text style={styles.bonusPoint}>
            {`(+${item.bonusPoint} ${translate('txtPoint')})`}
          </Text>
        </View>
      </View>
    </FlatListItemWithImgHorizontal>
  );

  const renderNewRewardHeader = () => (
    <View style={styles.headerContent}>
      <Text style={styles.txtHeader}>{translate('txtNewReward')}</Text>
      <CustomTextLink
        label={`${translate('txtViewAll')}`.toUpperCase()}
        style={styles.txtViewAll}
        onPress={() => {}}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/**My Saved Point */}
        <View style={styles.savedPointContainer}>
          <CustomFlatList
            bounces={false}
            data={settingList}
            renderItem={renderMyPointItem}
            ItemSeparatorComponent={() => (
              <View style={AppStyles.styles.rowSeparator} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>

        {/**My Reward  */}
        <View style={styles.myRewardContainer}>
          <CustomFlatList
            data={newRewards}
            renderItem={renderNewRewardItem}
            horizontal={false}
            keyExtractor={(item, index) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderNewRewardHeader}
            stickyHeaderIndices={[0]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppStyles.colors.background },
  itemStyle: { padding: 10 },
  txtTitle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.text,
    fontSize: 15,
    marginBottom: 20,
    flex: 1,
  },

  bottomStyle: {
    flex: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  priceContentStyle: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  beforePrice: {
    ...AppStyles.fonts.header,
    color: '#707070',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },

  pricePay: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.accent,
    fontSize: 16,
    marginBottom: 5,
  },

  bonusPoint: {
    ...AppStyles.fonts.medium,
    color: '#707070',
    fontSize: 12,
    marginBottom: 5,
  },

  imageStyle: { resizeMode: 'center', marginRight: 5 },

  savedPointContainer: {
    flex: 0,
    marginBottom: 20,
  },

  pointContainer: {
    height: 154,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  pointContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointImage: {
    backgroundColor: '#E31837',
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  txtPoint: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.text,
    fontSize: 54,
  },

  txtPointDesc: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.accent,
    fontSize: 18,
  },

  contentContainerStyle: {
    backgroundColor: '#fff',
  },

  myRewardContainer: {
    paddingHorizontal: 15,
    backgroundColor: AppStyles.styles.background,
    flex: 1,
  },

  headerContent: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: AppStyles.colors.background,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  txtHeader: {
    ...AppStyles.fonts.title,
  },

  txtViewAll: {
    ...AppStyles.fonts.bold,
    color: AppStyles.colors.text,
    fontSize: 14,
  },
});
export default MySavedPointScreen;
