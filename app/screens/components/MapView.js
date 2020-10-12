import React from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';

const CustomMapView = React.forwardRef((props, ref) => {
    //const refMapView = React.createRef(null);
    console.log('ref',ref)
    return (
        <MapView
            // provider='google'
            {...props}
            ref={ref}
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}

        >
            {props.children}
        </MapView>
    );
});



const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
    },
})

export default CustomMapView