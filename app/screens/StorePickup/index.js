import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomPopupMenu, CustomMapView, ItemStore } from '../components';
import { AppStyles, images } from '@theme';
import { Markers } from './pages';
import { CustomButton } from '@components';
import { CustomImageBackground } from '@components';
import { translate } from '@localize';
import { GEX } from '@graphql';
import { useDispatch, useSelector } from 'react-redux';
import { order } from '@slices';
import _ from 'lodash';
import { useStorePickup } from '@hooks';

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };
//define menu
const citys = [
  {
    id: 1,
    label: 'Hồ chí minh',
    value: 1,
  },
  {
    id: 2,
    label: 'Hà Nội',
    value: 2,
  },
];

const districs = [
  {
    id: 1,
    label: 'Quận 11',
    value: 1,
  },
  {
    id: 2,
    label: 'Quận 12',
    value: 2,
  },
];

const INITIAL_REGION = {
  latitude: 10.780644,
  longitude: 106.635679,
  latitudeDelta: 0.1,
  longitudeDelta: (0.5 * width) / height,
};

const STORES = [
  {
    store_id: '2',
    store_name: 'JOLLIBEE LŨY BÁN BÍCH',
    store_phone: '024.6654.8760',
    address: '661/1-661/3 Lũy Bán Bích, p. Phú Thạnh, Q. Tân Phú, HCM',
    latitude: '10.780644',
    longitude: '106.635679',
  },
  {
    store_id: '3',
    store_name: 'JOLLIBEE VINMARK CỘNG HÒA',
    store_phone: '028.3948 3238',
    address: '15 – 17 Cộng Hòa, P. 4, Q. Tân Bình, HCM',
    latitude: '10.800670273493',
    longitude: '106.65950290556',
  },
  {
    store_id: '4',
    store_name: 'JOLLIBEE NGUYỄN BỈNH KHIÊM',
    store_phone: '028.3820 0598',
    address: '58/13 Nguyễn Bỉnh Khiêm, P. Dakao, Q. 1, HCM',
    latitude: '10.792716643241',
    longitude: '106.6993240943',
  },
  {
    store_id: '5',
    store_name: 'JOLLIBEE THẢO ĐiỀN',
    store_phone: '028.3519 1029',
    address: '20 Thảo Điền, KP 2, P. Thảo Điền, Q2, HCM',
    latitude: '10.80372123098',
    longitude: '106.73740545026',
  },
];

const StorePage = ({ route = { params: {} } }) => {
  const navigation = useNavigation();
  const refMap = React.useRef(null);
  const dispatch = useDispatch();

  const storesList = useStorePickup();
  const { stores } = route.params;

  const selectedStores = stores?.map((x, idx) => {
    const index = storesList?.findIndex((st) => st.id === x.id);
    if (index >= 0) {
      return storesList[index];
    } else {
      return STORES[idx];
    }
  });

  Logger.debug(selectedStores, 'selectedStoresselectedStores');

  const [city, setCity] = React.useState(null);
  const [districts, setDistricts] = React.useState(null);
  const [store_pickuped, pickupStore] = React.useState(null);
  const [visible, showModal] = React.useState([false, false]);
  const store_name = store_pickuped
    ? store_pickuped.store_name
    : 'Vui lòng chọn 1 cửa hàng';

  const openModal = (i) => () => {
    let _visible = [...visible];
    _visible[i] = !_visible[i];
    showModal(_visible);
  };

  const closeModal = () => {
    showModal([false, false]);
  };

  const onChangeItemCity = (item) => {
    setCity(item);
  };

  const onChangeItemDistrict = (item) => {
    setDistricts(item);
  };

  const onChangeStore = (item) => () => {
    pickupStore(item);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const fitAllMarkers = () => {
    refMap.current?.fitToCoordinates(selectedStores, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  const setPickupStore = () => {
    // cho nay chưa xet truogn hop back lai ma ko pickup
    dispatch(order.pickupStore(store_pickuped?.store_id));
    goBack();
  };

  const renderFooter = () => {
    return (
      <View
        style={[styles.footerContainer, { opacity: store_pickuped ? 1 : 0.4 }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          {store_pickuped && <Image source={images.icons.ic_checked} />}

          <Text style={styles.txtTitle}>{store_name}</Text>
        </View>

        <CustomButton
          disabled={store_pickuped ? false : true}
          width={'95%'}
          height={58}
          label={translate('txtConfirm')}
          textColor={AppStyles.colors.text}
          bgColor={AppStyles.colors.button}
          onPress={setPickupStore}
        />
      </View>
    );
  };

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.waterMarkContainer}>
      {/* ------------ Select city and districts --------------------- */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomPopupMenu
          placeHolders="Chọn tỉnh thành"
          visible={visible[0]}
          menus={citys}
          onChangeItem={onChangeItemCity}
          openMenu={openModal(0)}
          closeMenu={closeModal}
        />

        <CustomPopupMenu
          placeHolders="Chọn quận huyện"
          visible={visible[1]}
          menus={districs}
          onChangeItem={onChangeItemDistrict}
          openMenu={openModal(1)}
          closeMenu={closeModal}
        />
      </View>
      {/* ------------ Select city and districts --------------------- */}

      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <CustomMapView
              ref={refMap}
              initialRegion={INITIAL_REGION}
              onMapReady={fitAllMarkers}>
              <Markers data={selectedStores} mapView={refMap} />
            </CustomMapView>
          </View>
        )}
        keyExtractor={(_, index) => index + ''}
        renderItem={({ item, index }) => (
          <ItemStore
            item={item}
            onPress={onChangeStore(item)}
            isChecked={item == store_pickuped}
          />
        )}
        data={selectedStores}
      />
      {renderFooter()}
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  waterMarkContainer: { flex: 1, backgroundColor: 'transparent' },

  container: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    top: -20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
  },

  pickerContainer: {
    position: 'absolute',
    margin: 0,
    width: '50%',
  },
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    height: 35,
    paddingLeft: 5,
    marginVertical: 5,
    borderBottomColor: AppStyles.colors.disabled,
  },
  txtTitle: {
    ...AppStyles.fonts.textBold,
    fontSize: 14,
    marginLeft: 10,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: AppStyles.colors.white,
  },
});
export default StorePage;
