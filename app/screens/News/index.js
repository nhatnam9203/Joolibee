import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, metrics, images } from '@theme';
import ScreenName from '../ScreenName';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;
const defaultData = [
    {
        title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
        content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
        url: images['jollibee_news']
    },
    {
        title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
        content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
        url: images['jollibee_news']
    },
    {
        title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
        content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
        url: images['jollibee_news']
    },

];

const index = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(defaultData);
    }, []);

    const goToDetail = (item) => () => {
        navigation.navigate(ScreenName.DeitalOrders, { order: item })
    }

    const renderItem = (item, index, onPress) => {
        return (
            <View style={styles.wrapperItem}>
                <View
                    key={index + ''}
                    style={styles.containerItem}>
                    <Image source={item.url} style={styles.imgProduct} />

                    <View style={styles.content}>
                        <Text style={[AppStyles.fonts.medium_SVN, styles.txttitle]}>
                            {item.title}
                        </Text>

                        <Text style={[AppStyles.fonts.text, styles.txtContent]}>
                            {item.content}
                        </Text>
                    </View>

                    <CustomButton
                        onPress={onPress}
                        label={'XEM THÊM'}
                        width={134}
                        height={43}
                        bgColor={AppStyles.colors.button}
                        style={styles.btn}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CustomFlatList
                data={data}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item, index) => index + ''}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 5, backgroundColor: AppStyles.colors.background },
    contentContainerStyle: { paddingVertical: 15 },
    wrapperItem: {
        width: '100%',
        height: scaleHeight(390),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    containerItem: {
        width: '100%',
        height: scaleHeight(344),
        alignItems: 'center',
        backgroundColor: AppStyles.colors.white,
        borderRadius: scaleWidth(10),
        padding: scaleWidth(10),
        ...AppStyles.styles.shadow
    },

    content: {
        paddingHorizontal: scaleWidth(10),
        top: scaleHeight(-20),
    },

});
export default index
