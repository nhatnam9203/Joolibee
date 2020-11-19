import { CustomFlatList, CustomImageBackground } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem, ButtonCC } from '../components';
import ScreenName from '../ScreenName';
import { scale, makeAPhoneCall } from '@utils';
const { scaleHeight, scaleWidth } = scale;
const SupportScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);
  const onCall = () => makeAPhoneCall.makeAPhoneCall('19001533');
  React.useEffect(() => {
    setSettingList([
      {
        key: 'key_support',
        title: '',
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.MySavedPoint);
        },
      },
      {
        key: 'key_guide_order',

        title: translate('txtOrderGuide'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SupportDetail, {
            title: translate('txtOrderGuide'),
          });
        },
      },
      {
        key: 'key_guide_save_point',

        title: translate('txtUseVoucherGuide'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SupportDetail, {
            title: translate('txtUseVoucherGuide'),
          });
        },
      },
      {
        key: 'key_guide_save_reward',
        title: translate('txtPointAccumulateGuide'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.SupportDetail, {
            title: translate('txtPointAccumulateGuide'),
          });
        },
      },
    ]);
  }, [navigation]);

  const renderItem = ({ item }) => {
    switch (item.key) {
      case 'key_support':
        return (
          <View style={styles.supportContainer}>
            <Image source={images.icons.ic_call_now} />
            <Text style={styles.phoneStyle}>1900 1533</Text>
            <ButtonCC.ButtonYellow
              onPress={onCall}
              label={translate('txtCallNow')}
              width={scaleWidth(159)}
              height={scaleHeight(61)}
              style={styles.shadowButton}
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
      <CustomImageBackground
        style={styles.container}
        source={images.watermark_background_2}>
        <CustomFlatList
          bounces={false}
          data={settingList}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={AppStyles.styles.rowSeparator} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </CustomImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  supportContainer: {
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
  shadowButton: {
    shadowColor: '#00000090',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,

    elevation: 10,
  },
  contentContainerStyle: {
    backgroundColor: '#fff',
  },
});
export default SupportScreen;
