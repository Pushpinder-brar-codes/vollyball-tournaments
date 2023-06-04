import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Upcoming from "./Upcoming";
import MyUploads from "./MyUploads";

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="My Uploads" component={MyUploads} />
      </Tab.Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
  container: {
    flex: 1
  },
});
