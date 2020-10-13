import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../ScreenName';

import { CustomButton } from '@components';
import { AppStyles, images } from "@theme";
import { scale } from "@utils";
import { translate } from '@localize';

const { scaleWidth, scaleHeight } = scale;
const { width, height } = Dimensions.get('window');
const slides = [
  {
    url: images['jollibee_driver_intro'],
    url_bg: images['jollibee_bg_intro'],
    style_image: {
      width: '70%',
      height: '60%',
      resizeMode: 'contain',
      marginTop: scaleHeight(70)
    },
    title: 'Giao Hàng Tận Nơi',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`
  },
  {
    url: images['jollibee_shop_intro'],
    url_bg: images['jollibee_bg_intro'],
    style_image: {
      width: '70%',
      height: '60%',
      resizeMode: 'contain',
      marginTop: scaleHeight(55)
    },
    title: 'Khuyến Mãi Hấp Dẫn',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has bee industry's standard`
  },
  {
    url: images['jollibee_gift_intro'],
    url_bg: images['jollibee_light_intro'],
    style_image: {
      width: '70%',
      height: '90%',
      resizeMode: 'contain',
      marginTop: '15%'
    },
    title: 'Tích Điểm Đổi Quà',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`
  },
  {
    url: images.icons['Walkthough4'],
    title: 'Hãy là người đầu tiên trải nghiệm!',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`
  },
]
const WelcomeScreen = () => {
  const navigation = useNavigation();

  const refAppIntro = React.useRef(null);
  const [page, setPage] = React.useState(-1);

  const nextPage = (page) => () => {
    if (!refAppIntro.current) return;
    if (page + 1 > 3) onSkip()
    refAppIntro.current.goToSlide(page + 1);
    setPage(page + 1)
  }

  const onHandleSlideChange = (page) => {
    setPage(page)
  }

  const onSkip = () => {
    navigation.navigate(ScreenName.SignIn)
    setPage(0)
  }

  const LastSlide = ({ item, index }) => {
    return (
      <ImageBackground
        source={item.url}
        style={{
          width,
          height,
        }}>

        <SafeAreaView style={{
          width,
          height,
          alignItems: 'center'
        }}>
          <View style={styles.containerLastTop}>
            <Text style={styles.title_content}>
              {item.title}
            </Text>

            <Text style={styles.text_content}>
              {item.content}
            </Text>
          </View>
          <CustomButton
            onPress={nextPage(index)}
            label={translate('btnExperience')}
            width={width * 0.8}
            height={58}
            bgColor={AppStyles.colors.accent}
            style={styles.btnLast}
            textColor={AppStyles.colors.white}
          />
        </SafeAreaView>
      </ImageBackground >
    )
  }

  const Silde = ({ item, index }) => {
    const btnBackgroundColor = index != 3 ? AppStyles.colors.button : AppStyles.colors.accent;
    const txtColor = index != 3 ? AppStyles.colors.text : AppStyles.colors.white;
    const label = index != 3 ? translate('btnConttinue') : translate('btnExperience')
    return (
      <>
        {index != 3 ?
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ImageBackground
              source={item.url_bg}
              style={styles.contentTop}
            >
              {index != 3 && < TouchableOpacity
                onPress={onSkip}
                style={styles.btnSkip}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Text style={styles.txt_skip}>
                  Bỏ qua
              </Text>

                <Image
                  source={images.icons.arrow_skip}
                  style={styles.icon_skip}
                />
              </TouchableOpacity>}
              <Image
                source={item.url}
                style={item.style_image}
              />
            </ImageBackground>

            <ImageBackground
              source={images.jollibee_cirlce_intro}
              style={styles.contentBottom}
            >
              <View style={styles.txtContentBottom}>
                <Text style={styles.title_content}>
                  {item.title}
                </Text>

                <Text style={styles.text_content}>
                  {item.content}
                </Text>

                <CustomButton
                  onPress={nextPage(index)}
                  label={label}
                  width={width * 0.8}
                  height={58}
                  bgColor={btnBackgroundColor}
                  style={styles.btn}
                  txtColor={txtColor}
                />
              </View>
            </ImageBackground>
          </View>
          :
          <LastSlide item={item} index={index} />
        }
      </>

    )
  }




  return <AppIntroSlider
    ref={refAppIntro}
    renderItem={Silde}
    keyExtractor={(_, index) => index + ''}
    onSlideChange={onHandleSlideChange}
    data={slides}
    showDoneButton={false}
    showNextButton={false}
    dotStyle={{
      backgroundColor: '#707070'
    }}
    activeDotStyle={{
      backgroundColor: page == slides.length - 1 ? AppStyles.colors.accent : AppStyles.colors.button
    }}
  />;
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 25
  },

  btnLast: {
    position: 'absolute',
    bottom: scaleHeight(85)
  },
  btnSkip: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scaleHeight(45),
    right: scaleWidth(20),
    flexDirection: 'row',
  },

  contentTop: {
    width: '100%',
    height: '80%',
    resizeMode: 'center',
    backgroundColor: AppStyles.colors.button,
    alignItems: 'center'
  },

  containerLastTop: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scaleHeight(45),
    width: scaleWidth(360),
  },

  contentBottom: {
    bottom: scaleHeight(180),
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  txtContentBottom: {
    alignItems: 'center',
    marginTop: '15%',
    paddingHorizontal: 15,
  },

  imageTop: {
    width: '70%',
    height: '60%',
    resizeMode: 'contain',
    marginTop: '15%'
  },
  title_content: {
    fontSize: scaleWidth(30),
    color: AppStyles.colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text_content: {
    fontSize: scaleWidth(16),
    color: AppStyles.colors.white,
    lineHeight: scaleHeight(21),
    paddingTop: 5,
    textAlign: 'center'
  },
  txt_skip: {
    fontSize: scaleWidth(14),
    color: AppStyles.colors.white,
    marginRight: scaleWidth(6)
  },
  icon_skip: {
    width: scaleWidth(26),
    height: scaleHeight(26),
    resizeMode: 'contain'
  }
})

export default WelcomeScreen;
