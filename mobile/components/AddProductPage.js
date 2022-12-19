import React, { useState, navigation, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function AddProductPage() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("");
  const [ids, setIds] = useState([]);
  const [productForm, setProductForm] = useState({});
  const [category, setCategory] = useState([]);

  const onChangeText = (key, inputText) => {
    setProductForm({ ...productForm, [key]: inputText });
  };
  const idsTab = [];

  const productData = async () => {
    const Token = await AsyncStorage.getItem("@storage_token");

    setProductForm({
      label: productForm.label,
      unit: productForm.unit,
      // ref: productForm.ref,
      // currentPrice: productForm.currentPrice,
      // currentStock: productForm.currentStock,
      category: productForm.category,
    });

    // var data = {
    //   label: productForm.label,
    //   unit: productForm.unit,
    //   // ref: productForm.ref,
    //   // currentPrice: productForm.currentPrice,
    //   // currentStock: productForm.currentStock,
    //   category: productForm.category,
    // };
    // setProductForm(data);
    console.log(productForm);

    var config = {
      method: "post",
      url: "http://localhost:3000/api/products",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
      data: productForm,
    };
    axios(config)
      .then(async (response) => {
        console.log(response.data);
        navigation.navigate("Main");
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert("Information erroné ou manquante")
      });
  };

  const AllCategory = async () => {
    const Token = await AsyncStorage.getItem("@storage_token");
    var config1 = {
      method: "get",
      url: "http://localhost:3000/api/product-categories",
      headers: {
        Authorization: "Bearer " + Token,
      },
    };
    axios(config1)
      .then((response) => {
        setCategory(response.data);
        // response.data.forEach((item) => {
        //   idsTab.push({ item });
        // });
        // setIds(idsTab);
        // console.log(ids);
      })
      .catch((error) => {
        // handle error
      });
  };
  useEffect(() => {
    AllCategory();
  }, []);
  return (
    <View style={styles.container}>
      <Picker
        style={{ height: 55, width: 350 }}
        itemStyle={{
          backgroundColor: "white",
          color: "black",
          fontFamily: "Ebrima",
          fontSize: 17,
          marginTop: -120,
        }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          onChangeText("category", itemValue);
        }}
      >
        {category.map((cat) => (
          <Picker.Item label={cat.label} value={cat.id} key={cat.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.inpu}
        placeholder="Label"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(inputText) => onChangeText("label", inputText)}
      />
      <TextInput
        style={styles.inpu}
        placeholder="unit"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(inputText) => onChangeText("unit", inputText)}
      />
      {/* <TextInput
        style={styles.inpu}
        placeholder="ref"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(inputText) => onChangeText("ref",inputText)}
      />
      <TextInput
        style={styles.inpu}
        placeholder="Price"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(inputText) => onChangeText("currentPrice",inputText)}
      />
      <TextInput
        style={styles.inpu}
        placeholder="Stock"
        autoCapitalize="none"
        placeholderTextColor="grey"
        onChangeText={(inputText) => onChangeText("currentStock",inputText)}
      /> */}

      <TouchableOpacity
        style={[styles.input, { backgroundColor: "#70a5fa" }]}
        onPress={productData}
      >
        <Text
          style={[
            styles.text2,
            { color: "white", fontWeight: "700", fontSize: 20 },
          ]}
        >
          Ajouter le produit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Text>retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 310,
    height: 55,
    margin: 20,
    padding: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Avenir Next",
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
    color: "#3A66BD",
    borderWidth: 1,
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
  Picker: {
    width: 350,
    height: 55,
    //margin: 50,
    borderWidth: 1,
    // fontWeight: "500",
    // fontFamily: "Avenir Next",
    // marginTop: 15,
    // flexDirection: "row",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
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
