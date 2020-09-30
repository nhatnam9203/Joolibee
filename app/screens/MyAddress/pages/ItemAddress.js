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
            <View style={styles.addressImage}>
                <Image
                    source={images.icons.ic_address}
                />
            </View>

            <View style={styles.content}>
                <Text style={AppStyles.fonts.medium}>
                    {item.title}
                </Text>

                <Text
                    numberOfLines={1}
                    style={[AppStyles.fonts.mini, { fontSize: 14 }]}>
                    {item.address}
                </Text>

            </View>

            <Image
                source={images.icons.ic_arrow}
            />
        </TouchableOpacity>
    );
};



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
        height: 75,
        flex: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        padding: metrics.padding,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 6,
        ...AppStyles.styles.shadow,
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
