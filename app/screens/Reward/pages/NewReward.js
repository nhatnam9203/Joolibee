import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatListItemWithImgHorizontal } from '../../components';

const defaultData = [
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 1,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 2,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 3,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 4,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 5,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 6,
  },
  {
    image: images.promotion_list_thumb,
    title: '01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)',
    price: 160000,
    discount: 139000,
    bonusPoint: 14,
    id: 7,
  },
];

export const NewRewardPage = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  const renderItem = ({ item }) => (
    <FlatListItemWithImgHorizontal
      imgStyle={styles.imageStyle}
      contentStyle={styles.itemStyle}
      image={item.image}
      item={item}
      onPress={() => {}}>
      <Text style={styles.txtTitle} numberOfLines={4} ellipsizeMode="tail">
        {item.title}
      </Text>
      <View style={styles.bottomStyle}>
        <Text style={styles.beforePrice}>{item.price}</Text>
        <View style={styles.priceContentStyle}>
          <Text style={styles.pricePay}>{item.discount}</Text>
          <Text style={styles.bonusPoint}>
            {`(+${item.bonusPoint} ${translate('txtPoint')})`}
          </Text>
        </View>
      </View>
    </FlatListItemWithImgHorizontal>
  );

  const goToBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  React.useEffect(() => {
    setData(defaultData);
  }, []);

  return (
    <View style={styles.container}>
      <CustomFlatList
        data={data}
        renderItem={renderItem}
        horizontal={false}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 5 },
  topBar: { flex: 1, backgroundColor: AppStyles.colors.accent },
  txtHeaderStyle: { ...AppStyles.fonts.header, color: AppStyles.colors.white },
  contentContainerStyle: { paddingVertical: 15 },
  itemStyle: { padding: 10 },
  txtTitle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.text,
    fontSize: 15,
    marginBottom: 10,
    flex: 1,
  },

  bottomStyle: {
    flex: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  priceContentStyle: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  beforePrice: {
    ...AppStyles.fonts.header,
    color: '#707070',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },

  pricePay: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.accent,
    fontSize: 16,
    marginBottom: 5,
  },

  bonusPoint: {
    ...AppStyles.fonts.medium,
    color: '#707070',
    fontSize: 12,
    marginBottom: 5,
  },
  imageStyle: { resizeMode: 'center', marginRight: 5 },
});
