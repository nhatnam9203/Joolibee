import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CustomFlatList } from '@components';
import { StyleSheet } from 'react-native';
import React from 'react';

const MENU_LIST = gql`
  query categoryList($arrayCategory: [String]) {
    categoryList(filters: { ids: { in: $arrayCategory } }) {
      id
      thumbnail_image
      name
    }
  }
`;

export const QueryMenuList = ({ renderItem }) => (
  <Query query={MENU_LIST}>
    {({ loading, error, data }) => {
      if (loading) return Logger.debug('Loading ....');
      if (error) return Logger.debug(`Error! ${error.message}`);

      return (
        <CustomFlatList
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
      );
    }}
  </Query>
);

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
