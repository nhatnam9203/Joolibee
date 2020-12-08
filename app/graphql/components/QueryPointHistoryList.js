import { useQuery } from '@apollo/client';
import { CustomFlatList } from '@components';
import { AppStyles } from '@theme';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ORDER_LIST } from '../queries';
import { translate } from '@localize';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { Text } from 'react-native';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const defaultData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const ItemLoading = () => (
  <Placeholder
    Animation={Fade}
    style={styles.itemContainer}
    Left={() => <PlaceholderMedia style={styles.pointImage} />}
    Right={() => <PlaceholderLine width={15} />}>
    <PlaceholderLine width={60} />
    <PlaceholderLine width={30} style={styles.txtDate} />
  </Placeholder>
);

const renderEmptyList = () => (
  <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>
    {translate('txtEmptyPointHistoryList')}
  </Text>
);

export const QueryPointHistoryList = ({
  renderItem = () => <View />,
  renderItemLoading = ItemLoading,
  ItemSeparatorComponent,
  contentContainerStyle,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  // const { loading, error, data, refetch } = useQuery(ORDER_LIST, {
  //   variables: null,
  // });

  // let _data = defaultData;

  // if (error) {
  //   return null;
  // }

  const handleRefresh = () => {
    setRefreshing(true);
    // refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <CustomFlatList
      data={[]}
      //renderItem={loading ? renderItemLoading : renderItem}
      renderItem={renderItem}
      horizontal={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={renderEmptyList}
    />
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    height: scaleHeight(70),
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',

    ...AppStyles.styles.shadow,
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
});
