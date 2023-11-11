import "./Signup.css";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  TextField,
  Stack,
  AppBar,
  Box,
  InputAdornment,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import toast from "react-hot-toast";
import { convertToBase64 } from "../utils/utils";
import Footer from "./Footer";

const Signup = () => {
  let navigate = useNavigate();
  const [file, setFile] = useState();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    gender: "",
    profile: new File([], ""),
  });
  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // }
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };
  const handleUser = async () => {
    const toastId = toast.loading("Loading...");
    if (
      user.name &&
      user.username &&
      user.email &&
      user.password &&
      user.cpassword &&
      user.mobile &&
      user.gender &&
      user.profile
    ) {
      if (user.password === user.cpassword) {
        // console.log(user.username)
        const formdata = new FormData();
        formdata.append("profile", user.profile);
        formdata.append("name", user.name);
        formdata.append("username", user.username);
        formdata.append("email", user.email);
        formdata.append("password", user.password);
        formdata.append("cpassword", user.cpassword);
        formdata.append("mobile", user.mobile);
        formdata.append("gender", user.gender);
        const { data } = await axios.post(
          "http://localhost:8000/api/signup",
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data.status === "success") {
          toast.dismiss(toastId);
          toast.success(data.message, {
            duration: 4000,
            position: "top-center",
          });
          navigate("/signin");
        } else {
          toast.dismiss(toastId);
          toast.error(data.message, {
            duration: 4000,
            position: "top-center",
          });
          navigate("/signup");
        }
      } else {
        toast.dismiss(toastId);
        setUser({
          name: user.name,
          username: user.username,
          email: user.email,
          password: "",
          cpassword: "",
          mobile: user.mobile,
          gender: user.gender,
        });
        toast.error("Password and Confirm Password does not match :-(", {
          duration: 2000,
          position: "top-center",
        });
      }
    } else {
      toast.dismiss(toastId);
      toast.error("Please fill all the fields :-( ", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%" }}>
        <form action="">
          <AppBar
            position="static"
            sx={{ bgcolor: "white", width: "550px", margin: "0 auto" }}
          >
            <Box sx={{ p: 2 }}>
              <h1 style={{ color: "black" }}>Register Here</h1>
              {/* //input */}
              <div className="logo-s">
                <div>
                  <label className="l" htmlFor="profile">
                    <img
                      className="user_img"
                      src={file}
                      alt=""
                      style={{ alignSelf: "center" }}
                    />
                  </label>
                  <input
                    className="file"
                    accept="image/*"
                    id="profile"
                    name="profile"
                    type="file"
                    onChange={onUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <Stack spacing={2}>
                <TextField
                  id="name"
                  label="Name"
                  value={user.name}
                  name="name"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DriveFileRenameOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                />

                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                />
                <TextField
                  id="email"
                  label="Email"
                  value={user.email}
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  required
                />

                <TextField
                  id="password"
                  label="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  margin="normal"
                  type="password"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  helperText="do not share your password"
                  required
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  value={user.cpassword}
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  margin="normal"
                  type="password"
                  name="cpassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="mobile"
                  label="phone"
                  value={user.mobile}
                  type="Number"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                  margin="normal"
                  name="mobile"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                <FormControl>
                  <FormLabel
                    style={{ textAlign: "left" }}
                    id="demo-radio-buttons-group-label"
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    id="gender"
                    row={true}
                    sx={{ color: "grey" }}
                    value={user.gender}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio color="secondary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio color="default" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack direction={"row"} spacing={"3"} sx={{ mt: "20px" }}>
                <Button variant="contained" fullWidth onClick={handleUser}>
                  Register
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: "20px" }}
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign In Here
                </Button>
              </Stack>
            </Box>
          </AppBar>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Signup;
