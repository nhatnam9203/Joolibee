import { useScrollToTop } from '@react-navigation/native';
import { AppStyles } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

const SinglePageLayout = ({ children, backgroundColor, bounces }) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <KeyboardAvoidingView
      style={[styles.avoidContainer, { backgroundColor: backgroundColor }]}
      // keyboardVerticalOffset={isIphoneX() ? 88 : 64}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <ScrollView
          ref={ref}
          bounces={bounces}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
