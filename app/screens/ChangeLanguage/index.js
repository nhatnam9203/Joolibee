import { CustomFlatList } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonCC } from '../components';
import { changeLanguage } from '@slices/setting';
import { showLoading, hideLoading } from '@slices/app';
import { localizeData } from '@localize';

const ChangeLanguageScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const settingLanguage = useSelector((state) => state.setting.language);
  const [languageList, setLanguageList] = React.useState([]);
  const [selected, setSelected] = React.useState();

  const renderItem = ({ item }) =>
    item?.flag ? (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelected(item.key);
        }}>
        <View style={styles.icon}>
          <Image source={item.flag} resizeMode="cover" />
        </View>

        <View style={styles.itemContent}>
          <Text style={styles.itemNameStyle}>{item.text}</Text>
        </View>
        <Image
          style={styles.arrowStyle}
          source={
            selected === item.key
              ? images.icons.ic_radio_active
              : images.icons.ic_radio_inactive
          }
        />
      </TouchableOpacity>
    ) : (
      []
    );

  const submitButtonPressed = async () => {
    await dispatch(changeLanguage(selected));
    navigation.setOptions({ headerTitle: translate('txtChangeLanguage') });

    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
      navigation.goBack();
    }, 1500);
  };

  React.useEffect(() => {
    setLanguageList(localizeData);
  }, []);

  React.useEffect(() => {
    setSelected(settingLanguage);
  }, [settingLanguage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/**List Item Setting */}
        <View style={styles.content}>
          <CustomFlatList
            bounces={false}
            data={languageList}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
        <View style={styles.confirmStyle}>
          <ButtonCC.ButtonYellow
            label={translate('txtConfirm')}
            onPress={submitButtonPressed}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
  },

  itemContainer: {
    backgroundColor: '#fff',
    height: 64,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: metrics.padding,
    margin: 15,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },

  icon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.margin,
  },

  itemContent: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: metrics.margin,
  },

  itemNameStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#1B1B1B',
  },

  content: {
    flex: 1,
  },

  //list styles
  contentContainer: {},

  confirmStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowStyle: { height: '100%', width: 50, resizeMode: 'center' },
});
export default ChangeLanguageScreen;
