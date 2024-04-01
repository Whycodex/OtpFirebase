import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error Sending Code", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userDocument.exists) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Detail", { uid: user.uid });
      }
    } catch (error) {
      console.log("Invalid Code", error);
    }
  };
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
          marginTop: 70,
        }}
      >
        Phone Number Authentication Using Firebase
      </Text>
      {!confirm ? (
        <>
          <Text style={{ marginBottom: 20, fontSize: 18 }}>
            Enter Your Phone Number
          </Text>
          <TextInput
            style={{
              height: 50,
              width: "100%",
              marginBottom: 18,
              borderWidth: 1,
              paddingHorizontal: 10,
            }}
            placeholder="+91 1234567890"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            onPress={signInWithPhoneNumber}
            style={{
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Send Code
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}
          >
            Enter Code Sent To Your Phone Number
          </Text>
          <TextInput
            style={{
              height: 50,
              width: "100%",
              borderWidth: 1,
              borderColor: "#000",
              marginBottom: 18,
              paddingHorizontal: 10,
            }}
            placeholder="Enter Code"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={confirmCode}
            style={{
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Confirm Code
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
