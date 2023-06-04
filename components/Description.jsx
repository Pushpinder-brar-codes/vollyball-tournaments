import { useRoute } from "@react-navigation/core";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import useDate from "./useDate";


const { width } = Dimensions.get("window");

const Description = () => {
  const route = useRoute();

  const { date, fees, first, second, third, img, location, name, contacts } =
    route.params;

  const [hour, min] = useDate(date.toDate());
  

  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {date.toDate().toLocaleDateString()}  {hour}:{min}
      </Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.info}>
        <View style={[styles.infoContainer, { marginBottom: 5 }]}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#357600"
          />
          <Text style={styles.infoHeading}>Entry Fees - </Text>
          <Text style={styles.infoAmount}>Rs {fees}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.infoHeading}>1st Prize - </Text>
          <Text style={styles.infoAmount}>Rs {first}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.infoHeading}>2nd Prize - </Text>
          <Text style={styles.infoAmount}>Rs {second}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.infoHeading}>3rd Prize - </Text>
          <Text style={styles.infoAmount}>Rs {third}</Text>
        </View>
      </View>
      <View style={styles.moreDetailsContainer}>
        <Text style={styles.moreDetails}>Contacts</Text>
        {/* <AntDesign name="down" size={18} color="black" /> */}
      </View>
      <View style={{ marginBottom: 10 }}>
        {contacts &&
          contacts.map((item, i) => {
            return (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
                key={i}
              >
                <Text style={styles.contactName}>{item.name} :</Text>
                <Text style={styles.contactItem}>{item.number}</Text>
              </View>
            );
          })}
      </View>
      {img && (
        <Image
          source={{
            uri: img,
          }}
          style={{
            width,
            height: 400,
            resizeMode: "contain",
            alignSelf: "center",
            marginBottom: 10,
          }}
        />
      )}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "pink",
    padding: 20,
    marginBottom: 5,
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a95100",
    marginBottom:8
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
    marginBottom: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  moreDetails: {
    marginRight: 5,
    fontSize: 20,
},
contactName: {
    marginRight: 5,
    fontSize: 16,
},
contactItem: {
      fontWeight:"600",
    fontSize: 18,
  },
});
