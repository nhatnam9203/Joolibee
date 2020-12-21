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
  const { data } = route.params;
  const [visible_detal, showDetail] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [language] = useChangeLanguage();
  const onToggleDetail = (newsItem = null) => showDetail(newsItem);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('txtNews').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [language, navigation]);

  const ItemSeperator = () => (
    <View style={{ height: scaleHeight(20), width: '100%' }} />
  );

  const renderItem = ({ item, index }) => {
    return <NewsItem item={item} onPress={() => onToggleDetail(item)} />;
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + ''}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={ItemSeperator}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <PopupWebView
        visible={visible_detal !== null}
        onToggle={() => onToggleDetail()}
        item={visible_detal}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    padding: scaleHeight(10),
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
