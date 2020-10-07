import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { AppStyles, images } from "@theme";
import { CustomButton } from "@components";
import { statusOrder } from '@utils';
import { OrderInfo, OrderProductList, OrderTotal, OrderStatus } from "./pages";

const defaultData = [
    {
        options: '01 miếng gà giòn vui vẻ + 01 mỳ ý sốt bò bằm',
        extra: 'Súp bí đỏ (+25.000đ)',
        soft_drink: '7 Up nhỏ - 330ml (+5.000đ)',
        qty: 1,
        price: '85.000'
    },
    {
        options: '01 miếng gà giòn vui vẻ + 01 mỳ ý sốt bò bằm + 01 nước ngọt (vừa)',
        extra: 'Súp bí đỏ (+25.000đ)',
        soft_drink: '7 Up nhỏ - 330ml (+5.000đ)',
        qty: 2,
        price: '170.000'
    },
];


export default function index({ navigation, route }) {
    const [data, setData] = React.useState([]);
    const { order } = route.params;
    let order_complete = order.status_text == 'Hoàn thành' ? true : false;
    console.log(order_complete)
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: HeaderTitle()
        });
        setData(defaultData)
    }, []);

    const HeaderTitle = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={AppStyles.fonts.medium_SVN, styles.headerTitle}>Đơn hàng #{order.id}</Text>
            <Text style={AppStyles.fonts.text, styles.headerSubTitle}>11:00 AM, {order.date}</Text>
        </View>
    );

    const OrderTitle = ({ title }) => (
        <View style={{ marginVertical: 20 }}>
            <Text style={AppStyles.fonts.medium_SVN, styles.orderTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
            >
                {/* -------------- TRANG THAI DON HANG  -------------- */}
                {!order_complete && <View style={styles.imageStatusOrder}>
                    <Image
                        style={styles.image}
                        source={statusOrder.getImage(order.status_text)}
                    />
                </View>}

                {order_complete && <OrderTitle title='TRẠNG THÁI ĐƠN HÀNG' />}
                <OrderStatus status={order.status_text} />
                {/* -------------- TRANG THAI DON HANG  -------------- */}

                {/* -------------- THONG TIN DON HANG  -------------- */}
                <OrderTitle title='THÔNG TIN GIAO HÀNG' />
                <OrderInfo />
                {/* -------------- THONG TIN DON HANG  -------------- */}

                {/* -------------- SAN PHAM DA CHON  -------------- */}

                <View style={styles.headerPreOrder}>
                    <OrderTitle title='MÓN ĂN ĐÃ CHỌN' />
                    <CustomButton
                        // onPress={onToggle}
                        label={'ĐẶT LẠI'}
                        width={140}
                        height={42}
                        bgColor={AppStyles.colors.button}
                        styleText={{ fontSize: 14 }}
                    />
                </View>
                <OrderProductList data={data} />
                {/* --------------  SAN PHAM DA CHON  -------------- */}

                {/* --------------  TOTAL PRICE  -------------- */}
                <OrderTotal />
                {/* --------------  TOTAL PRICE -------------- */}


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: AppStyles.colors.background
    },
    contentContainerStyle: {
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    imageStatusOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
        marginBottom:20
    },
    wrapperImage: {
        width: 318,
        height: 318,
        borderRadius: 318 / 2,
        overflow: 'hidden'
    },
    image: {
        width: 318,
        height: 318,
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF'
    },

    headerPreOrder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },

    orderTitle: {
        fontSize: 18,
        color: AppStyles.colors.accent
    },
    headerSubTitle: {
        fontSize: 14,
        color: '#FFFFFF'
    },
})
