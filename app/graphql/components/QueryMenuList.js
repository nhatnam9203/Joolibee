import { CustomFlatList } from '@components';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const MENU_LIST = gql`
  query categoryList($arrayCategory: [String]) {
    categoryList(filters: { ids: { in: $arrayCategory } }) {
      id
      thumbnail_image
      name
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
  const { loading, error, data = { categoryList: defaultData } } = useQuery(
    MENU_LIST,
    {
      variables: null,
    },
  );

  if (error) {
    Logger.debug(error, 'Error!');
    return null;
  }

  return (
    <CustomFlatList
      data={data?.categoryList}
      renderItem={loading ? renderItemLoading : renderItem}
      horizontal={false}
      numColumns={2}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { paddingVertical: 15 },
});
