import { GCC } from '@graphql';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppStyles, metrics } from '@theme';
import { CustomButton } from '@components';
import { address } from '@slices';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ItemAddress, AddressAdditionalList, AddressLoading } from './pages';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <ItemAddress item={item} onPress={goToDetail} />
  );

  const goToDetail = (item) => {
    dispatch(
      address.selectedLocation(
        item
          ? {
              region: item.region?.region,
              city: item.city,
              district: item.district,
              ward: item.ward,
              street: item.street,
              addressFull: item.full_address,
            }
          : {},
      ),
    );

    const values = item
      ? {
          phone: item.telephone,
          place: item.company,
          firstname: item.firstname,
          lastname: item.lastname,
          note: '',
          id: item.id,
          default_shipping: item.default_shipping,
          default_billing: item.default_billing,
        }
      : null;
    navigation.navigate(ScreenName.DetailMyAddress, { values });
  };

  // React.useEffect(() => {
  //   setData(defaultData);
  // }, []);

  return (
    <View style={styles.container}>
      <GCC.QueryAddressList
        renderItem={renderItem}
        renderItemLoading={AddressLoading}
        contentContainerStyle={styles.contentContainerStyle}
        isDefault={true}
        ListHeaderComponent={() => (
          <Text style={[AppStyles.fonts.title, styles.txtTitle]}>
            Địa chỉ mặc định
          </Text>
        )}
        ListFooterComponent={() => (
          <>
            <AddressAdditionalList goToDetail={goToDetail} />
            <CustomButton
              onPress={() => goToDetail(null)}
              label={'THÊM ĐỊA CHỈ MỚI'}
              width={246}
              height={58}
              bgColor={AppStyles.colors.button}
              styleText={{ fontSize: 16 }}
              style={styles.btnContainer}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: AppStyles.colors.background,
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
  btnContainer: {
    alignSelf: 'center',
    marginVertical: 25,
  },
  txtAddress: {
    fontSize: 14,
    ...AppStyles.fonts.text,
  },
});
export default Index;
