import React, { useState } from 'react';
import { Button, TextField, Stack, AppBar, Box, InputAdornment, Link } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { toast  } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const handleUser = async() =>{
    if(user.email &&  user.password){
      await axios.post("http://localhost:8000/api/signin",user).then((res)=>{
        console.log(res.data)
        if(res.data.status === "success"){
          toast.success(res.data.message,{
            position:"top-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            progress:undefined,
          })
          navigate("/")
        }
        else{
          toast.error(res.data.message,{
            position:"top-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            progress:undefined,
          })
          setUser({email:"",password:""})
          navigate("/signin")
        }
      }).catch((error)=>{
        console.log(error.message)
      })
    }else{
      const res = {
        status:"failed",
        message:"Please fill all details :-("
      }
      console.log(res)
    }
  }
  let navigate = useNavigate();
  const navigateSignup = () =>{
    navigate("/signup")
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div style={{ width: '50%' }}>
        <form action="">
          <AppBar position="static" sx={{ bgcolor: 'white', width: '550px', margin: '0 auto' }}>
            <Box sx={{ p: 2 }}>
              <h1 style={{ color: 'black' }}>Login Here</h1>
              <Stack spacing={2}>
                <TextField
                  id="email"
                  label="Username"
                  value={user.email}
                  name='email'
                  onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}
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
                  id="password"
                  label="Password"
                  name='password'
                  value={user.password}
                  onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}
                  margin="normal"
                  type='password'
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
                <Link style={{ textAlign: 'left' }}>forget password</Link>
              </Stack>
              <Stack direction={'row'} spacing={'3'} sx={{ mt: '20px' }}>
                <Button variant="contained" fullWidth onClick={handleUser}>
                  Sign In
                </Button>
                <Button variant="text" fullWidth sx={{ mt: '20px' }} onClick={navigateSignup} >
                  Register Here
                </Button>
              </Stack>
            </Box>
          </AppBar>
        </form>
      </div>
    </div>
  );
};

export default Signin;













































































// import { useState } from "react";
// import "./Signin.css";
// import axios from "axios";

// const Signin = () =>{
//     const [user , setUser] = useState({
//         email:"",
//         password:""
//     })
    
//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         axios.post("http://localhost:8000/api/signin",user
//         ).then((res)=>{
//             console.log(res.data);
//         }).catch((err)=>{
//             console.log(err)
//         })
//         setUser({email:"",password:""})
//         console.log(user);

//     }
    
//     return(
//         <>
//             <div className="container">
//                 <div className="box">
//                     <h1>Signin</h1>
//                     <form method="post"  onSubmit={handleSubmit} >
//                         <div className="item">
//                             <input type="email" value={user.email} name="email" id="email" onChange={(e)=>{setUser({...user,[e.target.name]:e.target.value})}}  placeholder="Enter your email" />
//                             <input type="password" value={user.password} onChange={(e)=>{setUser({...user,[e.target.name]:e.target.value})}} name="password" id="password"  placeholder="Enter your password" />
//                             <div className="check">
//                                 <div>
//                                     <input type="checkbox" name="remember" id="remember" style={{padding:0,margin:0, width:20, height:12}} />
//                                     <label htmlFor="checkbox">Remember me</label>
//                                 </div>
//                                 <a href="http://">Forgot Password?</a>
//                             </div>
//                             <button type="submit">login</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Signin;