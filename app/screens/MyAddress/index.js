import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics } from '@theme';
import { CustomButton } from '@components';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ItemAddress, AddressAdditionalList } from "./pages";

const defaultData = [
    {

        title: 'Nhà',
        address: '16 Trương Định, Phường.6, Quận.3, Tp. Hồ Chí Minh',
        id: 1,
        phone: '123456789',
        fullName: 'ABC',
        note: 'a',
    },
    {

        title: 'Nơi làm việc',
        address: '17 Trương Định, Phường.6, Quận.3, Tp. Hồ Chí Minh',
        id: 2,
        phone: '987654321',
        fullName: 'XYZ',
        note: 'b',
    },
    {

        title: 'Nơi làm việc',
        address: '18 Trương Định, Phường.6, Quận.3, Tp. Hồ Chí Minh',
        id: 3,
        phone: '113114115116',
        fullName: 'ABC',
        note: 'c',
    },
];

const index = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([]);

    const renderItem = ({ item }) => <ItemAddress item={item} onPress={goToDetail} />;


    const goToDetail = (item) => {
        console.log(item)
        const values = item ?
            {
                phone: item.phone,
                place: item.title,
                fullName: item.fullName,
                note: item.note,
                address: item.address

            } : null
        navigation.navigate(ScreenName.DetailMyAddress, { values })
    }

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
          ListHeaderComponent={() => (
            <Text style={[AppStyles.fonts.title, styles.txtTitle]}>
              Địa chỉ mặc định
            </Text>
          )}
          ListFooterComponent={() => (
            <>
              <AddressAdditionalList goToDetail={goToDetail} />
              <CustomButton
                onPress={() => goToDetail(null)}
                label={'THÊM ĐỊA CHỈ MỚI'}
                width={246}
                height={58}
                bgColor={AppStyles.colors.button}
                styleText={{ fontSize: 16 }}
                style={styles.btnContainer}
              />
            </>
          )}
        />
      </View>
    );
};



const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 5, backgroundColor: AppStyles.colors.background },
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
    },
    btnContainer: {
        alignSelf: 'center',
        marginVertical: 25
    }
});
export default index
