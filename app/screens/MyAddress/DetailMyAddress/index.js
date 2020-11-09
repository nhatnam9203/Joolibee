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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { regex } from '@utils';
import { CustomInput, CustomButton } from '@components';
import { SinglePageLayout } from '@layouts';
import { TextInputErrorMessage, TextCheckBox } from '../../components';
import ScreenName from '../../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { mutation, query } from '@graphql';
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
  const { values } = props.route.params;
  const refFormMilk = React.useRef(null);
  const location_selected = useSelector(
    (state) => state.address.location_selected,
  );

  const [default_shipping, setDefaultShippong] = React.useState(
    Boolean(values?.default_shipping),
  );

  const [default_billing, setDefaultBilling] = React.useState(
    Boolean(values?.default_billing),
  );

  const isCheckValue = values ? true : false;
  const initialValues = isCheckValue
    ? values
    : {
        phone: '',
        place: '',
        firstname: '',
        lastname: '',
        note: '',
        address: location_selected?.addressFull,
      };
  //------------ Add address customer -----------------//
  const [createCustomerAddress] = useMutation(mutation.ADD_ADDRESS);

  const onHandleAdd = React.useCallback(
    (datas) => {
      let input = {
        company: datas.place,
        region: { region: location_selected.region, region_code: 'VN' },
        country_code: 'VN',
        street: location_selected.street,
        telephone: datas.phone,
        city: location_selected.city,
        firstname: datas.firstname,
        lastname: datas.lastname,
        default_shipping: default_shipping,
        default_billing: default_billing,
        full_address: location_selected.addressFull,
      };
      dispatch(app.showLoading());
      createCustomerAddress({
        ...OPTIONS_MUTATION,
        variables: input,
      })
        .then(() => {
          dispatch(app.hideLoading());
          navigation.goBack();
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [
      location_selected,
      default_shipping,
      default_billing,
      dispatch,
      createCustomerAddress,
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
        region: { region: location_selected.region, region_code: 'VN' },
        street: location_selected.street,
        telephone: datas.phone,
        city: `${location_selected.city}`,
        firstname: datas.firstname,
        lastname: datas.lastname,
        default_shipping: default_shipping,
        default_billing: default_billing,
        full_address: location_selected.addressFull,
      };
      console.log('input', input);
      dispatch(app.showLoading());

      updateCustomerAddress({
        ...OPTIONS_MUTATION,
        variables: input,
        // update: (cache) => {
        //   cache.modify({
        //     id:cache.identify
        //   });
        // },
      })
        .then(() => {
          dispatch(app.hideLoading());
          navigation.goBack();
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [
      default_shipping,
      default_billing,
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
      variables: { id: values.id },
    })
      .then(() => {
        dispatch(app.hideLoading());
        navigation.goBack();
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  }, [dispatch, deleteCustomerAddress, values, navigation]);

  //------------ Update address customer -----------------//
  const onHandleSubmit = isCheckValue ? onHandleUpdate : onHandleAdd;
  const goToCreateAddress = () => navigation.navigate(ScreenName.SearchAddress);

  React.useEffect(() => {
    if (refFormMilk.current) {
      refFormMilk.current.setFieldValue(
        'address',
        location_selected?.addressFull,
      );
    }
  }, [location_selected]);

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

  return (
    <View style={{ flex: 1 }}>
      <SinglePageLayout backgroundColor={AppStyles.colors.background}>
        <Formik
          innerRef={refFormMilk}
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validationSchema={AddressSchema}
          isValidating={true}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View style={styles.topContent}>
                {/**PLACE*/}
                <CustomInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('place')}
                  onBlur={handleBlur('place')}
                  value={values.place}
                  placeholder="Tên địa điểm vd: Nhà, Công ty... *"
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
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder="Số điện thoại"
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
                <TouchableOpacity onPress={goToCreateAddress}>
                  <CustomInput
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    editable={false}
                    value={values.address}
                    placeholder="Vui lòng nhập địa chỉ"
                    style={{ flexDirection: 'row', width: LAYOUT_WIDTH }}>
                    <Image source={images.icons.ic_arrow} />
                  </CustomInput>
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
                  placeholder="Ghi chú cho địa chỉ"
                  multiline={true}
                  style={styles.noteInput}
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

              {/**Default shipping */}
              <TextCheckBox
                label={
                  values.default_billing
                    ? 'Đây là địa chỉ giao hàng mặc định'
                    : 'Dùng làm địa chỉ giao hàng mặc định'
                }
                value={default_shipping}
                onValueChange={(value) => setDefaultShippong(value)}
                tintColor={AppStyles.colors.accent}
                onCheckColor={AppStyles.colors.accent}
                onTintColor={AppStyles.colors.accent}
                style={styles.checkboxStyle}
                disabled={values.default_billing}
              />

              {/**Default billing */}
              <TextCheckBox
                label={
                  values.default_billing
                    ? 'Đây là địa chỉ thanh toán mặc định'
                    : 'Dùng làm địa chỉ thanh toán mặc định'
                }
                value={default_billing}
                onValueChange={(value) => setDefaultBilling(value)}
                tintColor={AppStyles.colors.accent}
                onCheckColor={AppStyles.colors.accent}
                onTintColor={AppStyles.colors.accent}
                style={styles.checkboxStyle}
                disabled={values.default_billing}
              />

              {!values.default_billing && !values.default_shipping && (
                <CustomButton
                  onPress={onHandleDelete}
                  label="XÓA ĐỊA CHỈ"
                  width={width * 0.9}
                  height={58}
                  bgColor="transparent"
                  textColor={AppStyles.colors.accent}
                  style={styles.btnRemove}
                />
              )}
            </View>
          )}
        </Formik>
      </SinglePageLayout>

      <View style={styles.btnContainer}>
        <CustomButton
          onPress={refFormMilk.current?.handleSubmit}
          label="LƯU ĐỊA CHỈ NÀY"
          width={width * 0.9}
          height={58}
          bgColor={AppStyles.colors.button}
        />
      </View>
    </View>
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
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
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
});
export default Index;
