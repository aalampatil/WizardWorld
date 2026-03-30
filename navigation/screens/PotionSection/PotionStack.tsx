import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PotionScreen from "./PotionsScreen";
import PotionPage from "./Potion";

const Stack = createNativeStackNavigator();

export default function PotionStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FFD700",
        },
      }}
    >
      <Stack.Screen name="List-Potions" component={PotionScreen} />
      <Stack.Screen
        name="Potion"
        component={PotionPage}
        options={{ title: "Potion" }}
      />
    </Stack.Navigator>
  );
}