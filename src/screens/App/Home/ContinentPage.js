import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  
  import BackArrow from '../../../assets/icons/back.svg'
  import routes from '../../../navigation/routes';
  
  const ContinentPage = ({route, navigation}) => {
    const {continentName, continentInfo} = route.params;
  
    const goCountryDetail = (country, place) => {
      const placeInfo = continentInfo[country][place];
  
      const placeUrl = placeInfo.url || placeInfo.image || null;
  
      navigation.navigate(routes.HOME_NAVIGATOR, {
        screen: routes.COUNTRY_DETAIL,
        params: {
          country,
          placeInfo,
          placeUrl,
        },
      });
    };
  
    const Countries = () => {
      return Object.keys(continentInfo).map((country, index) => (
        <View style={styles.renderContainer} key={index}>
          <View style={styles.renderContainerHeader}>
            <Text style={styles.renderContainerHeaderText}>{country}</Text>
          </View>
          {Object.keys(continentInfo[country]).map((place, idx) => (
            <TouchableOpacity
              onPress={() => goCountryDetail(country, place)}
              key={idx}
              style={styles.renderContainerButton}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.renderContainerText}>
                {place}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ));
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
            activeOpacity={0.8}>
            <BackArrow width={24} height={24} />
          </TouchableOpacity>
  
          <Text style={styles.headerText}>{continentName}</Text>
        </View>
        <ScrollView>{continentInfo && <Countries />}</ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ContinentPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6a5acd',
    },
    headerContainer: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 34,
      marginHorizontal: 120,
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
  