import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./Card";

import { AnimatedFAB, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import userAtom, { triggerUpdateForTournaments } from "./State/Store";
import { useAtom, useAtomValue } from "jotai";
import MySnackbar from "./Snackbar";
import ButtonAddTournament from "./ButtonAddTournament";


const MyUploads = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [user, setUser] = useAtom(userAtom);

  const trigger = useAtomValue(triggerUpdateForTournaments);


  const getData = () => {
    getDocs(collection(db, "tournaments")).then((querySnapshot) => {
      let a = [];
      querySnapshot.forEach((doc) => {
        
        a.push({ ...doc.data(), id: doc.id });
      });
      a = a.filter((item) => item.uid === user.uid);
      setData(a);
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getData();
  }, [user,trigger]);


  const openDescriptionPage = (item) => {
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
  };

  return (
    <View style={styles.container}>
      {user ? (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => openDescriptionPage(item)}
              >
                <Card
                  edit={true}
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
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            mode="contained"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Login To View your uploads
          </Button>
        </View>
      )}
      <ButtonAddTournament />
      <MySnackbar />
    </View>
  );
};

export default MyUploads;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
});
