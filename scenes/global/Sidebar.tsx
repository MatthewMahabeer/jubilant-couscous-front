import { Dispatch, SetStateAction, useState } from "react";
import {ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, useTheme, Typography } from '@mui/material';
import { tokens } from '../../utils/theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import {HomeOutlined, ContactsOutlined, ReceiptOutlined, PersonOutlineOutlined, CalendarTodayOutlined, HelpOutlineOutlined, PrintOutlined, MenuOutlined} from "@mui/icons-material";
import Link from "next/link";

type SidebarItemProps = {
    title: string;
    to: string;
    icon: any;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected }: SidebarItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div>
        <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
        style={{ backgroundColor: 'transparent' }}
        >
        <Link href={to}>
        <Typography style={{color: selected == title ?colors.blueAccent[400] : 'white'}}>{title}</Typography>
        </Link>

        </MenuItem>
        </div>
    );
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState<string>('Dashboard');
    

    return (
    <Box
    sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }} 
    >
    <ProSidebar collapsed={collapsed}>
    <Menu>
    <MenuItem
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
     {!collapsed && (
        <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
                <img
                alt="profile-user"
                width="100px"
                height="100px"
                //src = public/user.png
                src="/user.png"
                style={{ cursor: "pointer", borderRadius: "50%" }}
                >
                </img>
            </Box>
            <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                    Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                </Typography>
            </Box>
        </Box>
     )}
     <Box paddingLeft={collapsed ? undefined : "10%"}>
        <Item 
        title="Dashboard"
        to="/"
        icon={<HomeOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
        <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "20px 0 5px 25px" }}
        
        >Data</Typography>
        <Item 
        title="Manage Team"
        to="/teams"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
        />
          <Item
        title="Manage Inventory"
        to="/inventory"
        icon={<PrintOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
        <Item
        title="Contacts Information"
        to="/contacts"
        icon={<ContactsOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
        <Item
        title="Invoices"
        to="/invoices"
        icon={<ReceiptOutlined />}
        selected={selected}
        setSelected={setSelected}
        />

        <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "20px 0 5px 25px" }}
        >Pages</Typography>
        <Item
        title="User Profile"
        to="/profile"
        icon={<PersonOutlineOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
        <Item
        title="Calendar"
        to="/calendar"
        icon={<CalendarTodayOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
        <Item
        title="Help Center"
        to="/help"
        icon={<HelpOutlineOutlined />}
        selected={selected}
        setSelected={setSelected}
        />
     </Box>
    </Menu>
    </ProSidebar>
    </Box>
    );
}

export default Sidebar;