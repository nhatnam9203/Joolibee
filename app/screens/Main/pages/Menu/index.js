import React from 'react';
import { TopBarScreenLayout } from '@layouts';
import { TopBarComponent, MenuItem } from '../../../components';
import { images } from '@theme';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../../ScreenName';
import { QCC } from '@graphql';

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

const MenuPage = () => {
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);

  const goToMenuDetail = () => {
    navigation.navigate(ScreenName.MenuDetail);
  };

  const renderItem = ({ item }) => (
    <MenuItem item={item} onPress={goToMenuDetail} />
  );

  React.useEffect(() => {
    setData(defaultData);
  }, []);

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.container}>
        <QCC.QueryMenuList renderItem={renderItem} />
      </View>
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },
  contentContainerStyle: { paddingVertical: 15 },
});

export default MenuPage;
