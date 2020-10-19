import { CustomFlatList } from '@components';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const MENU_DETAIL_LIST = gql`
  query products($categoryId: String!) {
    products(filter: { category_id: { eq: $categoryId } }) {
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
`;

export const QueryMenuDetailList = ({
  renderItem = () => <View />,
  renderItemLoading = () => <View />,
  categoryId,
  input,
}) => {
  const {
    loading,
    error,
    // eslint-disable-next-line no-unused-vars
    data = {
      products: { items: input },
    },
    fetchMore,
  } = useQuery(MENU_DETAIL_LIST, {
    variables: { categoryId },
  });

  if (error) {
    Logger.debug(error, 'Error!');
    return null;
  }

  return (
    <CustomFlatList
      data={data.products?.items}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
