import "./Navbar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { isLoggedIn } from "../auth/auth";
axios.defaults.withCredentials = true;
const Navbar = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});

  // const [user, setUser] = useState({});
  //   const [state, setState] = useState(false);
  //   useEffect(() => {
  //     async function verifyUser() {
  //       try {
  //         const { data } = await axios.get(
  //           "http://localhost:8000/api/verify-user",
  //           { withCredentials: true }
  //         );
  //         if (data.status === "success") {
  //           navigate("/");
  //           setState(false);
  //           setUser(data);
  //           console.log(user);
  //         } else {
  //           setState(true);
  //           setUser(data);
  //           //   navigate("/");
  //         }
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //     verifyUser();
  //   }, []);
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:8000/api/logout-user");
    if (res.data.status === "success") {
      //   console.log(isLoggedIn());
      localStorage.removeItem("shopzilla_login");
      //   window.location.reload();
      navigate("/");
      //   console.log(isLoggedIn());
    }
  };
  // const VerfyUser = ()=>{
  //     useEffect(async()=>{
  //         const res = await axios.get("http://localhost:8000/api/verify-user",{withCredentials:true})

  //         // if(res.data.status === "success"){
  //         //     a=false;
  //         //     // setUser(data.user);
  //         // }
  //         // else{
  //         //     a=true;
  //         // }
  //     })
  // }
  // VerfyUser();
  const [search, setSearch] = useState({
    search: "",
  });
  const iconClick = async () => {
    console.log(search);
    const { data } = await axios.post(
      "http://localhost:8000/api/search",
      search,
      { withCredentials: true }
    );
    console.log(data);
    setSearch({ search: "" });
    navigate("/search", { state: { pname: data.pname, pcat: data.pcat } });
  };
  return (
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
              <ShoppingCartOutlinedIcon fontSize="large" />
              Shopzilla
            </Typography>
          </NavLink>
        </div>
        <div className="search">
          <input
            type="text"
            name="search"
            value={search.search}
            onChange={(e) => {
              setSearch({ [e.target.name]: e.target.value });
            }}
            id=""
            placeholder="search..."
          />
          <SearchIcon
            className="search-icon"
            onClick={iconClick}
            fontSize="larger"
            sx={{
              fontSize: { sm: 46, lg: "6.7vh" },
            }}
          />
        </div>
        {!isLoggedIn() ? (
          <>
            <NavLink
              className="logo"
              to="/signin"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: "2vw", lg: "3vh" },
                  fontFamily: "Kanit",
                  fontWeight: 600,
                }}
              >
                <Button
                  color="primary"
                  variant="contained" /*onClick={verifyUser}*/
                >
                  Signin
                </Button>
              </Typography>
            </NavLink>
            <NavLink
              className="logo"
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                sx={{
                  fontSize: { sm: "2vw", lg: "3vh" },
                  fontFamily: "Kanit",
                  fontWeight: 600,
                }}
              >
                <Button
                  color="primary"
                  variant="outlined" /*onClick={(e)=>handleClick(e,index)}*/
                >
                  Signup
                </Button>
              </Typography>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="logo hover-border"
              to="/cart"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                sx={{
                  fontSize: { sm: "2vw", lg: "3vh" },
                  fontFamily: "Kanit",
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                <ShoppingCartOutlinedIcon fontSize="large" />
              </Typography>
            </NavLink>
            <NavLink>
              <Typography className="user-img">
                <AccountCircleIcon
                  htmlColor="black"
                  fontSize="large"
                  onClick={handleLogout}
                />
                <div
                  className="user-list"
                  style={{
                    width: "150px",
                    height: "110px",
                    position: "absolute",
                  }}
                >
                  <ul style={{ listStyleType: "none" }}>
                    <li>Profile</li>
                    <li>notifications</li>
                    <li>log-out</li>
                  </ul>
                </div>
              </Typography>
            </NavLink>
          </>
        )}
      </div>
    </>
  );
};
export default Navbar;
