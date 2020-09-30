import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export const CustomModal = ({ children, showModal }) => {
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
        onPress={() => setVisible(false)}
        >
        <View style={styles.content}>{children}</View>
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
  content: {
    flex: 0,
    // backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: '80%',
    minHeight: '40%',
    padding: 10,
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
