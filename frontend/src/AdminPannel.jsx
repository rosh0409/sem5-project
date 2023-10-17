import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import PeopleIcon from '@mui/icons-material/People';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import QrCodeIcon from "@mui/icons-material/QrCode";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Grid } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import Addpro from "./components/Addpro";
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import {useNavigate} from "react-router-dom";
// import axios from 'axios';
// import {toast} from "react-hot-toast"

const AdminPanel = () => {
  // const navigate = useNavigate()
  // const[user,setUser] = useState()
  const [open, setOpen] = useState(false);
  // const linkStyle = {
  //     textDecoration: "none", // Remove underline
  //     color: "inherit", // Inherit text color from parent
  //   };
  //   async function a (){
  //     const data = Cookies.get("token")
  //   console.log(data)
  //   const res = await axios.post("http://localhost:8000/user",{"token":data})
  //   console.log(res.data.user)
  //   setUser(res.data)
  //   // }).catch((err)=>{
  //     // console.log(err.message)
  //   // })
  // }
  // a();

  // console.log("user",user)
  //  const handleLogout = ()=>{
  //   Cookies.remove("token",{path:""})
  //   navigate("/")
  //  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Box>
          <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box m={5} sx={{ position: "sticky" }}>
              <Avatar
                onClick={() => setOpen(true)}
                sx={{ width: "100px", height: "100px" }}
                src={`http://localhost:8000/1694828763799Nitro_Wallpaper_5000x2813.jpg`}
              />

              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                onClose={() => {
                  setOpen(false);
                }}
                open={open}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem /*onClick={handleLogout}*/>Logout</MenuItem>
              </Menu>
            </Box>
            <Box position={"fixed"}>
              <List>
              <NavLink to="/admin">
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                </NavLink>
              </List>

              {/* <Typography variant='p' sx={{position:"relative",float:"left"}}>Inventory</Typography> */}
              <NavLink to="/addpro">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a">
                      <ListItemIcon>
                        <Inventory2Icon />
                      </ListItemIcon>
                      <ListItemText primary="Add Product" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink to="/manage">
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <EditCalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage" />
                  </ListItemButton>
                </ListItem>
              </List>
</NavLink>
              {/* <Typography variant='p' sx={{position:"relative",float:"left"}}>Data</Typography> */}

              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role Based Access" />
                  </ListItemButton>
                </ListItem>
              </List>

              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <QrCodeIcon />
                    </ListItemIcon>
                    <ListItemText primary="QR Entry" />
                  </ListItemButton>
                </ListItem>
              </List>

              {/* <Typography variant='p' sx={{position:"relative",float:"left"}}>Analysis Graph</Typography> */}

              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bar" />
                  </ListItemButton>
                </ListItem>
              </List>

              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pie" />
                  </ListItemButton>
                </ListItem>
              </List>

              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/">
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <Switch />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Routes>
          <Route exact path="/addpro" element={<Addpro />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
