import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { db } from "../firebaseConfig";
import { deleteDoc, doc } from "@firebase/firestore";
import {  useSetAtom } from "jotai";
import { toastAtom, triggerUpdateForTournaments } from "./State/Store";
import { useEffect } from "react";
import useDate from "./useDate";


const Card = ({item, edit,date, location, name, entry, image }) => {

  const navigation = useNavigation();

   const [visible, setVisible] = useState(false);
   const showDialog = () => setVisible(true);
   const hideDialog = () => setVisible(false);
   const [hour, min, updateDate] = useDate(date.toDate());
   

  const setToastData = useSetAtom(toastAtom);
  const setTriggerUpdate = useSetAtom(triggerUpdateForTournaments);

  



  const editFun = () =>{
    navigation.navigate("AddTournament",item)
  }

  const deleteFun = async () =>{
    hideDialog()
    setToastData({ show: true, msg: "Trying to delete" });
    try {
      await deleteDoc(doc(db, "tournaments",item.id));
      setToastData({show:true,msg:"Deleted Successfully"})
      setTriggerUpdate((prev) => !prev);
    } catch (error) {
      setToastData({ show: true, msg: "Error ! Cannot Delete" });
    }
  }


  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.date, { marginRight: 10, color: "#a95100" }]}>
            {date.toDate().toLocaleDateString()}
          </Text>
          <Text style={styles.date}>{hour}:{min}</Text>
        </View>
        {edit && (
          <View style={{ flexDirection: "row" }}>
            <Button
              style={{ marginRight: 10 }}
              mode="elevated"
              onPress={editFun}
            >
              Edit
            </Button>
            <Button
              style={{ backgroundColor: "#d51414" }}
              textColor="#fff"
              mode="elevated"
              onPress={showDialog}
            >
              Delete
            </Button>
          </View>
        )}
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Do you want to delete this tournament
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteFun}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.infoHeading}>Entry Fees - </Text>
          <Text style={styles.infoAmount}>Rs {entry}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.infoHeading}>1st Prize - </Text>
          <Text style={styles.infoAmount}>Rs {entry}</Text>
        </View>
      </View>
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 300,
            height: 200,
            resizeMode: "cover",
            alignSelf: "center",
            marginBottom: 10,
          }}
        />
      )}
      <View style={styles.moreDetailsContainer}>
        <Text style={styles.moreDetails}>More Details</Text>
        <AntDesign name="right" size={18} color="black" />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "pink",
    padding: 20,
    marginBottom:5
  },
  date: {
    fontSize: 16,
    fontWeight: "700",
    color: "#BF5C00",
  },
  location: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: -4,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    marginBottom: 15,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  circle: {
    marginRight: 10,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: "300",
  },
  infoAmount: {
    fontWeight: "700",
  },
  moreDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  moreDetails: {
    marginRight: 5,
  },
});
