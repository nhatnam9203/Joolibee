import { useScrollToTop } from '@react-navigation/native';
import { AppStyles } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SinglePageLayout = ({ children, backgroundColor, bounces }) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.avoidContainer, { backgroundColor: backgroundColor }]}
        bounces={bounces}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        // {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      >
        <StatusBar barStyle="light-content" />

        <View
          // ref={ref}
          // bounces={bounces}
          // keyboardShouldPersistTaps="handled"
          // showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          // contentContainerStyle={styles.scrollContentContainer}
          style={styles.content}>
          {children}
        </View>
      </KeyboardAwareScrollView>
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
