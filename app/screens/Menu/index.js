import { CustomImageBackground } from '@components';
import { GCC } from '@graphql';
import { useChangeLanguage } from '@hooks';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuItem, MenuItemLoading, TopBarRight } from '../components';
import ScreenName from '../ScreenName';

const { QueryMenuList } = GCC;

const COLORS_PALLETS = ['#FFC522', '#F1DDC5'];
const COLD_COLOR_PALLETS = ['#0A8D87', '#3FB4C3'];
const HOT_COLOR_PALLETS = ['#F0810D', '#E31837'];

const getLayoutColor = ({ item, index = 0 }) => {
  let backgroundColor;
  let txtColor = 'white';

  switch (index) {
    case 0:
      backgroundColor = HOT_COLOR_PALLETS[index];
      break;
    case 1:
      backgroundColor = HOT_COLOR_PALLETS[index];

      break;

    default:
      if (item?.id === 9) {
        backgroundColor = COLD_COLOR_PALLETS[1];
        break;
      }

      // Mi Y
      if (item?.id === 6) {
        backgroundColor = COLORS_PALLETS[1];
        txtColor = 'black';
        break;
      }

      if (item?.id === 7) {
        backgroundColor = HOT_COLOR_PALLETS[0];
        break;
      }

      // ga gion vui ve
      if (item?.id === 3) {
        backgroundColor = HOT_COLOR_PALLETS[1];
        break;
      }

      backgroundColor = COLORS_PALLETS[index % COLORS_PALLETS.length];
      txtColor = 'black';

      break;
  }

  return Object.create({ background: backgroundColor, textColor: txtColor });
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const [language] = useChangeLanguage();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtMenu').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);

  const goToMenuDetail = (menuItem) => {
    navigation.navigate(ScreenName.MenuDetail, { menuItem });
  };

  const renderItem = (object) => {
    const { item } = object;

    return (
      <MenuItem
        color={getLayoutColor(object)}
        key={item.id.toString()}
        item={item}
        onPress={() => goToMenuDetail(item)}
      />
    );
  };

  const renderLoading = ({ item }) => (
    <MenuItemLoading key={item.id.toString()} />
  );

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.background}>
      <View style={styles.container}>
        <QueryMenuList
          renderItem={renderItem}
          renderItemLoading={renderLoading}
        />
      </View>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: { flex: 1, backgroundColor: 'transparent' },
});

export default MenuScreen;
