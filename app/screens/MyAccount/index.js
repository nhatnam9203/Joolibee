import { CustomButton } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';

const MyAccountScreen = () => {
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
        key: 'key_promotion',
        icon: images.icons.ic_promotion,
        title: translate('txtSettingPromotion'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.Reward);
        },
      },
      {
        key: 'key_order_list',
        icon: images.icons.ic_order_list,
        title: translate('txtSettingOrderList'),
        isArrow: true,
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
        key: 'key_address',
        icon: images.icons.ic_address,
        title: translate('txtSettingAddress'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.MyAddress);
        },
      },
      {
        key: 'key_support',
        icon: images.icons.ic_support,
        title: translate('txtSettingSupport'),
        isArrow: true,
        onPress: () => {
          navigation.navigate(ScreenName.Support);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/**Edit Profile */}
        <View style={styles.headerStyle}>
          <View style={styles.profileStyle}>
            <Avatar.Text
              size={114}
              label="NT"
              color={'blue'}
              style={styles.avatarStyle}
            />

            <Text style={styles.nameStyle}>{'TRAN HOANG NHA'}</Text>
            <Text
              style={styles.editTextStyle}
              onPress={() => {
                navigation.navigate(ScreenName.EditAccount);
              }}>
              {translate('txtEditAccount')}
            </Text>
          </View>

          {/**Close Button */}
          <CustomButton onPress={() => navigation.goBack()} absolute={true}>
            <Image source={images.icons.popup_close} />
          </CustomButton>
        </View>

        {/**List Item Setting */}
        <View style={styles.content}>
          <FlatList
            bounces={false}
            data={settingList}
            renderItem={({ item }) => (
              <SettingItem item={item} key={item.key} onPress={item?.onPress} />
            )}
            ItemSeparatorComponent={() => (
              <View style={AppStyles.styles.rowSeparator} />
            )}
            contentContainerStyle={styles.contentContainer}
          />
        </View>

        {/**Version */}
        <Text style={styles.versionTextStyle}>
          {'Version ' + DeviceInfo.getVersion()}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.accent,
  },

  content: {
    flex: 1,
  },

  headerStyle: { padding: metrics.padding, flex: 0 },

  // profile styles
  profileStyle: {
    width: '100%',
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  avatarStyle: {
    backgroundColor: 'grey',
    borderWidth: 4,
    borderColor: '#fff',
    margin: metrics.margin,
  },

  nameStyle: {
    padding: metrics.padding,
    fontSize: 24,
    fontFamily: 'SVN-Merge',
    fontWeight: 'bold',
    color: '#fff',
  },

  editTextStyle: {
    padding: metrics.padding,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 14,
  },

  //list styles
  contentContainer: {
    backgroundColor: '#fff',
  },

  // version style
  versionTextStyle: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'center',
    padding: metrics.padding,
  },
});
export default MyAccountScreen;
