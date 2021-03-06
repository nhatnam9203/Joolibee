import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import Modal from 'react-native-modal';

const ANIMATION_TIME = 350;
export const CustomModal = React.forwardRef(
  (
    {
      children,
      showModal,
      onDismiss = () => {},
      animationIn = 'zoomIn',
      animationOut = 'zoomOut',
      disableBackdrop,
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (showModal) setVisible(showModal);
    }, [showModal]);

    const onModalHide = () => {
      onDismiss();
      setVisible(false);
    };

    const onBackDrop = () => {
      if (!disableBackdrop) onModalHide();
    };

    React.useImperativeHandle(ref, () => ({
      dismiss: onModalHide,
    }));

    return (
      <Modal
        testID="modal"
        animationIn={animationIn}
        animationOut={animationOut}
        animationInTiming={ANIMATION_TIME}
        animationOutTiming={ANIMATION_TIME}
        backdropTransitionInTiming={ANIMATION_TIME}
        backdropTransitionOutTiming={ANIMATION_TIME}
        isVisible={visible}
        transparent={true}
        onModalHide={onModalHide}
        onBackdropPress={onBackDrop}
        style={styles.container}>
        {children}
      </Modal>
    );
  },
);

export const CustomModalTitle = ({ children }) => (
  <Text style={styles.txtTitleStyle}>{children?.toUpperCase()}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtTitleStyle: {
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    fontSize: 24,
    color: '#E31837',
    textAlign: 'center',
    marginTop: 10,
  },
});
