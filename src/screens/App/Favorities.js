import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';
import {clearFavorites} from '../../redux/slice';

const Favorities = () => {
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    console.log('Tüm favoriler silindi!');
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleClearFavorites()}>
        <Text>Clear Favorites</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Favorities;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
  },
});
