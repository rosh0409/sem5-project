import "./Home.css"
import { Card, CardContent, CardMedia, Typography ,ListItemIcon, Button, Box } from '@mui/material';
import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import dataset from "./dataset.json";
import axios from "axios";

const styles = {
  card: {
    maxWidth: 200, 
  },
  media: {
    height: 150, 
  },
};

const Home = () => {
  // const name = "Apple 12 pro max";
  // const price = 12000;
  // const img = "https://th.bing.com/th/id/OIP.aNNz524RootQYkZmQ3lSXAHaFj?w=284&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  
  const handleClick = async(e,index) =>{
    const {data:{key}} = await axios("http://localhost:8000/api/get-key")
    const  {data:{amount,id}} = await axios.post("http://localhost:8000/api/payment",dataset[index-1])
    console.log(amount,id)
    console.log(window)
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shopzilla", //your business name
      description: "Test Transaction",
      image: dataset[index-1],
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8000/api/payment-verification",
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
      e.preventDefault();
  
  }
  return (
    <>
    {
      dataset.map((d,index)=>{
        return(
          <Box style={{display:"flex" , flexDirection:"row"}} key={index++}>
          <Card sx={styles.card}>
          <CardMedia
            component="img"
            height="140px"
            image={d.pimg}
            alt=""
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {d.pname}
            </Typography>
            <Typography variant="body1" color="textSecondary" >
              <ListItemIcon>
                <CurrencyRupeeIcon /> 
                {d.pprice}
              </ListItemIcon>
            </Typography>
            <Button color="primary" onClick={(e)=>handleClick(e,index)}>Buy</Button>
          </CardContent>
        </Card>
        </Box>
        )
      })
    }
    </>
  );
}

export default Home;