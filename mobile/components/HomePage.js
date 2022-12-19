import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProductsComponent from "./ProductsComponent";

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.text1}>CashUp</Text>
      </View>
      <TouchableOpacity style={styles.searchbar}>
        <Ionicons name="search" style={styles.icon} />
        <TextInput
          placeholder="Search Here"
          autoCapitalize="none"
          placeholderTextColor="grey"
        />
      </TouchableOpacity>

      <Text style={styles.text2}>Products</Text>
      <ProductsComponent/>
      <View style={styles.Card}>
        <TouchableOpacity style={styles.addproduct}
        onPress={() => navigation.navigate("AddProduct")}
>
          <Text style={styles.text3}>Ajouter un produit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanproduct}
        onPress={() => navigation.navigate('Main', { screen: 'Scanner' })}
        >
          <Text style={styles.text3}>scanner un produit</Text>
        </TouchableOpacity>
      </View>
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
