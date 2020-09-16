import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';

const CustomModal = ({ children, showModal }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (showModal) {
      setVisible(true);
    }
  }, [showModal]);

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => setVisible(false)}>
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: '80%',
    minHeight: '40%',
    padding: 10,
  },
});

export default CustomModal;
