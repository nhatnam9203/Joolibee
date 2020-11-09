import { useQuery } from '@apollo/client';
import { CustomFlatList } from '@components';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ADDRESS_LIST } from '../queries';

const defaultData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const QueryAddressList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
  ListFooterComponent,
  ListHeaderComponent,
  isDefault = false,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(ADDRESS_LIST, {
    fetchPolicy: 'cache-first',
  });

  let _data = data?.customer ? data?.customer?.addresses : defaultData;

  let addresses = _data.filter((address) => {
    if (isDefault) {
      return address.default_shipping || address.default_billing;
    }
    return !address.default_shipping && !address.default_billing;
  });

  if (error) {
    return <></>;
  }

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <CustomFlatList
      data={addresses}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
