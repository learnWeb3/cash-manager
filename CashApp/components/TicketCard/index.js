import * as React from "react";
import { Text, Badge, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { ProductCard } from "../ProductCard";

export const TicketCard = ({
  createdAt = "",
  totalVolume = 0,
  totalValue = 0,
  products = [],
}) => {
  const [toggled, setToggled] = React.useState(false);

  const onDetailClick = () => {
    setToggled(!toggled);
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            marginBottom: 16,
          }}
        >
          <Text variant="titleMedium">
            {moment(createdAt).format("MM/DD/YYYY - HH:MM")}
          </Text>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View>
            <Text variant="labelMedium">Total value</Text>
            <Badge
              size={36}
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-end",
                backgroundColor: "#FFFFFF",
                color: "#000",
              }}
            >
              $ {totalValue}
            </Badge>
          </View>
          <View>
            <Text variant="labelMedium">Total volume</Text>
            <Badge
              size={36}
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-end",
                backgroundColor: "#FFFFFF",
                color: "#000",
              }}
            >
              {totalVolume}
            </Badge>
          </View>
          <View>
            <Button onPress={onDetailClick}>
              <Badge
                size={64}
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "flex-end",
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                }}
              >
                <Ionicons
                  name={toggled ? "chevron-up-outline" : "chevron-down-outline"}
                  size={32}
                />
              </Badge>
            </Button>
          </View>
        </View>
      </View>
      {toggled && products && products.length
        ? products.map((ticketProduct) => (
            <ProductCard
              key={ticketProduct.product._id}
              title={ticketProduct.product.label}
              description={ticketProduct.product.description}
              quantity={ticketProduct.quantity}
              unit={ticketProduct.product.unit}
              price={ticketProduct.currentPrice?.price || 0}
              category={ticketProduct.product.category}
              editable={false}
              detailViewable={false}
            />
          ))
        : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
});
