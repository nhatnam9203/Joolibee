import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const CustomMapView = React.forwardRef((props, ref) => {
  return (
    <MapView
      // provider='google'
      style={styles.map}
      {...props}
      ref={ref}
      showsUserLocation={true}>
      {props.children}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
  },
});

export default CustomMapView;
