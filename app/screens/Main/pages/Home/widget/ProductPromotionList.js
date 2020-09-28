import React from 'react';
import { ScrollView, StyleSheet, View, Image, ImageBackground, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from "@components";
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get("window")
const data = [1, 2, 3, 4, 5];


const index = () => {
    const renderItem = (item, index) => {
        return (
            <View style={styles.wrapperItem}>
                <ImageBackground style={styles.price} source={images['jollibee_price']} resizeMode='stretch' >
                    <Text style={[AppStyles.fonts.medium_SVN,{color:AppStyles.colors.white}]}>50.000 đ</Text>
                </ImageBackground>

                <CustomButton
                    onPress={() => alert('ads')}
                    key={index + ''}
                    style={styles.containerItem}>

                    <Image source={images['jollibee_combo']} />
                </CustomButton>


            </View>
        )
    }
    return (
        <View
            style={styles.container}
        >

            <View style={{
                position: 'absolute'
            }}>
                <Carousel
                    pagingEnabled
                    // activeSlideAlignment='start'
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={scaleWidth(175)}
                    itemHeight={170}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={1}
                    autoplay
                    autoplayInterval={2000}
                    enableSnap={true}
                    loop={true}
                    loopClonesPerSide={data.length}
                    useScrollView={true}
                    firstItem={data.length}
                    initialScrollIndex={data.length}
                    lockScrollWhileSnapping={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: scaleHeight(180),
        justifyContent: 'center',
        backgroundColor: AppStyles.colors.white,
        alignItems: 'center',
    },

    wrapperItem: {
        width: scaleWidth(180),
        height: scaleHeight(170),
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerItem: {
        width: scaleWidth(165),
        height: scaleHeight(133),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: AppStyles.colors.accent,
        borderStyle: 'dashed',
        borderRadius: scaleWidth(10),
    },
    price: {
        position: 'absolute',
        top: scaleHeight(7),
        right: scaleWidth(-5),
        width: scaleWidth(81),
        height: scaleHeight(28),
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',

    }

});

export default index;
