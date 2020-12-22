import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { CustomButton } from '@components';
import { AppStyles, metrics } from '@theme';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

export const CardView = ({
  borderRadius,
  onPress,
  url,
  title = '',
  width,
  height,
  bgColor,
  styleTitle = {},
  styleIcon = {},
}) => {
  return (
    <CustomButton
      onPress={onPress}
      borderRadius={borderRadius}
      width={width}
      height={height}
      bgColor={bgColor}
      style={styles.cardContainer}
      styleContent={styles.cardContent}
      animation={false}>
      <Image source={url} style={[styles.img, styleIcon]} />
      <Text style={[styles.txtTitle, styleTitle]}>{title}</Text>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    shadowColor: '#0009',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    elevation: 4,
  },

  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(5),
  },

  txtTitle: {
    fontSize: scaleHeight(14),
    color: AppStyles.colors.primary,
    ...AppStyles.fonts.SVN_Merge_Bold,
    paddingTop: scaleHeight(5),
    width: '100%',
    height: scaleHeight(30),
    textAlign: 'center',
  },

  img: {
    width: scaleWidth(50),
    height: scaleHeight(39),
    resizeMode: 'contain',
  },
});
