import * as React from "react";
import { InventoryManager } from "../../components/InventoryManager";
import ScreenLayout from "../../layouts/ScreenLayout";

const ManageInventoryScreen = ({ route, navigation }) => {
  return (
    <ScreenLayout>
      <InventoryManager />
    </ScreenLayout>
  );
};
export default ManageInventoryScreen;
