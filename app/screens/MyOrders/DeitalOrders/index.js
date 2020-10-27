import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { AppStyles } from "@theme";
import { CustomButton } from "@components";
import { PopupRating } from "../../components";
import { statusOrder, scale, format } from '@utils';
import { OrderInfo, OrderProductList, OrderTotal, OrderStatus } from "./pages";
const { scaleHeight } = scale;

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
    const { order } = route.params;
    const [data, setData] = React.useState([]);
    const [visible, setVisible] = React.useState(false);

    let status = statusOrder.convertStatusOrder(order.status);
    let order_complete = status == 'hoàn thành' || status == 'đã hủy' ? true : false;
    let hours = format.hours(order.created_at);
    let date = format.date(order.created_at);

    const onTogglePopup = () => setVisible(!visible)
    const onClose = () => setVisible(false)
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: HeaderTitle()
        });

        setData(defaultData);

        setTimeout(() => {
            onTogglePopup()
        }, 3000);

    }, []);

    const HeaderTitle = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={AppStyles.fonts.medium_SVN, styles.headerTitle}>Đơn hàng #{order.order_number}</Text>
            <Text style={AppStyles.fonts.text, styles.headerSubTitle}>{hours}, {date}</Text>
        </View>
    );

    const OrderTitle = ({ title, style }) => (
        <View style={[{ marginVertical: 20 }, style]}>
            <Text style={AppStyles.fonts.medium_SVN, styles.orderTitle}>{title}</Text>
        </View>
    );

    const ExpectedTime = () => (
        <View style={{ padding: 20 }}>
            <Text style={AppStyles.fonts.bold, { fontSize: 14 }}>Nhận hàng dự kiến:
            <Text style={AppStyles.fonts.medium_SVN, { fontSize: 18 }}>
                    10:30
            </Text>
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                //scrollEnabled={false}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
            >
                {/* -------------- TRANG THAI DON HANG  -------------- */}

                <View style={{ flex: 1, backgroundColor: AppStyles.colors.white, }}>
                    {!order_complete && <View style={styles.imageStatusOrder}>
                        <Image
                            style={styles.image}
                            source={statusOrder.getImage(status)}
                        />
                    </View>}

                    {status == 'Đang giao hàng' && <ExpectedTime />}

                    {/* {order_complete && <OrderTitle title='TRẠNG THÁI ĐƠN HÀNG' style={{ paddingHorizontal: 15 }} />} */}
                    <OrderStatus status={status} />
                </View>

                {/* -------------- TRANG THAI DON HANG  -------------- */}


                <View style={{ flex: 1, paddingHorizontal: 15 }}>
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

                    {order_complete && <PopupRating visible={visible} onToggle={onClose} orderId={order.id} />}
                </View>

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
        // paddingHorizontal: 15,
        paddingBottom: 20
    },
    imageStatusOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 50,
        marginBottom: 20
    },
    wrapperImage: {
        // width: 318,
        // height: 318,
        // borderRadius: 318 / 2,
        // overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: scaleHeight(350),
        // resizeMode:'stretch'
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
