import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import CustomFlatList from './CustomFlatList';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const Icon_Size = 30;

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const ChevronIcon = ({ isOpen }) => {
  return (
    <Animated.View
      style={[
        styles.iconContainer,
        { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] },
      ]}>
      <Icon name="chevron-down" color="#1B1B1B" size={32} />
    </Animated.View>
  );
};

export const CustomAccordionListItemType = {
  Radio: 'radio',
  Multiline: 'checkbox',
  None: 'none',
};

const CustomAccordionList = ({
  item,
  headerTextStyle,
  headerStyle,
  renderItem,
  renderSelectItem,
  style,
  onChangeOptionsItem,
}) => {
  const { title, options, type, position, required, sku, option_id } = item;

  const [open, setOpen] = React.useState(false);
  const [selectedListItem, setSelectedListItem] = React.useState([]);
  const ref = React.useRef();

  const updateOptionItems = (arr) => {
    setSelectedListItem(arr);

    if (typeof onChangeOptionsItem === 'function') {
      const mapArray = options.map((x) => {
        if (arr.indexOf(x) > -1) {
          return Object.assign({}, x, { is_default: true });
        } else {
          return Object.assign({}, x, { is_default: false });
        }
      });

      onChangeOptionsItem(Object.assign({}, item, { options: mapArray }));
    }
  };

  const selectedItem = async (item) => {
    const index = selectedListItem?.indexOf(item);

    switch (type) {
      case CustomAccordionListItemType.Multiline:
        if (index < 0) {
          await updateOptionItems([item, ...selectedListItem]);
        }
        break;
      case CustomAccordionListItemType.Radio:
      default:
        if (index < 0) {
          await updateOptionItems([item]);
        }
        break;
    }
  };

  const unSelectedItem = async (item) => {
    const index = selectedListItem?.indexOf(item);
    selectedListItem?.splice(index, 1);
    await updateOptionItems([...selectedListItem]);
  };

  const onPress = (item) => {
    const selected = selectedListItem?.indexOf(item) > -1;

    switch (type) {
      case CustomAccordionListItemType.Multiline:
        selected ? unSelectedItem(item) : selectedItem(item);

        break;
      case CustomAccordionListItemType.Radio:
      default:
        selected && !required ? unSelectedItem(item) : selectedItem(item);
        break;
    }
  };

  const onRenderItem = ({ item }, index) => {
    return typeof renderItem === 'function' ? (
      renderItem({
        item,
        index,
        type,
        onPress: onPress,
      })
    ) : (
      <View />
    );
  };

  const onRenderSelectedItem = () => {
    return (
      typeof renderSelectItem === 'function' &&
      renderSelectItem(selectedListItem)
    );
  };

  const renderListItem = () => {
    let cloneData = [...options];
    cloneData.sort((a, b) => a.position - b.position);
    return (
      <Animated.View style={styles.subListStyle}>
        <CustomFlatList
          data={cloneData.filter((x) => x.product)}
          renderItem={onRenderItem}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </Animated.View>
    );
  };

  React.useEffect(() => {
    setOpen(required);
  }, [required]);

  React.useEffect(() => {
    if (options?.length > 0) {
      // options.sort((a, b) => a.position - b.position);
      const result = options.filter((x) => x.is_default === true) || [];
      if (result.length > 0) {
        setSelectedListItem(result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={[styles.container, style]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            ref.current.animateNextTransition();
            setOpen((prev) => !prev);
          }}
          activeOpacity={1}
          style={[headerStyle, styles.headerContent]}>
          {!!title && (
            <Text style={headerTextStyle}>{`${title}`.toUpperCase()}</Text>
          )}
          <View style={styles.horizontal}>
            {selectedListItem.length > 0 && !open && onRenderSelectedItem()}
            <ChevronIcon isOpen={open} />
          </View>
        </TouchableOpacity>
        {open && renderListItem()}
      </View>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 10,
  },
  txtStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  header: {},

  subListStyle: {},

  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContent: { height: 72, justifyContent: 'center', paddingHorizontal: 10 },
  itemTextStyle: { fontSize: 16, fontFamily: 'Roboto-medium' },

  iconContainer: {
    height: Icon_Size,
    width: Icon_Size,
    borderRadius: Icon_Size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomAccordionList;
