import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AppStyles, images, metrics } from '@theme';

const CustomPopupMenu = ({
  visible,
  contentContainerModalStyle,
  menus = [],
  itemMenu,
  placeHolders = '',
  openMenu,
  closeMenu,
  selected,
}) => {
  const [layout, setLayout] = React.useState({});
  const setOnLayout = React.useCallback(
    (i) => {
      if (i.nativeEvent) setLayout(i.nativeEvent.layout);
    },
    [visible],
  );

  return (
    <>
      <TouchableOpacity
        onLayout={setOnLayout}
        onPress={openMenu}
        style={styles.btnContainer}>
        <Text
          style={[
            AppStyles.fonts.bold,
            !selected && { color: AppStyles.colors.placeholder },
          ]}>
          {selected ? selected : placeHolders}
        </Text>

        <Image source={images.icons.ic_dropdown} />
      </TouchableOpacity>

      <Modal visible={visible} transparent>
        <View style={styles.modal}>
          <View
            style={[
              styles.container,
              {
                position: 'absolute',
                top: layout.height + 30,
                left: layout.x == 0 ? layout.x : layout.x - 20,
              },
            ]}>
            <ScrollView style={{ flex: 1 }}>{menus.map(itemMenu)}</ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '50%',
    height: '40%',
    backgroundColor: AppStyles.colors.white,
    borderRadius: 6,
    overflow: 'hidden',
    padding: metrics.padding,
    marginLeft: 10,
    // justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    color: '#484848',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    height: 61,
    width: '50%',
  },
});

export default CustomPopupMenu;
