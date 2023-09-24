import "./Navbar.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";

const Navbar = () =>{
    const[search , setSearch] = useState()
    const iconClick = () =>{
        alert(search)
    }
    return(
        <>
            <div className="nav">
                <div className="logo hover-border">
                    <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
                        <Typography
                            sx={{
                            fontSize: { sm: 36, lg: "1.5" },
                            fontFamily: "jockey one",
                            fontWeight: 500,
                            textDecoration: "none",
                            }}
                        >
                            <ShoppingCartOutlinedIcon fontSize="large"/>
                            Shopzilla
                        </Typography>
                    </NavLink>
                </div>
                <div className="search">
                    <input type="text" name="search" value={search} onChange={e=>{setSearch(e.target.value)}} id="" placeholder="search..."/>
                    <SearchIcon 
                        className="search-icon" onClick={iconClick} fontSize="larger" 
                        sx={{
                            fontSize:{sm:46,lg:"6.7vh"}
                        }}
                    />
                </div>
                <NavLink className="logo hover-border" to="/signin" style={{ textDecoration: "none", color: "black" }} >
                    <Typography
                      variant="h6"
                        sx={{
                            fontSize: { sm: "2vw", lg: "3vh" },
                            fontFamily: "Kanit",
                            fontWeight: 600,
                        }}
                        >
                        Signin
                    </Typography>
                </NavLink>
                <NavLink className="logo hover-border" to="/signup" style={{ textDecoration: "none", color: "black" }} >
                    <Typography
                        sx={{
                            fontSize: { sm: "2vw", lg: "3vh" },
                            fontFamily: "Kanit",
                            fontWeight: 600,
                        }}
                        >
                        Signup
                    </Typography>
                </NavLink>
                <NavLink>
                    <Typography>
                        <AccountCircleIcon htmlColor="black" fontSize="large" />
                        <div className="user">
                        </div>
                    </Typography>
                </NavLink>
            </div>
        </>
    )
}
export default Navbar;