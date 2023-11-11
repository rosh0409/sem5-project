import React, { useEffect, useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import Footer from "./Footer";

function PaymentSuccessfull() {
  const navigate = useNavigate();
  let [time, setTime] = useState(5);
  // window.location.onload(
  setInterval(() => {
    navigate("/");
  }, 5000);
  // );
  // while (time !== 0) {
  //   setInterval(() => {
  //     setTime((time = time - 1));
  //   }, 1000);
  // }
  useEffect(() => {
    if (time >= 0) {
      setInterval(() => {
        setTime((time = time - 1));
      }, 1000);
    }
  }, [time]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        flexDirection: "column",
        // backgroundColor: "red",
      }}
    >
      <h1 style={{ color: "green" }}>
        Payment Successfull <EmojiEmotionsIcon />
      </h1>
      <h5 style={{ color: "blue" }}>
        You will be redirected in {time} seconds...
      </h5>
      {/* <Footer /> */}
    </div>
  );
}

export default PaymentSuccessfull;
