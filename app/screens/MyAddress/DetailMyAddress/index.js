
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics, images } from '@theme';
import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';
import { regex } from '@utils';
import { CustomInput, CustomButton } from '@components';
import { SinglePageLayout } from '@layouts';
import { TextInputErrorMessage, } from '../../components';
import ScreenName from '../../ScreenName';


const LAYOUT_WIDTH = '95%';
const { width } = Dimensions.get('window')
const index = (props) => {
    const navigation = useNavigation();
    const { values } = props.route.params;

    const goToCreateAddress = () => navigation.navigate(ScreenName.SearchAddress)
    const onHandleSubmit = React.useCallback(
        (values) => {
            console.log(values)
            //   const action = signIn(values, { dispatch });
            //   dispatch(action);
        },
        [],
    );

    const isCheckValue = values ? true : false;
    console.log('isCheckValue',isCheckValue)

    const initialValues = isCheckValue ? values : {
        phone: '',
        place: '',
        fullName: '',
        note: '',
        address: ''
    }

    const AddressSchema = Yup.object().shape({
        phone: Yup.string()
            .required(translate('txtRequired'))
            .matches(regex.phone, translate('txtWrongPhoneNumber'))
            .min(10, translate('txtTooShort'))
            .max(15, translate('txtTooLong')),
        place: Yup.string().required(translate('txtRequired')),
        fullName: Yup.string().required(translate('txtRequired')),
        address: Yup.string().required(translate('txtRequired')),
    });

    return (
        <SinglePageLayout>
            <Formik
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
                    setFieldValue,
                }) => (
                        <View style={styles.container}>
                            <View style={styles.topContent}>

                                {/**PLACE*/}
                                <CustomInput
                                    style={{ width: LAYOUT_WIDTH }}
                                    onChangeText={handleChange('place')}
                                    onBlur={handleBlur('place')}
                                    value={values.place}
                                    placeholder='Tên địa điểm vd: Nhà, Công ty... *'
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
                                <CustomInput
                                    style={{ width: LAYOUT_WIDTH }}
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                    placeholder='Họ & Tên người liên lạc'
                                />

                                {/**FULLNAME input error */}
                                {errors.fullName && touched.fullName && (
                                    <TextInputErrorMessage
                                        style={{ width: LAYOUT_WIDTH }}
                                        message={errors.fullName}
                                        color={AppStyles.colors.inputError}
                                    />
                                )}

                                {/**PHONE*/}
                                <CustomInput
                                    style={{ width: LAYOUT_WIDTH }}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    placeholder='Số điện thoại'

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
                                    style={{ width: '100%' }}
                                    onPress={goToCreateAddress}>
                                    <CustomInput
                                        style={{ width: LAYOUT_WIDTH }}
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                        editable={false}
                                        value={values.address}
                                        placeholder='Vui lòng nhập địa chỉ'
                                        style={{ flexDirection: 'row' }}

                                    >
                                        <Image
                                            source={images.icons.ic_arrow}
                                        />
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
                                    style={{ width: LAYOUT_WIDTH }}
                                    onChangeText={handleChange('note')}
                                    onBlur={handleBlur('note')}
                                    value={values.note}
                                    placeholder='Ghi chú cho địa chỉ'
                                    multiline={true}
                                    style={{ height: 117, alignItems: 'flex-start', paddingTop: 10 }}
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

                            {isCheckValue && <CustomButton
                                onPress={handleSubmit}
                                label='XÓA ĐỊA CHỈ'
                                width={width * 0.9}
                                height={58}
                                bgColor='transparent'
                                textColor={AppStyles.colors.accent}
                                style={{
                                    borderWidth: 2,
                                    borderColor: AppStyles.colors.accent,
                                    alignSelf: 'center',
                                    marginVertical: 30
                                }}
                            />}

                            <View style={styles.btnContainer}>
                                <CustomButton
                                    onPress={handleSubmit}
                                    label='LƯU ĐỊA CHỈ NÀY'
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
    container: { flex: 1, paddingHorizontal: 5, backgroundColor: AppStyles.colors.background },
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
        marginTop:40
    }
});
export default index
