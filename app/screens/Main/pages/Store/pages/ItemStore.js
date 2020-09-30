import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';



const index = ({ item, onPress }) => {
    const onHandlePress = () => {
        onPress(item)
    }
    return (
        <TouchableOpacity
            onPress={onHandlePress}
            style={styles.itemContainer}>

            <View style={styles.leftContainer}>
                <Image
                    source={images.icons.ic_location}
                />

                <Text style={[AppStyles.fonts.mini, { marginTop: 10 }]}>2,5 km</Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={[AppStyles.fonts.medium_SVN]}>{item.store_name}</Text>

                <StoreInfo url={images.icons.ic_store_address} content={item.address} />
                <StoreInfo url={images.icons.ic_store_phone} content={item.store_phone} />
                <StoreInfo url={images.icons.ic_store_clock} content='09:00 - 20:00 (Thứ 2 - Chủ Nhật)' />
            </View>
        </TouchableOpacity>
    );
};

const StoreInfo = ({ url, content }) => (
    <View style={styles.infoContainer}>
        <Image source={url} style={{ marginRight: 5 }} />
        <Text numberOfLines={2} style={[AppStyles.fonts.text, { fontSize: 14 }]}>{content}</Text>
    </View>
)

const styles = StyleSheet.create({

    addressImage: {
        backgroundColor: '#E31837',
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
    },

    itemContainer: {
        backgroundColor: '#fff',
        height: 122,
        flex: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: metrics.padding,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },

    leftContainer: {
        width: '20%',
        alignItems: 'center'
    },

    rightContainer: {
        width: '80%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    content: {
        paddingHorizontal: 10,
        width: 270,
    },
    txtTitle: {
        fontSize: 21,
        marginHorizontal: 15,
        marginVertical: 5
    }
});
export default index
