import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from 'react-native'
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
    currentStepStrokeWidth: 0,
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
    const scale = React.useRef(new Animated.Value(15)).current;
    const [visible, showPopup] = React.useState(false);

    let indexStatus = data.findIndex((item) => item.title.toLowerCase().includes(status));

    const ImageLink = ({ source, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} />
        </TouchableOpacity>
    )

    const onScrollTo = () => {
        if (refScrollView.current) {
            setTimeout(() => {
                refScrollView.current.scrollTo({ x: 0, y: data[indexStatus].y, animate: true })
            }, 200);
        }
    }

    const loopAnimateFade = () => Animated.loop(
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.2,
                duration: 1000,
                useNativeDriver: true,
            }),

            Animated.timing(scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]),
        {
            iterations: 2000,


        }
    ).start()

    React.useEffect(() => {
        onScrollTo();
        setTimeout(() => {
            loopAnimateFade()
        }, 500);
    }, []);

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
        const bgWarpper = stepStatus == 'unfinished' && { backgroundColor: AppStyles.colors.complete };
        const scaleIndicator = stepStatus !== 'unfinished' && { transform: [{ scale }] }
        return (
            <View style={[
                styles.wrapperStepIndicator,
                bgWarpper
            ]}>
                <Animated.View
                    style={[
                        styles.fadeStepIndicator,
                        activeBg,
                        scaleIndicator
                    ]}
                >

                </Animated.View>
                <View
                    style={[styles.stepIndicator, activeBg,
                    stepStatus !== 'unfinished' && {
                        transform: [{
                            scale: 0.8
                        }],
                    }
                    ]}
                />
            </View>
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
                callBack={onScrollTo}
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
    fadeStepIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

        opacity: 0.5
    },

    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
    },

    wrapperStepIndicator: {
        justifyContent: 'center',
        alignItems: 'center'
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
