import { useQuery, NetworkStatus } from '@apollo/client';
import { CustomFlatList } from '@components';
import { translate } from '@localize';
import React from 'react';
import { RefreshControl, StyleSheet, View, Text } from 'react-native';
import { AppStyles } from '@theme';
import { useOrderList } from '../executes';
const defaultData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export const QueryOrderList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
}) => {
  const [currentPage, nextPage] = React.useState(1);
  const [
    {
      loading,
      error,
      refetch,
      fetchMore,
      networkStatus,
      orderList = defaultData,
    },
    getOrderList,
  ] = useOrderList();

  const handleRefresh = () => {
    refetch();
  };

  const handleFreshMore = () => {
    const next_page = currentPage + 1;
    nextPage(next_page);
    fetchMore({
      variables: { currentPage: next_page },
      updateQuery: (prev, { fetchMoreResult }) => {
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

  React.useEffect(() => {
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <View />;
  }

  return (
    <CustomFlatList
      data={orderList}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={handleRefresh}
        />
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
