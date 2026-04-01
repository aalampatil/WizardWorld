import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/navigator/TabNavigators';
import SplashScreen from './navigation/screens/Splash';


export default function App() {

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      {/* <StackNaviagtor /> */}
      <TabNavigator />
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}

