import { Card, CardContent, CardMedia, Typography ,ListItemIcon, Button, Box, Grid, Stack } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const styles = {
    card: {
      maxWidth: 200, 
      minWidth:200
    },
    media: {
      height: 100, 
    },
};

const Cart = () =>{
    return(
        // <>
        //     <Grid marginTop={10} sx={{ flexGrow: 1 }} container spacing={2}>
        //         <Grid item xs={12}>
        //             <Grid container justifyContent="center" spacing={4}>
        //             {
        //                 dataset.map((d,index)=>{
        //                 return(
        //                     <Box style={{display:"flex" , flexDirection:"row", margin:"15px", }} key={index++}>
        //                     <Card sx={styles.card}>
        //                     <CardMedia
        //                     component="img"
        //                     height="140px"
        //                     image={d.pimg}
        //                     alt=""
        //                     />
        //                     <CardContent>
        //                     <Typography variant="h6" gutterBottom>
        //                         {d.pname}
        //                     </Typography>
        //                     <Typography variant="body1" color="textSecondary" >
        //                         <ListItemIcon>
        //                         <CurrencyRupeeIcon /> 
        //                         {d.pprice}
        //                         </ListItemIcon>
        //                     </Typography>
        //                     <Stack gap={2}>
        //                         <Button color="primary" variant="contained" /*onClick={(e)=>handleClick(e,index)}*/>Buy Now</Button>
        //                     </Stack>
        //                     </CardContent>
        //                 </Card>
        //                 </Box>
        //                 )
        //                 })
        //             }
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </>
        <>
        </>
    )
}

export default Cart;