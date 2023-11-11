import React, { useEffect } from "react";
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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Newcart = ({ d, c }) => {
  // console.log("d", d);
  // console.log(props);
  // const sub = true;
  const navigate = useNavigate();
  let [qty, setQty] = useState(1);
  const styles = {
    card: {
      maxWidth: 200,
      minWidth: 200,
    },
    media: {
      height: 100,
    },
  };

  useEffect(() => {}, [c]);
  const Incre = () => {
    setQty(qty++);
  };

  const Decre = () => {
    if (qty < 0) {
      alert("Quantity cannot be less than zero");
      return;
    }
    setQty(qty--);
  };
  const handleClick = async (id) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/remove-cart/${id}`
    );
    // navigate("/cart");
    console.log("data", data);
    if (data.status === "success") {
      toast.success(data.message, {
        duration: 4000,
        position: "top-center",
      });
      // navigate("/cart");
      window.location.reload();
    } else {
      toast.error(data.message, {
        duration: 4000,
        position: "top-center",
      });
      // navigate("/cart");
      window.location.reload();
    }
  };
  return (
    <div>
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
              <ListItemIcon>
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
              </ListItemIcon>
            </Typography>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              direction={"row"}
              gap={2}
            >
              <Button color="primary" variant="outlined" onClick={Decre}>
                -
              </Button>
              {qty}
              {/* <h1
                style={{
                  backgroundColor: "red",
                  zIndex: 100,
                }}
              >
                {" "}
                {c.pqty}
                {console.log("valie" + c.pqty)}
              </h1> */}
              <Button color="primary" variant="outlined" onClick={Incre}>
                +
              </Button>
            </Stack>
            <Stack
              sx={{
                mt: "10px",
              }}
              gap={2}
            >
              <Button
                color="error"
                variant="contained"
                onClick={() => handleClick(d._id)}
              >
                Remove
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Newcart;
