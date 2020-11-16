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
import { Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import { destructuring } from '@utils';

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
              uid
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
  renderItemLoading,
  renderItem,
  renderHeader,
  renderFooter,
  productItem: { sku },
  updateProductItemDetail,
  optionData,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { loading, data, refetch } = useQuery(PRODUCT, {
    variables: { sku },
    fetchPolicy: 'cache-first',
  });

  // When received new data, sort
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
        const { items = [] } = first;
        const arr = [...items];
        arr?.sort((a, b) => a.position - b.position);
        // ! call update to MenuDetail
        updateProductItemDetail(Object.assign({}, first, { items: arr }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      <>
        <Placeholder style={styles.placeholderContainer}>
          <View style={styles.placeholderHead}>
            <PlaceholderMedia style={styles.placeholderImage} />
            <View style={styles.placeholderHorizontal}>
              <PlaceholderLine
                width={'60%'}
                height={20}
                style={styles.placeholderLine}
              />
              <PlaceholderLine
                width={30}
                height={25}
                style={styles.placeholderLine}
              />
            </View>
            <View style={styles.placeholderHorizontal}>
              <PlaceholderLine
                width={'60%'}
                height={20}
                style={styles.placeholderLine}
              />
              <PlaceholderLine
                width={20}
                height={15}
                style={styles.placeholderLine}
              />
            </View>
            <PlaceholderLine
              width={'60%'}
              height={20}
              style={styles.placeholderLine}
            />
          </View>
          <View
            style={[
              styles.placeholderHead,
              { backgroundColor: AppStyles.colors.button },
            ]}>
            <PlaceholderLine
              width={50}
              height={20}
              style={styles.placeholderLine}
            />
          </View>
        </Placeholder>
        <Loading isLoading={loading} transparent />
      </>
    );
  }

  const onRenderHeader = () => {
    return typeof renderHeader === 'function' ? renderHeader() : <View />;
  };

  const onRenderFooter = () => {
    return typeof renderHeader === 'function' ? renderFooter() : <View />;
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <StatusBar barStyle="dark-content" />
      <CustomFlatList
        data={optionData}
        renderItem={loading ? renderItemLoading : renderItem}
        keyExtractor={(item, index) => item.option_id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={onRenderHeader}
        ListFooterComponent={onRenderFooter}

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

  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: AppStyles.colors.background,
  },
  placeholderHead: {
    backgroundColor: AppStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    flex: 0,
    marginBottom: 20,
  },
  placeholderImage: { height: 300, width: '100%', marginBottom: 15 },
  placeholderLine: { marginBottom: 15 },
  placeholderHorizontal: {
    ...AppStyles.styles.horizontalLayout,
    width: '100%',
  },
});
