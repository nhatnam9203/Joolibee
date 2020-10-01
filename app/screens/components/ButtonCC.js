import React from 'react';
import { AppStyles, images } from '@theme';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '@components';
import { translate } from '@localize';

const BUTTON_HEIGHT = 60;
const LAYOUT_WIDTH = '90%';

export const ButtonRed = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  style,
}) => (
  <CustomButton
    style={[styles.btnStyle, style]}
    onPress={onPress}
    width={width}
    height={height}
    label={label}
    borderColor={AppStyles.colors.accent}
    textColor="#fff"
    bgColor={AppStyles.colors.accent}
  />
);

export const ButtonYellow = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label,
  onPress,
  style,
}) => (
  <CustomButton
    style={[styles.btnStyle, style]}
    onPress={onPress}
    width={width}
    height={height}
    label={label}
    borderColor={AppStyles.colors.button}
    textColor="#000"
    bgColor={AppStyles.colors.button}
  />
);

export const ButtonFacebook = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label = translate('txtSignInFacebook'),
  onPress,
}) => (
  <CustomButton
    style={styles.btnStyle}
    onPress={onPress}
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

export const ButtonGoogle = ({
  width = LAYOUT_WIDTH,
  height = BUTTON_HEIGHT,
  label = translate('txtSignInGoogle'),
  onPress,
}) => (
  <CustomButton
    style={styles.btnStyle}
    onPress={onPress}
    width={width}
    height={height}
    label={label}
    borderColor="#fff"
    textColor="#1B1B1B"
    bgColor="#fff">
    <Image source={images.icons.ic_google} style={AppStyles.styles.iconStyle} />
  </CustomButton>
);

const styles = StyleSheet.create({
  btnStyle: {
    marginVertical: 10,
    ...AppStyles.styles.shadow,
  },
});
