import * as React from "react";
import { FlatList, View } from "react-native";
import ProductTicketListItem from "./ProductTicketListItem/index";
import { TicketTotal } from "./TicketTotal/index";

const ProductTicketList = () => {
  const [ticketProducts, setTicketProducts] = React.useState([
    {
      product: {
        id: "638485c48e4953b0e9f050bd",
        title: "Evian 1L",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 5.5,
        tva: 20,
      },
      quantity: 1,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050be",
        title: "Grapefruit",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "Kg",
        price: 2.75,
        tva: 20,
      },
      quantity: 0.565,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050fd",
        title: "Chopped steak charal",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 10.25,
        tva: 20,
      },
      quantity: 2,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bg",
        title: "Evian 1L",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 12.97,
        tva: 20,
      },
      quantity: 1,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bh",
        title: "Grapefruit",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "Kg",
        price: 2.97,
        tva: 20,
      },
      quantity: 0.565,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bi",
        title: "Chopped steak charal",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 7.63,
        tva: 20,
      },
      quantity: 2,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bj",
        title: "Evian 1L",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 1.53,
        tva: 20,
      },
      quantity: 1,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bk",
        title: "Grapefruit",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "Kg",
        price: 3.1,
        tva: 20,
      },
      quantity: 0.565,
    },
    {
      product: {
        id: "638485c48e4953b0e9f050bl",
        title: "Chopped steak charal",
        description:
          "Nostrud veniam qui est tempor eu dolore occaecat in dolor culpa proident sunt ex. Ex proident non est ullamco reprehenderit dolore enim duis aute. Ex officia mollit ea reprehenderit Lorem fugiat dolore incididunt ea et adipisicing. Veniam ad aliqua eiusmod eu occaecat elit sunt aliqua ipsum labore Lorem do. Enim laboris laborum tempor id nostrud esse. Eu dolore ut proident elit elit quis proident laborum culpa proident consectetur culpa nostrud. Nulla in sit esse consequat culpa enim quis anim.",
        unit: "u",
        price: 5.38,
        tva: 20,
      },
      quantity: 2,
    },
  ]);

  const [sumToggled, setSumToggled] = React.useState(false);

  const renderTicketProducts = ({ item: ticketProduct }) => {
    return (
      <ProductTicketListItem
        key={ticketProduct.product.id}
        product={ticketProduct.product}
        quantity={ticketProduct.quantity}
      />
    );
  };
  return (
    <>
      <View style={{ height: sumToggled ? "50%" : "80%" }}>
        <FlatList
          data={ticketProducts}
          renderItem={renderTicketProducts}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ height: sumToggled ? "50%" : "20%" }}>
        <TicketTotal
          ticketProducts={ticketProducts}
          sumToggled={sumToggled}
          setSumToggled={setSumToggled}
        />
      </View>
    </>
  );
};
export default ProductTicketList;
