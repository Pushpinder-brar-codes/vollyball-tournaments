import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "./Card";

import { AnimatedFAB, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import userAtom, { triggerUpdateForTournaments } from "./State/Store";
import {useAtomValue } from "jotai";
import MySnackbar from "./Snackbar";
import ButtonAddTournament from "./ButtonAddTournament";

const Upcoming = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const user = useAtomValue(userAtom);

  const trigger = useAtomValue(triggerUpdateForTournaments);

  const getData = () => {
    getDocs(query(collection(db, "tournaments"),orderBy("date"))).then((querySnapshot) => {
      let a = [];
      querySnapshot.forEach((doc) => {
        a.push({...doc.data(),id:doc.id});
      });
      setData(a);
    });
  };

  useEffect(() => {
    getData();
  }, [trigger]);




  const openDescriptionPage = (item) =>{

    navigation.navigate("Description", {
      date: item.date,
      fees: item.fees,
      first: item.first,
      second: item.second,
      third: item.third,
      img: item.img,
      location: item.location,
      name: item.name,
      contacts: item.contacts,
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>openDescriptionPage(item)}>
              <Card
                item={item}
                date={item.date}
                location={item.location}
                name={item.name}
                entry={item.fees}
                prize={item.first}
                image={item.img}
              />
            </TouchableOpacity>
          );
        }}
      /> 
      <ButtonAddTournament />
      <MySnackbar />
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
