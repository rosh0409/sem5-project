import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { isLoggedIn } from "../auth/auth";
import { payment } from "../utils/utils";
import toast from "react-hot-toast";
import Footer from "./Footer";

const CheckoutAll = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [user, setUser] = useState({ status: true });
  const [orderUser, setOrderUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const location = useLocation();
  const { product } = location.state;
  const [total, setTotal] = useState(0);

  const totalPrice = () => {
    let sum = 0;
    product.forEach((p) => {
      sum += Number(p.pprice);
    });
    // console.log(sum);
    // setTotal(sum);
    localStorage.getItem("is") ? (sum = sum + 50) : (sum = sum + 100);
    // console.log(sum);
    return sum;
  };
  // setCart(product);
  // setProduct(location.state.product);
  console.log("product", product);
  console.log("state", location.state);

  if (isLoggedIn() && user.status === true) {
    axios
      .get("http://localhost:8000/api/verify-user")
      .then(({ data }) => {
        // console.log(data.user[0]);
        setUser(data.user[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handlePay = async () => {
    // const res = await axios.get("http://localhost:8000/api/verify-user");
    // console.log(res);
    // if (res.data.status === "success") {
    if (isLoggedIn()) {
      console.log(orderUser);
      const productAll = {
        _id: product[0]._id,
        pname: "All",
        pprice: totalPrice(),
      };
      payment(productAll, user, orderUser)
        .then(() => {
          navigate("/payment-succesfull");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      toast.error("Please login fist :-(", {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            padding: "120px",
          }}
        >
          <h1>Order Details</h1>
          {product.map((product, index) => {
            return (
              <>
                <Card
                  sx={{
                    width: "100%",
                    padding: "40px",
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        fontSize: "20px",
                      }}
                    >
                      <b>{index + 1 + " . "} Product Name </b> :{" "}
                      <span>{product.pname}</span>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "20px",
                      }}
                    >
                      <b>Price</b> :{" "}
                      <span>
                        {"Rs "}
                        {localStorage.getItem("is")
                          ? product.pprice * 0.95
                          : product.pprice}
                      </span>
                    </Box>
                    <Box
                      sx={{
                        fontSize: "20px",
                      }}
                    ></Box>

                    <Box
                      sx={{
                        fontSize: "30px",
                        fontWeight: "900",
                        color: "blue",
                      }}
                    >
                      Total : Rs &nbsp;
                      {localStorage.getItem("is")
                        ? Number(product.pprice) * 0.95
                        : Number(product.pprice)}
                    </Box>
                  </Stack>
                </Card>
              </>
            );
          })}
          <b>Delivery Charges </b>:{" "}
          <span>Rs {localStorage.getItem("is") ? 50 : 100}</span>
          <h3>
            Total Cart value is :{" "}
            {localStorage.getItem("is") ? totalPrice() * 0.95 : totalPrice()}
          </h3>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Fill Details to Proceed</h1>
          <Card
            sx={{
              width: "50%",
              padding: "50px",
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={orderUser.name}
                type="text"
                required
                onChange={(e) => {
                  setOrderUser({
                    ...orderUser,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                label="Phone"
                name="mobile"
                value={orderUser.mobile}
                type="Number"
                required
                onChange={(e) => {
                  setOrderUser({
                    ...orderUser,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={orderUser.email}
                type="text"
                required
                onChange={(e) => {
                  setOrderUser({
                    ...orderUser,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={orderUser.address}
                type="text"
                required
                onChange={(e) => {
                  setOrderUser({
                    ...orderUser,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Button color="success" variant="contained" onClick={handlePay}>
                Pay
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default CheckoutAll;
