import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from "@components";
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get("window")
const data = [1, 2, 3, 4, 5];


const index = () => {
    return (
        <View
            style={styles.container}
        >
            <View style={styles.containerTop}>
                <Text style={[AppStyles.fonts.title, { color: AppStyles.colors.text, fontSize: scaleWidth(32) }]}>Tin Tức
                </Text>
            </View>

            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={scaleWidth(388)}
                itemHeight={scaleHeight(384)}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={1}
                firstItem={0}
                autoplay
                autoplayInterval={5000}
                loop
            />
        </View>
    );
}

const renderItem = (item, index) => {
    return (
        <View style={styles.wrapperItem}>
            <View

                key={index + ''}
                style={[styles.containerItem, AppStyles.styles.shadow]}>
                <Image source={images['jollibee_news']}
                    style={styles.imgProduct}
                />

                <View style={styles.content}>
                    <Text style={[AppStyles.fonts.medium_SVN, styles.txttitle]}>
                        KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000:
                        2018 CỦA JOLLIBEE
            </Text>

                    <Text style={[AppStyles.fonts.text, styles.txtContent]}>
                        Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy
                        mới tại Long An và nhận được...
            </Text>
                </View>

                <CustomButton
                    onPress={() => alert('ads')}
                    label={'XEM THÊM'}
                    width={134}
                    height={43}
                    bgColor={AppStyles.colors.button}
                    style={styles.btn}
                />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: AppStyles.colors.cyan,
        // top: scaleHeight(-40),
        alignItems: 'center',
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(30)
    },

    containerTop: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: scaleHeight(20)

    },

    wrapperItem: {
        width: scaleWidth(388),
        height: scaleHeight(390),
        alignItems: 'center',
        justifyContent: 'center'
    },

    containerItem: {
        width: '100%',
        height: scaleHeight(344),
        alignItems: 'center',
        backgroundColor: AppStyles.colors.white,
        borderRadius: scaleWidth(10),
        padding: scaleWidth(10),
    },

    content: {
        paddingHorizontal: scaleWidth(10),
        top: scaleHeight(-20),
    },

    txttitle: {
        color: AppStyles.colors.text,
        fontSize: scaleWidth(16),
        textAlign: 'center'
    },
    txtContent: {
        color: AppStyles.colors.text,
        fontSize: scaleWidth(14),
        marginTop: scaleHeight(8)
    },
    imgProduct: {
        width: scaleWidth(281),
        height: scaleHeight(174),
        resizeMode: 'stretch',
        top: scaleHeight(-40),
        zIndex: 100000
    },
    btn: {
        alignSelf: 'flex-start',
        marginTop: scaleHeight(10),
        paddingLeft: scaleWidth(10)
    }

});

export default index;
