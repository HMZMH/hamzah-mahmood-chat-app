import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

const styles = {
  container: {
    flex: 1,
  },
  chatHeader: {
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#128C7E',
  },
  chatHeaderText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Right-align user messages
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#ECE5DD',
  },
  userMessageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  senderInfo: {
    alignItems: 'center',
    marginRight: 10,
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  senderName: {
    fontWeight: 'bold',
  },
  sendMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ECE5DD',
    backgroundColor: 'white',
  },
  messageInput: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F4F4F4',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#128C7E',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
  replyMessageBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  italicText: {
    fontStyle: 'italic',
  },
  messageOptions: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECE5DD',
    position: 'absolute',
  },
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const longPressTimeout = useRef(null);
  const replyToMessage = useRef(null);
  const senderName = 'Hamzah';
  const senderImage = require('../assets/senderImage.jpg');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = () => {
    if (text.trim() !== '') {
      const newMessage = { text, isUser: true, time: getCurrentTime() };
      setMessages([...messages, newMessage]);
      setText('');
    }
  };

  const handleLongPress = (message) => {
    clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      Alert.alert(
        'Message Options',
        '',
        [
          {
            text: 'Delete',
            onPress: () => handleDeleteMessage(message),
            style: 'destructive',
          },
          {
            text: 'Reply',
            onPress: () => handleReplyToMessage(message),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    }, 500);
  };

  const handleDeleteMessage = (message) => {
    const updatedMessages = messages.filter((msg) => msg !== message);
    setMessages(updatedMessages);
  };

  const handleReplyToMessage = (message) => {
    replyToMessage.current = message;
    setText(`Replying to:\n"${message.text}"\n\n`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>Chat App</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            style={styles.messageContainer}
          >
            <View style={styles.senderInfo}>
              <Image source={senderImage} style={styles.senderImage} />
              <Text style={styles.senderName}>{senderName}</Text>
            </View>
            <View style={styles.messageBubble}>
              {item.isReply && (
                <View style={styles.replyMessageBubble}>
                  <Text style={styles.italicText}>Replying to:</Text>
                  <Text>{'\n'}</Text>
                  <Text style={styles.italicText}>{`"${replyToMessage.current.text}"`}</Text>
                </View>
              )}
              <Text>{item.text}</Text>
              <Text style={styles.timestamp}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.sendMessageContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
