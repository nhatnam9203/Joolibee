import React from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';

export default CustomMapView = (props) => {
    return (
        <MapView
            // provider='google'
            {...props}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}

        >
            {/* <Markers data={STORES} mapView={refMap} /> */}
            {props.children}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
    },
})
