import React from 'react';
import { TopBarScreenLayout } from '@layouts';
import {
  TopBarComponent,
  MenuProductItem,
  MenuItemLoading,
} from '../components';
import { CustomFlatList, CustomButtonImage } from '@components';
import { images, AppStyles } from '@theme';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@localize';
import ScreenName from '../ScreenName';
import { GCC } from '@graphql';

const MenuDetailScreen = ({ route = { params: {} }, ...props }) => {
  const {
    menuItem: { products = { items: [] }, id, name },
  } = route.params;

  Logger.debug(products.items, 'MenuDetailScreen => items');
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <MenuProductItem
      item={item}
      onPress={() => {
        navigation.navigate(ScreenName.MenuItemDetail);
      }}
    />
  );

  const renderLoading = () => <MenuItemLoading />;

  const goToBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.addressStyle}>
        <Text style={styles.txtAddressTitleStyle}>
          {translate('txtAddressTo')}
        </Text>
        <Text
          style={styles.txtAddressStyle}
          ellipsizeMode="tail"
          numberOfLines={1}>
          16 Trương Định, P. 6, Q. 3, Tp. Hồ Chí Minh
        </Text>
        <CustomButtonImage
          image={images.icons.ic_edit}
          style={styles.btnEditStyle}
        />
      </View>
      <View style={styles.headerStyle}>
        {!!name && <Text style={styles.txtHeaderStyle}>{name}</Text>}
        <CustomButtonImage
          image={images.icons.ic_header_back}
          onPress={goToBack}
          style={styles.btnHeaderStyle}
        />
      </View>
      <View style={styles.container}>
        <GCC.QueryMenuDetailList
          input={products.items}
          categoryId={id}
          renderItem={renderItem}
          renderItemLoading={renderLoading}
        />
      </View>
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },

  addressStyle: {
    height: 40,
    backgroundColor: AppStyles.colors.accent,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  txtAddressTitleStyle: {
    color: '#fff',
    ...AppStyles.fonts.medium,
    flex: 0,
  },

  txtAddressStyle: {
    color: '#fff',
    ...AppStyles.fonts.text,
    flex: 1,
  },

  btnEditStyle: {
    marginLeft: 10,
  },

  headerStyle: {
    backgroundColor: '#fff',
    height: 60,
    ...AppStyles.styles.shadow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  txtHeaderStyle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.accent,
    flex: 1,
    textAlign: 'center',
  },

  btnHeaderStyle: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 10,
  },
});

export default MenuDetailScreen;
