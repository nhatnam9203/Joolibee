import React from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import { Accordian } from "@components";
import { AppStyles, metrics } from "@theme";
const data = [
    { title: 'Đã xác nhận & chuẩn bị đơn hàng', description: 'Chúng tôi đã xác nhận và đang chuẩn bị đơn hàng của bạn' },
    { title: 'Đang giao hàng', description: 'Trần văn C (0778010203)' },
    { title: 'Đã đến nơi', description: 'Đơn hàng đã đến nơi rồi, bạn vui lòng nhận hàng nhé.' },
    { title: 'Hoàn thành', description: 'Đơn hàng của bạn đã giao hoàn tất,chúc bạn ngon miệng' },
];

const stepIndicatorStyles = {
    stepIndicatorSize: 12,
    currentStepIndicatorSize: 18,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: AppStyles.colors.accent,
    stepStrokeWidth: 2,
    separatorStrokeFinishedWidth: 0,
    stepStrokeFinishedColor: AppStyles.colors.accent,
    stepStrokeUnFinishedColor: AppStyles.colors.complete,
    separatorFinishedColor: AppStyles.colors.accent,
    separatorUnFinishedColor: AppStyles.colors.complete,
    stepIndicatorFinishedColor: AppStyles.colors.accent,
    stepIndicatorLabelUnFinishedColor: AppStyles.colors.complete,
}
export default function orderStatus() {

    const renderLabel = ({ position, label, currentPosition }) => {
        const nextPosition = currentPosition + 1;
        const description = data[position].description;
        const active = position < nextPosition ? 1 : 0.4;
        return (
            <View style={styles.labelContainer}>
                <Text style={[AppStyles.fonts.textBold, { opacity: active }]}>
                    {label}
                </Text>
                <Text style={[AppStyles.fonts.mini, { width: 150, opacity: active }]}>{description}</Text>

            </View >
        )
    }

    const renderStepIndicator = ({ position, stepStatus }) => {
        const activeBg = { backgroundColor: stepStatus === 'unfinished' ? AppStyles.colors.complete : AppStyles.colors.accent };
        return (
            <View
                style={[styles.stepIndicator, activeBg]}
            />
        )
    };

    const renderContent = () => (
        <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={data.length}
            direction='vertical'
            currentPosition={3}
            labels={data.map(item => item.title)}
            renderLabel={renderLabel}
            renderStepIndicator={renderStepIndicator}
        />
    )

    const renderHeader = () => (
        <View style={styles.labelContainer}>
            <View
                style={[styles.stepIndicator, styles.positionDotHeader]}
            />
            <View style={{ marginLeft: 20 }}>
                <Text style={[AppStyles.fonts.textBold]}>
                    {data[3].title}
                </Text>
                <Text style={[AppStyles.fonts.mini, { width: 150 }]}>{data[3].description}</Text>
            </View>
        </View >
    )

    return (
        <View style={styles.container}>
            <Accordian
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 0,
        padding: metrics.padding + 5,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
    },

    labelContainer: {
        width: 280,
        marginVertical: 10
    },
    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    positionDotHeader: {
        backgroundColor: AppStyles.colors.accent,
        position: 'absolute', top: 8
    }
})
