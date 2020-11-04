import { AppStyles, metrics } from '@theme';
import { GCC } from '@graphql';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ItemAddress from './ItemAddress';
import AddressLoading from './AddressLoading';

const Index = ({ goToDetail }) => {
  const renderItem = ({ item }) => (
    <ItemAddress item={item} onPress={goToDetail} />
  );

  return (
    <View style={styles.container}>
      <GCC.QueryAddressList
        renderItem={renderItem}
        renderItemLoading={AddressLoading}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => (
          <Text style={[AppStyles.fonts.title, styles.txtTitle]}>
            Địa chỉ bổ sung
          </Text>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    marginTop: 20,
  },
  contentContainerStyle: { paddingVertical: 15 },
  //
  addressImage: {
    backgroundColor: '#E31837',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
  },

  itemContainer: {
    backgroundColor: '#fff',
    height: 75,
    flex: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    padding: metrics.padding,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },
  content: {
    paddingHorizontal: 10,
    width: 270,
  },
  txtTitle: {
    fontSize: 21,
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
export default Index;
