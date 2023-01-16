import * as React from "react";
import ScreenLayout from "../../layouts/ScreenLayout";
import ProductsList from "../../components/ProductsList/index";
import NewProductForm from "../../components/NewProductForm";
const ProductsScreen = ({ route, navigation }) => {
  return (
    <ScreenLayout >
      {route?.params?.product ? (
        <NewProductForm product={route.params.product} />
      ) : (
        <ProductsList navigation={navigation} />
      )}
    </ScreenLayout>
  );
};
export default ProductsScreen;
