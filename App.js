import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./src/routes/TabRoutes";
import Login from "./src/screens/auth/Login";
import { AuthProvider } from "./store/authContext";

export default function App({}) {
  const Stack = createStackNavigator();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaView className="flex-1">
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="main" component={TabRoutes} />

              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
