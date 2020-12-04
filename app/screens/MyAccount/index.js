import { useQuery } from '@apollo/client';
import { CustomButton } from '@components';
import { query } from '@graphql';
import { useChangeLanguage } from '@hooks';
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
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Avatar } from 'react-native-paper';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';
import { localData } from './localData';
import { GEX } from '@graphql';

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [settingList, setSettingList] = React.useState([]);
  const [language] = useChangeLanguage();

  const [customerInfo, getCustomerInfo] = GEX.useCustomer();

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: translate('txtSetting') });
    setSettingList(localData(navigation));
  }, [language, navigation]);

  const buttonComponent = () => {
    return (
      <View style={styles.pointContainer}>
        <Text>
          {customerInfo?.customer_point ?? 0} {translate('txtPoint')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/**Edit Profile */}
        <View style={styles.headerStyle}>
          <View style={styles.profileStyle}>
            <Avatar.Image
              size={114}
              source={images.icons.jollibee_avatar}
              style={styles.avatarStyle}
            />

            {customerInfo && (
              <Text style={styles.nameStyle}>
                {customerInfo?.firstname + ' ' + customerInfo?.lastname}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenName.EditAccount);
              }}
              style={styles.editStyle}>
              <Text style={styles.editTextStyle}>
                {translate('txtEditAccount')}
              </Text>
              <Image source={images.icons.ic_arrow_right_white} />
            </TouchableOpacity>
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
            renderItem={({ item, index }) => (
              <SettingItem
                item={item}
                key={item.key}
                onPress={item?.onPress}
                buttonComponent={index === 0 && buttonComponent}
              />
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
    paddingRight: 5,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 14,
  },
  editStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingBottom: metrics.padding * 2,
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
  pointContainer: {
    paddingHorizontal: metrics.padding,
    paddingVertical: 6,
    backgroundColor: AppStyles.colors.button,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MyAccountScreen;
