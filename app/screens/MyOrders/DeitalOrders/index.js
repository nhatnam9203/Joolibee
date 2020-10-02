import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStyles } from "@theme";
import { OrderInfo, OrderProductList } from "./pages";
export default function index({ navigation }) {
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: HeaderTitle()
        }, []);
    });

    const HeaderTitle = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={AppStyles.fonts.medium_SVN, styles.headerTitle}>Đơn hàng #0000066</Text>
            <Text style={AppStyles.fonts.text, styles.headerSubTitle}>11:00 AM, 24-8-2020</Text>
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
                {/* -------------- THONG TIN DON HANG  -------------- */}
                <OrderTitle title='THÔNG TIN GIAO HÀNG' />
                <OrderInfo />
                {/* -------------- THONG TIN DON HANG  -------------- */}

                {/* -------------- SAN PHAM DA CHON  -------------- */}
                <OrderTitle title='MÓN ĂN ĐÃ CHỌN' />
                <OrderProductList />
                {/* --------------  SAN PHAM DA CHON  -------------- */}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: AppStyles.colors.background
    },
    contentContainerStyle: { paddingHorizontal: 15, },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF'
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
