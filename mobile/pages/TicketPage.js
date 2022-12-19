import * as React from "react";
import ProductTicketList from "../Components/ProductTicketList";
import { MainLayout } from "../layouts/MainLayout";

export const TicketPage = () => {
  return (
    <MainLayout>
      <ProductTicketList />
    </MainLayout>
  );
};
