import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { AppStyles } from '@theme';

const TopBarScreenLayout = ({ topBar, children,style }) => {
  return (
    <View style={AppStyles.styles.container}>
      {topBar}
      {children && (
        <SafeAreaView style={[styles.container,style]}>{children}</SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppStyles.colors.background },
});

export default TopBarScreenLayout;
