import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import ItemAddress from "./ItemAddress";

const defaultData = [
    {

        title: 'Nhà',
        address: '16 Trương Định, Phường.6, Quận.3, Tp. Hồ Chí Minh',
        id: 1,
    },
];

const index = ({ goToDetail }) => {
    const [data, setData] = React.useState([]);

    const renderItem = ({ item }) => <ItemAddress item={item} onPress={goToDetail} />;

    React.useEffect(() => {
        setData(defaultData);
    }, []);

    return (
        <View style={styles.container}>
            <CustomFlatList
                data={data}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item, index) => index + ''}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Text style={[AppStyles.fonts.title, styles.txtTitle]}>Địa chỉ bổ sung</Text>}
                scrollEnabled={false}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppStyles.colors.background, marginTop: 20 },
    contentContainerStyle: { paddingVertical: 15 },
    //
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
