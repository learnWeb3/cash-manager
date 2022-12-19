import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { Login } from "./Components/SignIn";
import { Main } from "./Components/Main";
import AddProductPage from "./Components/AddProductPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* { value ? <Stack.Screen name='login' component={Main} /> : <Stack.Screen name='login' component={Login} />} */}
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="AddProduct" component={AddProductPage} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
