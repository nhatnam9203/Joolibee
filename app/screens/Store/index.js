import React from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomPopupMenu,
  CustomMapView,
  ItemStore,
  TopBarRight,
} from '../components';
import { AppStyles, images } from '@theme';
import { useStore } from '@hooks';
import { CustomImageBackground } from '@components';
import { Markers } from './pages';
import { store } from '@slices';
import { useNavigation } from '@react-navigation/native';
import { useChangeLanguage } from '@hooks';
import { translate } from '@localize';
import { scale } from '@utils';
import { GEX } from '@graphql';

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

  const init_location = useSelector((state) => state.store.init_location);

  const INITIAL_REGION = {
    latitude: init_location?.lat,
    longitude: init_location?.lng,
    latitudeDelta: 0.5,
    longitudeDelta: (0.5 * width) / height,
  };

  const [visible, showModal] = React.useState([false, false]);
  const [params, setParams] = React.useState(init_location);

  const { storePickup, stores } = GEX.useStorePickup();

  const refMap = React.useRef(null);

  const openModal = (i) => () => {
    let _visible = [...visible];
    _visible[i] = !_visible[i];
    showModal(_visible);
  };

  const closeModal = () => {
    showModal([false, false]);
  };

  const fitAllMarkers = () => {
    refMap.current.fitToCoordinates(stores, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  // -------------------- Filter Stores --------------------------//
  const onChangeItemCity = (item) => {
    let newParams = { city: item.label };
    setParams(newParams);
    dispatch(store.filterDistrictByCity({ key: item.label }));
  };

  const onChangeItemDistrict = (item) => {
    setParams({ ...params, district: item.label });
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtStore').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);

  React.useEffect(() => {
    dispatch(store.filterStore(params));
  }, [params, dispatch]);

  React.useEffect(() => {
    storePickup({ varibles: { cityId: 1, districtId: 15 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          menus={initCities}
          onChangeItem={onChangeItemCity}
          value={params?.city}
          openMenu={openModal(0)}
          closeMenu={closeModal}
        />

        <CustomPopupMenu
          placeHolders={translate('txtSelectWard')}
          visible={visible[1]}
          menus={districts}
          value={params?.district}
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
            data={stores}
          />
        </View>

        <CustomMapView
          ref={refMap}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          onMapReady={fitAllMarkers}>
          <Markers data={stores} mapView={refMap} />
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
