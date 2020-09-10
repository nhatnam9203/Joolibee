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

const MyAccountPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          <FlatList />
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
