import { CustomFlatList, CustomSwitch } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SettingItem, ButtonCC } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/account';
import { localData } from './localData';
import { useNavigation } from '@react-navigation/native';
import { logoutFb } from '@social';
import { useNavigationFocus } from '@hooks';

const SettingAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [settingList, setSettingList] = React.useState([]);

  useNavigationFocus(() => {
    navigation.setOptions({ headerTitle: translate('txtSetting') });
    setSettingList(localData(navigation));
  });

  /**functions */
  const btnLogoutPressed = React.useCallback(() => {
    logoutFb();
    const action = logout();
    dispatch(action);
  }, [dispatch]);

  // LOGOUT BUTTON
  const renderLogoutButton = () => (
    <View style={styles.logoutContent}>
      <ButtonCC.ButtonBorderRed
        width={350}
        height={60}
        label={translate('txtSignOut')}
        onPress={btnLogoutPressed}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/**List Item Setting */}
        <View style={styles.content}>
          <CustomFlatList
            bounces={false}
            data={settingList}
            renderItem={({ item }) => (
              <SettingItem
                item={item}
                key={item.key}
                onPress={item?.onPress}
                buttonComponent={item.buttonComponent}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={AppStyles.styles.rowSeparator} />
            )}
            contentContainerStyle={styles.contentContainer}
            ListFooterComponent={renderLogoutButton}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
  },

  //list styles
  contentContainer: {
    backgroundColor: '#fff',
  },

  logoutContent: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SettingAccountScreen;
