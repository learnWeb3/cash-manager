import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { ProductsComponent } from "./ProductsComponent";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  

export default function ProductsComponent() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = React.useState();

  const PullMe = () =>{
    setRefresh(true)
    
    setTimeout(()=>{
      setRefresh(false)
    },1500)
      AllProduct();
  }
  const AllProduct = async () => {
    const Token =  await AsyncStorage.getItem('@storage_token')

    console.log('Storage Token retrived ')
    console.log('token: '+Token);
    var config = {
      method: "get",
      url: "http://localhost:3000/api/products?deleted=0",
      headers: {
        Authorization:
          "Bearer " + Token,
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    AllProduct();
  }, []);
  return (
    <View  style={styles.scrollview} >
    <ScrollView  
    refreshControl={
      <RefreshControl
      refreshing={refresh}
      onRefresh={()=>PullMe()}
      />
    }>
    <TouchableOpacity style={styles.container} >                           
      {isLoading ? <ActivityIndicator/> : (
        <FlatList                   
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={styles.product}>
                            <Image
       style={styles.image}
        source={require("../assets/icon.png")}
    />
            <Text style={styles.textProduct}>{item.label}</Text>
            <Text style={styles.textProduct}> Stock :{item.currentStock}</Text>
          </View>
        )}
  
        />
      )}
      </TouchableOpacity>
      </ScrollView>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text1: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 10,
    color: "#3A66BD",
  },
  scrollview: {
    height: "64%",
  },
  text2: {
    fontSize: 32,
    fontWeight: "900",
    margin: 15,
    color: "black",
  },
  text3: {
    fontSize: 15,
    fontWeight: "900",
    margin: 15,
    color: "white",
  },
  textProduct: {
    fontSize: 14,
    margin: 15,
    color: "black",
  },
  Header: {
    top: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchbar: {
    width: "93%",
    height: "5%",
    backgroundColor: "white",
    paddingLeft: 15,
    padding: 5,
    color: "black",
    fontSize: 16,
    justifyContent: "center",
    // alignItems: "center",
    fontWeight: "500",
    fontFamily: "Avenir Next",
    marginTop: 40,
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  addproduct: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "40%",
    width: "49%",
    borderRadius: 7,
    marginRight: 10,
    backgroundColor: "#3A66BD",
    marginTop: 10,
  },
  scanproduct: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "40%",
    width: "49%",
    borderRadius: 7,
    backgroundColor: "#3A66BD",
    marginRight: 10,
    marginTop: 10,
  },
  Card: {
    height: 200,
    flexDirection: "row",
    marginHorizontal: 15,
  },
  product: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "93%",
    height: 100,
    margin: 15,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#A0A0A0",
    shadowOpacity: 1,
    flexDirection: "row",
    shadowRadius: 10,
  },
  icon: {
    fontSize: 25,
    color: "grey",
    position: "absolute",
    top: "30%",
    left: "95%",
  },
  image: {
    height: "100%",
    width: "25%",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
});
