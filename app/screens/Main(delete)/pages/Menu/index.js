import React from 'react';
import { TopBarScreenLayout } from '@layouts';
import {
  TopBarComponent,
  MenuItem,
  MenuItemLoading,
} from '../../../components';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../../ScreenName';
import { GCC } from '@graphql';

const { QueryMenuList } = GCC;

const MenuPage = () => {
  const navigation = useNavigation();

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
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.container}>
        <QueryMenuList
          renderItem={renderItem}
          renderItemLoading={renderLoading}
        />
      </View>
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },
  contentContainerStyle: { paddingVertical: 15 },
});

export default MenuPage;
