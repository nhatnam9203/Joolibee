/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';

export const AppScrollViewIOSBounceColorsWrapper = ({
  topBounceColor,
  bottomBounceColor,
  children,
  style,
  ...props
}) => {
  return (
    <View {...props} style={[{ position: 'relative' }, style]}>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1, // appear under the scrollview
        }}>
        <View style={{ flex: 1, backgroundColor: topBounceColor }} />
        <View style={{ flex: 1, backgroundColor: bottomBounceColor }} />
      </View>
    </View>
  );
};
