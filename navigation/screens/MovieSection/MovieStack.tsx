import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MoviesScreen from "./MoviesScreen";
import Movie from "./Movie";

const Stack = createNativeStackNavigator();

export default function MovieStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FFD700",
        },
      }}
    >
      <Stack.Screen
        name="Listed Movies"
        component={MoviesScreen}
      />

      <Stack.Screen
        name="Movie"
        component={Movie}
      />
    </Stack.Navigator>
  );
}