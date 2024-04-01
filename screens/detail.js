import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Detail({ route, navigation }) {
  const { uid } = route.params;
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const saveDetails = async () => {
    try {
      await firestore().collection("users").doc(uid).set({
        name,
        dob,
        gender,
      });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error Saving Details", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f2f2f2" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 40,
          marginTop: 120,
        }}
      >
        Enter Your Details
      </Text>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderWidth: 1,
          borderColor: "#000",
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderWidth: 1,
          borderColor: "#000",
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="Dob"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderWidth: 1,
          borderColor: "#000",
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity
        onPress={saveDetails}
        style={{
          backgroundColor: "#cecece",
          padding: 10,
          borderRadius: 4,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Save Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}
