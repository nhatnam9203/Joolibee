import { AppStyles } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { isIphoneX } from '../lib/isIphoneX';

const SinglePageLayout = ({ children, backgroundColor }) => {
  return (
    <KeyboardAvoidingView
      style={[styles.avoidContainer, { backgroundColor: backgroundColor }]}
      // keyboardVerticalOffset={isIphoneX() ? 88 : 64}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <View style={styles.content}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContentContainer}>
          {children && children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidContainer: { flex: 1, backgroundColor: AppStyles.colors.background },

  content: {
    flex: 0,
  },

  scrollContentContainer: {
    padding: 0,
  },

  scrollStyle: { flex: 0 },
});

export default SinglePageLayout;
