import { translate } from '@localize';
import { AppStyles, images } from '@theme';

import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
  UIManager,
  LayoutAnimation,
  ScrollView,
  Platform,
} from 'react-native';
import {
  GiftedChat,
  Send,
  MessageText,
  Bubble,
} from 'react-native-gifted-chat';
import Modal from 'react-native-modal';

const suggests = [
  { _id: 4, text: 'Tôi xuống ngay' },
  { _id: 5, text: 'Tôi đồng ý' },
  { _id: 6, text: 'Vui lòng chờ tôi 1 lát nhé' },
];

export const PopupChat = ({ visible, onToggle }) => {
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
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = () => {
    setHeight('100%');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const keyboardDidHide = () => {
    setHeight('75%');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const onSend = React.useCallback((messages = []) => {
    console.log('messages', messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.containerSend}>
      <Image source={images.icons.ic_send_chat} />
    </Send>
  );

  const renderMessageText = (props) => {
    return <MessageText {...props} customTextStyle={styles.txtMessage} />;
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#AADEE5',
        },
      }}
    />
  );

  const renderSuggestList = () => {
    return suggests.map((item, index) => {
      const message = [
        {
          text: item.text,
          user: {
            _id: 1,
          },
          createdAt: new Date(),
          _id: Math.random(5),
        },
      ];

      return (
        <TouchableOpacity
          onPress={() => onSend(message)}
          key={index + ''}
          style={styles.suggestMessageContainer}>
          <Text style={styles.txtSuggest}>{item.text}</Text>
        </TouchableOpacity>
      );
    });
  };
  const renderChatFooter = (props) => (
    <View style={{ marginVertical: 10 }}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {renderSuggestList()}
      </ScrollView>
    </View>
  );

  return (
    <Modal
      testID="modal"
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      animationInTiming={350}
      animationOutTiming={350}
      backdropTransitionInTiming={350}
      backdropTransitionOutTiming={350}
      onBackdropPress={onToggle}
      isVisible={visible}
      style={styles.bottomModal}>
      <View style={[styles.container, { height }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onToggle}
            style={{ position: 'absolute', left: 15 }}>
            <Image source={images.icons.ic_popup_close_red} />
          </TouchableOpacity>

          <Text style={[AppStyles.fonts.medium_SVN, { fontSize: 24 }]}>
            TIN NHẮN
          </Text>
        </View>

        <GiftedChat
          messages={messages}
          placeholder="Nhập tin nhắn"
          keyboardShouldPersistTaps={'handled'}
          onSend={(messages) => onSend(messages)}
          renderSend={renderSend}
          renderMessageText={renderMessageText}
          renderChatFooter={renderChatFooter}
          renderBubble={renderBubble}
          renderAvatar={null}
          multiline={true}
          minInputToolbarHeight={Platform.OS === 'android' ? 44 : 60}
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
    overflow: 'hidden',
  },

  header: {
    height: 70,
    backgroundColor: AppStyles.colors.button,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  containerSend: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  suggestMessageContainer: {
    paddingHorizontal: 15,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AADEE5',
    borderRadius: 7,
    marginHorizontal: 10,
  },

  txtMessage: {
    fontSize: 14,
    ...AppStyles.fonts.text,
  },

  txtSuggest: {
    ...AppStyles.fonts.medium,
    fontSize: 14,
    color: '#AADEE5',
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
