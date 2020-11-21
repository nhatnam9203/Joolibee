import React from 'react';
import { ScrollView } from 'react-native';

export const CustomScrollViewHorizontal = ({ data, renderItem, ...props }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      {...props}>
      {data.map(renderItem)}
    </ScrollView>
  );
};
