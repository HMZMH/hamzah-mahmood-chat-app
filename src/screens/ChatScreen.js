import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, Switch, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './ChatScreenStyles';

const senderImage = require('../assets/senderImage.png');

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text: inputMessage,
        sender: 'You', // Change this as needed
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const toggleSettingsModal = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const clearChat = () => {
    setMessages([]);
    toggleSettingsModal();
  };

  const adjustFontSize = (newSize) => {
    setFontSize(newSize);
    toggleSettingsModal();
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'You' ? styles.sentMessage : styles.receivedMessage}>
      <Text style={{ ...styles.messageText, fontSize: fontSize }}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={senderImage} style={styles.profileImage} />
        <Text style={styles.recipientName}>Recipient's Name</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={toggleSettingsModal}>
          <FontAwesome name="cog" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsVisible}
        onRequestClose={toggleSettingsModal}
      >
        <View style={styles.settingsModal}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <View style={styles.settingOption}>
            <Text>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
          </View>
          <TouchableOpacity style={styles.settingOption} onPress={clearChat}>
            <Text>Clear Chat</Text>
          </TouchableOpacity>
          <Text style={styles.settingsTitle}>Font Size</Text>
          <View style={styles.settingOption}>
            <Text>Small</Text>
            <Switch value={fontSize === 12} onValueChange={() => adjustFontSize(12)} />
          </View>
          <View style={styles.settingOption}>
            <Text>Medium</Text>
            <Switch value={fontSize === 16} onValueChange={() => adjustFontSize(16)} />
          </View>
          <View style={styles.settingOption}>
            <Text>Large</Text>
            <Switch value={fontSize === 20} onValueChange={() => adjustFontSize(20)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.inputMessage, fontSize: fontSize }}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
