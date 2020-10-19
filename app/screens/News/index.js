import { CustomFlatList, CustomButton } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { scale } from '@utils';
import { PopupWebView } from '../components';

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
    const [visible_detail, showDetail] = React.useState(false);
    const onToggleDetail = () => showDetail(!visible_detail);

    React.useEffect(() => {
        setData(defaultData);
    }, []);



    const ItemSeperator = () => (<View style={{ height: scaleHeight(70) }} />)

    const renderItem = ({ item, index }) => {
        return (

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
                    onPress={onToggleDetail}
                    label={'XEM THÊM'}
                    width={134}
                    height={43}
                    bgColor={AppStyles.colors.button}
                    style={styles.btn}
                />
            </View>

        );
    };

    return (
        <View style={styles.container}>
            <CustomFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index + ''}
                contentContainerStyle={styles.contentContainerStyle}
                ItemSeparatorComponent={ItemSeperator}
                showsVerticalScrollIndicator={false}
            />

            <PopupWebView visible={visible_detail} onToggle={onToggleDetail} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppStyles.colors.background },
    contentContainerStyle: { paddingVertical: 70, paddingHorizontal: 10 },

    containerItem: {
        width: '100%',
        height: scaleHeight(370),
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
    imgProduct: {
        width: scaleWidth(281),
        height: scaleHeight(174),
        resizeMode: 'stretch',
        top: scaleHeight(-40),
        zIndex: 100000,
    },

    btn: {
        alignSelf: 'flex-start',
        marginTop: scaleHeight(10),
    },

});
export default index
