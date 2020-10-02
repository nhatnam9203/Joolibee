import React from 'react';
import { TopBarScreenLayout } from '@layouts';
import {
  FlatListItemWithImgHorizontal,
  ButtonCC,
  TopBarComponent,
} from '../../../components';
import { CustomFlatList } from '@components';
import { images, AppStyles } from '@theme';
import { StyleSheet, View, Text } from 'react-native';
import ScreenName from '../../../ScreenName';
import { useNavigation } from '@react-navigation/native';
import { translate } from '@localize';
import { useDispatch } from 'react-redux';
import { showComingSoon } from '@slices/app';

const defaultData = [
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 1,
  },
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 2,
  },
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 3,
  },
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 4,
  },
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 5,
  },
  {
    image: images.promotion_thumb,
    title: 'Combo 2 lựa chọn 139K siêu ngon, siêu ưu đãi',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 6,
  },
  {
    image: images.promotion_thumb,
    title: 'Món Mới',
    description: 'Chỉ với 39k bạn có 2 sự lựa chọn cho bữa ăn của mình',
    id: 7,
  },
];

const PromotionPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);

  const goToPromotionList = () => {
    navigation.navigate(ScreenName.PromotionList);
  };

  const renderItem = ({ item }) => (
    <FlatListItemWithImgHorizontal
      image={item.image}
      item={item}
      onPress={goToPromotionList}
      contentStyle={styles.itemContentStyle}
      imgHeight="100%">
      <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.itemDesc} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </Text>
      <ButtonCC.ButtonYellow
        label={translate('txtBuyNow')}
        width={110}
        height={33}
        onPress={() => {
          dispatch(showComingSoon());
        }}
      />
    </FlatListItemWithImgHorizontal>
  );

  React.useEffect(() => {
    setData(defaultData);
  }, []);

  return (
    <TopBarScreenLayout topBar={<TopBarComponent />}>
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
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { paddingVertical: 15, paddingHorizontal: 5 },
  itemTitle: {
    ...AppStyles.fonts.header,
    color: AppStyles.colors.accent,
    marginBottom: 5,
    fontSize: 18,
  },
  itemDesc: { ...AppStyles.fonts.text, fontSize: 14 },
  itemContentStyle: {
    padding: 10,
  },
});

export default PromotionPage;
