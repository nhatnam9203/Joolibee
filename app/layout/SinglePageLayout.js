import { useScrollToTop } from '@react-navigation/native';
import { AppStyles } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

const SinglePageLayout = ({ children, backgroundColor, bounces }) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.avoidContainer, { backgroundColor: backgroundColor }]}
        {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          ref={ref}
          bounces={bounces}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
          style={styles.content}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  avoidContainer: { flex: 1, backgroundColor: AppStyles.colors.background },

  content: {
    flex: 1,
  },

  scrollContentContainer: {
    padding: 0,
    paddingBottom: 0,
  },

  scrollStyle: { flex: 0 },
});

export default SinglePageLayout;
