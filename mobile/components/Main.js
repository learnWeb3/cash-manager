import { LogBox } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import { TicketPage } from "../pages/TicketPage";
import { ScanPage } from "../pages/ScanPage";
import ProductsComponent from "./ProductsComponent";

LogBox.ignoreAllLogs();
//Screen names
const home = "Home";
const login = "Profile";
const scan = "Scanner";
const profile = "Profile";
const ticket = "ticket";

const Tab = createBottomTabNavigator();
//   const Stack = createNativeStackNavigator();

export const Main = () => {
  const [value, setUser] = useState(undefined);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#3A66BD",
        inactiveTintColor: "#3A66BD",
        labelStyle: { fontSize: 10 },
        // tabBarStyle: {padding: 10, height: 70, borderTopWidth: 0 },
      }}
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "white",
        tabBarStyle: { borderTopWidth: 0, height: 100 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === login) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === scan) {
            iconName = focused ? "scan" : "barcode-outline";
          } else if (rn === profile) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === ticket) {
            iconName = focused ? "card" : "card-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={home}
        component={HomePage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={scan}
        component={ScanPage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={ticket}
        component={TicketPage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={profile}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};
