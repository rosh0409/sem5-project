import { useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography ,ListItemIcon, Button, Box, Grid, Stack } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import axios from "axios";
// import toast from "react-hot-toast";
// import dataset from "../../../backend/src/dataset";

const styles = {
    card: {
      maxWidth: 200, 
      minWidth:200
    },
    media: {
      height: 100, 
    },
  };

const SearchProduct = ()=>{
    const location = useLocation();
    // console.log(location.state)
    const{pname,pcat} = location.state
    // console.log(pname.length)
    // console.log(pcat.length)
    // const handleClick = async(e,index) =>{
    //     // alert("h")
    //     const res = await axios.get("http://localhost:8000/api/verify-user")
    //     console.log(res)
    //     if(res.data.status === "success"){
    //       const {data:{key}} = await axios("http://localhost:8000/api/get-key")
    //       const  {data:{amount,id}} = await axios.post("http://localhost:8000/api/payment",dataset[index-1])
    //       console.log(amount,id)
    //       console.log(window)
    //       var options = {
    //         key: key, // Enter the Key ID generated from the Dashboard
    //         amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "Shopzilla", //your business name
    //         description: "Test Transaction",
    //         image: dataset[index-1],
    //         order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         callback_url: "http://localhost:8000/api/payment-verification",
    //         prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    //             name: "Gaurav Kumar", //your customer's name
    //             email: "gaurav.kumar@example.com",
    //             contact: "9000090000" //Provide the customer's phone number for better conversion rates 
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office"
    //         },
    //         theme: {
    //             color: "#3399cc"
    //         }
    //       };
    //       var rzp1 = new window.Razorpay(options);
    //           rzp1.open();
    //           e.preventDefault();
          
    //       }
    //       else if(res.data.status === "failed"){
    //         console.log("not")
    //         toast.error("Please login fist :-(",{
    //           duration: 4000,
    //           position: 'top-center'
    //           })
    //       }
    //     } 
    return(
        <>
            {((pname.length !== 0)||(pcat.length !== 0))?
            <>
                    {(pname.length !== 0)?
                    <>
                        <div className="pname">
                        <h1 style={{marginLeft:"0px",paddingLeft:"0px"}}>Search By Name</h1>
                        <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={4}>
                                {
                                    pname.map((d,index)=>{
                                    return(
                                        <Box style={{display:"flex" , flexDirection:"row", margin:"15px", }} key={index++}>
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
                                        <Typography variant="body1" color="textSecondary" >
                                            <ListItemIcon>
                                            <CurrencyRupeeIcon /> 
                                            {d.pprice}
                                            </ListItemIcon>
                                        </Typography>
                                        <Stack gap={2}>
                                            <Button color="primary" variant="contained" /*onClick={(e)=>handleClick(e,index)}*/>Buy</Button>
                                            <Button color="secondary" variant="outlined" /*onClick={(e)=>handleClick(e,index)}*/>add to cart</Button>
                                        </Stack>
                                        </CardContent>
                                    </Card>
                                    </Box>
                                    )
                                    })
                                }
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    </>:""}
                    {(pcat.length !== 0)?
                    <>
                        <div className="pcat">
                        <h1>Search By Category</h1>
                        <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={4}>
                                {
                                    pcat.map((d,index)=>{
                                    return(
                                        <Box style={{display:"flex" , flexDirection:"row", margin:"15px", }} key={index++}>
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
                                        <Typography variant="body1" color="textSecondary" >
                                            <ListItemIcon>
                                            <CurrencyRupeeIcon /> 
                                            {d.pprice}
                                            </ListItemIcon>
                                        </Typography>
                                        <Stack gap={2}>
                                            <Button color="primary" variant="contained" /*onClick={(e)=>handleClick(e,index)}*/>Buy</Button>
                                            <Button color="secondary" variant="outlined" /*onClick={(e)=>handleClick(e,index)}*/>add to cart</Button>
                                        </Stack>
                                        </CardContent>
                                    </Card>
                                    </Box>
                                    )
                                    })
                                }
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    </>:""}
            </>:
            <>
                <h1>No Product Found</h1>
            </>}
        </>
    )
}

export default SearchProduct;