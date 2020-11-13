import { CustomFlatList } from '@components';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const MENU_DETAIL_LIST = gql`
  query products($categoryId: String!) {
    products(filter: { category_id: { eq: $categoryId } }) {
      items {
        id
        sku
        name
        point
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
`;

const EMPTY_LIST_HEIGHT = 15;

export const QueryMenuDetailList = ({ renderItem, categoryId, input }) => {
  // call graphql
  const { loading, error, data, fetchMore } = useQuery(MENU_DETAIL_LIST, {
    variables: { categoryId },
  });

  // if (error) {
  //   return (
  //     <>
  //       <Text>{error}</Text>
  //     </>
  //   );
  // }

  // Call Render Item
  const onRenderItem = (item) => {
    if (typeof renderItem === 'function') {
      return renderItem(item, loading || !data || error);
    }
  };

  return (
    <CustomFlatList
      data={data?.products?.items || input}
      renderItem={onRenderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: EMPTY_LIST_HEIGHT }} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 0,
  },
});
