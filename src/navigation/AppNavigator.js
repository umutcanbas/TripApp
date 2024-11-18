import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from './routes';

import HomeNavigator from './HomeNavigator';
import ChatRooms from '../screens/App/ChatRooms';
import Favorities from '../screens/App/Favorities';

import Home from '../assets/icons/home.svg';
import HomeFill from '../assets/icons/home-fill.svg';
import HeartFill from '../assets/icons/heart-fill.svg';
import Heart from '../assets/icons/heart.svg';
import ChatRoom from '../assets/icons/list-line.svg';
import ChatRoomFill from '../assets/icons/list-fill.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const iconList = {
    home: Home,
    homeFill: HomeFill,
    heart: Heart,
    heartFill: HeartFill,
    chatRoom: ChatRoom,
    chatRoomFill: ChatRoomFill,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: '#6a5acd',
          borderTopWidth: 1,
        },

        tabBarIcon: ({focused}) => {
          let IconComponent;

          if (route.name === routes.HOME_NAVIGATOR) {
            IconComponent = focused ? iconList.homeFill : iconList.home;
          } else if (route.name === routes.FAVORITIES) {
            IconComponent = focused ? iconList.heartFill : iconList.heart;
          } else if (route.name === routes.CHATROOMS) {
            IconComponent = focused ? iconList.chatRoomFill : iconList.chatRoom;
          }

          return <IconComponent width={24} height={24} />;
        },
      })}>
      <Tab.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} />
      <Tab.Screen name={routes.CHATROOMS} component={ChatRooms} />
      <Tab.Screen name={routes.FAVORITIES} component={Favorities} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
