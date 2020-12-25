import { CustomFlatList, CustomImageBackground } from '@components';
import { GEX } from '@graphql';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { app } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  ButtonCC,
  JollibeeImage,
  TopBarRight,
  PopupWebView,
} from '../components';
import ScreenName from '../ScreenName';

const { scaleHeight, scaleWidth } = scale;
const defaultData = [];

const PromotionPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [promotionList, getPromotionList] = GEX.usePromotionList();
  const [showWebview, setShowWebview] = React.useState(null);

  const goToPromotionList = () => {
    navigation.navigate(ScreenName.PromotionList);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('tabPromotion').toUpperCase(),
      headerRight: () => <TopBarRight />,
    });
  }, [navigation]);

  React.useEffect(() => {
    getPromotionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContentStyle}
      onPress={() => {
        setShowWebview(item?.url);
      }}>
      {!!item?.image && (
        <JollibeeImage
          url={item?.image}
          width="100%"
          height={scaleHeight(116)}
          resizeMode="contain"
        />
      )}
      <View style={[AppStyles.styles.horizontalLayout, styles.bottomStyle]}>
        <Text style={styles.itemTitle} numberOfLines={3} ellipsizeMode="tail">
          {item.title}
        </Text>

        <ButtonCC.ButtonRed
          label={translate('txtBuyNow')}
          width={scaleWidth(129)}
          height={scaleHeight(50)}
          onPress={() => {
            if (item?.product_sku) {
              navigation.navigate(ScreenName.MenuItemDetail, {
                sku: item?.product_sku,
              });
            }
          }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>
      {translate('txtEmptyPromotionList')}
    </Text>
  );

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <CustomFlatList
        data={promotionList}
        renderItem={renderItem}
        horizontal={false}
        keyExtractor={(item, index) => index + ''}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />

      <PopupWebView
        visible={showWebview !== null}
        onToggle={() => {
          setShowWebview(null);
        }}
        url={showWebview}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { paddingVertical: 15, paddingHorizontal: 5 },
  itemTitle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.text,
    fontSize: 18,
    marginRight: scaleWidth(10),
    flex: 1,
  },

  itemContentStyle: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(10),
    marginVertical: scaleWidth(10),
    minHeight: scaleHeight(200),
    ...AppStyles.styles.shadow,
    overflow: 'hidden',
  },

  bottomStyle: {
    paddingHorizontal: scaleWidth(10),
  },
});

export default PromotionPage;
