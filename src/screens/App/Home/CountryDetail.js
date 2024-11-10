import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {addFavorite} from '../../../redux/slice';

import TopMenu from '../../../components/TopMenu';

const ContryDetailPage = ({route}) => {
  const {place} = route.params;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const favoriteList = useSelector(state => state.slice.favorites);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title={place.name}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {}}
        rightIcon="heart"
      />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {place.url ? (
            <Image source={{uri: place.url}} style={styles.image} />
          ) : (
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Fuji_Kawaguchi_357.JPG/2560px-Fuji_Kawaguchi_357.JPG',
              }}
              style={styles.image}
            />
          )}
        </View>

        <Text style={styles.contentText}>{place.content}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sohbet odasına git</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContryDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },

  contentContainer: {
    padding: 10,
    marginTop: 10,
  },
  contentText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 24,
  },
  imageContainer: {
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: 'auto',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
});
