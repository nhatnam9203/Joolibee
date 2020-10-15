import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CustomFlatList } from '@components';
import { StyleSheet, Text } from 'react-native';
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
      if (loading) {
        Logger.debug(loading, 'Loading ....');
        return <></>;
      }

      if (error) {
        Logger.debug(error, 'Error!');
        return null;
      }

      Logger.debug(data, 'data -----!');

      return (
        <CustomFlatList
          data={data.categoryList}
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
