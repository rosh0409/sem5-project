import React from 'react'
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import { Grid } from "@mui/material";
import AdminPanel from "../AdminPannel";
import "./Dashboard.css";

const Dashboard = () => {
  return (   
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <AdminPanel />
      </Grid>
      <Grid item xs={9}>

      <Box   className={"ds-img numb"} >
    <Box>
    <Card sx={{ maxWidth: 345 }}>
     <CardActionArea>
       <CardContent sx={{bgcolor:"darkorange"}}>
         <Typography  gutterBottom variant="h5" component="div">
           Products 
         </Typography>
         <Typography  gutterBottom variant="h5" component="div">
           120 +
         </Typography>
       </CardContent>
     </CardActionArea>
   </Card>
   </Box>
   <Box>
   <Card sx={{ maxWidth: 345 }}>
     <CardActionArea>
       <CardContent sx={{bgcolor:"red"}}>
         <Typography  gutterBottom variant="h5" component="div">
            Expired
         </Typography>
         <Typography  gutterBottom variant="h5" component="div">
           20 +
         </Typography>
   
       </CardContent>
     </CardActionArea>
     </Card>
     </Box>
     <Box>
   
   <Card sx={{ maxWidth: 345 }}>
     <CardActionArea>
       <CardContent sx={{bgcolor:"lightgreen"}}>
         <Typography  gutterBottom variant="h5" component="div">
           Categories
         </Typography>
         <Typography  gutterBottom variant="h5" component="div">
           20 +
         </Typography>
   
       </CardContent>
     </CardActionArea>
   </Card>
   </Box>
    </Box>
      </Grid>
    </Grid>
  )
}

export default Dashboard
