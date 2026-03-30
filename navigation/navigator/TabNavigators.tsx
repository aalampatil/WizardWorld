import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import BooksStack from "../screens/BookSection/BookStack";
import CharacterStack from "../screens/CharacterSection/CharacterStack";
import MovieStack from "../screens/MovieSection/MovieStack";
import SpellStack from "../screens/SpellSection/SpellStack";

const Tab = createBottomTabNavigator();

const icons: Record<string, any> = {
  Hogwarts: "home",
  Books: "book",
  Characters: "people",
  Movies: "film",
  Potions: "flask",
  Spells: "flash",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: "#FFD700"
        },

        tabBarLabelStyle: {
          color: "black"
        },
        tabBarActiveTintColor: "#00ff1a",
        tabBarInactiveTintColor: "black",

        tabBarBackground: () => (
          <BlurView intensity={0} style={StyleSheet.absoluteFill} tint="dark" />
        ),

        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffd700",
          borderTopWidth: 0,
          height: 70,
          marginHorizontal: 10,
          paddingTop: 7,
          marginBottom: 40,
          borderRadius: 50,
          // elevation: 0,
        },

        tabBarIcon: ({ color, focused }) => (
          <AnimatedTabIcon
            name={icons[route.name]}
            color={color}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen name="Hogwarts" component={DrawerNavigator} />
      <Tab.Screen name="Movies" component={MovieStack} />
      <Tab.Screen name="Books" component={BooksStack} />
      <Tab.Screen name="Characters" component={CharacterStack} />
      <Tab.Screen name="Potions" component={PotionStack} />
      <Tab.Screen name="Spells" component={SpellStack} />
    </Tab.Navigator>
  );
}



import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import PotionStack from "../screens/PotionSection/PotionStack";
import { DrawerNavigator } from "./DrawerNavigator";

interface Props {
  name: any;
  color: string;
  focused: boolean;
}

function AnimatedTabIcon({ name, color, focused }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.3 : 1);
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
}