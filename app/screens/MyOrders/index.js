import moment from "moment";
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics, images } from '@theme';
import { statusOrder, format } from '@utils';
import { GCC } from '@graphql';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import {
    Placeholder,
    PlaceholderLine,

    Fade,
} from 'rn-placeholder';



const index = () => {
    const navigation = useNavigation();

    const goToDetail = (item) => () => {
        navigation.navigate(ScreenName.DeitalOrders, { order: item })
    }

    const getShippingMethod = (txt = '') => {
        switch (txt) {
            case 'freeshipping_freeshipping':

                return 'Giao đến'
            default:
                return 'Đến lấy'
        }
    };

    const getDateStatus = (date) => {
        const current_day = moment().format('DD/MM/yyyy');
        let dateOrder = format.dateTime(date, 'DD/MM/yyyy');
        return dateOrder == current_day ? 'Hôm nay' : dateOrder;
    };

    const renderItemLoading = () => (
        <Placeholder
            Animation={Fade}
            style={[styles.itemContainer, { width: '95%' }]}
            Left={() => (
                <PlaceholderLine style={styles.avatarPlaceholder} />
            )}
        >
            <View style={{ paddingHorizontal: 10, justifyContent: 'space-between' }}>

                <PlaceholderLine width={18} style={styles.txtDate} />

                <PlaceholderLine width={50} />

                <PlaceholderLine width={90} />

                <PlaceholderLine style={styles.statusPlaceHolder} />



            </View>
        </Placeholder>
    )

    const renderItem = ({ item }) => {
        const status_text = statusOrder.convertStatusOrder(item.status);
        const txt_color = status_text == 'Hoàn thành' ? '#1B1B1B' : '#FFFFFF';
        return (
            <TouchableOpacity
                onPress={goToDetail(item)}
                style={styles.itemContainer}>
                <Image
                    source={images.icons.ic_order}
                />
                <View style={{ paddingHorizontal: 10, justifyContent: 'space-between', width: '90%' }}>
                    <Text style={[AppStyles.fonts.text, styles.txtDate]}>
                        {getDateStatus(item.created_at)}
                    </Text>

                    <Text style={AppStyles.fonts.medium}>
                        Đơn hàng #{item.order_number}
                    </Text>

                    <Text numberOfLines={1} style={[AppStyles.fonts.text, { fontSize: 14 }]}>
                        {getShippingMethod(item.shipping_method)}: {item.address}
                    </Text>
                    <View style={[styles.statusContainer, { backgroundColor: statusOrder.getColor(status_text) }]}>
                        <Text numberOfLines={1} style={[AppStyles.fonts.mini, { color: txt_color, fontWeight: '700' }]} >
                            {status_text}
                        </Text>
                    </View>

                    {/* ----- BUTTON ĐAT LAI -----  */}
                    {status_text == 'Hoàn thành' &&
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

    return (
        <View style={styles.container}>
            <GCC.QueryOrderList
                renderItem={renderItem}
                renderItemLoading={renderItemLoading}
            />
        </View>
    );
};


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
    },
    statusPlaceHolder: {
        borderRadius: 12,
        width: 94,
        height: 24
    },
    avatarPlaceholder: {
        borderRadius: 39 / 2,
        width: 39,
        height: 39
    },

});
export default index
