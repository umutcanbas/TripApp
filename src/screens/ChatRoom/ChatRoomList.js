import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';

import database from '@react-native-firebase/database';

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState();

  console.log(chatRoomList);

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
    getChatRoomList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Sohbet Odaları" />
      {chatRoomList ? (
        
        Object.keys(chatRoomList).map(chatRoomKey => {
          const chatRoom = chatRoomList[chatRoomKey];
          return Object.keys(chatRoom).map(subKey => {
            const place = chatRoom[subKey];
            return (
              <TouchableOpacity key={subKey} style={styles.button}>
                <Text style={styles.butttonText}>{place.placeName}</Text>
              </TouchableOpacity>
            );
          });
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
  button:{
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems:'center'
  },
  butttonText:{
    fontSize:22,
    color:'black',
    fontWeight:'bold'
  },
  emptyText:{
    fontSize:22,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
  }
});
