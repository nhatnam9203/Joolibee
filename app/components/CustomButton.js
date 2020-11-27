import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Spinner from 'react-native-spinkit';

const DISABLE_COLOR = '#4448';
const ANIMATION_DURATION = 250;
const ZOOM_IN = 1.05;
const ZOOM_OUT = 1;

const CustomButton = ({
  onPress,
  width = 36,
  height = 36,
  bgColor,
  textColor,
  label,
  children,
  absolute = false,
  borderColor,
  borderWidth = 1,
  style,
  styleText,
  disabled,
  borderRadius = 12,
  styleContent = {},
  animation = true,
  loading = false,
  ...props
}) => {
  const viewScale = useSharedValue(1);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation ? viewScale.value : 1 }],
    };
  });

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: width,
          height: height,
          borderRadius: borderRadius ?? height / 2,
          backgroundColor: bgColor,
        },
        absolute && styles.btnAbsoluteStyle,
        style,
      ]}
      onPress={onPress}
      onPressIn={() => {
        viewScale.value = withTiming(ZOOM_IN, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0, 1.2, 0.76, 0.98),
        });
      }}
      onPressOut={() => {
        viewScale.value = withTiming(ZOOM_OUT, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.14, 0.44, 0.44, 1.08),
        });
      }}
      disabled={disabled}
      {...props}>
      <>
        <Animated.View
          style={[
            styles.content,
            styleContent,
            {
              backgroundColor: bgColor,
              borderRadius: borderRadius ?? height / 2,
              ...(borderColor &&
                !disabled && {
                  borderWidth: borderWidth,
                  borderColor: borderColor,
                }),
            },
            customSpringStyles,
          ]}>
          {loading && (
            <Spinner
              style={styles.spinner}
              type={'Circle'}
              size={25}
              color="#fff"
            />
          )}

          {children}
          {!!label && !loading && (
            <Text style={[styles.txtStyle, { color: textColor }, styleText]}>
              {label?.toUpperCase()}
            </Text>
          )}
        </Animated.View>
        {disabled && (
          <View
            style={[
              styles.absolute,
              {
                borderRadius: borderRadius ?? height / 2,
                backgroundColor: DISABLE_COLOR,
              },
            ]}
          />
        )}
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnAbsoluteStyle: { position: 'absolute', top: 10, left: 10 },
  txtStyle: { fontFamily: 'SVN-Merge', fontSize: 16, marginLeft: 5 },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  spinner: {
    flex: 0,
    alignSelf: 'center',
  },
});

export default CustomButton;
