import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import BooksScreen from "./BooksScreen";
import Book from "./Book";

const Stack = createNativeStackNavigator();

export default function BooksStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "#FFD700"
      },
    }}>
      <Stack.Screen name="Listed Books" component={BooksScreen} />
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  );
}