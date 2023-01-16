import * as React from "react";
import ScreenLayout from "../../layouts/ScreenLayout";
import NewTicketForm from "../../components/NewTicketForm/index";

const NewTicketScreen = ({ route, navigation }) => {

  console.log(route, navigation)
  return (
    <ScreenLayout >
      <NewTicketForm />
    </ScreenLayout>
  );
};
export default NewTicketScreen;
