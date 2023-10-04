// import './App.css';
import Navbar from './components/Navbar';
import R from './components/R';
import L from './components/L';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from "./Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminPanel from './AdminPannel';
import Myprod from './components/Myprod';
import Addpro from './components/Addpro';
import { Grid } from '@mui/material';
import SearchProduct from './components/SearchProduct';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';


function App() {
  // console.log(path)
  const [url,setUrl] = useState("None");
  useEffect(()=>{
    setUrl(window.location.href)
  console.log(url)
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
       
        <Grid container spacing={2}>
        <Grid item xs={3}>
       <AdminPanel />
        </Grid>
      <Grid item xs={9}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/addpro' element={<Addpro />} />
          <Route exact path='/mypro' element={<Myprod />} />
          <Route exact path='/signin' element={<Signin />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/search' element={<SearchProduct />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/r' element={<R />} />
          <Route exact path='/l' element={<L />} />
        </Routes>
        </Grid>
  </Grid>
      </BrowserRouter>
    <Toaster/>
    </div>
  );
}

export default App;
