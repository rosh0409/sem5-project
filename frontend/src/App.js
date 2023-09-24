// import './App.css';
import Navbar from './components/Navbar';
import R from './components/R';
import L from './components/L';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from "./Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<Signin />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/r' element={<R />} />
          <Route exact path='/l' element={<L />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
