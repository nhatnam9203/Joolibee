import { GCC } from '@graphql';
import { useChangeLanguage } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  MenuItem,
  MenuItemLoading,
  TopBarLeft,
  TopBarRight,
} from '../components';
import ScreenName from '../ScreenName';

const { QueryMenuList } = GCC;

const MenuScreen = () => {
  const navigation = useNavigation();
  const [language] = useChangeLanguage();

  React.useEffect(() => {
    navigation.setOptions({
      //   headerTitle: translate('txtMenu'),
      headerRight: () => <TopBarRight />,
      headerLeft: () => <TopBarLeft />,
    });
  }, [language, navigation]);

  const goToMenuDetail = (menuItem) => {
    navigation.navigate(ScreenName.MenuDetail, { menuItem });
  };

  const renderItem = ({ item }) => (
    <MenuItem
      key={item.id.toString()}
      item={item}
      onPress={() => goToMenuDetail(item)}
    />
  );

  const renderLoading = ({ item }) => (
    <MenuItemLoading key={item.id.toString()} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <QueryMenuList
          renderItem={renderItem}
          renderItemLoading={renderLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },
  contentContainerStyle: { paddingVertical: 15 },
});

export default MenuScreen;
