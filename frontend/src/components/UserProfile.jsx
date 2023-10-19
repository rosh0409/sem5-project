import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState({});
  axios
    .get("http://localhost:8000/api/verify-user")
    .then(({ data }) => {
      //   console.log(data.user[0]);
      setUser(data.user[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent:"center",
          alignItems: "center",
          marginTop: "70px",
        }}
        width={"100%"}
        height={"100vh"}
      >
        <Card
          sx={{
            padding: "20px",
          }}
        >
          <Box>
            <Card sx={{ maxWidth: 345, padding: "10px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: "50%",
                  }}
                  height="300"
                  width="240"
                  image={"http://localhost:8000/static/" + user.profile}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>

          <Box>
            <Card
              sx={{
                padding: "10px",
              }}
            >
              <Typography>Phone : +91 {user.mobile}</Typography>
            </Card>
          </Box>

          <Box>
            <Card
              sx={{
                padding: "10px",
              }}
            >
              <Typography>Email: {user.email}</Typography>
            </Card>
          </Box>

          <Box>
            <Card
              sx={{
                padding: "10px",
              }}
            >
              <Typography>Gender: {user.gender}</Typography>
            </Card>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default UserProfile;
