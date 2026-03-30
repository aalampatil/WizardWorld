import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/00HomeSection/HomeScreen';
import FilterBooks from "../screens/BookSection/Filter"

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        headerStyle: {
          backgroundColor: "#FFD700"
        },
        drawerActiveBackgroundColor: "#FFD700",
        drawerActiveTintColor: "#00ff0d"


      }} />
      <Drawer.Screen name="Search" component={FilterBooks} />
    </Drawer.Navigator>
  );
}