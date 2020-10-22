import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomFlatList } from '@components';

const PRODUCT = gql`
  query products($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        sku
        __typename
        id
        name
        point
        image {
          url
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
        }
        ... on BundleProduct {
          dynamic_sku
          dynamic_price
          dynamic_weight
          price_view
          ship_bundle_items
          items {
            option_id
            title
            required
            type
            position
            sku
            options {
              id
              quantity
              position
              is_default
              price
              price_type
              can_change_quantity
              label
              product {
                id
                name
                sku
                __typename
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QueryProductDetail = ({
  renderItem,
  renderItemLoading,
  renderMainSection,
  productItem,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState(null);

  const { loading, error, data, refetch } = useQuery(PRODUCT, {
    variables: productItem,
  });

  React.useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }

    if (data) {
      const {
        products: {
          items: [first],
        },
      } = data;
      setItemDetail(first);
    }
  }, [data, refreshing]);

  Logger.debug(itemDetail, 'itemDetail');

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  Logger.info(productItem, 'productItem');
  Logger.info(data, 'data');
  Logger.info(error, 'error');

  if (error) return <></>;

  const { items = [], ...main } = itemDetail || {};
  return (
    <CustomFlatList
      data={items}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      keyExtractor={(item, index) => item.option_id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (main ? renderMainSection(main) : <View />)}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      // }
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
