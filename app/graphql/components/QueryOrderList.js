import { useQuery } from '@apollo/client';
import { CustomFlatList } from '@components';
import { translate } from '@localize';
import React from 'react';
import { RefreshControl, StyleSheet, View, Text } from 'react-native';
import { AppStyles } from '@theme';
import { ORDERS_CUSTOMER } from '../gql';
const defaultData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export const QueryOrderList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, nextPage] = React.useState(1);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    ORDERS_CUSTOMER,
    {
      variables: { currentPage },
    },
  );

  let _data = data?.customer?.orders.items
    ? data?.customer?.orders?.items
    : defaultData;
  if (error) {
    return <View />;
  }

  const sortList = () => {
    let list = [..._data];
    let newList = list?.sort((a, b) => {
      if (+a.number < +b.number) return 1;
      if (+a.number > +b.number) return -1;
      return 0;
    });
    return newList;
  };
  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleFreshMore = () => {
    const next_page = currentPage + 1;
    nextPage(next_page);
    console.log('next_page', next_page);
    fetchMore({
      variables: { currentPage: next_page },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('fetchMoreResult', fetchMoreResult);
        if (!fetchMoreResult) {
          return prev;
        }
        // return Object.assign({}, prev, {
        //   feed: [...prev.feed, ...fetchMoreResult.feed],
        // });
      },
    });
  };

  const renderEmptyList = () => (
    <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>
      {translate('txtEmptyOrderList')}
    </Text>
  );

  return (
    <CustomFlatList
      data={sortList()}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={renderEmptyList}
      // ListFooterComponent={() => (
      //   <CustomButton onPress={handleFreshMore} width="90%" label="Load more" />
      // )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
