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
import { useEffect, useState } from "react";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import Newcart from "./Newcart";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
// import dataset from "../dataset.json";
const styles = {
  card: {
    maxWidth: 200,
    minWidth: 200,
  },
  media: {
    height: 100,
  },
};

const Cart = () => {
  // const sub = true;
  // const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  // const [cartID, setCartID] = useState([]);
  useEffect(() => {
    const getCartProduct = async () => {
      const { data } = await axios.get("http://localhost:8000/api/mycart");
      //   const { cartProduct } = data;
      // console.log(data.cartProduct);
      const { cartProduct, userCart } = data;
      // console.log("data", data);
      // console.log("cartProduct", cartProduct);
      // console.log("userCart", userCart);
      setProduct(cartProduct);
      setCart(userCart);
      // setCartID(data.userCart.id);

      // //   setProduct(data.cartProduct);
      // console.log("u", setCart);
      // console.log("p", setProduct);
      // console.log(data.usercart);
    };
    getCartProduct();
  }, []);
  const [total, setTotal] = useState(0);

  const totalPrice = () => {
    let sum = 0;
    product.forEach((p) => {
      sum += Number(p.pprice);
    });
    // console.log(sum);
    // setTotal(sum);
    return sum;
  };

  // const Incre = () => {
  //   setQty((prevQty) => prevQty + 1);
  // };

  // const Decre = () => {
  //   setQty((prevQty) => prevQty - 1);
  // };
  // console.log("cart " + d);
  // console.log(cart[0]._id);
  const handleNavigate = () => {
    // alert("hii");
    // console.log(product);
    navigate("/check-all", { state: { product: product } });
  };
  return (
    <>
      {product.length === 0 ? (
        <>
          <h1>No product in the cart</h1>
        </>
      ) : (
        <>
          <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={4}>
                {product.map((d, index) => {
                  return (
                    <>
                      <Newcart d={d} c={cart[index]} />
                    </>
                    // <Box
                    //   style={{
                    //     display: "flex",
                    //     flexDirection: "row",
                    //     margin: "15px",
                    //   }}
                    //   key={d._id}
                    // >
                    //   <Card sx={styles.card}>
                    //     <CardMedia
                    //       component="img"
                    //       height="140px"
                    //       image={"http://localhost:8000/static/" + d.pimg}
                    //       alt=""
                    //     />
                    //     <CardContent>
                    //       <Typography variant="h6" gutterBottom>
                    //         {d.pname}
                    //       </Typography>
                    //       <Typography variant="body1" color="textSecondary">
                    //         <ListItemIcon>
                    //           {sub ? (
                    //             <>
                    //               <p>
                    //                 <span className="original-price">
                    //                   <s>₹{d.pprice}</s>
                    //                 </span>

                    //                 <span className="discounted-price">
                    //                   <b> {"    ₹ " + (d.pprice * 95) / 100}</b>
                    //                 </span>
                    //               </p>
                    //             </>
                    //           ) : (
                    //             <>{d.pprice}</>
                    //           )}
                    //         </ListItemIcon>
                    //       </Typography>
                    //       <Stack direction={"row"} gap={2}>
                    //         <Button
                    //           color="primary"
                    //           variant="contained"
                    //           onClick={Decre}
                    //         >
                    //           -
                    //         </Button>
                    //         {qty}
                    //         <Button
                    //           color="primary"
                    //           variant="contained"
                    //           onClick={Incre}
                    //         >
                    //           +
                    //         </Button>
                    //       </Stack>
                    //       <Stack gap={2}>
                    //         <Button
                    //           color="primary"
                    //           variant="contained" /*onClick={(e)=>handleClick(e,index)}*/
                    //         >
                    //           Buy Now
                    //         </Button>
                    //       </Stack>
                    //     </CardContent>
                    //   </Card>
                    // </Box>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <div className="footer">
            <h3>
              Total Cart value is :{" "}
              {localStorage.getItem("is") ? totalPrice() * 0.95 : totalPrice()}
            </h3>
            <Stack gap={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleNavigate}
                // onClick={() => handleClick()}
              >
                Buy All
              </Button>
            </Stack>
          </div>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default Cart;

//  <>
//       <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
//         <Grid item xs={12}>
//           <Grid container justifyContent="center" spacing={4}>
//             <Box
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 margin: "15px",
//               }}
//               // key={d._id}
//             >
//               <Card sx={styles.card}>
//                 <CardMedia
//                   component="img"
//                   height="140px"
//                   image={"http://localhost:8000/static/" + d.pimg}
//                   alt=""
//                 />
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {d.pname}
//                   </Typography>
//                   <Typography variant="body1" color="textSecondary">
//                     <ListItemIcon>
//                       {sub ? (
//                         <>
//                           <p>
//                             <span className="original-price">
//                               <s>₹{d.pprice}</s>
//                             </span>

//                             <span className="discounted-price">
//                               <b> {"    ₹ " + (d.pprice * 95) / 100}</b>
//                             </span>
//                           </p>
//                         </>
//                       ) : (
//                         <>{d.pprice}</>
//                       )}
//                     </ListItemIcon>
//                   </Typography>
//                   <Stack direction={"row"} gap={2}>
//                     <Button color="primary" variant="contained" onClick={Decre}>
//                       -
//                     </Button>
//                     {1}
//                     <Button color="primary" variant="contained" onClick={Incre}>
//                       +
//                     </Button>
//                   </Stack>
//                   <Stack gap={2}>
//                     <Button
//                       color="primary"
//                       variant="contained" /*onClick={(e)=>handleClick(e,index)}*/
//                 >
//                   Buy Now
//                 </Button>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Box>
//         );
//       </Grid>
//     </Grid>
//   </Grid>
//   <div className="footer">
//     <h3>Total Cart value is : {"totalPrice()"}</h3>
//     <Stack gap={2}>
//       <Button
//         color="primary"
//         variant="contained" /*onClick={(e)=>handleClick(e,index)}*/
//       >
//         Buy All
//       </Button>
//     </Stack>
//   </div>
// </>
