import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Marker } from 'react-native-maps';
import { AppStyles, images } from "@theme";
export default function Markers({ data = [] }) {
    return (
        <>
            {data.map((item, index) => {
                const coordinate = {
                    latitude: +item.latitude,
                    longitude:  +item.longitude,
                }
                return (
                    <Marker
                        key={index + ""}
                        coordinate={coordinate}
                    >
                        <Image
                            source={images.icons.ic_pin_restaurant}
                            style={styles.icon}
                        />
                    </Marker>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
})
