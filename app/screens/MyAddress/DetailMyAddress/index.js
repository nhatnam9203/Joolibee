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
import { TextInputErrorMessage } from '../../components';
import ScreenName from '../../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { mutation, query } from '@graphql';
import { app } from '@slices';
// ADDRESS_LIST
const LAYOUT_WIDTH = '95%';
const HALF_LAYOUT_WIDTH = '45%';

const { width } = Dimensions.get('window');
const Index = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { values } = props.route.params;
  const refFormMilk = React.useRef(null);
  const location_selected = useSelector(
    (state) => state.address.location_selected,
  );
  //------------ Add address customer -----------------//
  const [createCustomerAddress] = useMutation(mutation.ADD_ADDRESS);

  const onHandleAdd = React.useCallback(
    (datas) => {
      let input = {
        company: datas.place,
        region: location_selected.region,
        country_code: 'VN',
        street: [location_selected.street],
        telephone: datas.phone,
        postcode: '700000',
        city: location_selected.city,
        firstname: datas.firstname,
        lastname: datas.lastname,
        default_shipping: false,
        default_billing: false,
        //full_address: location_selected.addressFull,
      };
      dispatch(app.showLoading());
      createCustomerAddress({
        variables: input,
      });
    },
    [createCustomerAddress, dispatch, location_selected],
  );

  //------------ Update address customer -----------------//
  const [updateCustomerAddress] = useMutation(mutation.UPDATE_ADDRESS);

  const onHandleUpdate = React.useCallback(
    (datas) => {
      let input = {
        id: datas.id,
        company: datas.place,
        region: location_selected.region,
        street: location_selected.street,
        telephone: datas.phone,
        city: `${location_selected.district} ${location_selected.city}`,
        firstname: datas.firstname,
        lastname: datas.lastname,
      };
      dispatch(app.showLoading());

      updateCustomerAddress({
        variables: input,
        awaitRefetchQueries: true,
        refetchQueries: [{ query: query.ADDRESS_LIST }],
      })
        .then(() => {
          dispatch(app.hideLoading());
          navigation.goBack();
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [dispatch, location_selected, navigation, updateCustomerAddress],
  );

  //------------ Update address customer -----------------//

  //------------ DELETE address customer -----------------//
  const [deleteCustomerAddress] = useMutation(mutation.DELETE_ADDRESS);

  const onHandleDelete = React.useCallback(() => {
    dispatch(app.showLoading());

    deleteCustomerAddress({
      variables: { id: values.id },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: query.ADDRESS_LIST }],
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
  const onHandleSubmit = isCheckValue ? onHandleAdd : onHandleUpdate;
  const goToCreateAddress = () => navigation.navigate(ScreenName.SearchAddress);

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
    <SinglePageLayout>
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

              {/**Server response error */}
              {/* {!_.isEmpty(signInError) &&
                                    Object.values(signInError).map((item, index) => (
                                        <TextInputErrorMessage
                                            style={{ width: LAYOUT_WIDTH }}
                                            message={item}
                                            color={AppStyles.colors.inputError}
                                            key={index}
                                        />
                                    ))} */}
            </View>

            {isCheckValue && !values.default_shipping && (
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

            <View style={styles.btnContainer}>
              <CustomButton
                onPress={handleSubmit}
                label="LƯU ĐỊA CHỈ NÀY"
                width={width * 0.9}
                height={58}
                bgColor={AppStyles.colors.button}
              />
            </View>
          </View>
        )}
      </Formik>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: AppStyles.colors.background,
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
});
export default Index;
