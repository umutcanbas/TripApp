import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import BackArrow from '../assets/icons/back.svg';
import FavoriteIcon from '../assets/icons/heart-fill.svg';
import Profile from '../assets/icons/user-fill.svg';

import {useNavigation} from '@react-navigation/native';

const TopMenu = ({
  title,
  onPressLeft,
  onPressRight,
  leftIcon = 'back',
  rightIcon,
}) => {
  const icons = {
    back: <BackArrow width={24} height={24} />,
    heart: <FavoriteIcon width={24} height={24} />,
    heartRed: <FavoriteIcon width={24} height={24} fill="red" />,
    profile: <Profile width={24} height={24} />,
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {onPressLeft && (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.leftButtonContainer}
            activeOpacity={0.8}>
            {icons[leftIcon]}
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightButtonContainer}>
        {onPressRight && (
          <TouchableOpacity onPress={onPressRight}>
            {icons[rightIcon]}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  innerContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    flex: 1,
  },
  leftButtonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  rightButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});
