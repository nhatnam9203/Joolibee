import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from '@components';
import { getColorStatusOrder } from '@utils';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const defaultData = [
    {
        date: 'Hôm nay',
        status_text: 'Đang giao hàng',
        id: '0000065',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
    {

        date: 'Hôm nay',
        status_text: 'Đã xác nhận',
        id: '0000066',
        shipping_method: 'Giao đến',
        address: '16 Trương Định, Phường.6, Quận.3 Hồ Chí Minh'
    },
    {
        date: 'Hôm nay',
        status_text: 'Đã hủy',
        id: '0000067',
        shipping_method: 'Giao đến',
        address: '16 Trương Định, Phường.6, Quận.3 Hồ Chí Minh'
    },

    {
        date: '20/08/2020',
        status_text: 'Đã hủy',
        id: '0000068',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },

    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000069',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },

    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000070',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000071',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000068',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000072',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
    {
        date: '20/08/2020',
        status_text: 'Hoàn thành',
        id: '0000073',
        shipping_method: 'Đến lấy',
        address: 'JOLLIBEE TRƯỜNG CHINH'
    },
];

const index = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([]);

    const goToDetail = (item) => {
        const values = item ?
            {
                phone: item.phone,
                place: item.title,
                fullName: item.fullName,
                note: item.note,
                address: item.address

            } : null
        navigation.navigate(ScreenName.DetailMyAddress, { values })
    }

    React.useEffect(() => {
        setData(defaultData);
    }, []);

    return (
        <View style={styles.container}>
            <CustomFlatList
                data={data}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item, index) => index + ''}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const renderItem = ({ item }) => {
    const txt_color = item.status_text == 'Hoàn thành' ? '#1B1B1B' : '#FFFFFF'
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <Image
                source={images.icons.ic_order}
            />
            <View style={{ paddingHorizontal: 10, justifyContent: 'space-between', width: '90%' }}>
                <Text style={[AppStyles.fonts.text, styles.txtDate]}>
                    {item.date}
                </Text>

                <Text style={AppStyles.fonts.medium}>
                    Đơn hàng #{item.id}
                </Text>

                <Text numberOfLines={1} style={[AppStyles.fonts.text, { fontSize: 14 }]}>
                    {item.shipping_method}: {item.address}
                </Text>
                <View style={[styles.statusContainer, { backgroundColor: getColorStatusOrder(item.status_text) }]}>
                    <Text numberOfLines={1} style={[AppStyles.fonts.mini, { color: txt_color,fontWeight:'700' }]} >
                        {item.status_text}
                    </Text>
                </View>

                {/* ----- BUTTON ĐAT LAI -----  */}
                {item.status_text == 'Hoàn thành' &&
                    <TouchableOpacity style={styles.btnPreOrder}>
                        <Text numberOfLines={1} style={AppStyles.fonts.medium} style={styles.txtPreOrder} >
                            Đặt lại
                    </Text>
                    </TouchableOpacity>}
                {/* ----- BUTTON ĐAT LAI -----  */}

            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 5, backgroundColor: AppStyles.colors.background },
    contentContainerStyle: { paddingVertical: 15 },
    statusContainer: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 94,
        paddingVertical: 7
    },

    itemContainer: {
        backgroundColor: '#fff',
        height: 108,
        flex: 0,
        flexDirection: 'row',
        padding: metrics.padding + 5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
    },
    txtDate: {
        fontSize: 14,
        position: 'absolute',
        top: 0,
        right: 5,
    },
    txtPreOrder: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: '#0696F8'

    },
    btnPreOrder: {
        position: 'absolute',
        bottom: 0,
        right: 5,
    }

});
export default index
