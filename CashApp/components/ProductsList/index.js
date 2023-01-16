import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "../ProductCard/index";
import { View, FlatList } from "react-native";
import { routes } from "../../routes/index";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { setProducts } from "../../stores/reducers/productsReducer";
import { getProducts } from "../../http/cash-manager.api";

export default function ProductsList({ navigation }) {
  const dispatch = useDispatch();
  const [refreshProductsCounter, setRefreshProductsCounter] = useState(0);
  const currentUser = useSelector((state) => state.currentUser.value);
  const products = useSelector((state) => state.products.value);

  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      getProducts(currentUser.accessToken).then((data) => {
        dispatch(setProducts(data));
      });
    }
  }, [refreshProductsCounter, currentUser]);

  const renderProducts = ({ item: product }) => {
    return (
      <ProductCard
        key={product._id}
        title={product.label}
        description={product.description}
        quantity={product.currentStock}
        unit={product.unit}
        price={product.currentPrice?.price || 0}
        category={product.category}
        editable={false}
        detailViewable={true}
        onDetailClick={() =>
          navigation.navigate(routes.products.name, {
            product: product,
          })
        }
      />
    );
  };
  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id}
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
            setRefreshProductsCounter(refreshProductsCounter + 1);
          }}
        >
          <Ionicons name={"refresh-outline"} size={24} />
        </Button>
      </View>
    </View>
  );
}
