import { CustomInput, CustomButton } from '@components';
import { SinglePageLayout, PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';

import { Rating } from 'react-native-ratings';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { account, app } from '@slices';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { JollibeeLogo } from "./JollibeeLogo";
import { LabelTitle } from "./LabelTitle";

export const PopupRating = ({ visible, onToggle, orderId = 0 }) => {
  const dispatch = useDispatch();
  const popupRef = React.createRef(null);
  const [content, setContent] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const onChangeText = (content) => {
    setContent(content)
  }

  const ratingCompleted = (number) => {
    setRating(number)
  }

  const onClose = () => {
    popupRef.current.forceQuit();
  }

  const onHandleSubmit = async () => {
    let submitData = {
      orderId,
      rating,
      comment: content
    }
    await dispatch(app.showLoading());
    await dispatch(account.feedBack(submitData, { dispatch }));
    await dispatch(app.hideLoading());
    await onClose();
  }

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>

          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-start', paddingLeft: 15, paddingTop: 15 }} >
            <Image

              source={images.icons.popup_close}
            />
          </TouchableOpacity>

          <JollibeeLogo />
          <LabelTitle label='ĐÁNH GIÁ PHẢN HỒI' color={AppStyles.colors.white} style={{ marginVertical: 10 }} />
          <Text style={[AppStyles.fonts.text, styles.txtContent]}>
            Cảm nhận của bạn về ứng dung Jollibee như thế nào?
          </Text>

          <Rating
            showRating={false}
            onFinishRating={ratingCompleted}
            style={{ paddingTop: 10 }}
            ratingCount={5}
            tintColor={AppStyles.colors.accent}
            imageSize={50}
            ratingColor={AppStyles.colors.button}
          />

          <CustomInput
            style={{ marginVertical: 15 }}
            onChangeText={onChangeText}
            value={content}
            placeholder='Nội dung góp ý của bạn'
            multiline={true}
            style={styles.input}
          />

          <CustomButton
            onPress={onHandleSubmit}
            label='GỬI'
            width={238}
            height={58}
            bgColor={AppStyles.colors.button}
          />

        </SafeAreaView>
      </SinglePageLayout>
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

  input: {
    height: 127,
    alignItems: 'flex-start',
    marginVertical: 20,
    width: '90%'
  },

  txtContent: {
    color: AppStyles.colors.white,
    textAlign: 'center',
    paddingHorizontal: 40
  },



  contentContainerStyle: { paddingBottom: 20 },
});
