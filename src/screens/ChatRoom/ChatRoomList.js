import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';

import database from '@react-native-firebase/database';

import {useNavigation, useIsFocused} from '@react-navigation/native';
import routes from '../../navigation/routes';

const ChatRoomList = () => {
  const isFocused = useIsFocused();

  const [chatRoomList, setChatRoomList] = useState();

  const navigation = useNavigation();

  const getChatRoomList = async () => {
    try {
      const databaseRef = database().ref('/chatRooms');
      const snapshot = await databaseRef.once('value');

      if (snapshot.val() === null) {
        console.log('Veri bulunamadı.');
        return;
      }

      setChatRoomList(snapshot.val());
    } catch (err) {
      console.log('Veri çekme hatası:', err);
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    getChatRoomList();
  }, [isFocused]);

  const goChatRoom = place => {
    navigation.navigate(routes.CHAT_NAVIGATOR, {
      screen: routes.CHATROOMS,
      params: place,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Sohbet Odaları" />
      {chatRoomList ? (
        Object.keys(chatRoomList).map((chatRoomKey, index) => {
          const chatRoom = chatRoomList[chatRoomKey];
          const data = Object.keys(chatRoom).filter(key => key !== 'messages');
          const room = chatRoom[data];

          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => goChatRoom(room)}>
              <Text style={styles.butttonText}>{room.name}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <View>
          <Text style={styles.emptyText}>Sohbet odası yok.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatRoomList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  butttonText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
