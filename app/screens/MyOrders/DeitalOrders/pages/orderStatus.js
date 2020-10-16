import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import { Accordian } from "@components";
import { AppStyles, metrics, images } from "@theme";
import { PopupChat } from "../../../components";
import { makeAPhoneCall } from "@utils";

const data = [
    { title: 'Đã xác nhận & chuẩn bị đơn hàng', description: 'Chúng tôi đã xác nhận và đang chuẩn bị đơn hàng của bạn', y: 0 },
    { title: 'Đang giao hàng', description: 'Trần văn C (0778010203)', y: 50 },
    { title: 'Đã đến nơi', description: 'Đơn hàng đã đến nơi rồi, bạn vui lòng nhận hàng nhé.', y: 140 },
    { title: 'Hoàn thành', description: 'Đơn hàng của bạn đã giao hoàn tất,chúc bạn ngon miệng', y: 200 },
    { title: 'Đã hủy', description: 'Đơn hàng của bạn đã huỷ', y: 300 },
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
export default function orderStatus({ status }) {
    const refScrollView = React.useRef(null);
    const [visible, showPopup] = React.useState(false);

    let indexStatus = data.findIndex((item) => item.title.includes(status));

    const ImageLink = ({ source, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} />
        </TouchableOpacity>
    )

    const onScrollTo = () => {
        if (refScrollView.current) {
            refScrollView.current.scrollTo({ x: 0, y: data[indexStatus].y, animate: true })
        }
    }

    React.useEffect(() => {
        onScrollTo()
    }, [])

    const onTogglePopup = () => showPopup(!visible);

    const onCall = () => makeAPhoneCall.makeAPhoneCall('0921234567')

    const renderLabel = ({ position, label, currentPosition }) => {
        const nextPosition = currentPosition + 1;
        const description = data[position].description;
        const active = position < nextPosition ? 1 : 0.4;
        return (
            <View

                style={[styles.labelContainer, { height: 50 }]}>
                <View

                    style={styles.labelLeft}>
                    <Text style={[AppStyles.fonts.textBold, { opacity: active }]}>
                        {label}
                    </Text>
                    <Text style={[AppStyles.fonts.mini, {
                        width: 170, opacity: active,
                    }]}>{description}</Text>
                </View>

                {(position == 1 && currentPosition == 1) && <View style={styles.labelRight}>
                    <ImageLink source={images.icons.ic_order_text} onPress={onTogglePopup} />
                    <ImageLink source={images.icons.ic_order_phone} onPress={onCall} />
                </View>}

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
            currentPosition={indexStatus}
            labels={data.map(item => item.title)}
            renderLabel={renderLabel}
            renderStepIndicator={renderStepIndicator}
        />
    )

    const renderHeader = () => (
        <View style={[{ height: 90, alignItems: 'flex-start', justifyContent: 'center' }]}>
            <ScrollView
                ref={refScrollView}
                showsVerticalScrollIndicator={false}
            >
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={data.length}
                    direction='vertical'
                    currentPosition={indexStatus}
                    labels={data.map(item => item.title)}
                    renderLabel={renderLabel}
                    renderStepIndicator={renderStepIndicator}
                />
            </ScrollView>

        </View >
    )

    return (
        <View style={styles.container}>
            <Accordian
                styleTitle={AppStyles.fonts.medium_SVN, styles.orderTitle}
                title='TRẠNG THÁI ĐƠN HÀNG'
                renderHeader={renderHeader}
                renderContent={renderContent}
            />

            <PopupChat visible={visible} onToggle={onTogglePopup} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: metrics.padding + 5,

    },

    labelContainer: {
        width: 280,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },

    labelLeft: {
        width: '70%'
    },

    labelRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30%'
    },

    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    positionDotHeader: {
        backgroundColor: AppStyles.colors.accent,
        position: 'absolute', top: 8
    },
    orderTitle: {
        fontSize: 18,
        color: AppStyles.colors.accent
    }
})
