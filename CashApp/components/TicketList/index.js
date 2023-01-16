import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../ProductCard/index";
import { View, FlatList } from "react-native";
import { routes } from "../../routes/index";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { setTickets } from "../../stores/reducers/ticketsReducer";
import { getTickets } from "../../http/cash-manager.api";
import { TicketCard } from "../TicketCard";

export default function TicketList({ navigation }) {
  const dispatch = useDispatch();
  const [refreshTicketsCounter, setRefreshTicketsCounter] = useState(0);
  const currentUser = useSelector((state) => state.currentUser.value);
  const tickets = useSelector((state) => state.tickets.value);

  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      getTickets(currentUser.accessToken).then((data) => {
        dispatch(setTickets(data));
      });
    }
  }, [refreshTicketsCounter, currentUser]);

  const renderTickets = ({ item: ticket }) => {
    function calculateSum(ticketProducts = []) {
      return (
        Math.floor(
          ticketProducts.reduce((sum, ticketProduct) => {
            return (
              sum + ticketProduct.currentPrice.price * ticketProduct.quantity
            );
          }, 0) * 100
        ) / 100
      );
    }

    function calculateVolume(ticketProducts = []) {
      return (
        Math.floor(
          ticketProducts.reduce((sum, ticketProduct) => {
            return sum + ticketProduct.quantity;
          }, 0) * 100
        ) / 100
      );
    }

    return (
      <TicketCard
        totalVolume={calculateVolume(ticket.products)}
        totalValue={calculateSum(ticket.products)}
        products={ticket.products}
        createdAt={new Date(ticket.createdAt)}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={tickets}
        renderItem={renderTickets}
        keyExtractor={(item) => item._id}
      />
      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            setRefreshTicketsCounter(refreshTicketsCounter + 1);
          }}
        >
          <Ionicons name={"refresh-outline"} size={24} />
        </Button>
      </View>
    </View>
  );
}
