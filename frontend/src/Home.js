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
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import toast from "react-hot-toast";
import { isLoggedIn } from "./auth/auth";
import { useNavigate } from "react-router-dom";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Footer from "./components/Footer";

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
  // console.log("data", data);
  // if (data.subs[0].is === true) {
  //   console.log(data.subs);
  // }
  const [filter, setFilter] = useState(" ");
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [fp, setFP] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const sub = true;
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
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

  const handleNotify = async (id) => {
    console.log(id);
    if (isLoggedIn()) {
      const res = await axios.get(
        `http://localhost:8000/api/add-to-notify/${id}`
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

  const filterProduct = (product) => {
    if (product.pcat === filter) {
      return product;
    }
  };

  return (
    <>
      {" "}
      <Stack
        direction={"row"}
        gap={3}
        sx={{ bgcolor: "#4B45A2", width: "100vw" }}
      >
        <FormControl sx={{ width: "250px" }}>
          <InputLabel
            sx={{ color: "black", fontWeight: "400", fontSize: "30px" }}
          >
            Filter
          </InputLabel>
          <Select
            sx={{
              bgcolor: "white",
              border: "1px solid black",
            }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setFP(product.filter(filterProduct));
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Electronic">Electronic</MenuItem>
            <MenuItem value="Toy">Toy</MenuItem>
            <MenuItem value="Cloth">Cloth</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {filter === "All" || filter === " " ? (
        <>
          <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4}>
                {product.map((d) => {
                  return (
                    <Box
                      className="key"
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

                              {localStorage.getItem("is") ? (
                                <>
                                  <p>
                                    <span className="original-price">
                                      <s>₹{d.pprice}</s>
                                    </span>

                                    <span className="discounted-price">
                                      <b> {"    ₹ " + (d.pprice * 95) / 100}</b>
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <>{d.pprice}</>
                              )}

                              <h6 style={{ display: "none" }}>{"=" + d._id}</h6>
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
                              onClick={() => handleCart(d._id)}
                            >
                              add to cart
                            </Button>
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => handleNotify(d._id)}
                            >
                              Notify me
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
      ) : (
        <>
          <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4}>
                {product.filter(filterProduct).map((d) => {
                  return (
                    <Box
                      className="key"
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

                              {localStorage.getItem("is") ? (
                                <>
                                  <p>
                                    <span className="original-price">
                                      <s>₹{d.pprice}</s>
                                    </span>

                                    <span className="discounted-price">
                                      <b> {"    ₹ " + (d.pprice * 95) / 100}</b>
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <>{d.pprice}</>
                              )}

                              <h6 style={{ display: "none" }}>{"=" + d._id}</h6>
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
                              onClick={() => handleCart(d._id)}
                            >
                              add to cart
                            </Button>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => handleNotify(d._id)}
                            >
                              Notify me
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
      )}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
