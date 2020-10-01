import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export const CustomModal = ({ children, showModal, onDismiss = () => {} }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {
          setVisible(false);
          onDismiss();
        }}>
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

export const CustomModalTitle = ({ children }) => (
  <Text style={styles.txtTitleStyle}>{children?.toUpperCase()}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
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

// export default CustomModal;
