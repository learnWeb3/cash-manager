import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { routes } from "../../routes/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "../../screens/ProfileScreen/index";
import DataLoader from "../DataLoader/index";
import TicketsScreen from "../../screens/TicketsScreen/index";
import ProductsScreen from "../../screens/ProductsScreen/index";
import NewTicketScreen from "../../screens/NewTicket/index";
import NewProductScreen from "../../screens/NewProductScreen/index";
import ScreenHeader from "../ScreenHeader";
import ManageInventoryScreen from "../../screens/ManageInventoryScreen/index";

const Tab = createBottomTabNavigator();

export default function AuthenticatedScreenRouter() {
  return (
    <DataLoader>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name={routes.tickets.name}
            options={{
              tabBarShowLabel: false,
              title: routes.tickets.title,
              header: (props) => <ScreenHeader {...props} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <TicketsScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name={routes.products.name}
            options={{
              tabBarShowLabel: false,
              title: routes.products.title,
              header: (props) => (
                <ScreenHeader
                  {...props}
                  onBackClick={
                    props?.route?.params?.product
                      ? () =>
                          props.navigation.navigate(routes.products.name, {})
                      : null
                  }
                />
              ),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="playlist-edit"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <ProductsScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name={routes.newTicket.name}
            options={{
              tabBarShowLabel: false,
              title: routes.newTicket.title,
              header: (props) => <ScreenHeader {...props} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="credit-card-scan-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <NewTicketScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name={routes.newProduct.name}
            options={{
              tabBarShowLabel: false,
              title: routes.newProduct.title,
              header: (props) => <ScreenHeader {...props} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="barcode-scan"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <NewProductScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name={routes.profile.name}
            options={{
              tabBarShowLabel: false,
              title: routes.profile.title,
              header: (props) => <ScreenHeader {...props} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <ProfileScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name={routes.manageInventory.name}
            options={{
              tabBarShowLabel: false,
              title: routes.manageInventory.title,
              header: (props) => <ScreenHeader {...props} />,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="library"
                  color={color}
                  size={size}
                />
              ),
            }}
          >
            {(props) => <ManageInventoryScreen {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </DataLoader>
  );
}
