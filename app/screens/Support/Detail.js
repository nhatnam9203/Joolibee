import { CustomFlatList, CustomImageBackground } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles, metrics } from '@theme';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { scale } from '@utils';
const { scaleHeight } = scale;
const Detail = ({ route }) => {
  const navigation = useNavigation();
  const [guides, setGuides] = React.useState([]);
  const { title } = route.params;
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: title?.toUpperCase(),
    });

    setGuides([
      {
        key: 'key_support',
        step: '1',
        cotent:
          ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        images: [
          { url: images.order_guide_1_1 },
          { url: images.order_guide_1_2 },
        ],
      },
      {
        key: 'key_support',
        step: '2',
        cotent:
          ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        images: [
          { url: images.order_guide_2_1 },
          { url: images.order_guide_2_2 },
        ],
      },
      {
        key: 'key_support',
        step: '3',
        cotent:
          ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        images: [{ url: images.order_guide_3 }],
      },
    ]);
  }, [navigation, title]);
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.txtStep}>
          Bước {item.step}:<Text style={styles.txtCotent}>{item.cotent}</Text>
        </Text>

        <View style={styles.layoutHonrizontal}>
          {item.images.map((image, index) => (
            <Image key={index + ''} source={image.url} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomImageBackground
        style={styles.container}
        source={images.watermark_background_2}>
        <CustomFlatList
          data={guides}
          keyExtractor={(_, index) => index + ''}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Text style={styles.title}>{title?.toUpperCase()}</Text>
          )}
        />
      </CustomImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.padding * 2,
  },
  layoutHonrizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supportContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    ...AppStyles.fonts.title,
    textAlign: 'center',
    fontSize: 24,
    marginTop: scaleHeight(38),
  },
  txtStep: {
    ...AppStyles.fonts.text,
    fontWeight: 'bold',
    marginVertical: scaleHeight(30),
  },
  txtCotent: {
    ...AppStyles.fonts.text,
    fontWeight: 'normal',
    // paddingHorizontal: 30,
  },
  shadowButton: {
    shadowColor: '#00000090',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,

    elevation: 10,
  },
  contentContainerStyle: {
    backgroundColor: '#fff',
  },
});
export default Detail;
