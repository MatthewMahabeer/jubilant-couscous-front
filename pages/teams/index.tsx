import React, { useState } from "react";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";
import { mockDataTeam } from "../../mockData";
import { tokens } from "../../utils/theme";
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined } from "@mui/icons-material";

const Team = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 1},
        { field: "name", headerName: "Name", flex: 1},
        { field: "email", headerName: "Email", flex: 1},
        { field: "age", headerName: "Age", flex: 1},
        { field: "phone", headerName: "Phone Number", flex: 1},
        { field: "accessLevel", headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { access } }: any) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                bgcolor={
                  access === "admin"
                    ? colors.greenAccent[600]
                    : access === "manager"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
                >
                {access === "admin" && <AdminPanelSettingsOutlined />}
                {access === "manager" && <SecurityOutlined />}
                {access === "user" && <LockOpenOutlined />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {access}
                </Typography>
                </Box>
            )
        }
    },
    ];

  return (
    <div>
      <Box m="20px">
          <Header title="TEAM" subtitle="Welcome to your team" />
          <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
      </Box>{" "}
    </div>
  );
};

export default Team;
