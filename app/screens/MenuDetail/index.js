import { CustomButtonImage, CustomImageBackground } from '@components';
import { GCC } from '@graphql';
import { TopBarScreenLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderNewItem, TopBarComponent } from '../components';
import ScreenName from '../ScreenName';

const MenuDetailScreen = ({ route = { params: {} } }) => {
  const {
    menuItem: { products = { items: [] }, id, name },
  } = route.params;

  const navigation = useNavigation();

  const renderItem = ({ item }, loading) => {
    return (
      <OrderNewItem
        shadow={true}
        loading={loading}
        item={item}
        onPress={() => {
          navigation.navigate(ScreenName.MenuItemDetail, { productItem: item });
        }}
      />
    );
  };

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
      <CustomImageBackground
        style={styles.container}
        source={images.watermark_background_2}>
        <GCC.QueryMenuDetailList
          input={products.items}
          categoryId={id}
          renderItem={renderItem}
        />
      </CustomImageBackground>
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },

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
