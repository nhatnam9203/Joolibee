import React from 'react';
import { StyleSheet, View } from "react-native";
import { TopBarScreenLayout } from '@layouts';
import { CustomPickerSelect } from '@components';
import { TopBarComponent } from '../../../components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const StorePage = () => {

    const [city, setCity] = React.useState(1)
    return (
        <TopBarScreenLayout topBar={<TopBarComponent />}>



            <View style={styles.container}>
                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>

                <View style={styles.pickerContainer}>
                    <CustomPickerSelect
                        style={{width:'50%'}}
                        items={[
                            { label: 'Hồ chí minh', value: 1 },
                            {
                                label: 'Hà Nội',
                                value: 2,

                            },

                        ]}
                        placeholder='Chọn tỉnh thành'
                        defaultValue={city}
                        useNativeAndroidPickerStyle={false}
                        onChangeItem={(item) =>
                            setCity(item?.value)
                        }
                    />

                    <CustomPickerSelect
                     style={{width:'50%'}}
                        items={[
                            { label: 'Quận 1', value: 1 },
                            {
                                label: 'Quận 2',
                                value: 2,

                            },

                        ]}
                        placeholder='Chọn quận huyện'
                        defaultValue={city}
                        useNativeAndroidPickerStyle={false}
                        onChangeItem={(item) =>
                            setCity(item?.value)
                        }
                    />
                </View>
            </View>

        </TopBarScreenLayout>
    )
}
    ;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
       
        height: 400,
        width: '100%',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top:0,
    },

    pickerContainer: {
       position:'absolute',
       top:0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'

    }
});
export default StorePage;
