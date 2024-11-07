import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';
import ContinentesCard from '../../../components/ContinentsCard';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ContinentesCard />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#6a5acd'
  },
});
