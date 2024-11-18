import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';

import TopMenu from '../../components/TopMenu';

import Heart from '../../assets/icons/heart-fill.svg';

import {useDispatch, useSelector} from 'react-redux';
import {clearFavorites, changeFavoriteList} from '../../redux/slice';

import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

const Favorities = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favoriteList = useSelector(state => state.slice.favoriteList);

  const FavoriteList = () => {
    return (
      <ScrollView style={styles.container}>
        {favoriteList && favoriteList.length > 0 ? (
          favoriteList.map((place, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(routes.HOME_NAVIGATOR, {
                  screen: routes.COUNTRY_DETAIL,
                  params: {
                    place,
                  },
                })
              }
              style={styles.itemContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemText}>
                {place.name}
              </Text>

              <TouchableOpacity
                onPress={() => handleChangeFavoriteList(place)}
                style={styles.iconContainer}>
                <Heart width={23} height={23} fill={'red'} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>No favorites found.</Text>
        )}
      </ScrollView>
    );
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    console.log('Tüm favoriler silindi!');
  };

  const handleChangeFavoriteList = place => {
    dispatch(changeFavoriteList(place));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Favorites" />

      <FavoriteList />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleClearFavorites()}>
        <Text style={styles.buttonText}>Clear Favorites</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Favorities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  itemText: {
    fontSize: 19,
    color: '#333',
    fontWeight: 'bold',
    margin: 10,
    width: 300,
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#999',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#b0a6d2',
    position: 'absolute',
    bottom: 10,
    right: 125,
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
