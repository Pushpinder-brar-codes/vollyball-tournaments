import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddTournament from "./components/AddTournament";
import { Provider } from "react-native-paper";
import { theme } from "./components/core/theme";
import RegisterScreen from "./components/screens/RegisterScreen";
import StartScreen from "./components/screens/StartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import Description from "./components/Description";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "VollyBall Tournaments",
                headerStyle: {
                  backgroundColor: "#BF5C00",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTitleAlign: "center",
             
              }}
            />
            <Stack.Screen name="AddTournament" component={AddTournament} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Description" component={Description} />
          </Stack.Navigator>
        </View>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menu: {},
});
