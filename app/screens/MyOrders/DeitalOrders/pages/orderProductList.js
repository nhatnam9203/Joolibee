import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppStyles, metrics } from "@theme";

export default function orderProductList() {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text
                    style={[AppStyles.fonts.textBold, styles.txtContent]}>
                    01 miếng gà giòn vui vẻ + 01 mỳ ý sốt bò bằm
                </Text>
                <Text style={[AppStyles.fonts.text, styles.txtContent]}>Súp bí đỏ (+25.000đ)</Text>
                <Text style={[AppStyles.fonts.text, styles.txtContent]}>7 Up nhỏ - 330ml (+5.000đ)</Text>
            </View>

            <View style={styles.rightContainer}>
                <BlockQuantity qty={5} />
                <Text
                    style={AppStyles.fonts.textBold}>
                    170.000 đ
                </Text>
            </View>
        </View>
    )
}

const BlockQuantity = ({ qty }) => (
    <View style={styles.blockQuantity}>
        <Text style={[AppStyles.fonts.medium, { fontSize: 14, color: AppStyles.colors.accent }]}>x{qty}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'space-between',
        paddingHorizontal: metrics.padding + 5,
        paddingVertical: metrics.padding + 10,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
    },
    rightContainer: {
        width: '41%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    leftContainer: {
        width: '57%',
    },

    txtContent: {
        fontSize: 14,
        marginTop: 3
    },
    blockQuantity: {
        width: 30,
        height: 29,
        flex: 0,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: AppStyles.colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
