import { CustomButton, CustomAccordionList } from '@components';
import { translate } from '@localize';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { SettingItem, MenuDetailItem } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/account';
import ScreenName from '../ScreenName';
import { useNavigation } from '@react-navigation/native';

const defaultData = [
  {
    title: 'abc con de',
    data: [
      { title: 'nonoo', image: images.menu_detail_item_pepsi },
      { title: 'nonoo', image: images.menu_detail_item_nuocsuoi },
    ],
  },
  {
    title: 'abc con tete',
    data: [
      { title: 'okoko', image: images.menu_detail_item_pepsi },
      { title: 'okokok', image: images.menu_detail_item_nuocsuoi },
    ],
  },
];

const MenuItemDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = (item, index) => {
    return <MenuDetailItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
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
            {defaultData.map(({ title, data }, index) => (
              <CustomAccordionList
                title={title}
                data={data}
                key={`${index}`}
                headerTextStyle={styles.listHeaderTextStyle}
                headerStyle={styles.listHeaderStyle}
                renderItem={renderItem}
              />
            ))}
          </View>
        </ScrollView>
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

  listHeaderTextStyle: {
    ...AppStyles.fonts.header,
    fontSize: 18,
  },

  listHeaderStyle: {
    backgroundColor: '#FFC522',
    height: 64,
  },
});
export default MenuItemDetailScreen;
