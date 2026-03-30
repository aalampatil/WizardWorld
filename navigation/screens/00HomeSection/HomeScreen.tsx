import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@react-navigation/elements'

const HomeScreen = () => {
  const navigation = useNavigation<any>()
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})