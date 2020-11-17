import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { images } from '@theme';
export default function Markers({ data = [], mapView = null }) {
  const onPressZoomIn = React.useCallback(
    (item) => () => {
      const region = {
        latitude: +item.latitude,
        longitude: +item.longitude,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00522,
      };
      if (mapView.current) {
        mapView.current.animateToRegion(region, 1000);
      }
    },
    [mapView],
  );
  return (
    <>
      {data.map((item, index) => {
        const coordinate = {
          latitude: +item.latitude,
          longitude: +item.longitude,
        };
        return (
          <Marker
            onPress={onPressZoomIn(item)}
            key={index + ''}
            coordinate={coordinate}
            title={item.store_name}
            description={item.address}>
            <Image
              source={images.icons.ic_pin_restaurant}
              style={styles.icon}
            />
          </Marker>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
