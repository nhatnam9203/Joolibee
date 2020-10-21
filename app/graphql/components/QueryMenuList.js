import { CustomFlatList } from '@components';
import { StyleSheet, RefreshControl, View } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const MENU_LIST = gql`
  query categoryList($arrayCategory: [String]) {
    categoryList(filters: { ids: { in: $arrayCategory } }) {
      id
      thumbnail_image
      name
      products(pageSize: 5, currentPage: 1) {
        items {
          id
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

export const QueryMenuList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(MENU_LIST, {
    variables: null,
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
    return null;
  }

  return (
    <CustomFlatList
      data={data?.categoryList || defaultData}
      renderItem={loading ? renderItemLoading : renderItem}
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
  contentContainerStyle: { paddingVertical: 15 },
});
