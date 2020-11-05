import { CustomFlatList, CustomButton, CustomHTML } from '@components';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, View, Text, Image, RefreshControl } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { scale } from '@utils';
import { PopupWebView } from '../components';

const { scaleWidth, scaleHeight } = scale;
// const defaultData = [
//     {
//         title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
//         content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
//         url: images['jollibee_news']
//     },
//     {
//         title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
//         content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
//         url: images['jollibee_news']
//     },
//     {
//         title: 'KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA JOLLIBEE',
//         content: 'Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An và nhận được...',
//         url: images['jollibee_news']
//     },

// ];

const Index = ({ route }) => {
  const { data, loading, refetch } = route.params;
  const [visible_detal, showDetail] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onToggleDetail = () => showDetail(!visible_detal);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const ItemSeperator = () => <View style={{ height: scaleHeight(70) }} />;

  const renderItem = ({ item, index }) => {
    const { title, featured_image, short_content } = item || {};
    return (
      <View key={index + ''} style={styles.containerItem}>
        <Image source={images['jollibee_news']} style={styles.imgProduct} />

        <View style={styles.content}>
          <Text style={styles.txttitle}>{title}</Text>

          <CustomHTML
            html={short_content}
            renderers={{
              div: (...props) => {
                return (
                  <Text
                    key={props[3].key}
                    style={styles.txtContent}
                    numberOfLines={3}>
                    {props[3]?.rawChildren[0].data}
                  </Text>
                );
              },
            }}
          />
        </View>

        <CustomButton
          onPress={onToggleDetail}
          label={'XEM THÊM'}
          width={134}
          height={43}
          bgColor={AppStyles.colors.button}
          style={styles.btn}
        />
      </View>
    );
  };

  const renderItemLoading = () => {
    const flex_start_style = { alignSelf: 'flex-start' };
    const loadingContainer = {
      paddingHorizontal: 15,
      height: scaleHeight(320),
    };
    return (
      <Placeholder Animation={Fade}>
        <View style={[styles.containerItem, loadingContainer]}>
          <View style={styles.imgLoading}>
            <PlaceholderMedia style={styles.imgProductLoading} />
          </View>
          <PlaceholderLine height={15} />
          <PlaceholderLine height={10} style={flex_start_style} />
          <PlaceholderLine height={10} width="70%" style={flex_start_style} />
          <PlaceholderLine height={10} width="70%" style={flex_start_style} />
          <PlaceholderLine height={40} width={35} style={styles.btn} />
        </View>
      </Placeholder>
    );
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppStyles.colors.background },
  contentContainerStyle: { paddingVertical: 70, paddingHorizontal: 10 },

  containerItem: {
    width: '100%',
    height: scaleHeight(370),
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    ...AppStyles.styles.shadow,
  },

  content: {
    paddingHorizontal: scaleWidth(10),
    top: scaleHeight(-20),
  },
  imgProduct: {
    width: scaleWidth(281),
    height: scaleHeight(174),
    resizeMode: 'stretch',
    top: scaleHeight(-40),
    zIndex: 100000,
  },

  imgProductLoading: {
    width: scaleWidth(281),
    height: scaleHeight(174),
    // resizeMode: 'center',
    top: scaleHeight(-60),
    position: 'absolute',
    zIndex: 100000,
  },

  btn: {
    alignSelf: 'flex-start',
    marginTop: scaleHeight(10),
  },
  txtContent: {
    color: AppStyles.colors.text,
    textAlign: 'left',
    fontSize: scaleWidth(14),
    ...AppStyles.fonts.text,
  },
  txttitle: {
    color: AppStyles.colors.text,
    fontSize: scaleWidth(16),
    textAlign: 'center',
    ...AppStyles.fonts.medium_SVN,
  },
  imgLoading: {
    width: scaleWidth(281),
    height: scaleHeight(130),
  },
});
export default Index;
