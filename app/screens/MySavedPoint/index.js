import { CustomFlatList, CustomImageBackground } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import { scale } from '@utils';
import { GCC } from '@graphql';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';
const { scaleHeight, scaleWidth } = scale;
const newRewards = [
  {
    title: 'Đơn hàng #0000012',
    points: '+18 điểm',
    date: '26/08/2020',
    id: 1,
    color_point: AppStyles.colors.accent,
  },
  {
    title: 'Đơn hàng #0000012',
    points: '+18 điểm',
    date: '26/08/2020',
    id: 2,
    color_point: AppStyles.colors.accent,
  },
  {
    title: 'Đổi 25 điểm nhận 25.000đ',
    points: '- 25 điểm',
    date: '26/08/2020',
    id: 3,
    color_point: '#484848',
  },
  {
    title: 'Đổi 10 điểm nhận 10.000đ',
    points: '+18 điểm',
    date: '26/08/2020',
    id: 4,
    color_point: AppStyles.colors.accent,
  },
  {
    title: 'Đơn hàng #0000012',
    points: '-10 điểm',
    date: '26/08/2020',
    id: 5,
    color_point: '#484848',
  },
];

const MySavedPointScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);
  const [data, setData] = React.useState([]);
  const onViewAllHistory = () =>
    navigation.navigate(ScreenName.HistorySavedPoint);

  React.useEffect(() => {
    setSettingList([
      {
        key: 'key_point',
        title: translate('txtSettingPoint'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.MySavedPoint);
        },
      },
      {
        key: 'key_guide_save_reward',
        title: translate('txtPointAccumulateGuide'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SupportDetail, {
            title: translate('txtPointAccumulateGuide'),
          });
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
            <Text style={styles.txtPointDesc}>
              {translate('txtMySavedPoint')}
            </Text>
            <View style={styles.pointContent}>
              <View style={styles.pointImage}>
                <Image source={images.icons.ic_jollibee} resizeMode="stretch" />
              </View>
              <Text style={styles.txtPoint}>0</Text>
            </View>
            <Text style={styles.txtPointExpire}>
              {translate('txtExpirePoint')} 11/17/2020
            </Text>

            <Text style={styles.txtNoteExpire}>
              {translate('txtHowToExendPoints')}
            </Text>
          </View>
        );
      default:
        return (
          <SettingItem item={item} key={item.key} onPress={item?.onPress} />
        );
    }
  };

  const renderNewRewardItem = ({ item, index }) => {
    const lastIndex = newRewards?.length - 1;
    const borderRadiusTop = { borderTopEndRadius: 6, borderTopStartRadius: 6 };
    const borderRadiusBottom = {
      borderBottomEndRadius: 6,
      borderBottomStartRadius: 6,
    };
    const borderRadiusStyle =
      index === 0
        ? borderRadiusTop
        : index === lastIndex
        ? borderRadiusBottom
        : {};
    return (
      <View style={[styles.itemContainer, borderRadiusStyle]}>
        <View style={styles.pointImage}>
          <Image source={images.icons.ic_jollibee} resizeMode="stretch" />
        </View>
        <View style={styles.itemSubContainer}>
          <Text style={[styles.txtPoints, { color: item.color_point }]}>
            {item.points}
          </Text>

          <Text style={{ ...AppStyles.fonts.bold, fontSize: scaleWidth(16) }}>
            {item.title}
          </Text>

          <Text numberOfLines={1} style={[AppStyles.fonts.mini, {}]}>
            {item.date}
          </Text>
        </View>
      </View>
    );
  };

  const renderNewRewardHeader = () => (
    <View style={[styles.headerContent, styles.headerSeeAll]}>
      <Text style={styles.txtHeader}>{translate('txtSavedPointHistory')}</Text>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={onViewAllHistory}>
        <Text onPress={onViewAllHistory} style={styles.txtViewAll}>
          {translate('txtViewAll').toUpperCase()}
        </Text>
        <Image source={images.icons.ic_forward_red} />
      </TouchableOpacity>
    </View>
  );

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.container}>
      {/**My Saved Point */}
      <View style={styles.savedPointContainer}>
        <CustomFlatList
          data={settingList}
          scrollEnabled={false}
          renderItem={renderMyPointItem}
          ItemSeparatorComponent={() => (
            <View style={AppStyles.styles.rowSeparator} />
          )}
        />
      </View>

      {/**My Reward  */}
      {renderNewRewardHeader()}
      <GCC.QueryPointHistoryList
        renderItem={renderNewRewardItem}
        //renderItemLoading={renderItemLoading}
        contentContainerStyle={styles.myRewardContainer}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
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
  },

  pointContainer: {
    height: scaleHeight(261),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  pointContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointImage: {
    backgroundColor: '#E31837',
    width: scaleWidth(46),
    height: scaleHeight(46),
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  txtPoint: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    color: AppStyles.colors.text,
    fontSize: 54,
  },

  txtPointDesc: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    color: AppStyles.colors.accent,
    fontSize: 24,
  },

  txtPointExpire: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.text,
    fontWeight: 'bold',
  },

  txtNoteExpire: {
    ...AppStyles.fonts.mini,
    color: AppStyles.colors.text,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 15,
  },

  txtPoints: {
    ...AppStyles.fonts.bold,
    color: AppStyles.colors.accent,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  contentContainerStyle: {
    backgroundColor: '#fff',
  },

  itemContainer: {
    backgroundColor: '#fff',
    height: scaleHeight(70),
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',

    ...AppStyles.styles.shadow,
  },

  myRewardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    // flex: 1,
  },

  itemSubContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '83%',
  },

  headerContent: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: AppStyles.colors.background,
    // paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSeeAll: {
    marginVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
  },
  txtHeader: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: 18,
  },

  txtViewAll: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    color: AppStyles.colors.accent,
    fontSize: 14,
  },
  seperator: { height: 1, backgroundColor: '#E1E1E1' },
});
export default MySavedPointScreen;
