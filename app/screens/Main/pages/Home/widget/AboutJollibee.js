import React from 'react';
import {
  StyleSheet,
  View,
  Image,

} from 'react-native';
import { Text } from 'react-native-paper';
import { AppStyles, images } from '@theme';
import { CustomButton } from '@components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

const index = () => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          AppStyles.fonts.title,
          { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
        ]}>
        Jollibee Việt Nam
        </Text>

      <Text
        style={[
          AppStyles.fonts.mini,
          styles.txtContent
        ]}>
        Cửa hàng Jollibee đầu tiên được mở tại Việt Nam vào năm
        2005. Kể từ đó, Jollibee đã nỗ lực hết mình để mang đến
        các gia đình Việt những phần ăn ngon miệng với mức giá
        hợp lý.
        </Text>

      <CustomButton
        onPress={() => alert('ads')}
        label={'XEM THÊM'}
        width={134}
        height={43}
        bgColor={AppStyles.colors.accent}
        textColor={AppStyles.colors.white}
      />

      <View style={styles.contentImage}>
        <Image
          source={images.jollibee_like}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppStyles.colors.button,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  contentImage: {
    alignItems: 'center',
    paddingTop: 20
  },
  txtContent: {
    fontSize: 14,
    marginVertical: 15,
    lineHeight: 20
  },
});

export default index;
