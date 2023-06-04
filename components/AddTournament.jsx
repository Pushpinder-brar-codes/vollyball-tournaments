import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ToastAndroid,
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAtomValue, useSetAtom } from "jotai";
import userAtom, { toastAtom, triggerUpdateForTournaments } from "./State/Store";

import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import useDate from "./useDate";

const AddTournament = () => {

  const route = useRoute();
  const data = route.params;
  const navigation = useNavigation();

  const setTriggerUpdate = useSetAtom(triggerUpdateForTournaments)
  const setToastData = useSetAtom(toastAtom);

  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [first, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [third, setThird] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [date, setDate] = useState(new Date(2023, 5, 1,5,30));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [imgName,setImageName] = useState(null);
  const [selectedImage, setSelectedImage] = useState()
  const [id,setId]= useState(null);
  const [loading, setloading] = useState(false);
  const [hour,min,updateDate] = useDate(date);
  const [inputs, setInputs] = useState([{ key: '', number: '',name:'' }]);

  useEffect(() => {
    if(data){
      setName(data.name);
      setLocation(data.location);
      setDate(data.date.toDate());
      setFees(data.fees);
      setFirst(data.first);
      setSecond(data.second);
      setThird(data.third);
      setInputs(data.contacts);
      setImage(data.img);
      setId(data.id);
    }
  }, [])

   const addHandler = () => {
    if(inputs.length <3){

    const addinputs = [...inputs];
    addinputs.push({ key: '', number: '',name:'' });
    setInputs(addinputs);
    }
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };
  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].number = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

   const inputHandler2 = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].name = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };
  const user = useAtomValue(userAtom);

  const uploadImage = async () => {
    setloading(true)
    if(!image || !selectedImage){
      submit(null);
      return;
    }
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, "images/"+imgName);
    try {
      uploadBytes(storageRef,blob).then((snapshot) => {
        console.log("Uploaded a blob or file! snapshot below :");
        console.log(snapshot);
        getDownloadURL(storageRef).then((downloadURL) => {
          submit(downloadURL);
          console.log("File available at", downloadURL);
        });
      });
    } catch (error) {
      console.log("UploadImage vich error hai ji ,", error)
      setloading(false);
    }
  };

  const submit = async (downloadURL) => {
    try {
      if(data){
          const docRef = doc(db, "tournaments", id);
          await updateDoc(docRef, {
            name,
            location,
            date,
            first,
            second,
            third,
            fees,
            uid: user.uid,
            img: downloadURL? downloadURL : image,
            contacts: inputs,
          });
          setTriggerUpdate((prev)=> !prev);
          setToastData({show:true,msg:"Updated Successfully !!"})
          navigation.navigate("Home");
          setloading(false);
          return;
      }

      const docRef = await addDoc(collection(db, "tournaments"), {
        name,
        location,
        date,
        first,
        second,
        third,
        fees,
        uid:user.uid,
        img: downloadURL,
        contacts:inputs
      });
      console.log("Document written with ID: ", docRef.id);
      ToastAndroid.showWithGravity(
        "Submitted Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setTriggerUpdate((prev) => !prev);
      setToastData({ show: true, msg: "Added Successfully !!" });
      navigation.navigate("Home");
      setloading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setloading(false);
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const onChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    updateDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageName(result.assets[0].assetId);
      setSelectedImage(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      styles={styles.keyboardAvoidingView}
    >
      <ScrollView style={styles.container}>
        <TextInput
          label="Tournament Name"
          value={name}
          mode="outlined"
          placeholder="Enter something"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Location"
          value={location}
          mode="outlined"
          placeholder="Enter something"
          onChangeText={(text) => setLocation(text)}
          style={styles.locationStyles}
        />
        <View style={styles.dateTimeStyles}>
          <View style={styles.dateTimeStylesButtons}>
            <Button
              style={[
                styles.datePickerButtonStyles,
                styles.datePickerButtonStylesLeft,
              ]}
              onPress={showDatepicker}
              labelStyle={styles.labelColor}
            >
              Select a date
            </Button>
            <Button
              labelStyle={styles.labelColor}
              style={styles.datePickerButtonStyles}
              onPress={showTimepicker}
            >
              Select time
            </Button>
          </View>
          <Text style={styles.datePickerText}>
            Selected: {date.toLocaleDateString()} {hour}:{min}
          </Text>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
            minimumDate={new Date(2023, 5, 1)}
          />
        )}
        <Text style={styles.prizes}>Prizes</Text>
        <View style={styles.prizesContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.prizesText}>1st Prize :</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.prizesInput}
            label="Amount"
            value={first}
            mode="outlined"
            placeholder="Amount"
            onChangeText={(text) => setFirst(text)}
          />
        </View>
        <View style={styles.prizesContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.prizesText}>2nd Prize :</Text>
          <TextInput
            keyboardType="numeric"
            label="Amount"
            style={styles.prizesInput}
            value={second}
            mode="outlined"
            placeholder="Amount"
            onChangeText={(text) => setSecond(text)}
          />
        </View>
        <View style={styles.prizesContainer}>
          <FontAwesome
            name="circle"
            style={styles.circle}
            size={16}
            color="#BF5C00"
          />
          <Text style={styles.prizesText}>3rd Prize :</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.prizesInput}
            label="Amount"
            value={third}
            mode="outlined"
            placeholder="Amount"
            onChangeText={(text) => setThird(text)}
          />
        </View>
        <Text style={styles.prizes}>Entry Fees</Text>
        <TextInput
          keyboardType="numeric"
          label="Entry fees amount"
          value={fees}
          mode="outlined"
          placeholder="Enter something"
          onChangeText={(text) => setFees(text)}
        />
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.prizes}>Contacts</Text>
          {inputs?.map((input, key) => (
            <View
              key={key}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  marginRight: 10,
                  alignSelf: "flex-start",
                  fontSize: 16,
                  marginTop: 3,
                }}
              >
                {key + 1}.{" "}
              </Text>
              <View style={{ width: "50%", marginRight: 30 }}>
                <TextInput
                  style={{}}
                  outlineColor="grey"
                  mode="outlined"
                  maxLength={15}
                  activeOutlineColor="black"
                  placeholder={"Name"}
                  value={input.name}
                  onChangeText={(text) => inputHandler2(text, key)}
                />
                <TextInput
                  keyboardType="numeric"
                  style={{}}
                  outlineColor="grey"
                  mode="outlined"
                  maxLength={15}
                  activeOutlineColor="black"
                  placeholder={"Number"}
                  value={input.number}
                  onChangeText={(text) => inputHandler(text, key)}
                />
              </View>

              <Button mode="contained-tonal" onPress={() => deleteHandler(key)}>
                Delete this
              </Button>
            </View>
          ))}
          <Button mode="contained-tonal" onPress={() => addHandler()}>
            Add More Contacts
          </Button>
        </View>
        <Text style={[styles.prizes, { marginBottom: 10 }]}>
          Select Poster Image(optional)
        </Text>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            mode="contained-tonal"
            style={{ marginBottom: 5 }}
            onPress={pickImage}
          >
            Click here to pick an image from Gallary
          </Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <Button
          loading={loading}
          icon="arm-flex"
          compact={true}
          mode="contained"
          onPress={() => uploadImage()}
          labelStyle={styles.label}
          style={styles.button}
        >
          {data ? "Update" : "Submit"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddTournament;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  locationStyles: {
    marginBottom: 20,
  },
  dateTimeStyles: {
    backgroundColor: "#3800a8",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  prizes: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  prizesContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  prizesText: {
    marginRight: 20,
  },
  labelColor: {
    color: "white",
  },
  dateTimeStylesButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  datePickerButtonStyles: {
    color: "white",
    backgroundColor: "#8c53fd",
    marginBottom: 10,
  },
  datePickerButtonStylesLeft: {
    marginRight: 30,
  },
  datePickerText: {
    color: "#fff",
  },
  prizesInput: {
    height: 40,
    width: 100,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
  },
  label: {
    marginLeft: 20,
  },
  circle: {
    marginRight: 10,
  },
});
