import "./Signup.css"
import React, { useState } from 'react';
import {FormControl,FormLabel, Radio,FormControlLabel,RadioGroup,Button, TextField, Stack, AppBar, Box, InputAdornment} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
// import axios from 'axios';
// import { toast  } from 'react-toastify';

const Signup = () => {
  const[file,setFile]=useState();
  const [user, setUser] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    cpassword:"",
    mobile:"",
    gender:"",
    profile:new File([],"")
  });
  function convertToBase64(file){
    return new Promise((resolve , reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error)=>{
            reject(error)
        }
    })
  }
  const onUpload = async(e)=>{
      const base64 = await convertToBase64(e.target.files[0])
      setFile(base64)
      setUser({...user,[e.target.name]:e.target.files[0]})
  }
  const handleUser = async()=>{
    if(user.name && user.username && user.email && user.password && user.cpassword && user.mobile && user.gender && user.profile){
      if(user.password === user.cpassword){
        const formdata = new FormData()
        formdata.append("profile",user.profile)
        formdata.append("name",user.name)
        formdata.append("email",user.email)
        formdata.append("password",user.password)
        formdata.append("cpassword",user.cpassword)
        formdata.append("mobile",user.mobile)
        formdata.append("gender",user.gender)
        console.log("user", user)
        console.log("formdata", formdata)
      //   await axios.post("http://localhost:8000/api/signup",
      //   {
      //     headers:{"Content-Type":"multipart/form-data"},
      //   },
      //   formdata).then((res)=>{
      //     // console.log(res.data)
      //     if(res.data.status === "success"){
      //       toast.success(res.data.message,{
      //         position:"top-right",
      //         autoClose:3000,
      //         hideProgressBar:false,
      //         closeOnClick:true,
      //         pauseOnHover:true,
      //         progress:undefined,
      //       })
      //       navigate("/signin");
      //     }
      //     else{
      //       console.log(res.data.status)
      //       toast.error(res.data.message,{
      //         position:"top-right",
      //         autoClose:3000,
      //         hideProgressBar:false,
      //         closeOnClick:true,
      //         pauseOnHover:true,
      //         progress:undefined,
      //       })
      //       navigate("/signup");
      //     }
      //   }).catch((error)=>{
      //     console.log(error.message)
      //   })
      //   // const res = {
      //   //   status:"success",
      //   //   message:"Successfully Registered :-("
      //   // }
      //   // console.log(res)
      //   // setUser({name:"",
      //   // username:"",
      //   // email:"",
      //   // password:"",
      //   // cpassword:"",
      //   // mobile:"",
      //   // gender:""})
      //   // console.log(user)
      // }
      // else{
      //   setUser({name:user.name,
      //   username:user.username,
      //   email:user.email,
      //   password:"",
      //   cpassword:"",
      //   mobile:user.mobile,
      //   gender:user.gender})
      //   const res = {
      //     status:"failed",
      //     message:"Password and Confirm Password does not match :-("
      //   }
      //   console.log(res)
      }
    }
    else{
      const res = {
        status:"failed",
        message:"Please fill all details :-("
      }
      console.log(res)
    }
  }
  let navigate = useNavigate();
  const navigateSignin = () =>{
    navigate("/signin")
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div style={{ width: '50%' }}>
        <form action="">
          <AppBar position="static" sx={{ bgcolor: 'white', width: '550px', margin: '0 auto' }}>
            <Box sx={{ p: 2 }}>
              <h1 style={{ color: 'black' }}>Register Here</h1>
              {/* //input */}
              <div className="logo-s">
                <div>
                    <label className="l" htmlFor="profile" >
                        <img className="user_img" src={file } alt="" style={{alignSelf:"center"}}/>
                    </label>
                    <input className="file" accept="image/*" id="profile" name="profile" type="file" onChange={onUpload} style={{display:"none"}} />
                    </div>
                  </div>
              <Stack spacing={2}>
              <TextField
                  id="name"
                  label="Name"
                  value={user.name}
                  name='name'
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <DriveFileRenameOutlineIcon />
                      </InputAdornment>
                    )
                  }}
                  margin="normal"
                  required
                />

                <TextField
                  id="username"
                  label="Username"
                  name='username'
                  value={user.username}
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                  margin="normal"
                  required
                />
                 <TextField
                  id="email"
                  label="Email"
                  value={user.email}
                  type='email'
                  name='email'
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                  margin="normal"
                  required
                />

                <TextField
                  id="password"
                  label="Password"
                  value={user.password}
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  margin="normal"
                  type='password'
                  name='password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                  helperText="do not share your password"
                  required
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  value={user.cpassword}
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  margin="normal"
                  type='password'
                  name='cpassword'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                
                />
                 <TextField
                  id="mobile"
                  label="phone"
                  value={user.mobile}
                  type='Number'
                  onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
                  margin="normal"
                  name='mobile'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                         <PhoneIcon />
                      </InputAdornment>
                    )
                  }}
                 
                  required
                />
<FormControl>
  <FormLabel style={{textAlign:'left'}} id="demo-radio-buttons-group-label">Gender</FormLabel>
     <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
               name="gender"
               id='gender'
               row={true}
               sx={{color:'grey'}}
               value={user.gender}
               onChange={(e) => setUser({...user ,[e.target.name]:e.target.value})}
            >
                <FormControlLabel  value="male" control={<Radio color='primary' />} label="Male"  />
                <FormControlLabel  value="female" control={<Radio color='secondary'/>} label="Female"/>
                <FormControlLabel  value="other" control={<Radio color='default' />} label="Other" />
  </RadioGroup>
  </FormControl>
              </Stack>
              <Stack direction={'row'} spacing={'3'} sx={{ mt: '20px' }}>
                <Button variant="contained" fullWidth onClick={handleUser}>
                Register
                </Button>
                <Button variant="text" fullWidth sx={{ mt: '20px' }} onClick={navigateSignin} >
                Sign In Here
                </Button>
              </Stack>
            </Box>
          </AppBar>
        </form>
      </div>
    </div>
  );
}

export default Signup;