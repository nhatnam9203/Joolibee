import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { CustomFlatList, Loading } from '@components';
import { AppStyles } from '@theme';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { destructuring } from '@utils';
import {
  ProductItemDetailHeader,
  ProductItemDetailFooter,
} from './ProductItemDetail';

export const ProductDetailFlatList = ({
  data,
  renderItem,
  renderHeader = () => {},
  renderFooter,
}) => {
  const { items, ...props } = data || {};
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <StatusBar barStyle="dark-content" />
      {items && (
        <CustomFlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.option_id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => renderHeader(props)}
          ListFooterComponent={renderFooter}

          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          // }
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 0,
    backgroundColor: AppStyles.colors.background,
  },
});
