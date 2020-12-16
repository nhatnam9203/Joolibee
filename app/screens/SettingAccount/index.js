import { CustomFlatList, CustomImageBackground } from '@components';

import { useChangeLanguage } from '@hooks';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { account } from '@slices';
import { AppStyles, images } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ButtonCC, SettingItem } from '../components';
import { localData } from './localData';
import { useSignInFlow } from '@hooks';

const SettingAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [settingList, setSettingList] = React.useState([]);
  const [language] = useChangeLanguage();
  const [, signOut] = useSignInFlow();

  /**functions */
  const btnLogoutPressed = async () => {
    // logoutFb();
    // await logoutGoogle();

    signOut();
  };

  // LOGOUT BUTTON
  const renderLogoutButton = () => (
    <View style={styles.logoutContent}>
      <ButtonCC.ButtonBorderRed
        width={'80%'}
        height={60}
        label={translate('txtSignOut')}
        onPress={btnLogoutPressed}
      />
    </View>
  );

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: translate('txtSetting') });
    setSettingList(localData(navigation));
  }, [language, navigation]);

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
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
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
