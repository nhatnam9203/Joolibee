import { CustomFlatList, Loading } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem } from '../components';
import ScreenName from '../ScreenName';
import { GEX, GQL } from '@graphql';
import { useMutation } from '@apollo/client';
import { NotificationItem } from './wiget';
import { account } from '@slices';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [markReadCustomerNotification] = useMutation(GQL.READ_CUSTOMER_NOTIFY, {
    errorPolicy: 'ignore',
  });
  const [
    { notifyList, loading, refreshing },
    getNotifyList,
  ] = GEX.useGetNotifyList();

  React.useEffect(() => {
    getNotifyList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    getNotifyList();
  };

  const handleItemOnPress = (item) => {
    markReadCustomerNotification({ variables: { id: item?.id } });
    dispatch(account.updateNotify(item));
  };

  const renderItem = ({ item, index }) => (
    <NotificationItem item={item} index={index} onPress={handleItemOnPress} />
  );

  const renderEmptyList = () => (
    <View style={styles.container}>
      <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>
        {translate('txtEmptyNotifyList')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={notifyList}
        renderItem={renderItem}
        horizontal={false}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyList}
        // ListFooterComponent={() => (
        //   <CustomButton onPress={handleFreshMore} width="90%" label="Load more" />
        // )}
      />

      <Loading isLoading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    paddingTop: 10,
  },
});
export default NotificationScreen;
