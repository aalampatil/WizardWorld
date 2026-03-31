import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BooksScreen from "./BooksScreen";
import Book from "./Book";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

export default function BooksStack() {

  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({
      headerShown: false,
      headerStyle: {
        backgroundColor: "#FFD700"
      },
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Filter")}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="search" size={22} color="white" />
        </Pressable>
      ),
    })}>
      <Stack.Screen name="Listed-Books" component={BooksScreen} />
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  );
}