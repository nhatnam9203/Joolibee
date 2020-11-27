import React from 'react';
import { translate } from '@localize';
import { GCC } from '@graphql';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import { Image, StyleSheet, Text, View } from 'react-native';

import { CustomImageBackground } from '@components';
const { scaleWidth, scaleHeight } = scale;
const PointHistoryScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.itemContainer]}>
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

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <GCC.QueryPointHistoryList
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  itemContainer: {
    backgroundColor: '#fff',
    height: scaleHeight(70),
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
  pointImage: {
    // backgroundColor: '#E31837',
    width: scaleWidth(46),
    height: scaleHeight(46),
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  seperator: { height: 1, backgroundColor: '#E1E1E1' },
});
export default PointHistoryScreen;
