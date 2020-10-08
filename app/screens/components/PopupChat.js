
import { translate } from '@localize';
import { AppStyles, images } from '@theme';

import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View, Keyboard, UIManager, LayoutAnimation } from 'react-native';
import { GiftedChat, Send, MessageText, Bubble } from 'react-native-gifted-chat'

import Modal from "react-native-modal";
export const PopupChat = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);


  const onClose = React.useCallback(
    () => {
      popupRef.current.forceQuit();
    },
    [visible],
  )

  const [messages, setMessages] = React.useState([]);
  const [height, setHeight] = React.useState('75%');
  React.useEffect(() => {

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    setMessages([
      {
        _id: 1,
        text: 'Đơn hàng của bạn sắp tới',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    }
  }, []);

  const keyboardDidShow = () => {
    setHeight('100%');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  }

  const keyboardDidHide = () => {
    setHeight('75%');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  }

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  const renderSend = (props) => (
    <Send
      {...props}
      containerStyle={styles.containerSend}
    >
      <Image source={images.icons.ic_send_chat} />
    </Send>
  );



  const renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        customTextStyle={styles.txtMessage}
      />

    )
  }

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#AADEE5'
        }
      }}

    />
  );

  const renderChatFooter = (props) => (
    <View style={{ paddingVertical: 10 }}>
      <View style={{
        width: 115,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#AADEE5',
        borderRadius: 7
      }}>
        <Text style={styles.txtSuggest}>dsfdsfsdfd</Text>
      </View>
    </View>
  );

  return (
    <Modal
      isVisible={visible}
      style={styles.bottomModal}>
      <View style={[styles.container, { height }]}>
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
          placeholder='Nhập tin nhắn'
          keyboardShouldPersistTaps={'handled'}
          onSend={messages => onSend(messages)}
          renderSend={renderSend}
          renderMessageText={renderMessageText}
          renderChatFooter={renderChatFooter}
          renderBubble={renderBubble}
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
    // height: '100%',
    backgroundColor: AppStyles.colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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

  containerSend: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtMessage: {
    fontSize: 14,
    ...AppStyles.fonts.text
  },

  txtSuggest: {
    ...AppStyles.fonts.medium,
    fontSize: 14,
    color: '#AADEE5',
  },

  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },

});
