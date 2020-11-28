import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regex } from '@utils';
import {
  CustomInput,
  CustomButton,
  CustomImageBackground,
  CustomSwitch,
} from '@components';
import { SinglePageLayout } from '@layouts';
import { TextInputErrorMessage } from '../../components';
import ScreenName from '../../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { mutation, query, GCC, GEX, GQL } from '@graphql';
import { app } from '@slices';
// ADDRESS_LIST
const LAYOUT_WIDTH = '95%';
const HALF_LAYOUT_WIDTH = '45%';
const { width } = Dimensions.get('window');

const OPTIONS_MUTATION = {
  awaitRefetchQueries: true,
  refetchQueries: [{ query: query.ADDRESS_LIST }],
};
const Index = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { val_address, titleHeader, cartId } = props.route.params;
  const location_selected = useSelector(
    (state) => state.address.location_selected,
  );

  const [default_shipping, setDefaultShipping] = React.useState(
    Boolean(val_address?.default_shipping),
  );
  const onChangeValue = React.useCallback(
    () => setDefaultShipping(!default_shipping),
    [default_shipping],
  );
  const isCheckValue = val_address ? true : false;
  const initialValues = isCheckValue
    ? val_address
    : {
        phone: '',
        place: '',
        firstname: '',
        lastname: '',
        note: '',
        address: location_selected?.addressFull,
      };
  const txtButton = !isCheckValue
    ? translate('txtSaveAddress')
    : translate('txtSaveChange');

  //------------ Set shipping address -----------------//
  const { setShippingAddresses } = GEX.useSetShippingAddress();

  const setShippingAddress = React.useCallback(
    (id) => {
      const params = {
        variables: {
          shipping_addresses: [{ customer_address_id: id }],
        },
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GQL.CART_DETAIL, variables: { cartId } }],
      };
      setShippingAddresses(params);
    },
    [cartId],
  );
  //------------ Add address customer -----------------//
  const [createCustomerAddress] = useMutation(mutation.ADD_ADDRESS);
  const onHandleAdd = React.useCallback(
    (datas) => {
      let input = {
        company: datas.place,
        country_code: 'VN',
        street: location_selected.street,
        telephone: datas.phone,
        city: location_selected.city || '',
        firstname: datas.firstname,
        lastname: datas.lastname,
        default_shipping: default_shipping,
        default_billing: false,
        full_address: location_selected.addressFull,
      };
      dispatch(app.showLoading());
      createCustomerAddress({
        ...OPTIONS_MUTATION,
        variables: input,
      })
        .then(({ data }) => {
          if (data?.createCustomerAddress) {
            setShippingAddress(data?.createCustomerAddress?.id);
            navigation.goBack();
          }

          dispatch(app.hideLoading());
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [
      location_selected,
      default_shipping,
      dispatch,
      createCustomerAddress,
      setShippingAddress,
      navigation,
    ],
  );

  //------------ Update address customer -----------------//
  const [updateCustomerAddress] = useMutation(mutation.UPDATE_ADDRESS);

  const onHandleUpdate = React.useCallback(
    (datas) => {
      let input = {
        id: datas.id,
        company: datas.place,
        street: location_selected.street,
        telephone: datas.phone,
        city: `${location_selected.city}`,
        firstname: datas.firstname,
        lastname: datas.lastname,
        default_shipping: default_shipping,
        default_billing: false,
        full_address: location_selected.addressFull,
      };
      dispatch(app.showLoading());

      updateCustomerAddress({
        ...OPTIONS_MUTATION,
        variables: input,
      })
        .then(({ data }) => {
          if (data?.updateCustomerAddress) {
            navigation.goBack();
          }

          dispatch(app.hideLoading());
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [
      default_shipping,

      dispatch,
      location_selected,
      navigation,
      updateCustomerAddress,
    ],
  );

  //------------ Update address customer -----------------//

  //------------ DELETE address customer -----------------//
  const [deleteCustomerAddress] = useMutation(mutation.DELETE_ADDRESS);

  const onHandleDelete = React.useCallback(() => {
    dispatch(app.showLoading());

    deleteCustomerAddress({
      ...OPTIONS_MUTATION,
      variables: { id: val_address.id },
    })
      .then(({ data }) => {
        if (data?.deleteCustomerAddress) {
          navigation.goBack();
        }
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  }, [dispatch, deleteCustomerAddress, val_address, navigation]);

  //------------ Update address customer -----------------//
  const onHandleSubmit = isCheckValue ? onHandleUpdate : onHandleAdd;
  const goToCreateAddress = () => navigation.navigate(ScreenName.SearchAddress);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: titleHeader,
    });
  }, [navigation, titleHeader]);

  const AddressSchema = Yup.object().shape({
    phone: Yup.string()
      .required(translate('txtRequired'))
      .matches(regex.phone, translate('txtWrongPhoneNumber'))
      .min(10, translate('txtTooShort'))
      .max(15, translate('txtTooLong')),
    place: Yup.string().required(translate('txtRequired')),
    firstname: Yup.string().required(translate('txtRequired')),
    lastname: Yup.string().required(translate('txtRequired')),
    address: Yup.string().required(translate('txtRequired')),
  });

  const DefaultShippingComponents = () => (
    <View style={styles.switchContainer}>
      <Text style={AppStyles.fonts.bold} numberOfLines={1}>
        {translate('txtSetDefaultAddress')}
      </Text>
      <CustomSwitch
        toggleSwitch={onChangeValue}
        defautlValue={default_shipping}
        disabled={values.default_shipping}
      />
    </View>
  );
  const color_placehoder = {
    color: location_selected?.addressFull ? '#484848' : '#9E9E9E',
  };
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onHandleSubmit,
    validationSchema: AddressSchema,
    isValidating: true,
  });

  React.useEffect(() => {
    setFieldValue('address', location_selected?.addressFull);
  }, [location_selected, setFieldValue]);
  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={{ flex: 1, backgroundColor: 'transparent' }}>
      <SinglePageLayout>
        <View style={styles.container}>
          <View style={styles.topContent}>
            {/**PLACE*/}
            <CustomInput
              style={{ ...styles.inputShadow, width: LAYOUT_WIDTH }}
              onChangeText={handleChange('place')}
              onBlur={handleBlur('place')}
              value={values.place}
              placeholder={translate('txtInputPlaceName')}
            />

            {/**Phone input error */}
            {errors.place && touched.place && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.place}
                color={AppStyles.colors.inputError}
              />
            )}

            {/**FULLNAME*/}
            <View style={AppStyles.styles.horizontalLayout}>
              <CustomInput
                style={{
                  ...styles.inputShadow,
                  width: HALF_LAYOUT_WIDTH,
                }}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname}
                placeholder={translate('txtInputFirstName')}
                textContentType="name"
              />

              <CustomInput
                style={{
                  ...styles.inputShadow,
                  width: HALF_LAYOUT_WIDTH,
                }}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
                placeholder={translate('txtInputLastName')}
                textContentType="name"
              />
            </View>

            {/**FULLNAME input error */}
            {errors.firstname && touched.firstname && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.firstname}
                color={AppStyles.colors.inputError}
              />
            )}

            {/**PHONE*/}
            <CustomInput
              style={{ ...styles.inputShadow, width: LAYOUT_WIDTH }}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder={translate('txtInputPhone')}
            />

            {/**Phone input error */}
            {errors.phone && touched.phone && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.phone}
                color={AppStyles.colors.inputError}
              />
            )}

            {/**Address*/}
            <TouchableOpacity
              style={[styles.inputContainer, styles.inputShadow]}
              onPress={goToCreateAddress}>
              <Text
                style={[styles.txtInput, color_placehoder]}
                numberOfLines={1}>
                {values.address
                  ? values.address
                  : translate('txtInputAddressPlaceholder')}
              </Text>
              <Image source={images.icons.ic_arrow} />
            </TouchableOpacity>

            {/**Address input error */}
            {errors.address && touched.address && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.address}
                color={AppStyles.colors.inputError}
              />
            )}

            {/**note input error */}
            <CustomInput
              onChangeText={handleChange('note')}
              onBlur={handleBlur('note')}
              value={values.note}
              placeholder={translate('txtInputNoteAddress')}
              multiline={true}
              style={[styles.noteInput, styles.inputShadow]}
            />

            {/**Phone input error */}
            {errors.note && touched.note && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.note}
                color={AppStyles.colors.inputError}
              />
            )}
          </View>

          {!values.default_shipping && isCheckValue && (
            <CustomButton
              onPress={onHandleDelete}
              label="XÓA ĐỊA CHỈ"
              width={width * 0.9}
              height={58}
              bgColor={AppStyles.colors.white}
              textColor={AppStyles.colors.accent}
              style={styles.btnRemove}
            />
          )}
        </View>
      </SinglePageLayout>

      <View style={styles.btnContainer}>
        <DefaultShippingComponents />
        <CustomButton
          onPress={handleSubmit}
          label={txtButton}
          width={width * 0.9}
          height={61}
          borderRadius={14}
          bgColor={AppStyles.colors.accent}
          textColor={AppStyles.colors.white}
        />
      </View>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  topContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  btnContainer: {
    width: '100%',
    height: 134,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    paddingVertical: 15,
  },
  noteInput: {
    height: 117,
    alignItems: 'flex-start',
    paddingTop: 10,
    width: LAYOUT_WIDTH,
  },
  btnRemove: {
    borderWidth: 2,
    borderColor: AppStyles.colors.accent,
    alignSelf: 'center',
    marginVertical: 30,
  },
  checkboxStyle: { paddingHorizontal: 13 },
  inputContainer: {
    flexDirection: 'row',
    width: LAYOUT_WIDTH,
    height: 54,
    backgroundColor: AppStyles.colors.white,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  txtInput: {
    ...AppStyles.fonts.text,
    paddingLeft: 6,
    padding: 0,
    color: '#484848',
  },
  inputShadow: {
    shadowColor: '#00000070',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,
    elevation: 10,
  },
  switchContainer: {
    width: width * 0.88,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Index;
