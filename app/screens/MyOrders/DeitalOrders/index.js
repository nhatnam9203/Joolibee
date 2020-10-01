import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppStyles } from "@theme";
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

    return (
        <View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    headerSubTitle: {
        fontSize: 14,
        color: '#FFFFFF'
    },
})
