import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CharactersScreen from "./CharactersScreen";
import Character from "./Character";

const Stack = createNativeStackNavigator();

export default function CharacterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFD700",
        },
      }}
    >
      <Stack.Screen
        name="Listed Characters"
        component={CharactersScreen}
      />

      <Stack.Screen
        name="Character"
        component={Character}
      />
    </Stack.Navigator>
  );
}