import { CustomFlatList, CustomTextLink } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';

const ExampleScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);

  React.useEffect(() => {
    setSettingList([
      {
        key: 'key_point',
        icon: images.icons.ic_jollibee,
        title: translate('txtSettingPoint'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.MySavedPoint);
        },
      },
      {
        key: 'key_notify',
        icon: images.icons.ic_notify,
        title: translate('txtSettingNotify'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.HistorySavedPoint);
        },
      },
      {
        key: 'key_setting',
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
      case 'key_point':
        return (
          <View style={styles.pointContainer}>
            <View style={styles.pointContent}>
              <View style={styles.pointImage}>
                <Image source={images.icons.ic_jollibee} resizeMode="stretch" />
              </View>
              <Text style={styles.txtPoint}>250</Text>
            </View>
            <CustomTextLink
              label={translate('txtMySavedPoint')}
              style={styles.txtPointDesc}
              onPress={() => {}}
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

  pointContainer: {
    height: 154,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  pointContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointImage: {
    backgroundColor: '#E31837',
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  txtPoint: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.text,
    fontSize: 54,
  },

  txtPointDesc: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.accent,
    fontSize: 18,
  },

  contentContainerStyle: {
    backgroundColor: '#fff',
  },
});
export default ExampleScreen;
