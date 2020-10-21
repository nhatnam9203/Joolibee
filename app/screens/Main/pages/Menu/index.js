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

const MenuPage = () => {
  const navigation = useNavigation();

  const goToMenuDetail = (menuItem) => {
    navigation.navigate(ScreenName.MenuDetail, { menuItem });
  };

  const renderItem = ({ item }) => (
    <MenuItem item={item} onPress={() => goToMenuDetail(item)} />
  );

  const renderLoading = ({ item }) => <MenuItemLoading />;

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.container}>
        <GCC.QueryMenuList
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
