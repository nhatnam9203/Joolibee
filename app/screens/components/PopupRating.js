import { CustomInput, CustomButton, Loading } from '@components';
import { PopupLayout, AppScrollViewIOSBounceColorsWrapper } from '@layouts';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import { translate } from '@localize';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { GEX } from '@graphql';
import { JollibeeLogo } from './JollibeeLogo';
import { LabelTitle } from './LabelTitle';
import { CustomRaiting } from './CustomRaiting';
const { width, height } = Dimensions.get('window');
const { scaleWidth, scaleHeight } = scale;

const BANNER_PADDING = height * 0.12;

export const PopupRating = ({ visible, onToggle, orderId = 0 }) => {
  const popupRef = React.createRef(null);
  const [content, setContent] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const headerHeight = useHeaderHeight();

  const onClose = () => {
    popupRef.current.forceQuit();
  };
  const { feedBackCustomer, feedBackResp } = GEX.useFeebackCustomer();
  const onChangeText = (content) => {
    setContent(content);
  };

  const ratingCompleted = (number) => {
    setRating(number);
  };
  React.useEffect(() => {
    if (feedBackResp?.data?.feedBackCustomer?.result) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedBackResp]);

  const onHandleSubmit = () => {
    let submitData = {
      orderId,
      customerRating: rating,
      customerComment: content,
    };
    feedBackCustomer(submitData);
  };

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <AppScrollViewIOSBounceColorsWrapper
        topBounceColor={AppStyles.colors.accent}
        bottomBounceColor="transparent"
        style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeContainer}>
            <Image source={images.icons.popup_close} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <JollibeeLogo style={styles.logoStyle} />
            <LabelTitle
              label={translate('txtReviewFeeback').toUpperCase()}
              color={AppStyles.colors.white}
              style={{ marginVertical: 10 }}
              fontSize={scaleWidth(28)}
            />
          </View>

          <View style={[styles.wrapperContainerLayoutYellow]}>
            <View style={[styles.topContainer, { height: BANNER_PADDING }]} />

            <View style={{ height: height - BANNER_PADDING - headerHeight }}>
              {/* --------- Yellow Background ------------ */}
              <Image
                source={images.jollibee_background_new_home}
                style={styles.imgLayoutYellow}
                resizeMethod="resize"
              />
              {/* --------- Yellow Background ------------ */}
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.txtContent}>
              {translate('txtReviewYourOrder')}
            </Text>
            <CustomRaiting onPress={ratingCompleted} />

            <CustomInput
              onChangeText={onChangeText}
              value={content}
              placeholder={translate('txtInputFeeback')}
              multiline={true}
              style={styles.input}
              border
            />

            <CustomButton
              onPress={onHandleSubmit}
              label={translate('txtSubmit')}
              width={229}
              height={61}
              disabled={rating > 0 ? false : true}
              bgColor={AppStyles.colors.accent}
              textColor={AppStyles.colors.white}
            />
          </View>
        </SafeAreaView>
      </AppScrollViewIOSBounceColorsWrapper>
      <Loading isLoading={feedBackResp?.loading} />
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    backgroundColor: AppStyles.colors.accent,
  },

  cardContainer: {
    width: scaleWidth(390),
    height: scaleHeight(538),
    backgroundColor: AppStyles.colors.white,
    position: 'absolute',
    bottom: scaleHeight(70),
    alignItems: 'center',
    borderRadius: 32,
  },

  safeContainer: { flex: 1, alignItems: 'center' },

  input: {
    height: scaleHeight(119),
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: scaleHeight(24),
  },

  txtContent: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: scaleWidth(21),
    textAlign: 'center',
    paddingTop: scaleHeight(40),
    paddingHorizontal: scaleHeight(40),
  },

  closeContainer: {
    position: 'absolute',
    left: 15,
    top: scaleHeight(51),
  },
  imgLayoutYellow: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  wrapperContainerLayoutYellow: {
    backgroundColor: AppStyles.colors.accent,
    flex: 0,
  },
  topContainer: {
    width,
    backgroundColor: AppStyles.colors.accent,
  },
  logoStyle: {
    width: scaleWidth(151),
    height: scaleHeight(148),
    resizeMode: 'contain',
  },
  logoContainer: { marginTop: 10, alignItems: 'center' },
  contentContainerStyle: { paddingBottom: 20 },
});
