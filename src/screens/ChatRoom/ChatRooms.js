import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenu from '../../components/TopMenu'

const ChatRooms = ({route}) => {
const title = (route.params.placeName)

  return (
    <SafeAreaView style={styles.container} >
      <TopMenu title={title} onPressLeft />
      <Text>ChatRooms</Text>
    </SafeAreaView>
  )
}

export default ChatRooms

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },  
})