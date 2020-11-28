import { GCC, GEX, GQL } from '@graphql';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppStyles, metrics, images } from '@theme';
import { CustomButton, CustomImageBackground } from '@components';
import { address, app } from '@slices';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ItemAddress, AddressLoading } from './pages';
import { translate } from '@localize';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;

const Index = ({ route }) => {
  const { selected_address } = route?.params || false;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Get Customer Cart
  const customerCart = useSelector((state) => state.account?.cart);
  const { setShippingAddresses } = GEX.useSetShippingAddress(() =>
    navigation.goBack(),
  );

  const onHandleSetShippingAddress = (id) => {
    const params = {
      variables: {
        shipping_addresses: [{ customer_address_id: id }],
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GQL.CART_DETAIL, variables: { cartId: customerCart?.id } },
      ],
    };
    setShippingAddresses(params);
  };

  const onHandlePress = (item) => {
    if (selected_address && item) {
      onHandleSetShippingAddress(item.id);
      dispatch(app.showLoading());
    } else {
      goToDetail(item);
    }
  };

  const goToDetail = (item) => {
    dispatch(
      address.selectedLocation(
        item
          ? {
              region: item.region?.region,
              city: item.city,
              district: item.district,
              street: item.street,
              addressFull: item.full_address,
            }
          : {},
      ),
    );

    const val_address = item
      ? {
          phone: item.telephone,
          place: item.company,
          firstname: item.firstname,
          lastname: item.lastname,
          note: '',
          id: item.id,
          default_shipping: item.default_shipping,
        }
      : null;
    const titleHeader = !item
      ? translate('txtMyAddressDetail')
      : translate('txtEditAddress');
    navigation.navigate(ScreenName.DetailMyAddress, {
      val_address,
      titleHeader,
      cartId: customerCart?.id,
    });
  };

  const renderItem = ({ item }) => (
    <ItemAddress item={item} onPress={onHandlePress} />
  );

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <GCC.QueryAddressList
        renderItem={renderItem}
        renderItemLoading={AddressLoading}
        contentContainerStyle={styles.contentContainerStyle}
        isDefault={true}
        ListHeaderComponent={() => (
          <Text style={styles.txtTitle}>{translate('txtAddressList')}</Text>
        )}
        ListFooterComponent={() => (
          <>
            <CustomButton
              onPress={() => goToDetail(null)}
              label={translate('txtAddNewAddress')}
              width={scaleWidth(379)}
              height={scaleHeight(61)}
              borderRadius={14}
              bgColor={AppStyles.colors.accent}
              styleText={styles.txtButton}
              style={styles.btnContainer}
            />
          </>
        )}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    marginVertical: 15,
    color: AppStyles.colors.accent,
    ...AppStyles.fonts.SVN_Merge_Bold,
  },
  btnContainer: {
    alignSelf: 'center',
    marginVertical: 25,
    shadowColor: '#00000090',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,

    elevation: 10,
  },
  txtAddress: {
    fontSize: 14,
    ...AppStyles.fonts.text,
  },
  txtButton: { fontSize: 16, color: AppStyles.colors.white },
});
export default Index;
