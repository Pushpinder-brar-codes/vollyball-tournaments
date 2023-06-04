import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import React from "react";
import { StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import userAtom from "./State/Store";

const ButtonAddTournament = () => {
  const navigation = useNavigation();
  const user = useAtomValue(userAtom);

  const navigate = () => {
    if (user) navigation.navigate("AddTournament");
    else {
      navigation.navigate("StartScreen");
    }
  };

  return (
    <AnimatedFAB
      icon={"plus"}
      label={"Label"}
      extended={false}
      onPress={() => navigate()}
      visible={true}
      animateFrom={"right"}
      iconMode={"static"}
      style={[styles.fabStyle]}
    />
  );
};

export default ButtonAddTournament;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
