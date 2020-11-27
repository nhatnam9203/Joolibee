import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { AppStyles, metrics, images } from '@theme';
import { PopupChat } from '../../../components';
import { makeAPhoneCall } from '@utils';
import LottieView from 'lottie-react-native';
const data = [
  {
    title: 'Đang chờ xác nhận',
    description:
      'Đơn hàng của bạn đã được gửi và đang chờ xác nhận từ nhà hàng',
    type: 'pending',
  },
  {
    title: 'Đã xác nhận & chuẩn bị đơn hàng',
    description: 'Chúng tôi đã xác nhận và đang chuẩn bị đơn hàng của bạn',
    type: 'received',
  },

  {
    title: 'Đang giao hàng',
    description: 'Trần văn C (0778010203)',
    type: 'shipping',
  },
  {
    title: 'Đã đến nơi',
    description: 'Đơn hàng đã đến nơi rồi, bạn vui lòng nhận hàng nhé.',
    type: 'arrived',
  },
  {
    title: 'Hoàn thành',
    description: 'Đơn hàng của bạn đã giao hoàn tất,chúc bạn ngon miệng',
    type: 'complete',
  },
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
  stepStrokeUnFinishedColor: AppStyles.colors.inactive,
  separatorFinishedColor: AppStyles.colors.accent,
  separatorUnFinishedColor: AppStyles.colors.inactive,
  stepIndicatorFinishedColor: AppStyles.colors.accent,
  stepIndicatorLabelUnFinishedColor: AppStyles.colors.inactive,
  labelAlign: 'flex-start',
};
export default function OrderStatus({ status }) {
  const scale = React.useRef(new Animated.Value(15)).current;
  const [visible, showPopup] = React.useState(false);

  let indexStatus = data.findIndex((item) => item.type === status);

  const ImageLink = ({ source, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} />
    </TouchableOpacity>
  );

  const onTogglePopup = () => showPopup(!visible);

  const onCall = () => makeAPhoneCall.makeAPhoneCall('0921234567');

  const loopAnimateFade = React.useCallback(
    () =>
      Animated.loop(
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
          }),
        ]),
        {
          iterations: 2000,
        },
      ).start(),
    [scale],
  );

  React.useEffect(() => {
    setTimeout(() => {
      loopAnimateFade();
    }, 500);
  }, [loopAnimateFade]);
  const renderLabel = ({ position, label, currentPosition }) => {
    const description = data[position].description;
    const activeAction =
      (currentPosition === 2 || currentPosition === 3) &&
      currentPosition === position;
    return (
      <View style={[styles.labelContainer, { height: 50 }]}>
        <View style={styles.labelLeft}>
          <Text style={AppStyles.fonts.bold}>{label}</Text>
          <Text style={styles.txtDescription}>{description}</Text>
        </View>

        {
          <View style={styles.labelRight}>
            {activeAction && (
              <View style={styles.contentRight}>
                <ImageLink
                  source={images.icons.ic_order_phone}
                  onPress={onCall}
                />
                <ImageLink
                  source={images.icons.ic_order_text}
                  onPress={onTogglePopup}
                />
              </View>
            )}
          </View>
        }
      </View>
    );
  };

  const renderStepIndicator = ({ position, stepStatus }) => {
    const bgWarpper = stepStatus === 'unfinished' && {
      backgroundColor: AppStyles.colors.inactive,
    };
    return (
      <View style={[styles.wrapperStepIndicator, bgWarpper]}>
        {stepStatus === 'unfinished' ? (
          <View
            style={[
              styles.stepIndicator,
              { backgroundColor: AppStyles.colors.inactive, borderRadius: 10 },
            ]}
          />
        ) : (
          <LottieView
            source={images.animations.fade}
            style={styles.stepIndicator}
            autoPlay
            loop
          />
        )}
      </View>
    );
  };

  const renderContent = () => (
    <StepIndicator
      customStyles={stepIndicatorStyles}
      stepCount={data.length}
      direction="vertical"
      currentPosition={indexStatus}
      labels={data.map((item) => item.title)}
      renderLabel={renderLabel}
      renderStepIndicator={renderStepIndicator}
    />
  );

  return (
    <View style={styles.container}>
      {renderContent()}
      <PopupChat visible={visible} onToggle={onTogglePopup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: metrics.padding + 5,
  },

  labelContainer: {
    flex: 1,
    marginTop: 10,
    paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  labelLeft: {
    width: '70%',
  },

  labelRight: {
    width: '30%',
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fadeStepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    opacity: 0.5,
  },

  stepIndicator: {
    width: 20,
    height: 20,

    position: 'absolute',
  },

  wrapperStepIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionDotHeader: {
    backgroundColor: AppStyles.colors.accent,
    position: 'absolute',
    top: 8,
  },
  orderTitle: {
    fontSize: 18,
    color: AppStyles.colors.accent,
  },
  headerContainer: {
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtDescription: {
    // width: 170,
    ...AppStyles.fonts.mini,
  },
});
