import "./Navbar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Typography, colors } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { isLoggedIn } from "../auth/auth";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import VerifiedIcon from "@mui/icons-material/Verified";

axios.defaults.withCredentials = true;
const Navbar = ({ data }) => {
  const [pro, setPro] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState({ status: true });
  // const [subs, setSubs] = useState([data.subs]);
  // if (data.subs) {
  //   // console.log(data.length);
  //   setSubs(data.subs);
  // }
  // let a =1;
  if (isLoggedIn() && user.status === true) {
    axios
      .get("http://localhost:8000/api/verify-user")
      .then(({ data }) => {
        // console.log(data.user[0].subs);
        setUser(data.user[0]);
        // setSubs(user.subs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

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
    if (res) {
      if (res.data.status === "success") {
        //   console.log(isLoggedIn());
        localStorage.removeItem("shopzilla_login");
        localStorage.removeItem("is");
        //   window.location.reload();
        navigate("/");
        //   console.log(isLoggedIn());
      } else {
        localStorage.removeItem("shopzilla_login");
        localStorage.removeItem("is");
        toast.error("You are already Logged out :-(", {
          duration: 4000,
          position: "top-center",
        });
        navigate("/");
      }
    } else {
      localStorage.removeItem("shopzilla_login");
      localStorage.removeItem("is");
      toast.error("You are already Logged out :-(", {
        duration: 4000,
        position: "top-center",
      });
      navigate("/");
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

    if (data) {
      console.log(data);
      setSearch({ search: "" });
      navigate("/search", { state: { pname: data.pname, pcat: data.pcat } });
    } else {
      toast.error("Something went wrong :-(", {
        duration: 4000,
        position: "top-center",
      });
      navigate("/");
    }
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
                  variant="contained" /*onClick={(e)=>handleClick(e,index)}*/
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
                {user.profile ? (
                  <>
                    <img
                      className="user-profile"
                      src={"http://localhost:8000/static/" + user.profile}
                      alt="user-logo"
                    />
                    {localStorage.getItem("is") ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0px",
                          marginLeft: "37px",
                        }}
                      >
                        <VerifiedIcon
                          sx={{
                            color: "white",
                          }}
                        />
                      </Box>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <AccountCircleIcon htmlColor="black" fontSize="large" />
                )}
                <div
                  className="user-list"
                  style={{
                    width: "150px",
                    height: "110px",
                    position: "absolute",
                  }}
                >
                  <table style={{ listStyleType: "none" }}>
                    <tr>
                      <td className="hover-pointer">
                        <Link to="/my-profile">My Profile</Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="hover-pointer">
                        <Link to="/my-order">My Orders</Link>
                      </td>
                    </tr>
                    {localStorage.getItem("is") ? (
                      <>
                        <tr>
                          <td className="hover-pointer">
                            <Link to="/s">Premium User</Link>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="hover-pointer">
                            <Link to="/subs">Get Premium</Link>
                          </td>
                        </tr>
                      </>
                    )}

                    <tr>
                      <td onClick={handleLogout} className="hover-pointer">
                        Logout
                      </td>
                    </tr>
                  </table>
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
