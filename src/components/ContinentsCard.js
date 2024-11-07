import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';

import routes from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';

const ContinentesCard = () => {
  const navigation = useNavigation();
  const [continentData, setContinentData] = useState(null);

  const getContinentData = () => {
    const databaseRef = database().ref('/Kıtalar');

    databaseRef
      .once('value')
      .then(snapshot => {
        if (snapshot.val() === null) return console.log('Veri bulunamadı.');

        setContinentData(snapshot.val());
      })
      .catch(err => console.log('Veri çekme hatası:', err));
  };

  useEffect(() => {
    getContinentData();
  }, []);

  const goContinent = continentName => {
    navigation.navigate(routes.HOME_NAVIGATOR, {
      screen: routes.CONTINENT_PAGE,
      params: {
        continentName,
        continentInfo: continentData[continentName],
      },
    }); 
  };

  const Continentes = () => {
    return (
      continentData &&
      Object.keys(continentData).map((continentName, index) => (
        <TouchableOpacity
          onPress={() => goContinent(continentName)}
          key={index}
          activeOpacity={0.8}
          style={styles.renderContainer}>
          <Text style={styles.renderContainerText}>{continentName}</Text>
        </TouchableOpacity>
      ))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Nereye seyahat etmek istersin?</Text>
      </View>
      <View>{continentData && <Continentes />}</View>
    </View>
  );
};

export default ContinentesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
  },
  renderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 375,
    height: 100,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 20,
  },
  renderContainerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
