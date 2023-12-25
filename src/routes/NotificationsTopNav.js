import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllNotifications from "../screens/tab/notifications/AllNotifications";
import Mentions from "../screens/tab/notifications/Mentions";

const Tab = createMaterialTopTabNavigator();

export function NotificationsTopNav() {
  return (
    <Tab.Navigator initialRouteName="All">
      <Tab.Screen name="All" component={AllNotifications} />
      <Tab.Screen name="Mentions" component={Mentions} />
    </Tab.Navigator>
  );
}
