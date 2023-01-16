import * as React from "react";
import ScreenLayout from "../../layouts/ScreenLayout";
import NewProductForm from "../../components/NewProductForm/index";

const NewProductScreen = ({ route, navigation }) => {
  return (
    <ScreenLayout >
      <NewProductForm />
    </ScreenLayout>
  );
};
export default NewProductScreen;
