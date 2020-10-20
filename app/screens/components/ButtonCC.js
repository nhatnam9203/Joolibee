import React from 'react';
import { AppStyles, images } from '@theme';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '@components';
import { translate } from '@localize';
import { showComingSoon } from '@slices/app';
import { useDispatch } from 'react-redux';

const BUTTON_HEIGHT = 58;
const LAYOUT_WIDTH = '80%';

export const ButtonRed = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  style,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor={AppStyles.colors.accent}
      textColor="#fff"
      bgColor={AppStyles.colors.accent}
    />
  );
};

export const ButtonYellow = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  style,
  textStyle,
  disabled,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      styleText={textStyle}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor={AppStyles.colors.button}
      textColor="#000"
      bgColor={AppStyles.colors.button}
      disabled={disabled}
    />
  );
};

export const ButtonFacebook = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label = translate('txtSignInFacebook'),
  onPress,
  style,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor="#1976D2"
      textColor="#fff"
      bgColor="#1976D2">
      <Image
        source={images.icons.ic_facebook}
        style={AppStyles.styles.iconStyle}
      />
    </CustomButton>
  );
};

export const ButtonGoogle = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label = translate('txtSignInGoogle'),
  onPress,
  style,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor="#fff"
      textColor="#1B1B1B"
      bgColor="#fff">
      <Image
        source={images.icons.ic_google}
        style={AppStyles.styles.iconStyle}
      />
    </CustomButton>
  );
};

export const ButtonBorderRed = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  style,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, style]}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      bgColor={'#fff'}
      borderColor={AppStyles.colors.accent}
      borderWidth={2}
      textColor={AppStyles.colors.accent}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 10,
  },
});
