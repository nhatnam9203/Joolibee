import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, bin, useTimingTransition } from 'react-native-redash';

const { not, interpolate } = Animated;

const LIST_ITEM_HEIGHT = 200;

const CustomAccordionList = ({ list = [], ...props }) => {
  const [open, setOpen] = React.useState(false);
  const transition = useTimingTransition(open, { duration: 400 });

  // const transition = useTransition(
  //   open,
  //   not(bin(open)),
  //   bin(open),
  //   400,
  //   Easing.inOut(Easing.ease),
  // );

  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * list.items.length,
  );

  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}>
          <Text style={styles.txtStyle}>jjjj</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <View {...{ item, key }} isLast={key === list.items.length - 1} />
        ))}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  txtStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAccordionList;
