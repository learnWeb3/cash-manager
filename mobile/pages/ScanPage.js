import * as React from "react";
import { ScanManager } from "../Components/ScanManager";
import { MainLayout } from "../layouts/MainLayout";

export const ScanPage = () => {
  return (
    <MainLayout>
      <ScanManager />
    </MainLayout>
  );
};
