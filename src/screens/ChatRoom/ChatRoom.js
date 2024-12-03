import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {useIsFocused} from '@react-navigation/native';

const ChatRooms = ({route}) => {
  const title = route.params.name;
  const placeId = route.params.id;

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [userName, setUserName] = useState('');

  const isFocused = useIsFocused();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const databaseRef = database().ref(`/chatRooms/${placeId}/messages`);

    try {
      databaseRef.push({
        message,
        timestamp: Date.now(),
        sender: userName,
      });
      console.log('senddd');
      setMessage('');
      getMessage();
    } catch (err) {
      console.log('Mesaj gönderim hatası:', err);
    }
  };

  const getMessage = async () => {
    const databaseRef = database().ref(`/chatRooms/${placeId}/messages`);

    try {
      const snapshot = await databaseRef.once('value');

      const data = Object.values(snapshot.val());

      setMessages(data);

      if (snapshot.val() === null) {
        console.log('Veri bulunamadı.');
        return;
      }
    } catch (err) {
      console.log('Veri çekme hatası:', err);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getMessage();
    } else {
      setMessages([]);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userMail = user.email;
          const baseUserName = userMail.split('@')[0];
          setUserName(baseUserName);
        } else {
          setUserName('Anonim');
        }
      } catch (err) {
        console.log('User name error', err);
        setUserName('Anonim');
      }
    };
    fetchUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title={title} onPressLeft />

      <ScrollView style={styles.messageContainer}>
        {messages
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item, index) => (
            <View
              key={index}
              style={[
                styles.messageBox,
                item.sender === userName
                  ? styles.rightMessage
                  : styles.leftMessage,
              ]}>
              <Text style={styles.senderText}>
                {item.sender === userName ? userName : item.sender}
              </Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          ))}
      </ScrollView>

      <View style={styles.ınputContaier}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Bir Mesaj Yaz"
          multiline
          placeholderTextColor="black"
          style={styles.ınput}
        />

        <TouchableOpacity style={styles.ınputButton} onPress={sendMessage}>
          <Text style={styles.ınputButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  messageBox: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#add8e6',
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6fa',
  },
  senderText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  ınputContaier: {
    flexDirection: 'row',
    backgroundColor: '#f8f8ff',
    maxHeight: 500,
    margin: 10,
    paddingHorizontal: 14,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ınput: {
    width: 300,
    marginLeft: 10,
  },
  ınputButton: {
    width: 40,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  ınputButtonText: {
    color: 'white',
    fontSize: 12,
  },
});
