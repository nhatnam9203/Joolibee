import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';

export const CustomModal = React.forwardRef(
  ({ children, showModal, onDismiss = () => {} }, ref) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (showModal) setVisible(showModal);
    }, [showModal]);

    const onModalHide = () => {
      onDismiss();
      setVisible(false);
    };

    React.useImperativeHandle(ref, () => ({
      dismiss: onModalHide,
    }));

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={visible}
        transparent={true}
        onModalHide={onModalHide}>
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
    // backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtTitleStyle: {
    fontFamily: 'SVN-Merge',
    fontSize: 24,
    color: '#E31837',
    textAlign: 'center',
    marginTop: 10,
  },
});
