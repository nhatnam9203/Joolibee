import { CustomFlatList, CustomTextLink } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';
import { SinglePageLayout } from '@layouts';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SinglePageLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}></View>
      </SafeAreaView>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppStyles.colors.background },
});

export default OrderScreen;
