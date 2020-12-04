import { CustomButtonImage, CustomImageBackground } from '@components';
import { GCC, GEX } from '@graphql';
import { useChangeLanguage } from '@hooks';
import { TopBarScreenLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderNewItem, TopBarRight } from '../components';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { address } from '@slices';

const MenuDetailScreen = ({ route = { params: {} } }) => {
  const {
    menuItem: { products = { items: [] }, id, name },
  } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [language] = useChangeLanguage();
  // const customerCart = useSelector((state) => state.account?.cart);
  const [customerCart, getCustomerCart] = GEX.useGetCustomerCart();
  const customerInfo = useSelector((state) => state.account.user?.profile);

  const addresses_default = customerInfo?.addresses?.find(
    (x) => x.default_shipping,
  );
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtOrderMenu').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);

  const editAddress = () => {
    const {
      full_address,
      lastname,
      firstname,
      telephone,
      company,
      id,
      default_shipping,
      region,
      city,
      street,
    } = addresses_default || {};
    if (addresses_default) {
      dispatch(
        address.selectedLocation({
          region: region?.region,
          city: city,
          street: street,
          addressFull: full_address,
        }),
      );
      const val_address = {
        phone: telephone,
        place: company,
        firstname: firstname,
        lastname: lastname,
        note: '',
        id,
        default_shipping: default_shipping,
      };
      navigation.navigate(ScreenName.DetailMyAddress, {
        val_address,
        titleHeader: translate('txtEditAddress'),
        cartId: customerCart?.id,
        action_type: true,
      });
    } else {
      navigation.navigate(ScreenName.MyAddress);
    }
  };
  const renderItem = ({ item }, loading) => {
    return (
      <OrderNewItem
        shadow={true}
        loading={loading}
        item={item}
        onPress={() => {
          navigation.navigate(ScreenName.MenuItemDetail, {
            product: item,
          });
        }}
      />
    );
  };

  const goToBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TopBarScreenLayout>
      {customerInfo?.addresses?.length > 0 && (
        <View style={styles.addressStyle}>
          <Text style={styles.txtAddressTitleStyle}>
            {translate('txtAddressTo')}
          </Text>
          <Text
            style={styles.txtAddressStyle}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {addresses_default
              ? addresses_default.full_address
              : 'Vui lòng chọn địa chỉ'}
          </Text>
          <CustomButtonImage
            onPress={editAddress}
            image={images.icons.ic_edit}
            style={styles.btnEditStyle}
          />
        </View>
      )}
      <View style={styles.headerStyle}>
        {!!name && <Text style={styles.txtHeaderStyle}>{name}</Text>}
        <CustomButtonImage
          image={images.icons.ic_menu}
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
