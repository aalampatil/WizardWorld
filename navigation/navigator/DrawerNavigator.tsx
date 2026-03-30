import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/00HomeSection/HomeScreen';
import BooksScreen from '../screens/BookSection/BooksScreen';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Explore Books" component={BooksScreen} />
    </Drawer.Navigator>
  );
}