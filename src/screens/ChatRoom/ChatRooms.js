import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';
import Input from '../../components/Input';

import database from '@react-native-firebase/database';

const ChatRooms = ({route}) => {
  const title = route.params.placeName;
  const placeId = route.params.placeId;

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    const databaseRef = database().ref(`/chatRooms/${placeId}/messages`);

    try {
      await databaseRef.push({
        message,
        timestamp: Date.now(),
        sender: 'Umutcan',
      });
      console.log('senddd');
      setMessage('');
    } catch (err) {
      console.log('Mesaj gönderim hatası:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title={title} onPressLeft />

      <Input
        value={message}
        onChangeText={setMessage}
        placeholder="Bir Mesaj Yaz"
      />
      <TouchableOpacity
        style={{backgroundColor: 'red', width: 20, height: 20}}
        onPress={sendMessage}
      />
    </SafeAreaView>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
});
