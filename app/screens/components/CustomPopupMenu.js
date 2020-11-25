import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';

import { AppStyles, images, metrics } from '@theme';

const ANIMATION_TIME = 350;
const CustomPopupMenu = ({
  visible,
  value,
  menus = [],
  placeHolders = '',
  openMenu,
  closeMenu,
  onChangeItem,
}) => {
  const [layout, setLayout] = React.useState({});

  const setOnLayout = React.useCallback(
    (i) => {
      if (i.nativeEvent) setLayout(i.nativeEvent.layout);
    },
    [visible],
  );

  const onHandleChangeItem = React.useCallback(
    (item) => () => {
      onChangeItem(item);
      closeMenu();
    },
    [visible],
  );

  const renderItem = (item, index) => (
    <TouchableOpacity
      onPress={onHandleChangeItem(item)}
      key={index + ''}
      style={styles.itemContainer}>
      <Text style={AppStyles.fonts.text}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        onLayout={setOnLayout}
        onPress={openMenu}
        style={styles.btnContainer}>
        <Text style={[AppStyles.fonts.text]}>
          {value ? value : placeHolders}
        </Text>

        <Image source={images.icons.ic_dropdown} />
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        visible={visible}
        onBackdropPress={closeMenu}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={ANIMATION_TIME}
        animationOutTiming={ANIMATION_TIME}
        backdropTransitionInTiming={ANIMATION_TIME}
        backdropTransitionOutTiming={ANIMATION_TIME}
        transparent={true}>
        <View
          style={[
            styles.container,
            {
              position: 'absolute',
              top: layout.height + 30,
              left: layout.x == 0 ? layout.x : layout.x - 20,
            },
          ]}>
          <ScrollView style={{ flex: 1 }}>{menus.map(renderItem)}</ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#00000080',
    padding: 0,
    margin: 0,
  },

  container: {
    width: '50%',
    height: '40%',
    backgroundColor: AppStyles.colors.white,
    borderRadius: 6,
    overflow: 'hidden',
    padding: metrics.padding,
    marginLeft: 10,
    marginTop: 61,
  },

  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    color: '#484848',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#D6D6D6',
    height: 61,
    width: '50%',
  },

  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    height: 35,
    paddingLeft: 5,
    marginVertical: 5,
    borderBottomColor: AppStyles.colors.disabled,
  },
});

export default CustomPopupMenu;
