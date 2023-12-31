import { createDrawerNavigator } from "@react-navigation/drawer";
import TabRoutes from "./TabRoutes";

const Drawer = createDrawerNavigator();

export function DrawerStack() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="home-drawer" component={TabRoutes} />
    </Drawer.Navigator>
  );
}
