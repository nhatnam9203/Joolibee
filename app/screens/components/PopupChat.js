import { CustomInput, CustomButton } from '@components';
import { SinglePageLayout, PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';

import { Rating } from 'react-native-ratings';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import Modal from "react-native-modal";
export const PopupChat = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);
  const onChangeText = (content) => {
    setContent(content)
  }

  const onClose = React.useCallback(
    () => {
      popupRef.current.forceQuit();
    },
    [visible],
  )

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <Modal
      isVisible={visible}

      style={styles.bottomModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', left: 15 }} >
            <Image
              source={images.icons.ic_popup_close_red}
            />
          </TouchableOpacity>

          <Text style={[AppStyles.fonts.medium_SVN, { fontSize: 24 }]}>
            TIN NHẮN
          </Text>
        </View>

        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '75%',
    backgroundColor: AppStyles.colors.white,
    borderRadius: 20,
    overflow: 'hidden'
  },

  header: {
    height: 70,
    backgroundColor: AppStyles.colors.button,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});
