import { CustomButton } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { SettingItem } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/account';

const SettingAccountScreen = () => {
  const dispatch = useDispatch();
  const [settingList, setSettingList] = React.useState([]);

  /**functions */
  const btnLogoutPressed = React.useCallback(() => {
    const action = logout();
    dispatch(action);
  }, [dispatch]);

  // LOGOUT BUTTON
  const renderLogoutButton = () => (
    <View style={styles.logoutContent}>
      <CustomButton
        width={350}
        height={60}
        label={translate('txtSignOut')}
        borderColor={AppStyles.colors.accent}
        textColor={AppStyles.colors.accent}
        onPress={btnLogoutPressed}
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
              <View style={AppStyles.styles.rowSeparator} />
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
export default SettingAccountScreen;
