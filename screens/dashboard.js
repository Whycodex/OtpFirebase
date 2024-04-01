import React from "react";
import auth from "@react-native-firebase/auth";
import { Text, TouchableOpacity, View } from "react-native";

export default function Dashboard({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Error Logging Out", error);
    }
  };
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#cecece" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
          marginTop: 120,
        }}
      >
        Welcome To Dashboard
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#cecece",
          padding: 10,
          marginBottom: 20,
          borderRadius: 4,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
