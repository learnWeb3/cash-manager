import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ProfilePage() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [Id, setId] = useState();
  const [form, setForm] = useState({ username: "", email: "" });
  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  //   async function Editprofilapi(){
  //     console.log("test");
  //     const idvalue = await AsyncStorage.getItem('@storage_userid')
  //     const Token = await AsyncStorage.getItem('@storage_token')
  //     console.log(Token);
  //     var data = JSON.stringify({
  //       "username":form.username,
  //       "email":form.email
  //     });

  //     var config = {
  //       method: 'put',
  //       url: 'http://4.233.114.115:4000/api/v1/users/'+idvalue,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer '+Token
  //       },
  //       data : data
  //     };

  //     axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //       alert('modified');
  //     })
  //     .catch(function (error) {
  //       console.log('ERROR'+error);
  //       alert("error");
  //     });
  // }

    async function DataProfil() {
      try {
        // const Id = await AsyncStorage.getItem('@storage_userid')
        // setId(Id)
        // const Token = await AsyncStorage.getItem('@storage_token')
          var config = {
            method: 'get',
            url: 'http://localhost:3000/medias/638dd0feb57da0cfdd512df0',
            headers: {
              'Authorization': 'Bearer '+Token
            }
          };
          return await axios(config)
          .then(function (response) {
             setData(response.data.data)
            return("DATA", JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log("ERROR", error);
          });
        
      } catch(e) {
        console.log('error')
        console.log(e)
      }
    };
    useEffect(() => {
       DataProfil()
    })
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require(".././../../time-management/mobile/assets/logo.png")}
      /> */}
      {/* {data && <Text style={styles.text}>{data.username}</Text>} */}
      <TextInput
        placeholderTextColor="#1d59a8"
        style={styles.inpu}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(val) => onChangeText("username", val)}
      ></TextInput>
      <TextInput
        placeholderTextColor="#1d59a8"
        style={styles.inpu}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(val) => onChangeText("email", val)}
      />

      <TouchableOpacity
        style={[
          styles.input,
          {
            backgroundColor: "#3A66BD",
          },
        ]}
        // onPress={Editprofilapi}
      >
        <Text
          style={[
            styles.text,
            {
              color: "#FFF",
              fontWeight: "800",
              fontSize: 20,
            },
          ]}
        >
          Update Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={() => {
      //         alert("logout");
      //         AsyncStorage.removeItem('@storage_token');
      //         AsyncStorage.removeItem('@storage_userid');
      //         console.log(Id);
              navigation.navigate('login');

          }}
      >
        <Text style={styles.text2}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderRadius: 30,
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
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 30,
    padding: 15,
  },
  text2: {
    color: "red",
    fontSize: 20,
    padding: 15,
    textDecorationLine: "underline",
  },
});
