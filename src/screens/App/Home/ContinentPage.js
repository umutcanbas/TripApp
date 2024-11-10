import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import BackArrow from '../../../assets/icons/back.svg';
import routes from '../../../navigation/routes';
import TopMenu from '../../../components/TopMenu';

const ContinentPage = ({route, navigation}) => {
  const {continent} = route.params;

  const country = continent['countries'];

  const goCountryDetail = place => {
    navigation.navigate(routes.HOME_NAVIGATOR, {
      screen: routes.COUNTRY_DETAIL,
      params: {
        place,
      },
    });
  };

  const Countries = () => {
    return (
      <View style={styles.renderContainer}>
        {Object.keys(country).map((counrtyKey, idx) => {
          const currentCountry = country[counrtyKey];
          const places = Object.values(currentCountry.place);
          return (
            <View key={idx}>
              <View style={styles.renderContainerHeader}>
                <Text style={styles.renderContainerHeaderText}>
                  {currentCountry.name}
                </Text>
              </View>
              {places.map((place, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => goCountryDetail(place)}
                    key={idx}
                    style={styles.renderContainerButton}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.renderContainerText}>
                      {place.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title={continent.continent}
        onPressLeft={() => navigation.goBack()}
      />

      <ScrollView>{continent && <Countries />}</ScrollView>
    </SafeAreaView>
  );
};

export default ContinentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },

  renderContainer: {
    marginVertical: 10,
    marginTop: 20,
    padding: 10,
  },
  renderContainerHeader: {
    justifyContent: 'center',
  },
  renderContainerHeaderText: {
    color: '#dcdcdc',
    fontWeight: '800',
    fontSize: 28,
  },
  renderContainerButton: {
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
    height: 40,
    padding: 5,
  },
  renderContainerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#663399',
  },
});