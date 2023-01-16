import * as React from "react";
import ScreenLayout from "../../layouts/ScreenLayout";
import TicketList from "../../components/TicketList/index";

const TicketsScreen = ({ route, navigation }) => {
  return (
    <ScreenLayout>
      <TicketList />
    </ScreenLayout>
  );
};
export default TicketsScreen;
