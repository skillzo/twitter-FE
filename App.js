import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./src/routes/TabRoutes";
import Login from "./src/screens/auth/Login";
import { AuthProvider } from "./store/authContext";
import AppNavigation from "./src/routes/AppNavigation";

export default function App({}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaView className="flex-1">
          <AppNavigation />
        </SafeAreaView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
