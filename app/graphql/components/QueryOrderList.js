import { useQuery } from '@apollo/client';
import { CustomFlatList } from '@components';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ORDER_LIST } from '../queries';
import { ORDERS_CUSTOMER } from '../gql';
const defaultData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const QueryOrderList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(ORDERS_CUSTOMER);

  let _data = data?.customer?.orders.items
    ? data?.customer?.orders.items
    : defaultData;
  if (error) {
    return <View />;
  }

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <CustomFlatList
      data={_data}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
