import React from 'react';
import { AppStyles, images } from '@theme';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '@components';
import { translate } from '@localize';
import { showComingSoon } from '@slices/app';
import { useDispatch } from 'react-redux';

const BUTTON_HEIGHT = 60;
const LAYOUT_WIDTH = '90%';

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
      style={[styles.btnStyle, style]}
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
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={[styles.btnStyle, style]}
      styleText={textStyle}
      onPress={onPress ?? showPopup}
      width={width}
      height={height}
      label={label}
      borderColor={AppStyles.colors.button}
      textColor="#000"
      bgColor={AppStyles.colors.button}
    />
  );
};

export const ButtonFacebook = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label = translate('txtSignInFacebook'),
  onPress,
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={styles.btnStyle}
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
}) => {
  const dispatch = useDispatch();
  const showPopup = () => dispatch(showComingSoon());

  return (
    <CustomButton
      style={styles.btnStyle}
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
      textColor={AppStyles.colors.accent}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 10,
    ...AppStyles.styles.shadow,
  },
});
