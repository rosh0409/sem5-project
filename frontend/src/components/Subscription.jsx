import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import { payment } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [subscribe, setSub] = useState(false);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const getSuscription = async () => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/get-key");
    console.log(key);
    const { data } = await axios.post(`http://localhost:8000/api/suscribing/`, {
      selectedPlan,
    });
    console.log(data);
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shopzilla", //your business name
      description: `Purchasing ${selectedPlan} plan`,
      image: "",
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:8000/api/suscribed/${data.user._id}/${selectedPlan}`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: data.user.name, //your customer's name
        email: data.user.email,
        contact: data.user.mobile, //Provide the customer's phone number for better conversion rates
      },
      // notes: {
      //   address: user.address,
      // },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    const rzp = rzp1.open();
    console.log("rzp", rzp);

    localStorage.setItem("is", true);
    // navigate("/payment-succesfull");
  };

  const handleSubscribe = () => {
    // console.log(`Subscribed to the ${selectedPlan} plan`);
    // setSub(true);
    // alert(`${selectedPlan} Subscription Added`);
    // if (selectedPlan === "basic") {
    //   getSuscription();
    // } else if (selectedPlan === "basic") {
    //   getSuscription();
    // } else {
    //   getSuscription();
    // }
    getSuscription();
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Become a pro + user
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="h6">Select a Plan:</Typography>
              <RadioGroup
                aria-label="subscription-plan"
                name="subscription-plan"
                value={selectedPlan}
                onChange={handlePlanChange}
              >
                <FormControlLabel
                  value="basic"
                  control={<Radio />}
                  label="Basic Plan (RS 99/month)"
                />
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label="Standard Plan (RS 199/3 month)"
                />
                <FormControlLabel
                  value="premium"
                  control={<Radio />}
                  label="Premium Plan (RS 599/9 month)"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Subscription;
