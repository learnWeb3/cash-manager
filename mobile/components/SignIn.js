import React, { useState, navigation } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (value) => {
  try {
    // console.log("storing data", value);
    await AsyncStorage.setItem("@storage_token", value);
  } catch (e) {
    // lance une erreur
  }
};
// const storeDataId = async (value) => {
//   try {
//     console.log("storing id", value.toString());
//     await AsyncStorage.setItem("@storage_userid", value.toString());
//   } catch (e) {
//     console.error(e);
//     // lance une erreur
//   }
// };

// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@storage_token");
//     console.log("token", value);
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     // lance une erreur
//     console.log("error");
//     console.log(e);
//   }
// };

// const getDataId = async () => {
//   try {
//     const value = await AsyncStorage.getItem("@storage_userid");
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     // lance une erreur
//     console.log("error");
//     console.log(e);
//   }
// };

export const Login = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: "", password: "" })
  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

    const ogin = async () => {
      var data = JSON.stringify({
        email: form.email,
        password: form.password,
      });

      var config = {
        method: "post",
        url: "http://localhost:3000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(async (response) => {
          // console.log('token'+JSON.stringify(response.data.session.accessToken));
           storeData(response.data.session.accessToken);
          // storeDataId(response.data.userId);
          // console.log("display token", await getData());
          // console.log("display id", await getDataId());
          // RecupId()
        navigation.navigate("Main");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

  //   const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>CashUp</Text>
      <TextInput
        style={styles.inpu}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(val) => onChangeText("email", val)}
      />
      <TextInput
        style={styles.inpu}
        placeholder="Password"
        // secureTextEntry={true}
        // secureTextEntry={passwordVisibility}
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(val) => onChangeText("password", val)}
      />
      <TouchableOpacity
        style={[
          styles.input,
          {
            backgroundColor: "#70a5fa",
          },
        ]}
       // onPress={() => navigation.navigate("Main")}
        onPress={ogin}
      >
        <Text
          style={[
            styles.text2,
            {
              color: "white",
              fontWeight: "800",
              fontSize: 20,
            },
          ]}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          {
            fontSize: 14,
            color: "#ABB4BD",
            textAlign: "center",
            marginTop: 12,
          },
        ]}
      >
        Are you a new user?{" "}
        <Text
          style={[styles.text, styles.link]}
          //   onPress={() => navigation.navigate("SignUp")}
        >
          SignUp!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    margin: 10,
    padding: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Avenir Next",
    color: "white",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  inpu: {
    width: 350,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    paddingLeft: 15,
    padding: 5,
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Avenir Next",
    // color: "white",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A66BD",
  },
  inputTitle: {
    backgroundColor: "white",
    fontSize: 16,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    paddingVertical: 16,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    borderRadius: 10,
    elevation: 5,
  },
  link: {
    color: "#2cbd76",
    fontSize: 13,
    fontWeight: "500",
  },
  text1: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 10,
    color: "white",
  },
  icon: {
    fontSize: 23,
    color: "grey",
    position: "absolute",
    top: "60.3%",
    left: "82%",
  },
});
