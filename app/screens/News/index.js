import { CustomFlatList, CustomImageBackground } from '@components';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChangeLanguage } from '@hooks';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { scale } from '@utils';

import { translate } from '@localize';
import { PopupWebView, NewsItem, TopBarRight } from '../components';
const { scaleWidth, scaleHeight } = scale;

const Index = ({ route }) => {
  const { data, loading, refetch } = route.params;
  const [visible_detal, showDetail] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [language] = useChangeLanguage();
  const onToggleDetail = () => showDetail(!visible_detal);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtNews').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);
  const ItemSeperator = () => <View style={{ height: scaleHeight(14) }} />;

  const renderItem = ({ item, index }) => {
    return <NewsItem item={item} onPress={onToggleDetail} width={388} />;
  };

  const renderItemLoading = () => {
    const flex_start_style = { alignSelf: 'flex-start' };
    return (
      <Placeholder Animation={Fade}>
        <View style={styles.containerLoading}>
          <PlaceholderMedia style={styles.imgLoading} />
          <View style={{ paddingHorizontal: 10 }}>
            <PlaceholderLine height={13} style={flex_start_style} />
            <PlaceholderLine height={13} style={flex_start_style} />
            <PlaceholderLine height={10} width="70%" style={flex_start_style} />
          </View>
        </View>
      </Placeholder>
    );
  };

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.container}>
      <CustomFlatList
        data={loading ? [1, 2, 3, 4, 5] : data}
        renderItem={loading ? renderItemLoading : renderItem}
        keyExtractor={(item, index) => index + ''}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={ItemSeperator}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <PopupWebView visible={visible_detal} onToggle={onToggleDetail} />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    paddingVertical: scaleHeight(20),
    alignItems: 'center',
  },

  containerLoading: {
    backgroundColor: AppStyles.colors.white,
    borderRadius: 16,
    elevation: 10,
    overflow: 'hidden',
    width: scaleWidth(388),
    height: scaleHeight(264),
    alignSelf: 'center',
  },

  imgLoading: {
    width: '100%',
    height: scaleHeight(130),
    marginBottom: 15,
  },
});
export default Index;
