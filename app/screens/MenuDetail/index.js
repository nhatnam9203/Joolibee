import React from 'react';
import { TopBarScreenLayout } from '@layouts';
import { TopBarComponent, MenuItem } from '../components';
import { CustomFlatList, CustomButtonImage } from '@components';
import { images, AppStyles } from '@theme';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@localize';

const defaultData = [
  {
    image: images.menu_3,
    title: 'Món Mới',
    id: 1,
  },
  {
    image: images.menu_2,
    title: 'Gà Giòn vui vẻ',
    id: 2,
  },
  {
    image: images.menu_1,
    title: 'gà sốt cay',
    id: 3,
  },
  {
    image: images.menu_4,
    title: 'mỳ ý sốt bò bầm',
    id: 4,
  },
  {
    image: images.menu_5,
    title: 'món tráng miệng',
    id: 5,
  },
  {
    image: images.menu_6,
    title: 'Phần ăn phụ',
    id: 6,
  },
  {
    image: images.menu_7,
    title: 'Burger & cơm',
    id: 7,
  },
];

const MenuDetailScreen = ({}) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  const renderItem = ({ item }) => <MenuItem item={item} />;

  const goToBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  React.useEffect(() => {
    setData(defaultData);
  }, []);

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.addressStyle}>
        <Text style={styles.txtAddressTitleStyle}>
          {translate('txtAddressTo')}
        </Text>
        <Text
          style={styles.txtAddressStyle}
          ellipsizeMode="tail"
          numberOfLines={1}>
          16 Trương Định, P. 6, Q. 3, Tp. Hồ Chí Minh
        </Text>
        <CustomButtonImage
          image={images.icons.ic_edit}
          style={styles.btnEditStyle}
        />
      </View>
      <View style={styles.headerStyle}>
        <Text style={styles.txtHeaderStyle}>Header</Text>
        <CustomButtonImage
          image={images.icons.ic_header_back}
          onPress={goToBack}
          style={styles.btnHeaderStyle}
        />
      </View>
      <View style={styles.container}>
        <CustomFlatList
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },

  contentContainerStyle: { paddingTop: 10, paddingBottom: 10 },

  addressStyle: {
    height: 40,
    backgroundColor: AppStyles.colors.accent,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  txtAddressTitleStyle: {
    color: '#fff',
    ...AppStyles.fonts.medium,
    flex: 0,
  },

  txtAddressStyle: {
    color: '#fff',
    ...AppStyles.fonts.text,
    flex: 1,
  },

  btnEditStyle: {
    marginLeft: 10,
  },

  headerStyle: {
    backgroundColor: '#fff',
    height: 60,
    ...AppStyles.styles.shadow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  txtHeaderStyle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.accent,
    flex: 1,
    textAlign: 'center',
  },

  btnHeaderStyle: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 10,
  },
});

export default MenuDetailScreen;
