import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../ScreenName';

import { CustomButton } from '@components';
import { ButtonCC } from '../components';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import { translate } from '@localize';
import { app } from '@slices';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

const { scaleWidth, scaleHeight } = scale;
const { width, height } = Dimensions.get('window');
const HEIGHT_CIRCLE = height * 0.8;
const slides = [
  {
    url: images['jollibee_driver_intro'],
    url_bg: images['jollibee_bg_intro'],
    style_image: {
      width: height * 0.5,
      height: height * 0.5,
      marginTop: height * 0.08,
    },
    title: 'Giao Hàng Tận Nơi',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`,
  },
  {
    url: images['jollibee_shop_intro'],
    url_bg: images['jollibee_bg_intro'],
    style_image: {
      width: height * 0.4,
      height: height * 0.4,
      marginTop: height * 0.15,
    },
    title: 'Khuyến Mãi Hấp Dẫn',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has bee industry's standard`,
  },
  {
    url: images['jollibee_gift_intro'],
    url_bg: images['jollibee_bg_intro'],
    style_image: {
      width: width * 0.9,
      height: height * 0.64,
      marginTop: height * 0.13,
    },
    title: 'Tích Điểm Đổi Quà',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`,
  },
  {
    url: images.icons['Walkthough4'],
    title: 'Hãy là người đầu tiên trải nghiệm!',
    content: `Lorem Ipsum is simply dummy text of the prin and typesetting industry. Lorem Ipsum has been industry's standard`,
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refAppIntro = React.useRef(null);
  const [page, setPage] = React.useState(-1);

  const nextPage = (page) => () => {
    if (!refAppIntro.current) {
      return;
    }
    if (page + 1 > 3) {
      onSkip();
    }
    refAppIntro.current.goToSlide(page + 1);
    setPage(page + 1);
  };

  const onHandleSlideChange = (page) => {
    setPage(page);
  };

  const onSkip = () => {
    navigation.navigate(ScreenName.SignIn);
    setPage(0);
    dispatch(app.hadLoadIntro());
  };

  const LastSlide = ({ item, index }) => {
    return (
      <View style={styles.containerLastSlide}>
        {/* --------- Cricle Red ---------- */}
        <View
          style={[
            styles.cricleContainer,
            {
              backgroundColor: AppStyles.colors.accent,
              bottom: height * 0.58,
            },
          ]}
        />
        <View
          style={{
            marginTop: height * 0.05,
          }}>
          <Text style={styles.title_content}>{item.title}</Text>
          <Text numberOfLines={3} style={styles.text_content}>
            {item.content}
          </Text>
        </View>
        {/* --------- Cricle Red ---------- */}
        <Image source={images.jollibee_head} style={styles.imgHeadIcon} />
        {/* --------- Cricle Yellow ---------- */}
        <View
          style={[
            styles.cricleContainer,
            {
              backgroundColor: AppStyles.colors.button,
              bottom: -(height * 0.08),
              left: width * 0.64,
            },
          ]}>
          <Image
            source={images.jollibee_double_arrow}
            style={styles.imgDoubleRow}
          />
        </View>
        {/* --------- Cricle Yellow ---------- */}

        {/* --------- Image Phone Left  ---------- */}
        <FastImage
          source={images.jollibee_menu_mockup}
          style={styles.menuMockupContainer}
          resizeMode={FastImage.resizeMode.contain}
        />

        {/* --------- Image Phone Left ---------- */}

        {/* --------- Cricle White ---------- */}
        <View
          style={[
            styles.cricleContainer,
            {
              backgroundColor: AppStyles.colors.background,
              top: height * 0.76,
              right: width * 0.048,
            },
          ]}>
          <Image source={images.jollibee_arrow} style={styles.imgRow} />
        </View>
        {/* --------- Cricle White ---------- */}

        <CustomButton
          onPress={nextPage(index)}
          label="BẮT ĐẦU TRẢI NGHIỆM"
          width={width * 0.55}
          height={61}
          bgColor={AppStyles.colors.accent}
          style={styles.btn}
          textColor={AppStyles.colors.white}
        />
      </View>
    );
  };

  const Silde = ({ item, index }) => {
    const btnBackgroundColor =
      index !== 3 ? AppStyles.colors.button : AppStyles.colors.accent;
    const txtColor =
      index !== 3 ? AppStyles.colors.text : AppStyles.colors.white;
    const label =
      index !== 3 ? translate('btnConttinue') : translate('btnExperience');
    return (
      <>
        {index !== 3 ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ImageBackground source={item.url_bg} style={styles.contentTop}>
              {index !== 3 && (
                <TouchableOpacity
                  onPress={onSkip}
                  style={styles.btnSkip}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                  <Text style={styles.txt_skip}>Bỏ qua</Text>

                  <Image
                    source={images.icons.arrow_skip}
                    style={styles.icon_skip}
                  />
                </TouchableOpacity>
              )}
              <Image
                source={item.url}
                style={item.style_image}
                resizeMode="contain"
              />
            </ImageBackground>

            <ImageBackground
              source={images.jollibee_cirlce_intro}
              style={styles.contentBottom}>
              <View style={styles.txtContentBottom}>
                <Text style={styles.title_content}>{item.title}</Text>

                <Text style={styles.text_content}>{item.content}</Text>
              </View>
            </ImageBackground>
            <ButtonCC.ButtonYellow
              onPress={nextPage(index)}
              label={label}
              width={width * 0.55}
              height={61}
              bgColor={btnBackgroundColor}
              style={styles.btn}
              txtColor={txtColor}
            />
          </View>
        ) : (
          <LastSlide item={item} index={index} />
        )}
      </>
    );
  };

  return (
    <AppIntroSlider
      ref={refAppIntro}
      renderItem={Silde}
      keyExtractor={(_, index) => index + ''}
      onSlideChange={onHandleSlideChange}
      data={slides}
      showDoneButton={false}
      showNextButton={false}
      dotStyle={{
        backgroundColor: '#707070',
      }}
      activeDotStyle={{
        backgroundColor:
          page === slides.length - 1
            ? AppStyles.colors.accent
            : AppStyles.colors.button,
      }}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: height * 0.09,
    shadowColor: '#00000044',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 10,
  },

  btnLast: {
    position: 'absolute',
    bottom: scaleHeight(85),
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
    backgroundColor: AppStyles.colors.background,
    alignItems: 'center',
  },

  containerLastSlide: {
    flex: 1,
    backgroundColor: '#F0810D',
    alignItems: 'center',
    overflow: 'hidden',
  },

  contentBottom: {
    top: scaleHeight(480),
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
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
    marginTop: '15%',
  },
  title_content: {
    fontSize: 24,
    color: AppStyles.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_content: {
    fontSize: scaleWidth(14),
    color: AppStyles.colors.white,
    lineHeight: scaleHeight(30),
    paddingTop: 5,
    textAlign: 'center',
  },
  txt_skip: {
    fontSize: scaleWidth(14),
    color: '#2B2B2B',
    marginRight: scaleWidth(6),
  },
  icon_skip: {
    width: scaleWidth(26),
    height: scaleHeight(26),
    resizeMode: 'contain',
  },
  cricleContainer: {
    width: HEIGHT_CIRCLE,
    height: HEIGHT_CIRCLE,
    borderRadius: HEIGHT_CIRCLE / 2,
    position: 'absolute',
  },
  menuMockupContainer: {
    position: 'absolute',
    right: width * 0.22,
    top: height * 0.24,
    width: 475,
    height: 772,
    transform: [{ rotate: '-10deg' }],
  },
  imgDoubleRow: {
    position: 'absolute',
    left: width * 0.08,
    top: HEIGHT_CIRCLE * 0.25,
  },
  imgRow: {
    position: 'absolute',
    right: width * 0.75,
    top: -15,
  },
  imgHeadIcon: {
    position: 'absolute',
    left: width * 0.5,
    top: height * 0.2,
  },
});

export default WelcomeScreen;
