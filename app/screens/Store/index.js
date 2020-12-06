import { CustomImageBackground } from '@components';
import { useChangeLanguage, useStorePickup } from '@hooks';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { appUtil, scale } from '@utils';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomMapView,
  CustomPopupMenu,
  ItemStore,
  TopBarRight,
} from '../components';
import { Markers } from './pages';

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

const StorePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [language] = useChangeLanguage();

  const my_location = useSelector((state) => state.app.currentLocation);
  const cities = useSelector((state) => state.store.cities);
  const pickupLocation = useSelector((state) => state.store.pickupLocation);
  const refMap = React.useRef(null);

  const storeList = useStorePickup();
  // Logger.debug(storeList, 'storeList');

  const INITIAL_REGION = {
    latitude: my_location?.position?.lat,
    longitude: my_location?.position?.lng,
    latitudeDelta: 0.5,
    longitudeDelta: (0.5 * width) / height,
  };

  const [visible, showModal] = React.useState([false, false]);

  const [params, setParams] = React.useState({
    city: { id: my_location?.cityId },
    district: { id: my_location?.districtId },
  });

  const localStores = React.useCallback(() => {
    return appUtil.getStoreListInCity(
      storeList,
      params?.city?.id,
      params?.district?.id,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const openModal = (i) => () => {
    let _visible = [...visible];
    _visible[i] = !_visible[i];
    showModal(_visible);
  };

  const closeModal = () => {
    showModal([false, false]);
  };

  const fitAllMarkers = () => {
    refMap.current.fitToCoordinates(localStores(), {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  const filterDistrict = React.useCallback(() => {
    let list = [];

    if (params?.city !== null) {
      list = appUtil.getDistrictInCity(storeList, params?.city?.id);
    }

    return list;
  }, [params?.city, storeList]);

  // -------------------- Filter Stores --------------------------//
  const onChangeItemCity = (item) => {
    setParams({ city: item });
  };

  const onChangeItemDistrict = (item) => {
    setParams({ ...params, district: item });
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtStore').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);

  React.useEffect(() => {
    // dispatch(store.filterStore(params));
  }, [params, dispatch]);

  // -------------------- Filter Stores --------------------------//

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.waterMarkContainer}>
      {/* ------------ Select city and districts --------------------- */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomPopupMenu
          placeHolders={translate('txtSelectDistrict')}
          visible={visible[0]}
          menus={cities}
          onChangeItem={onChangeItemCity}
          value={params?.city?.label}
          openMenu={openModal(0)}
          closeMenu={closeModal}
        />

        <CustomPopupMenu
          placeHolders={translate('txtSelectWard')}
          visible={visible[1]}
          menus={filterDistrict()}
          value={params?.district?.label}
          onChangeItem={onChangeItemDistrict}
          openMenu={openModal(1)}
          closeMenu={closeModal}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.listStoreStyle}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index + ''}
            renderItem={({ item, index }) => (
              <ItemStore item={item} index={index} />
            )}
            data={localStores()}
          />
        </View>

        <CustomMapView
          ref={refMap}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          onMapReady={fitAllMarkers}>
          <Markers data={localStores()} mapView={refMap} />
        </CustomMapView>
      </View>
    </CustomImageBackground>
  );
};

const MAP_HEIGHT = scale.scaleHeight(410);

const styles = StyleSheet.create({
  waterMarkContainer: { flex: 1, backgroundColor: 'transparent' },

  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    height: MAP_HEIGHT,
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

  listStoreStyle: {
    marginTop: MAP_HEIGHT,
    paddingBottom: scale.scaleHeight(20),
    width: '100%',
    flex: 1,
  },
});
export default StorePage;
