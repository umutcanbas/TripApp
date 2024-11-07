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

import BackArrow from '../../../assets/icons/back.svg';
import Heart from '../../../assets/icons/heart.svg';

import {useDispatch} from 'react-redux';
import {addFavorite} from '../../../redux/slice';
import {useSelector} from 'react-redux';

const ContryDetailPage = ({route}) => {
  const {country, placeInfo, placeUrl} = route.params;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const favoriteList = useSelector(state => state.slice.favorites);

  console.log(favoriteList);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
          activeOpacity={0.8}>
          <BackArrow width={24} height={24} />
        </TouchableOpacity>

        <Text style={styles.headerText}>{country}</Text>
        {/* ? */}
        <TouchableOpacity onPress={() => dispatch(addFavorite({placeInfo}))}>
          <Heart width={26} height={26} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {placeUrl ? (
          <Image source={{uri: placeUrl}} style={styles.image} />
        ) : (
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Fuji_Kawaguchi_357.JPG/2560px-Fuji_Kawaguchi_357.JPG',
            }}
            style={styles.image}
          />
        )}
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>{placeInfo.detay}</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 10,
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
});
