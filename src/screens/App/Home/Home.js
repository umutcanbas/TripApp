import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';
import ContinentesCard from '../../../components/ContinentsCard';
import TopMenu from '../../../components/TopMenu';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Nereye seyahat etmek istersin ?" />
      <ContinentesCard />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
});
