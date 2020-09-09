import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { AppStyles } from '@theme';

const TopBarScreenLayout = ({ topBar, children }) => {
  return (
    <View style={AppStyles.styles.container}>
      {topBar}
      {children && (
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default TopBarScreenLayout;
