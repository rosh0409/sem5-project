import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { isLoggedIn } from "../auth/auth";
import { payment } from "../utils/utils";
import toast from "react-hot-toast";

const Checkout = () => {
  const [product, setProduct] = useState({});
  const [orderUser, setOrderUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [user, setUser] = useState({ status: true });
  // console.log(window.location.pathname.split("/")[2]);
  const pid = window.location.pathname.split("/")[2];
  axios
    .get(`http://localhost:8000/api/get-product/${pid}`)
    .then(({ data }) => {
      //   console.log(data.isExist);
      setProduct(data.isExist);
    })
    .catch((err) => {});

  // let a =1;
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

  //   const productName = "";
  //   product.forEach((p) => {
  //     productName += p.pname + " , ";
  //   });
  const handlePay = async () => {
    // const res = await axios.get("http://localhost:8000/api/verify-user");
    // console.log(res);
    // if (res.data.status === "success") {
    if (isLoggedIn()) {
      console.log(orderUser);
      payment(product, orderUser, user);
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
                <b>Product Name </b> : <span>{product.pname}</span>
              </Box>
              <Box
                sx={{
                  fontSize: "20px",
                }}
              >
                <b>Price</b> : <span>{"Rs " + product.pprice}</span>
              </Box>
              <Box
                sx={{
                  fontSize: "20px",
                }}
              >
                <b>Delivery Charges </b>: <span>Rs 150</span>
              </Box>

              <Box
                sx={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: "blue",
                }}
              >
                Total : {"Rs " + (Number(product.pprice) + 150)}
              </Box>
            </Stack>
          </Card>
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
    </>
  );
};

export default Checkout;
