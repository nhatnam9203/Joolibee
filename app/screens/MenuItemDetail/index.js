import { CustomButton, CustomAccordionList } from '@components';
import { translate } from '@localize';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
import { SettingItem } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/account';
import ScreenName from '../ScreenName';
import { useNavigation } from '@react-navigation/native';

const defaultData = [];

const MenuItemDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.imageHeaderStyle}
            source={images.item_detail_thumb}
            resizeMode="center"
          />
          <View style={styles.headerContent}>
            <Text
              style={AppStyles.styles.itemTitle}
              numberOfLines={4}
              ellipsizeMode="tail">
              aa
            </Text>
            <View>
              <Text style={styles.txtFrontDiscountStyle}>160000</Text>
              <Text style={styles.txtPriceStyle}>139000 đ</Text>
              <Text style={styles.txtPointStyle}>(+ 13 điểm)</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <CustomAccordionList />
        </View>
        {/**Close Button */}
        <CustomButton onPress={() => navigation.goBack()} absolute={true}>
          <Image source={images.icons.popup_close} />
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  content: {
    flex: 1,
  },

  header: { backgroundColor: '#FFF', marginTop: 10 },
  headerContent: { paddingHorizontal: 15, flexDirection: 'row' },

  imageHeaderStyle: { width: '100%' },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: 21,
    color: AppStyles.colors.accent,
  },

  txtFrontDiscountStyle: {
    ...AppStyles.fonts.header,
    color: '#707070',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },

  txtPointStyle: {
    ...AppStyles.fonts.medium,
    color: '#707070',
    fontSize: 14,
  },
});
export default MenuItemDetailScreen;
