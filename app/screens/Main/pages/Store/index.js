import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';
import _ from 'lodash';
import { TopBarScreenLayout } from '@layouts';
import { useDispatch, useSelector } from 'react-redux';
import {
  TopBarComponent,
  CustomPopupMenu,
  CustomMapView,
  ItemStore,
} from '../../../components';
import { AppStyles } from '@theme';
import { useStore } from '@hooks';
import { Markers } from './pages';
import { store } from '@slices';

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};

const StorePage = () => {
  const dispatch = useDispatch();
  const init_location = useSelector((state) => state.store.init_location);
  const cities = useSelector((state) => state.store.cities);
  const districts = useSelector((state) => state.store.districts);
  const initCities = _.uniqBy(cities, 'label');
  const stores = useStore();
  const INITIAL_REGION = {
    latitude: init_location?.lat,
    longitude: init_location?.lng,
    latitudeDelta: 0.5,
    longitudeDelta: (0.5 * width) / height,
  };

  const [visible, showModal] = React.useState([false, false]);
  const [params, setParams] = React.useState(init_location);
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
    dispatch(store.filterStore(params));

    //return () => setParams({})
  }, [params, dispatch]);
  // -------------------- Filter Stores --------------------------//

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      {/* ------------ Select city and districts --------------------- */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomPopupMenu
          placeHolders="Chọn tỉnh thành"
          visible={visible[0]}
          menus={initCities}
          onChangeItem={onChangeItemCity}
          value={params?.city}
          openMenu={openModal(0)}
          closeMenu={closeModal}
        />

        <CustomPopupMenu
          placeHolders="Chọn quận huyện"
          visible={visible[1]}
          menus={districts}
          value={params?.district}
          onChangeItem={onChangeItemDistrict}
          openMenu={openModal(1)}
          closeMenu={closeModal}
        />
      </View>
      {/* ------------ Select city and districts --------------------- */}

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <CustomMapView
              ref={refMap}
              style={styles.map}
              initialRegion={INITIAL_REGION}
              onMapReady={fitAllMarkers}>
              <Markers data={stores} mapView={refMap} />
            </CustomMapView>
          </View>
        )}
        keyExtractor={(_, index) => index + ''}
        renderItem={({ item, index }) => (
          <ItemStore item={item} index={index} />
        )}
        data={stores}
      />
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
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
});
export default StorePage;
