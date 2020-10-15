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
import { QCC } from '@graphql';

const MenuPage = () => {
  const navigation = useNavigation();

  const goToMenuDetail = () => {
    navigation.navigate(ScreenName.MenuDetail);
  };

  const renderItem = ({ item }) => (
    <MenuItem item={item} onPress={goToMenuDetail} />
  );

  const renderLoading = ({ item }) => <MenuItemLoading />;

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
      <View style={styles.container}>
        <QCC.QueryMenuList
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
