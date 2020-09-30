import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { TopBarScreenLayout } from '@layouts';
import { CustomPopupMenu } from '@components';
import { TopBarComponent } from '../../../components';
import MapView from 'react-native-maps';
import { AppStyles } from "@theme";
import { ItemStore, Markers } from "./pages";

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };
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

const INITIAL_REGION = {
    latitude: 20.980230,
    longitude: 105.788100,
    latitudeDelta: 0.500,
    longitudeDelta: 0.500 * width / height,
}

const STORES = [
    {
        "store_id": "2",
        "store_name": "JOLLIBEE LŨY BÁN BÍCH",
        "store_phone": "024.6654.8760",
        "address": "661/1-661/3 Lũy Bán Bích, p. Phú Thạnh, Q. Tân Phú, HCM",
        "latitude": "10.780644",
        "longitude": "106.635679",
    },
    {
        "store_id": "3",
        "store_name": "JOLLIBEE VINMARK CỘNG HÒA",
        "store_phone": "028.3948 3238",
        "address": "15 – 17 Cộng Hòa, P. 4, Q. Tân Bình, HCM",
        "latitude": "10.800670273493",
        "longitude": "106.65950290556",
    },
    {
        "store_id": "4",
        "store_name": "JOLLIBEE NGUYỄN BỈNH KHIÊM",
        "store_phone": "028.3820 0598",
        "address": "58/13 Nguyễn Bỉnh Khiêm, P. Dakao, Q. 1, HCM",
        "latitude": "10.792716643241",
        "longitude": "106.6993240943",
    },
    {
        "store_id": "5",
        "store_name": "POPEYES THẢO ĐiỀN",
        "store_phone": "028.3519 1029",
        "address": "20 Thảo Điền, KP 2, P. Thảo Điền, Q2, HCM",
        "latitude": "10.80372123098",
        "longitude": "106.73740545026",
    },
];

const StorePage = () => {

    const [city, setCity] = React.useState(null);
    const [districts, setDistricts] = React.useState(null);
    const [visible, showModal] = React.useState([false, false]);
    const refMap = React.useRef(null);

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

    const fitAllMarkers = () => {
        refMap.current.fitToCoordinates(STORES, {
            edgePadding: DEFAULT_PADDING,
            animated: true,
        });
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

            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.container}>
                        <MapView
                            ref={refMap}
                            style={styles.map}
                            initialRegion={INITIAL_REGION}
                            onMapReady={fitAllMarkers}
                        >

                            <Markers data={STORES} />

                        </MapView>
                    </View>
                )}
                keyExtractor={(_, index) => index + ''}
                renderItem={({ item, index }) => <ItemStore item={item} index={index} />}
                data={STORES}

            />


        </TopBarScreenLayout>
    )
};


const styles = StyleSheet.create({
    container: {
        height: 400,
        width: '100%',
        alignItems: 'center',
        top: -20
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
