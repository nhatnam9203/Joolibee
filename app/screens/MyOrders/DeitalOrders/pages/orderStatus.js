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
import { translate } from '@localize';
import LottieView from 'lottie-react-native';

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
  const data = [
    {
      title: translate('txtStatusOrderPending'),
      description: translate('txtDesOrderPending'),
      type: 'pending',
    },
    {
      title: translate('txtStatusOrderReceived'),
      description: translate('txtDesOrderReceived'),
      type: 'received',
    },

    {
      title: translate('txtStatusOrderShipping'),
      description: 'Trần văn C (0778010203)',
      type: 'shipping',
    },
    {
      title: translate('txtStatusOrderArrived'),
      description: translate('txtDesOrderArrived'),
      type: 'arrived',
    },
    {
      title: translate('txtStatusOrderComplete'),
      description: translate('txtDesOrderComplete'),
      type: 'complete',
    },
  ];
  let indexStatus = data.findIndex((item) => item.title === status);

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
            style={[styles.stepIndicator, { backgroundColor: '#E3183720' }]}
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
