import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Passkey } from "react-native-passkey";
import { api } from "./api";
import { useState} from "react";
import {decode as atob, encode as btoa} from 'base-64'

import { Buffer } from "buffer";

const isBase64 = (str) => {
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/register-options", {
        email,
        name,
      });

      let options = res.data;
      options.authenticatorSelection.residentKey = "required";
      options.authenticatorSelection.requireResidentKey = true;
      options.extensions = {
        credProps: true,
      };

      console.log('options.challenge', options.challenge)
      console.log(btoa(options.challenge))
      options.challenge = btoa(options.challenge)

      const optionsResponse = await Passkey.register(options);
      const verifyRes = await api.post("/register-verify", {
        optionsResponse,
        email,
      });
      if (verifyRes.status === 200) {
        Alert.alert("All good", "success!");
      }
    } catch (error) {
      Alert.alert("Error", "error");

      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register with webauthn on React Native!</Text>
      <Text>Email</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={{
          height: 40,
          width: 300,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <Text>Name</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        style={{
          height: 40,
          width: 300,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <Button onPress={handleRegister} title="Register"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
