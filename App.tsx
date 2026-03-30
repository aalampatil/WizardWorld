import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import TabNavigator from './navigation/navigator/TabNavigators';
import { DrawerNavigator } from './navigation/navigator/DrawerNavigator';

export default function App() {

  return (
    <NavigationContainer>
      {/* <StackNaviagtor /> */}
      <TabNavigator />
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})