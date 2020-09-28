import { CustomFlatList, CustomTextLink } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem, ButtonCC } from '../components';
import ScreenName from '../ScreenName';

const SupportScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);

  React.useEffect(() => {
    setSettingList([
      {
        key: 'key_support',
        icon: images.icons.ic_jollibee,
        title: translate('txtSettingPoint'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.MySavedPoint);
        },
      },
      {
        key: 'key_guide_order',
        icon: images.icons.ic_notify,
        title: translate('txtSettingNotify'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.HistorySavedPoint);
        },
      },
      {
        key: 'key_guide_save_point',
        icon: images.icons.ic_setting,
        title: translate('txtSetting'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SettingAccount);
        },
      },
      {
        key: 'key_guide_save_reward',
        icon: images.icons.ic_setting,
        title: translate('txtSetting'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SettingAccount);
        },
      },
    ]);
  }, [navigation]);

  const renderItem = ({ item }) => {
    switch (item.key) {
      case 'key_support':
        return (
          <View style={styles.supportContainer}>
            <Text style={AppStyles.fonts.text}>
              {translate('txtSupportCenter')}
            </Text>
            <Text style={styles.phoneStyle}>09757855</Text>
            <ButtonCC.ButtonYellow
              label={translate('txtCallNow')}
              width={166}
              height={58}
            />
          </View>
        );
      default:
        return (
          <SettingItem item={item} key={item.key} onPress={item?.onPress} />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomFlatList
          bounces={false}
          data={settingList}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={AppStyles.styles.rowSeparator} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppStyles.colors.background },

  supportContainer: {
    height: 220,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
  },

  phoneStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: 49,
  },

  contentContainerStyle: {
    backgroundColor: '#fff',
  },
});
export default SupportScreen;
