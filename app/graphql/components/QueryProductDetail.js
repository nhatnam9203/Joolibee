import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { CustomFlatList } from '@components';
import { Loading } from '@components';
import { AppStyles } from '@theme';

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
  renderFooter,
  productItem: { sku },
  onCalculatePrice,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState(null);

  const { loading, error, data, refetch } = useQuery(PRODUCT, {
    variables: { sku },
    fetchPolicy: 'cache-first',
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

      if (first) {
        let clone = { ...first };

        let items = new Array(clone.items);
        items?.sort((a, b) => a.position - b.position);

        setItemDetail(Object.assign({}, clone, items));
      }
    }
  }, [data, refreshing]);

  React.useEffect(() => {
    if (typeof onCalculatePrice === 'function' && itemDetail) {
      onCalculatePrice(itemDetail);
    }
  }, [itemDetail, onCalculatePrice]);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  // if (error) return <></>;
  if (loading) {
    return (
      <View style={styles.container}>
        <Loading isLoading={loading} transparent />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      // style={[styles.avoidContainer, { backgroundColor: backgroundColor }]}
      // keyboardVerticalOffset={isIphoneX() ? 88 : 64}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <StatusBar barStyle="dark-content" />
      <CustomFlatList
        data={itemDetail?.items}
        renderItem={loading ? renderItemLoading : renderItem}
        keyExtractor={(item, index) => item.option_id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() =>
          itemDetail ? renderMainSection(itemDetail) : <View />
        }
        ListFooterComponent={renderFooter}

        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        // }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 0,
    backgroundColor: AppStyles.colors.background,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.background,
  },
});
