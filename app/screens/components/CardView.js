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
      styleContent={styles.cardContent}>
      <Image source={url} style={[styles.img, styleIcon]} />
      <Text style={[styles.txtTitle, styleTitle]}>{title}</Text>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: metrics.padding,
    alignItems: 'center',
    marginTop: scaleHeight(170),
  },
  cardContainer: {
    margin: 7,
    shadowColor: '#00000090',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 10,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: 5,
  },
  txtTitle: {
    fontSize: scaleHeight(14),
    color: AppStyles.colors.primary,
    ...AppStyles.fonts.SVN_Merge_Bold,
  },
  img: {
    width: scaleWidth(50),
    height: scaleHeight(39),
    resizeMode: 'contain',
  },
});
