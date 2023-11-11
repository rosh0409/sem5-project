// import './App.css';
import Navbar from "./components/Navbar";
// import R from "./components/R";
// import L from "./components/L";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Manage from "./components/Manage";
import Signup from "./components/Signup";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import AdminPanel from "./AdminPannel";
import Myprod from "./components/Myprod";
import Addpro from "./components/Addpro";
import SearchProduct from "./components/SearchProduct";
// import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import Checkout from "./components/Checkout";
import Subscription from "./components/Subscription";
import Newcart from "./components/Newcart";
import { useState } from "react";
import PaymentSuccessfull from "./components/PaymentSuccessfull";
import CheckoutAll from "./components/CheckoutAll";
// import { isLoggedIn } from "./auth/auth";

function App() {
  const [user, setUser] = useState({});
  const getUser = (data) => {
    setUser(data);
    console.log("data", data);
  };
  // console.log(path)
  // const [url, setUrl] = useState("None");
  // useEffect(() => {
  //   setUrl(window.location.href);
  //   console.log(url);
  // }, []);
  // console.log("appp", isLoggedIn());
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar data={user} />

        <Routes>
          <Route exact path="/" element={<Home data={user} />} />
          <Route exact path="/manage" element={<Manage />} />
          <Route exact path="/mypro" element={<Myprod />} />
          <Route exact path="/signin" element={<Signin onSignin={getUser} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/search" element={<SearchProduct />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/addpro" element={<Addpro />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/my-profile" element={<UserProfile />} />
          <Route exact path="/check/:_id" element={<Checkout />} />
          <Route exact path="/check-all/" element={<CheckoutAll />} />
          <Route exact path="/subs" element={<Subscription />} />
          <Route
            exact
            path="/payment-succesfull"
            element={<PaymentSuccessfull />}
          />
          {/* <Route exact path="/r" element={<R />} />
          <Route exact path="/l" element={<L />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
