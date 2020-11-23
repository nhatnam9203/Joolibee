import { CustomFlatList } from '@components';
import { AppStyles } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

export const ProductDetailFlatList = ({
  data,
  renderItem,
  renderHeader,
  renderFooter,
}) => {
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <StatusBar barStyle="dark-content" />
      <CustomFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.option_id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
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
});
