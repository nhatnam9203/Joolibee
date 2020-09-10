import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem } from '../../components';
import { CustomButton } from '@components';

const SettingAccountPage = () => {
  const [settingList, setSettingList] = React.useState([]);

  const renderLogoutButton = () => (
    <View style={styles.logoutContent}>
      <CustomButton
        width={350}
        height={60}
        label={translate('txtLogout')}
        borderColor={AppStyles.colors.accent}
        textColor={AppStyles.colors.accent}
      />
    </View>
  );

  React.useEffect(() => {
    setSettingList([
      {
        key: 'key_point',
        // icon: images.icons.ic_jollibee,
        title: translate('txtSettingPoint'),
        isArrow: false,
      },
      {
        key: 'key_promotion',
        // icon: images.icons.ic_promotion,
        title: translate('txtSettingPromotion'),
        isArrow: true,
      },
      {
        key: 'key_order_list',
        // icon: images.icons.ic_order_list,
        title: translate('txtSettingOrderList'),
        isArrow: true,
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
            ListFooterComponent={renderLogoutButton}
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
export default SettingAccountPage;
