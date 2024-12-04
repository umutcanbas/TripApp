import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';

import routes from '../../../navigation/routes';

import TopMenu from '../../../components/TopMenu';

const Home = ({navigation}) => {
  const [continentData, setContinentData] = useState(null);

  const getContinentData = () => {
    const databaseRef = database().ref('/kıtalar');

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

  const goContinent = continentKey => {
    navigation.navigate(routes.HOME_NAVIGATOR, {
      screen: routes.CONTINENT_PAGE,
      params: {
        continent: continentData[continentKey],
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Nereye seyahat etmek istersin ?" />

      <ScrollView>
        {continentData &&
          Object.keys(continentData).map((continentKey, index) => (
            <TouchableOpacity
              onPress={() => goContinent(continentKey)}
              key={index}
              activeOpacity={0.8}
              style={styles.renderContainer}>
              <Text style={styles.renderContainerText}>
                {continentData[continentKey].continent}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
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
