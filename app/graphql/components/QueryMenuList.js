import { gql, useQuery, useApolloClient } from '@apollo/client';
import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { CustomFlatList } from '@components';

const MENU_LIST = gql`
  query categoryList($arrayCategory: [String]) {
    categoryList(filters: { ids: { in: $arrayCategory } }) {
      id
      thumbnail_image
      name
      position
      products(pageSize: 5, currentPage: 1) {
        items {
          id
          sku
          point
          name
          image {
            url
          }
          price_range {
            maximum_price {
              final_price {
                value
                currency
              }
            }
            minimum_price {
              final_price {
                value
                currency
              }
            }
          }
        }
      }
    }
  }
`;

const defaultData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const QueryMenuList = ({ renderItem, renderItemLoading }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(MENU_LIST, {
    fetchPolicy: 'cache-first',
  });

  React.useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [data, refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  if (error) {
    return <></>;
  }

  return (
    <CustomFlatList
      data={
        [...data?.categoryList].sort((a, b) => a.position - b.position) ||
        defaultData
      }
      renderItem={
        loading || !data?.categoryList ? renderItemLoading : renderItem
      }
      horizontal={false}
      numColumns={2}
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
  contentContainerStyle: {
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
});
