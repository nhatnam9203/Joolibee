import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { TopBarScreenLayout } from '@layouts';
import { CustomPopupMenu } from '@components';
import { TopBarComponent } from '../../../components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AppStyles, images, metrics } from "@theme";

//define menu
const citys = [
    {
        id: 1,
        label: 'Hồ chí minh',
        value: 1
    },
    {
        id: 2,
        label: 'Hà Nội',
        value: 2
    }
];

const districs = [
    {
        id: 1,
        label: 'Quận 11',
        value: 1
    },
    {
        id: 2,
        label: 'Quận 12',
        value: 2
    }
];

const StorePage = () => {

    const [city, setCity] = React.useState(null);
    const [districts, setDistricts] = React.useState(null);
    const [visible, showModal] = React.useState([false, false]);

    const openModal = (i) => () => {
        let _visible = [...visible]
        _visible[i] = !_visible[i]
        showModal(_visible)
    }

    const closeModal = () => {
        showModal([false, false])
    }

    const onChangeItem = (item) => () => {
        visible[0] ? setCity(item) : setDistricts(item)
        closeModal();
    }

    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={onChangeItem(item.label)}
            key={index + ''}
            style={styles.itemContainer}>
            <Text style={AppStyles.fonts.text}>
                {item.label}
            </Text>
        </TouchableOpacity>

    );
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

                {/* ------------ Select city and districts --------------------- */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomPopupMenu
                        placeHolders='Chọn tỉnh thành'
                        visible={visible[0]}
                        menus={citys}
                        itemMenu={renderItem}
                        selected={city}
                        openMenu={openModal(0)}
                    />

                    <CustomPopupMenu
                        placeHolders='Chọn quận huyện'
                        visible={visible[1]}
                        menus={districs}
                        selected={districts}
                        itemMenu={renderItem}
                        openMenu={openModal(1)}
                    />
                </View>
                {/* ------------ Select city and districts --------------------- */}


            </View>

        </TopBarScreenLayout>
    )
};


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        height: 400,
        width: '100%',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
    },

    pickerContainer: {
        position: 'absolute',
        margin: 0,
        width: '50%',
    },
    itemContainer: {
        width: '100%',
        justifyContent: 'center',
        height: 35,
        paddingLeft: 5,
        marginVertical: 5,
        borderBottomColor: AppStyles.colors.disabled
    }
});
export default StorePage;
