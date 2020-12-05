import { useLazyQuery, useQuery } from '@apollo/client';
import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { RefreshControl, StyleSheet, View, Text } from 'react-native';
import { ADDRESS_LIST } from '../queries';
import { useGetAddressList } from '../executes';
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
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [addresses, getAddressList, getAddressListResp] = useGetAddressList();
  const { loading, refetch } = getAddressListResp;
  React.useEffect(() => {
    getAddressList();
  }, []);
  let _data = addresses ? addresses : defaultData;

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const renderEmptyList = () => (
    <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>
      {translate('txtEmptyAddressList')}
    </Text>
  );

  return (
    <CustomFlatList
      data={_data}
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
      ListEmptyComponent={renderEmptyList}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
