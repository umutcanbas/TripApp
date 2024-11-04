import { SafeAreaView, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'


import routes from '../../navigation/routes'

import { useSelector } from 'react-redux'

const SplashScreen = ({ navigation }) => {
  const isLogged = useSelector(state => state.slice.isLogged)


  useEffect(() => {
    setTimeout(() => {
      if (false) {
        navigation.replace(routes.APP_NAVIGATOR)
      } else {
        navigation.replace(routes.AUTH_NAVIGATOR ,{screen:routes.LOGIN})
      }
    }, 1000)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Splash Screen</Text>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
})