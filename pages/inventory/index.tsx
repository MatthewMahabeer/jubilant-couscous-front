import React from "react";
import { Box, TextField } from "@mui/material";
import Header from "../../components/Header";
import Machine from "./machine";

const Inventory = () => {
  return (
    <Box m="20px">
      <Header title="INVENTORY" subtitle="Manage your inventory" />
      <Machine />
    </Box>
  );
};

export default Inventory;
