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
  title,
  data = [],
  type,
  headerTextStyle,
  headerStyle,
  renderItem,
  renderSelectItem,
  style,
  required,
  onChangeOptionsItem,
  sku,
  option_id,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedListItem, setSelectedListItem] = React.useState([]);
  const ref = React.useRef();

  const selectedItem = (item) => {
    const index = selectedListItem?.indexOf(item);

    switch (type) {
      case CustomAccordionListItemType.Multiline:
        if (index < 0) {
          setSelectedListItem([item, ...selectedListItem]);
        }
        break;
      case CustomAccordionListItemType.Radio:
      default:
        if (index < 0) {
          setSelectedListItem([item]);
        }
        break;
    }
  };

  const unSelectedItem = (item) => {
    const index = selectedListItem?.indexOf(item);
    selectedListItem?.splice(index, 1);
    setSelectedListItem([...selectedListItem]);
  };

  const onRenderItem = ({ item }, index) => {
    const selected = selectedListItem?.indexOf(item) > -1;
    const onPress = () => {
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

    return typeof renderItem === 'function' ? (
      renderItem({
        item,
        index,
        type,
        onPress,
        selected,
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

  const renderListItem = () => (
    <Animated.View style={styles.subListStyle}>
      <CustomFlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${item.id}`}
      />
    </Animated.View>
  );

  React.useEffect(() => {
    setOpen(required);
  }, [required]);

  React.useEffect(() => {
    if (data?.length > 0) {
      data.sort((a, b) => a.position - b.position);
      const result = data.find((x) => x.is_default === true);
      if (result) {
        selectedItem(result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (typeof onChangeOptionsItem === 'function') {
      onChangeOptionsItem({
        list: selectedListItem,
        sku: sku,
        option_id: option_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedListItem, onChangeOptionsItem]);

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
