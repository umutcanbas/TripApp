import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import ChatRoomList from '../screens/ChatRoom/ChatRoomList';
import ChatRooms from '../screens/ChatRoom/ChatRoom';

const Stack = createNativeStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.CHATLIST} component={ChatRoomList} />
      <Stack.Screen name={routes.CHATROOMS} component={ChatRooms} />


    </Stack.Navigator>
  );
};

export default ChatNavigator;
