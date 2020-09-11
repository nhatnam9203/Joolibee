import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const CustomInput = ({ onChangeText, handleBlur, value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={handleBlur}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 58, width: 'auto' },
});

export default CustomInput;
