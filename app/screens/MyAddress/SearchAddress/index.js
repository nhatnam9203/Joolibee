
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics, images } from '@theme';
import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import * as Yup from 'yup';
import { regex } from '@utils';
import { CustomInput, CustomButton } from '@components';
import { SinglePageLayout } from '@layouts';



const LAYOUT_WIDTH = '100%';
const { width } = Dimensions.get('window')
const index = () => {
    const navigation = useNavigation();
    const [key, setKey] = React.useState(key)

    const handleChangeText = (key) => setKey(key);

    const goToBack = React.useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onHandleSubmit = React.useCallback(
        (values) => {
            console.log(values)
            //   const action = signIn(values, { dispatch });
            //   dispatch(action);
        },
        [],
    );

    return (

        <View style={styles.container}>
            <View style={styles.topContent}>
                <CustomInput
                    style={{ width: LAYOUT_WIDTH }}
                    onChangeText={handleChangeText}
                    value={key}
                    placeholder='Nhập địa chỉ'
                    style={{ margin: 0 }}
                    autoFocus={true}
                />
            </View>

            <FilterAddressList />

        </View>

    );
};

const FilterAddressList = ({ data = [1, 2, 3, 4] }) => {
    return data.length > 0 && data.map((item, index) => (
        <TouchableOpacity
            onPress={()=>alert('áds')}
            key={index + ''}
            style={styles.itemContainer}>
            <Image source={images.icons.ic_location} resizeMode='contain' />

            <Text
                numberOfLines={3}
                style={[AppStyles.fonts.text, styles.txtAddress]}>
                350 Lý Thường Kiệt, phường 12, Quận Tân Bình, Thành phố Hồ Chí Minh
            </Text>
        </TouchableOpacity>
    ))
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppStyles.colors.background },
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
        height: 84,
        flex: 0,
        flexDirection: 'row',
        padding: metrics.padding,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
    },
    txtAddress: {
        paddingHorizontal: 10
    }
});
export default index
