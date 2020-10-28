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

const CustomAccordionList = ({
  title,
  data = [],
  type,
  headerTextStyle,
  headerStyle,
  renderItem,
  style,
  required,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const ref = React.useRef();

  const onRenderItem = (item, index) => {
    return typeof renderItem === 'function' ? (
      renderItem({
        item,
        index,
        type,
        onPress: () => setSelectedItem(item),
        selected: selectedItem,
      })
    ) : (
      <View />
    );
  };

  const renderListItem = () => (
    <Animated.View style={styles.subListStyle}>
      <CustomFlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index}`}
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
        setSelectedItem(result);
      }
    }
  }, [data]);

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
          <ChevronIcon isOpen={open} />
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
});

export default CustomAccordionList;
