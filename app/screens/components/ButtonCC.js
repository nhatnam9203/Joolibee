import React from 'react';
import { AppStyles, images } from '@theme';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '@components';
import { translate } from '@localize';
import { app } from '@slices';
import { useDispatch } from 'react-redux';
import { scale } from '@utils';

const BUTTON_HEIGHT = scale.scaleHeight(60);
const LAYOUT_WIDTH = '90%';
const BORDER_RADIUS = scale.scaleWidth(14);

export const ButtonRed = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  disabled,
  style,
  borderRadius = BORDER_RADIUS,
  textStyle,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(app.showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      styleText={textStyle}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor={AppStyles.colors.accent}
      textColor="#fff"
      bgColor={AppStyles.colors.accent}
      disabled={disabled}
      borderRadius={borderRadius}
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
  const showPopup = () => dispatch(app.showComingSoon());

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
  const showPopup = () => dispatch(app.showComingSoon());

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
  const showPopup = () => dispatch(app.showComingSoon());

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
  const showPopup = () => dispatch(app.showComingSoon());

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

export const ButtonGray = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  disabled,
  style,
  borderRadius = BORDER_RADIUS,
  textStyle,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(app.showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, AppStyles.styles.shadow, style]}
      styleText={textStyle}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor={AppStyles.colors.complete}
      textColor="#fff"
      bgColor={AppStyles.colors.complete}
      disabled={disabled}
      borderRadius={borderRadius}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 10,
  },
});
