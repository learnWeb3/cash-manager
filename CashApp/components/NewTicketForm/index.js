import * as React from "react";
import { FlatList, View } from "react-native";
import { NewTicketFormTotal } from "../NewTicketFormTotal/index";
import { searchProducts } from "../../http/cash-manager.api";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard } from "../ProductCard/index";

const NewTicketForm = () => {
  const currentUser = useSelector((state) => state.currentUser.value);
  const [ticketProducts, setTicketProducts] = React.useState([]);

  const [sumToggled, setSumToggled] = React.useState(false);

  const [inputRefValidation, setInputRefValidations] = React.useState({
    errors: [],
    isValid: true,
  });
  const [inputRef, setInputRef] = React.useState("");

  React.useEffect(() => {
    console.log(ticketProducts);
  }, [ticketProducts]);

  React.useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      searchProducts(currentUser.accessToken, inputRef).then((products) => {
        if (products.length && products.length === 1) {
          const producTicketIndex = ticketProducts.findIndex(
            (ticketProduct) => ticketProduct.product.ref === inputRef
          );
          let updatedTicketProducts = [...ticketProducts];
          if (producTicketIndex > -1) {
            updatedTicketProducts.splice(producTicketIndex, 1, {
              ...updatedTicketProducts[producTicketIndex],
              quantity: updatedTicketProducts[producTicketIndex].quantity + 1,
            });
          } else {
            updatedTicketProducts = [
              ...updatedTicketProducts,
              {
                product: {
                  ...products[0],
                  price: products[0].currentPrice.price,
                },
                quantity: 1,
              },
            ];
          }
          setTicketProducts(updatedTicketProducts);
          setInputRefValidations({
            errors: [],
            isValid: true,
          });
        } else {
          setInputRefValidations({
            errors: ["Invalid product reference"],
            isValid: false,
          });
        }
      });
    } else {
      return;
    }
  }, [inputRef]);

  const handleRemoveProduct = (ref) => {
    const producTicketIndex = ticketProducts.findIndex(
      (product) => product.product.ref === ref
    );
    let updatedTicketProducts = [...ticketProducts];
    updatedTicketProducts.splice(producTicketIndex, 1);
    setTicketProducts(updatedTicketProducts);
  };

  const handleChangeProductQuantity = (ref, value = 0) => {
    const producTicketIndex = ticketProducts.findIndex(
      (product) => product.product.ref === ref
    );
    let updatedTicketProducts = [...ticketProducts];
    updatedTicketProducts.splice(producTicketIndex, 1, {
      ...updatedTicketProducts[producTicketIndex],
      quantity: value,
    });
    setTicketProducts(updatedTicketProducts);
  };

  const renderTicketProducts = ({ item: { product, quantity } }) => {
    return (
      <ProductCard
        key={product._id}
        title={product.label}
        description={product.description}
        quantity={`${quantity}`}
        unit={product.unit}
        price={product.currentPrice?.price || 0}
        category={product.category}
        editable={true}
        deletable={true}
        detailViewable={false}
        onDelete={() => handleRemoveProduct(product.ref)}
        setQuantity={(value) =>
          handleChangeProductQuantity(product.ref, value ? +value : 0)
        }
      />
    );
  };
  return (
    <>
      <View
        style={{
          height: sumToggled ? "30%" : "60%",
          backgroundColor: "#f9f9f9",
        }}
      >
        {ticketProducts.length ? (
          <FlatList
            data={ticketProducts}
            renderItem={renderTicketProducts}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Ionicons color="#5393ff" name={"basket-outline"} size={96} />
          </View>
        )}
      </View>
      <View
        style={{
          height: sumToggled ? "70%" : "40%",
        }}
      >
        <NewTicketFormTotal
          ticketProducts={ticketProducts}
          setTicketProducts={setTicketProducts}
          sumToggled={sumToggled}
          setSumToggled={setSumToggled}
          onInputRef={(value) => setInputRef(value)}
          inputRef={inputRef}
          inputRefErrors={inputRefValidation.errors}
        />
      </View>
    </>
  );
};
export default NewTicketForm;
