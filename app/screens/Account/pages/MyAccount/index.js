import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppStyles, metrics, images } from '@theme';
import { Avatar } from 'react-native-paper';
import { CustomButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@localize';
import { SettingItem } from '../../components';

const MyAccountPage = () => {
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
      },
      {
        key: 'key_promotion',
        icon: images.icons.ic_promotion,
        title: translate('txtSettingPromotion'),
        isArrow: true,
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
      },
      {
        key: 'key_address',
        icon: images.icons.ic_address,
        title: translate('txtSettingAddress'),
        isArrow: true,
      },
      {
        key: 'key_support',
        icon: images.icons.ic_support,
        title: translate('txtSettingSupport'),
        isArrow: true,
      },
      {
        key: 'key_setting',
        icon: images.icons.ic_setting,
        title: translate('txtSetting'),
        isArrow: true,
      },
    ]);
  }, []);

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
                navigation.goBack();
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
              <SettingItem item={item} key={item.key} />
            )}
            ItemSeparatorComponent={() => (
              <View style={AppStyles.styles.horizontalSeparator} />
            )}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
        {/**Version */}
        <Text style={styles.versionTextStyle}>{'Version 1.0.0'}</Text>
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
export default MyAccountPage;
