import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IMAGE_WIDTH = 385;
const IMAGE_HEIGHT = 383;

export const CustomImageBackground = React.memo(
  ({
    style,
    children,
    imageStyle,
    imageWidth = IMAGE_WIDTH,
    imageHeight = IMAGE_HEIGHT,
    ...props
  }) => {
    const { width = windowWidth, height = windowHeight } = style;

    const horizontalViews = Array(Math.ceil(width / imageWidth)).fill(null);

    const verticalViews = Array(Math.ceil(height / imageHeight)).fill(null);

    return (
      <View style={style} accessibilityIgnoresInvertColors={true}>
        <View style={[StyleSheet.absoluteFill, styles.container]}>
          {verticalViews.map(() => (
            <View style={styles.horizontalLayout}>
              {horizontalViews.map(() => (
                <Image
                  {...props}
                  style={[
                    imageStyle,
                    {
                      width: imageWidth,
                      height: imageHeight,
                    },
                  ]}
                  resizeMode="contain"
                />
              ))}
            </View>
          ))}
        </View>
        {children}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  horizontalLayout: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
