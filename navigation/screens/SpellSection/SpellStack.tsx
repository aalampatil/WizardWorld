import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SpellScreen from "./SpellsScreen";
import SpellDetail from "./Spell";

const Stack = createNativeStackNavigator();

export default function SpellStack() {
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
        name="List Spells"
        component={SpellScreen}
      />

      <Stack.Screen
        name="Spell"
        component={SpellDetail}
        options={{ title: "Spell" }}
      />
    </Stack.Navigator>
  );
}