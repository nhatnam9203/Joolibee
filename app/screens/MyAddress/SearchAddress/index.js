import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { AppStyles, metrics, images } from '@theme';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import { CustomInput, CustomImageBackground } from '@components';
import { autocomplete, placeSearch } from '@location';
import { address } from '@slices';
import { format, scale } from '@utils';
const { scaleHeight } = scale;
const LAYOUT_WIDTH = '100%';

const Index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.address.locations);
  const loading_location = useSelector(
    (state) => state.address.loading_location,
  );
  const [searchInputText, setSearchInputText] = React.useState(null);

  const searchLocation = async (input = '') => {
    let params = { input };
    if (input !== '') {
      try {
        await dispatch(address.autoCompleteStart());
        let { status, data } = await autocomplete(params);

        if (status === 'OK') {
          dispatch(address.autoCompleteSuccess(data));
        } else {
          await dispatch(address.autoCompleteFail());
        }
      } catch (error) {
        await dispatch(address.autoCompleteFail());
      }
    } else {
      dispatch(address.autoCompleteSuccess([]));
    }
  };
  const delayedQuery = React.useRef(
    _.debounce((input) => searchLocation(input), 500),
  ).current;

  const handleChangeText = (key) => {
    setSearchInputText(key);
    delayedQuery(key);
  };

  const pickupLocation = (item) => () => {
    const { description, structured_formatting } = item;
    const { main_text, secondary_text } = structured_formatting;
    let addresses = format.addresses_geocoding(secondary_text?.split(','));
    let street = main_text + ' ' + addresses?.ward + ' ' + addresses?.district;
    dispatch(
      address.selectedLocation({
        ...addresses,
        street: [street],
        addressFull: description,
      }),
    );
    navigation.goBack();
  };

  const renderItem = (item, index) => (
    <TouchableOpacity
      onPress={pickupLocation(item)}
      key={index + ''}
      style={styles.itemContainer}>
      <Image source={images.icons.ic_location} resizeMode="contain" />

      <Text numberOfLines={3} style={[AppStyles.fonts.text, styles.txtAddress]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderItemLoading = () => {
    return (
      <Placeholder
        Animation={Fade}
        style={[styles.itemContainer, { width: '92%' }]}
        Left={() => <PlaceholderMedia style={styles.leftLoadingContainer} />}
        Right={() => (
          <Placeholder Animation={Fade}>
            <PlaceholderLine width={80} height={10} />
            <PlaceholderLine width={80} height={10} />
            <PlaceholderLine width={80} height={10} />
          </Placeholder>
        )}
      />
    );
  };

  const FilterAddressList = ({ data = [], loading }) => {
    if (loading) {
      return renderItemLoading();
    }
    if (data.length === 0) {
      return (
        <Text style={{ padding: 15, textAlign: 'center' }}>
          {translate('txtNotFoundAddress')}
        </Text>
      );
    }
    return data.map(renderItem);
  };

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.container}>
      <View style={styles.topContent}>
        <CustomInput
          onChangeText={handleChangeText}
          value={searchInputText}
          placeholder={translate('txtInputAddressPlaceholder')}
          style={styles.inputStyle}
          autoFocus={true}
        />
      </View>

      <FilterAddressList loading={loading_location} data={locations} />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  topContent: {
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
  },
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
    height: scaleHeight(84),
    flex: 0,
    flexDirection: 'row',
    padding: metrics.padding,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 14,
    ...AppStyles.styles.shadow,
  },
  txtAddress: {
    paddingHorizontal: 10,
  },
  leftLoadingContainer: {
    width: 34,
    height: 34,
    marginRight: 15,
  },
  inputStyle: { margin: 0, width: LAYOUT_WIDTH, ...AppStyles.styles.shadow },
});
export default Index;
