import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  ListItemIcon,
  Button,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import toast from "react-hot-toast";
import { isLoggedIn } from "./auth/auth";
import { useNavigate } from "react-router-dom";
const styles = {
  card: {
    maxWidth: 200,
    minWidth: 200,
  },
  media: {
    height: 100,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  // const name = "Apple 12 pro max";
  // const price = 12000;
  // const img = "https://th.bing.com/th/id/OIP.aNNz524RootQYkZmQ3lSXAHaFj?w=284&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7";

  // const handleClick = async (_id) => {
  //   // alert("h")
  //   const res = await axios.get("http://localhost:8000/api/verify-user");
  //   console.log(res);
  //   if (res.data.status === "success") {
  //     const {
  //       data: { key },
  //     } = await axios("http://localhost:8000/api/get-key");
  //     console.log(key);
  //     // const product = {
  //     //   _id: _id,
  //     // };
  //     const { data } = await axios.post("http://localhost:8000/api/payment", {
  //       _id: _id,
  //     });
  //     console.log(data);
  //     //   // console.log(amount, id);
  //     //   // console.log(window);
  //     var options = {
  //       key: key, // Enter the Key ID generated from the Dashboard
  //       amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //       currency: "INR",
  //       name: "Shopzilla", //your business name
  //       description: "Test Transaction",
  //       image: "",
  //       order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //       callback_url: "http://localhost:8000/api/payment-verification",
  //       prefill: {
  //         //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
  //         name: "Gaurav Kumar", //your customer's name
  //         email: "gaurav.kumar@example.com",
  //         contact: "9000090000", //Provide the customer's phone number for better conversion rates
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     var rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //     // e.preventDefault();
  //   } else if (res.data.status === "failed") {
  //     console.log("not");
  //     toast.error("Please login fist :-(", {
  //       duration: 4000,
  //       position: "top-center",
  //     });
  //   }
  // };
  const handleCart = async (id) => {
    console.log(id);
    if (isLoggedIn()) {
      const res = await axios.post(
        `http://localhost:8000/api/add-to-cart/${id}`,
        // { index: index - 1 },
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        toast.success(res.data.message, {
          duration: 4000,
          position: "top-center",
        });
      } else {
        toast.error(res.data.message, {
          duration: 4000,
          position: "top-center",
        });
      }
    } else {
      toast.error("Please Login First :-)", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get("http://localhost:8000/api/get-product");
      setProduct(data.product);
    };
    getProduct();
  });
  return (
    <>
      <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            {product.map((d) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "15px",
                  }}
                  key={d._id}
                >
                  <Card sx={styles.card}>
                    <CardMedia
                      component="img"
                      height="140px"
                      image={"http://localhost:8000/static/" + d.pimg}
                      alt=""
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {d.pname}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        <ListItemIcon
                          className="repeat"
                          style={{ paddingTop: "0px" }}
                        >
                          {/* <h5 className="price" style={{ padding: "0px" }}> */}
                          <CurrencyRupeeIcon />
                          {d.pprice}
                          {/* </h5> */}
                        </ListItemIcon>
                      </Typography>
                      <Stack gap={2}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            navigate(`/check/${d._id}`);
                          }}
                          // onClick={(e) => handleClick(d._id)}
                        >
                          Buy now
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={(e) => handleCart(e, d._id)}
                        >
                          add to cart
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
